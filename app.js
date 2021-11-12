const faker = require('faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'join_us'
});

// Selecting data
const q = 'SELECT COUNT(*) AS total FROM users';

connection.query(q, (error, results, fields) => {
    if (error) throw error;

    console.log(results[0].total);
});

// Inserting data
const q = 'INSERT INTO users(email) VALUES("howard@gmail.com")';

connection.query(q, (error, results, fields) => {
    if (error) throw error;

    console.log(results);
});

// INSERTING DATA TAKE 2
const person = { 
    email: faker.internet.email(),
    created_at: faker.date.past()
};

connection.query('INSERT INTO users SET ?', person, (error, result) => {
    if (error) throw error;

    console.log(result);
});

// BULK INSERT 500 DATA
const data = [];

for (let index = 0; index < 500; index++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

const q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], (error, result) => {
    if (error) throw error;

    console.log(result);
});

// EXERCISE 1
const q = 'SELECT DATE_FORMAT(MIN(created), "%M %D %Y") AS earliest_date FROM users';

connection.query(q, (error, result) => {
    if (error) throw error;

    console.log(result);
});

// EXERCISE 2
const q = 'SELECT * FROM users WHERE created_at = (SELECT MIN(created_at) FROM users)';

connection.query(q, (error, result) => {
    if (error) throw error;

    console.log(result);
});

// EXERCISE 3
const q = 'SELECT MONTHNAME(created_at) AS month, COUNT(*) AS count FROM users GROUP BY month ORDER BY count DESC';

connection.query(q, (error, result) => {
    if (error) throw error;

    console.log(result);
});

// EXERCISE 4
const q = 'SELECT COUNT(*) AS yahoo_users FROM users WHERE email LIKE "%@yahoo.com"';

connection.query(q, (error, result) => {
    if (error) throw error;

    console.log(result);
});

// EXERCISE 5
const q =  `SELECT 
                CASE 
                    WHEN email LIKE "%@gmail.com" THEN "gmail"
                    WHEN email LIKE "%@yahoo.com" THEN "yahoo"
                    WHEN email LIKE "%@hotmail.com" THEN "hotmail"
                    ELSE "other"
                END AS provider,
                COUNT(*) AS total_users
            FROM users
            GROUP BY provider
            ORDER BY total_users DESC`;

connection.query(q, (error, result) => {
    if (error) throw error;

    console.log(result);
});

connection.end();