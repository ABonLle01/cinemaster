var express = require('express');
var router = express.Router();

var users = require("../data/dataprovider");
var credentials = require("../data/userCredentials");

/* home */

router.get('/', function(req, res, next) {
  const user = req.session.user;
  console.log(user);

  const all_genres  = users.getAllGenres();
  const all_years   = users.getAllYears();
 
  const sortedGenres = all_genres.sort();
  const sortedYears = all_years.sort((a, b) => b - a);

  if (user) {
    const user_copies = users.getUserCopies(user);  
    res.render('home', { 
        head_title:   'CineMaster',
        header_title: 'CineMaster',
        login:        'Cerrar Sesión',
        h1_title:     'Mis copias',
        h2_genre:     'Géneros',
        h2_year:      'Año',
        all_copies:   user_copies,
        all_genres:   sortedGenres,
        all_years:    sortedYears,
    });
} else {
    const all_copies = users.getAllCopies();
    res.render('home', { 
        head_title:   'CineMaster',
        header_title: 'CineMaster',
        login:        'Iniciar Sesión',
        h1_title:     'Listado de películas',
        h2_genre:     'Géneros',
        h2_year:      'Año',
        all_copies:   all_copies,
        all_genres:   sortedGenres,
        all_years:    sortedYears,
    });
}
});



/* login */

router.get('/login', function(req, res){
  res.render('login', {
    head_title:   'CineMaster - Login',
  });
});



/* loged */

router.post('/loged', function(req, res){
  let username = req.body.username;
  let pass = req.body.password;
  
  console.log('Usuario: ',    username);
  console.log('Contraseña: ', pass);

  const user_check = credentials.checkUserCredentials(username, pass);
  console.log(user_check);
  if (user_check) {
      req.session.user = username;
      res.redirect('/');
  } else {
    const error = new Error('Usuario o contraseña incorrectos');
    error.status = 401;
    res.render('error', {
        message: error.message,
        error: error
    });
  }

});


/* logout */

router.get('/logout', function(req, res) {
  req.session.destroy((error) => {
      if (error) { return res.send('Error al cerrar sesión'); }
      res.redirect('/');
  });
});


module.exports = router;
