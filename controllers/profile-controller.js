const { connectToDatabase } = require('../models/db-connection.js');

async function getAccountInfo(req, res) {
  const connection = await connectToDatabase();
  const { email } = req.body;
  try {
    const selectQuery = `
      SELECT * FROM user
      WHERE email = ?
    `;
    const [result] = await connection.query(selectQuery, [email]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(result);

  } catch (err) {
    console.error(err);
  }
}

module.exports = getAccountInfo;