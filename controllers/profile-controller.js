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
  const { email } = req.query;
  const {
    firstname, middlename, lastname,
    gender, birthdate, civilStatus,
    address, contact
  } = req.body;

  try {
    // Retrieve current avatar path if no new file is uploaded
    const getAvatarQuery = `SELECT avatar_path FROM user WHERE email = ?`;
    const [currentAvatar] = await connection.query(getAvatarQuery, [email]);
    const avatarPath = req.file ? req.file.filename : currentAvatar[0].avatar_path;

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
    const [result] = await connection.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Account not found or no changes made' });
    }

    res.status(200).json({ message: 'Account updated successfully' });

  } catch (err) {
    console.error(err);
    return;
  }

}

async function changePassword(req, res) {
  const connection = await connectToDatabase();
  const { userEmail, currentPassword, newPassword } = req.body;

  try {
    const selectQuery = `
      SELECT password FROM user WHERE email = ?
    `;
    const [result] = await connection.query(selectQuery, [userEmail]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }
    const user = result[0];

    // Verify current password
    const isMatch = (currentPassword === user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update the password in database
    const updateQuery = `
      UPDATE user SET password = ? WHERE email = ?
    `;
    await connection.query(updateQuery, [newPassword, userEmail]);

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAccountInfo, updateAccountInfo, changePassword };