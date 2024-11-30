const { connectToDatabase } = require('../models/db-connection.js');

async function getChartDataset(req, res) {
  const connection = await connectToDatabase();
  try {
    connection.beginTransaction();

    const monthlyCasesQuery = `
      SELECT
        YEAR(date_time_reported) AS year,
        MONTH(date_time_reported) AS month,
        COUNT(blotter_id) AS monthly_cases
      FROM blotter
      GROUP BY YEAR(date_time_reported), MONTH(date_time_reported)
      ORDER BY MONTH(date_time_reported);
    `;
    const [monthlyCases] = await connection.query(monthlyCasesQuery);

    const underInvestigationQuery = `
      SELECT
        YEAR(date_time_reported) AS year,
        MONTH(date_time_reported) AS month,
        COUNT(blotter_id) AS under_investigation
      FROM blotter
      WHERE status = 'Under Investigation'
      GROUP BY YEAR(date_time_reported), MONTH(date_time_reported)
       ORDER BY MONTH(date_time_reported);
    `;
    const [underInvestigation] = await connection.query(underInvestigationQuery);

    const resolvedCasesQuery = `
      SELECT
        YEAR(date_time_reported) AS year,
        MONTH(date_time_reported) AS month,
        COUNT(blotter_id) AS resolved
      FROM blotter
      WHERE status = 'Resolved'
      GROUP BY YEAR(date_time_reported), MONTH(date_time_reported)
      ORDER BY MONTH(date_time_reported);
    `;
    const [resolved] = await connection.query(resolvedCasesQuery);

    connection.commit();

    res.status(200).json({
      monthlyCases,
      underInvestigation,
      resolved
    });

  } catch (err) {
    connection.rollback();
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function getCardValues(req, res) {
  const connection = await connectToDatabase();
  try {
    connection.beginTransaction();

    const newCasesQuery = `
      SELECT
        COUNT(blotter_id) AS new_cases
      FROM blotter
      WHERE
        MONTH(date_time_reported) = MONTH(CURDATE());
    `;
    const [newCases] = await connection.query(newCasesQuery);

    const underInvestigationQuery = `
      SELECT
        COUNT(blotter_id) AS under_investigation
      FROM blotter
      WHERE status = 'Under Investigation';
    `;
    const [underInvestigation] = await connection.query(underInvestigationQuery);

    const resolvedCasesQuery = `
      SELECT
        COUNT(blotter_id) AS resolved
      FROM blotter
      WHERE status = 'Resolved';
    `;
    const [resolved] = await connection.query(resolvedCasesQuery);

    const totalRecordsQuery = `
      SELECT
        COUNT(blotter_id) AS total_records
      FROM blotter;
    `;
    const [totalRecords] = await connection.query(totalRecordsQuery);

    connection.commit();

    res.status(200).json([
      newCases[0],
      underInvestigation[0],
      resolved[0],
      totalRecords[0]
    ]);

  } catch (err) {
    connection.rollback();
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

module.exports = { getChartDataset, getCardValues };