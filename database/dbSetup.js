// require sqlite to be able to use CRUD-OPERATIONS on our database
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// create a database promise object by connecting to database
const dbPromise = (async () => {
    return open({
        filename: './thedatabase.sqlite',
        driver: sqlite3.Database
    });
})();



module.exports = dbPromise;