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

async function updateAccountInfo(req, res) {
  const connection = await connectToDatabase();
  const avatarPath = req.file ? req.file.filename : null;

  const {
    firstname, middlename, lastname,
    gender, birthdate, civilStatus,
    address, contact, email
  } = req.body;

  try {

    const updateQuery = `
    UPDATE user
    SET
    firstname = ?, middlename = ?, lastname = ?, gender = ?, birthdate = ?,
    civil_status = ?, address = ?, contact_no = ?, avatar_path = ?
    WHERE email = ?
    `;
    const updateValues = [
      firstname, middlename, lastname, gender, birthdate,
      civilStatus, address, contact, avatarPath, email
    ];
    const result = await connection.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Account not found or no changes made' });
    }

    res.status(200).json({ message: 'Account updated successfully' });

  } catch (err) {
    console.error(err);
    return;
  }

}

module.exports = { getAccountInfo, updateAccountInfo };