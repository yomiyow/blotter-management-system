const { connectToDatabase } = require('../models/db-connection.js');

async function getReports(req, res) {
  const connection = await connectToDatabase();
  try {
    const selectQuery = `
      SELECT
        barangay,
        COUNT(blotter_id) AS total_blotter
      FROM blotter
      GROUP by barangay;
    `;

    const [result] = await connection.query(selectQuery);
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
  }
}

module.exports = getReports;