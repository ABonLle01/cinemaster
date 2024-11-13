var users = require("./users.json");

function getAllUsers(){ return users };

function getAllCopies(){ return users.flatMap(user => user.copies); }

function getAllGenres() {
    const genres = new Set();
    users.flatMap(user => user.copies).forEach(copy => {
        if (copy.genre) {
            copy.genre.split(',').forEach(g => genres.add(g.trim()));
        }
    });
    
    return Array.from(genres);
}

function getAllYears() {
    const years = new Set();
    users.flatMap(user => user.copies).forEach(copy => {
        if (copy.year) {
            years.add(copy.year);
        }
    });

    return Array.from(years);
}

function getUserCopies(username) { 
    const user = users.find(user => user.username === username); 
    return user.copies;
}

function getCopiesByGenre(genre) {
    return users.flatMap(user => user.copies).filter(copy => copy.genre.includes(genre)); //se utiliza 'includes' porque una copia puede tener varios géneros
}

function getCopiesByYear(year) {
    return users.flatMap(user => user.copies).filter(copy => copy.year === year);
}

module.exports = { 
    getAllUsers, getAllCopies, getAllGenres, getAllYears, 
    getUserCopies,
    getCopiesByGenre, getCopiesByYear,  
};