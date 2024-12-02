const { connectToDatabase } = require('../models/db-connection.js');
const { isValidPassword } = require('../public/utils/utils.js');

async function loginUser(req, res) {
  const connection = await connectToDatabase();
  const { email, password } = req.body;

  try {
    const selectQuery = `SELECT * FROM user WHERE email = ? AND password = ?`;
    const [result] = await connection.query(selectQuery, [email, password]);

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      rank: result[0].rank
    });

  } catch (err) {
    console.error(err.stack);
    return;
  } finally {
    connection.end();
  }
}

async function registerUser(req, res) {
  const connection = await connectToDatabase();
  const { firstname, lastname, email, password, rank } = req.body;

  try {
    const selectQuery = `SELECT * FROM user WHERE email = ?`;
    const [result] = await connection.query(selectQuery, [email]);

    // Check first if the user already registered
    if (result.length > 0) {
      return res.status(409).json({ error: 'This email address is already registered. Please use a different email or log in.' });
    }

    // validate the password
    if (!isValidPassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain both letters and numbers.' });
    }

    const insertQuery = `
      INSERT INTO user (firstname, lastname, email, password, \`rank\`)
      VALUES (?, ?, ?, ?, ?);
    `;
    await connection.query(insertQuery, [
      firstname, lastname, email, password, rank
    ])

    res.status(201).json({ message: 'Registration successful.' });

  } catch (err) {
    console.error(err);
  }
}

module.exports = { loginUser, registerUser };