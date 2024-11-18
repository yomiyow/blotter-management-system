const { connectToDatabase } = require('../models/db-connection.js');

async function getBlotterRecords(req, res) {
  const connection = await connectToDatabase();
  try {
    const selectQuery = `
      SELECT
        b.blotter_id ,
        DATE_FORMAT(bc.date_time_reported, '%b %e, %Y %l:%i %p') AS date_time_reported,
        CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
        CONCAT(s.firstname, ' ',s.middlename, ' ', s.lastname) AS suspect_fullname
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      ORDER BY b.blotter_id DESC;
    `;

    const [blotterResult] = await connection.query(selectQuery);
    res.status(200).json(blotterResult);

  } catch (err) {
    res.status(500).json({ error: 'Failed to render blotter records' });
    throw err;

  } finally {
    connection.end();
  }
}

async function searchBlotterRecord(req, res) {
  const connection = await connectToDatabase();
  const searchTerm = req.query.term;
  try {
    const searchQuery = `
      SELECT
      b.blotter_id ,
      DATE_FORMAT(bc.date_time_reported, '%b %e, %Y %l:%i %p') AS date_time_reported,
      CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
      CONCAT(s.firstname, ' ',s.middlename, ' ', s.lastname) AS suspect_fullname
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      WHERE
      b.blotter_id LIKE ? OR
      DATE_FORMAT(bc.date_time_reported, '%b %e, %Y %l:%i %p') LIKE ? OR
      CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) LIKE ? OR
      CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname) LIKE ?;
    `;
    const [searchResult] = await connection.query(searchQuery, Array(4).fill(`%${searchTerm}%`));
    res.status(200).json(searchResult);

  } catch (err) {
    throw err;

  } finally {
    connection.end();
  }
}

module.exports = { getBlotterRecords, searchBlotterRecord };
