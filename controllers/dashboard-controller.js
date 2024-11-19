const { connectToDatabase } = require('../models/db-connection.js');

async function getTodayTotalEntries(req, res) {
  const connection = await connectToDatabase();
  try {
    connection.beginTransaction();

    const todayEntriesQuery = `
      SELECT COUNT(blotter_id) AS today_total_entry
      FROM blotter
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
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function getMonthlyBlotterEntries(req, res) {
  const connection = await connectToDatabase();
  try {
    const selectQuery = `
      SELECT
        YEAR(date_time_reported) AS year,
        MONTH(date_time_reported) AS month,
        COUNT(blotter_id) AS month_total_entries
      FROM blotter 
      GROUP BY YEAR(date_time_reported), MONTH(date_time_reported);
    `;
    const [result] = await connection.query(selectQuery);
    res.status(200).json(result);

  } catch (err) {
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

module.exports = { getTodayTotalEntries, getMonthlyBlotterEntries };