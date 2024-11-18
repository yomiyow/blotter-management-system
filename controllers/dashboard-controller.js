const { connectToDatabase } = require('../models/db-connection.js');

async function getTodayTotalEntries(req, res) {
  const connection = await connectToDatabase();
  try {
    connection.beginTransaction();

    const todayEntriesQuery = `
      SELECT COUNT(blotter_id) AS today_total_entry
      FROM blotter_complainant
      WHERE DATE(date_time_reported) = CURRENT_DATE();
    `;
    const [todayTotalEntries] = await connection.query(todayEntriesQuery);

    const totalEntriesQuery = `
      SELECT COUNT(blotter_id) AS total_blotter_record
      FROM blotter;
    `;
    const [totalBlotterRecords] = await connection.query(totalEntriesQuery);

    connection.commit();

    res.status(200).json({
      todayTotalEntries: todayTotalEntries[0].today_total_entry,
      totalBlotterRecords: totalBlotterRecords[0].total_blotter_record
    });

  } catch (err) {
    connection.rollback();
    throw err;

  } finally {
    connection.end();
  }
}

async function getMonthlyBlotterEntries(req, res) {
  const connection = await connectToDatabase();
  try {
    const selectQuery = `
      SELECT
        YEAR(bc.date_time_reported) AS year,
        MONTH(bc.date_time_reported) AS month,
        COUNT(b.blotter_id) AS month_total_entries
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      GROUP BY YEAR(bc.date_time_reported), MONTH(bc.date_time_reported);
    `;
    const [result] = await connection.query(selectQuery);
    res.status(200).json(result);
  } catch (err) {
    throw err;
  } finally {
    connection.end();
  }
}

module.exports = { getTodayTotalEntries, getMonthlyBlotterEntries };