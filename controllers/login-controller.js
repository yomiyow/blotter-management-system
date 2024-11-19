const { connectToDatabase } = require('../models/db-connection.js');

async function loginUser(req, res) {
  const connection = await connectToDatabase();
  const { email, password } = req.body;
  console.log(req.body);

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

module.exports = loginUser;