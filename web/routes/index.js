var express = require('express');
var router = express.Router();

var users = require("../data/dataprovider");
var credentials = require("../data/userCredentials");

/* home */

router.get('/', function(req, res, next){
  const user = req.session.user;
  console.log(user);

  const all_genres  = users.getAllGenres();
  const all_years   = users.getAllYears();
 
  const sortedGenres = all_genres.sort();
  const sortedYears = all_years.sort((a, b) => b - a);

  if (user) {
    const user_copies = users.getUserCopies(user);  
    res.render('home', { 
        head_title:   'Home',
        login:        'Cerrar Sesión',
        h1_title:     'Mis copias',
        all_copies:   user_copies,
        all_genres:   sortedGenres,
        all_years:    sortedYears,
        user:         user,
    });
} else {
    const all_copies = users.getAllCopies();
    res.render('home', { 
        head_title:   'Home',
        login:        'Iniciar Sesión',
        h1_title:     'Listado de películas',
        all_copies:   all_copies,
        all_genres:   sortedGenres,
        all_years:    sortedYears,
        user:         user,
    });
}
});



/* login */

router.get('/login', function(req, res){
  res.render('login', {
    head_title: 'Login',
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

router.get('/logout', function(req, res){
  req.session.destroy((error) => {
      if (error) { return res.send('Error al cerrar sesión'); }
      res.redirect('/');
  });
});



/* copies */

router.get('/copy/:id', function(req,res){
  const user = req.session.user;
  const id = req.params.id;
    if (user) {
      const copy = users.getCopiesById(id);  
      //console.log(copy);
      res.render('copy', { 
          head_title:   'Copia',
          login:        'Cerrar Sesión',
          copy:         copy,
      });

    } else { res.redirect('/'); }
});


module.exports = router;
