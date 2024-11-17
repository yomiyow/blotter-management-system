const { connectToDatabase } = require('../models/db-connection.js');

async function getBlotterRecords(req, res) {
  try {
    const connection = await connectToDatabase();

    const selectQuery = `
      SELECT
        b.blotter_id ,
        bc.date_time_reported,
        CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
        CONCAT(s.firstname, ' ',s.middlename, ' ', s.lastname) AS suspect_fullname
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
    `;

    const [blotterRecord] = await connection.query(selectQuery);
    res.status(200).json(blotterRecord);

  } catch (err) {
    res.status(500).json({ error: 'Failed to render blotter records' });
    throw err;
  }

}

module.exports = { getBlotterRecords };
