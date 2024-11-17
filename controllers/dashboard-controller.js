const { connectToDatabase } = require('../models/db-connection.js');
const { dateToday } = require('../public/utils/utils.js');

async function todayTotalEntries(req, res) {
  const connection = await connectToDatabase();
  try {
    connection.beginTransaction();

    const todayEntriesQuery = `
      SELECT COUNT(*) AS today_total_entry
      FROM blotter_complainant
      WHERE DATE(date_time_reported) = ?;
    `;
    const [todayTotalEntries] = await connection.query(todayEntriesQuery, dateToday());

    const selectQuery = `
      SELECT COUNT(*) AS total_blotter_record
      FROM blotter;
    `;
    const [totalBlotterRecords] = await connection.query(selectQuery);

    connection.commit();

    res.status(200).json({
      todayTotalEntries: todayTotalEntries[0].today_total_entry,
      totalBlotterRecords: totalBlotterRecords[0].total_blotter_record
    });

  } catch (err) {
    connection.rollback();
    throw err;
  }
}

module.exports = todayTotalEntries;