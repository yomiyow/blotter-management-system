const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2022100960Romeo',
      database: 'blotter_db'
    });
    console.log('Database connected!')
    return connection;

  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
}

module.exports = { connectToDatabase };