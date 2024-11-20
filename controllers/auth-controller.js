const { connectToDatabase } = require('../models/db-connection.js');

async function loginUser(req, res) {
  const connection = await connectToDatabase();
  const { email, password } = req.body;

  try {
    const selectQuery = `SELECT * FROM user WHERE email = ? AND password = ?`;
    const [result] = await connection.query(selectQuery, [email, password]);

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(err.stack);
    return;
  } finally {
    connection.end();
  }
}

async function registerUser(req, res) {
  const connection = await connectToDatabase();
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check first if the user already registered
    const selectQuery = `SELECT * FROM user WHERE email = ?`;
    const [result] = await connection.query(selectQuery, [email]);

    if (result.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const insertQuery = `
      INSERT INTO user (firstname, lastname, email, password)
      VALUES (?, ?, ?, ?);
    `;
    await connection.query(insertQuery, [
      firstname, lastname, email, password
    ])

    res.status(200).json({ message: 'Register successful' });

  } catch (err) {
    console.error(err);
  }
}

module.exports = { loginUser, registerUser };