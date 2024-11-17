const { connectToDatabase } = require('../models/db-connection.js');
const Blotter = require('../models/blotter.js');
const { generateCustomBlotterId } = require('../public/utils/utils.js');
// const blotterJson = require('../models/blotter.json');

async function createBlotterEntry(req, res) {
  const connection = await connectToDatabase();

  try {
    const blotterId = generateCustomBlotterId();
    const blotter = new Blotter(req.body, blotterId);
    // const blotter = new Blotter(blotterJson);

    await connection.beginTransaction();

    // complainant Table
    const complainantQuery = `
      INSERT INTO complainant (
        firstname, middlename, lastname, nickname, age, gender, civil_status,
        citizenship, birthplace, birthdate, occupation, province, city, barangay,
        house_no_street, mobile_no, tel_no, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const complainantValues = blotter.getComplainantValues();
    const [complainantResult] = await connection.query(complainantQuery, complainantValues);
    const complainantId = complainantResult.insertId;
    blotter.setComplainantId(complainantId);

    // suspect Table
    const suspectQuery = `
      INSERT INTO suspect (
        firstname, middlename, lastname, nickname, age, gender, civil_status,
        citizenship, birthplace, birthdate, occupation, province, city, barangay,
        house_no_street, mobile_no, tel_no, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const suspectValues = blotter.getSuspectValues();
    const [suspectResult] = await connection.query(suspectQuery, suspectValues);
    const suspectId = suspectResult.insertId;
    blotter.setSuspectId(suspectId);

    // blotter Table
    const blotterQuery = `
      INSERT INTO blotter (
        street, barangay, narrative, blotter_id
      ) VALUES (?, ?, ?, ?)
    `;
    const blotterValues = blotter.getBlotterValues();
    await connection.query(blotterQuery, blotterValues);

    // blotter_complainant Table
    const blotterComplainantQuery = `
      INSERT INTO blotter_complainant (
        blotter_id, complainant_id, date_time_reported, date_time_incident
      ) VALUES (?, ?, ?, ?)
    `;
    const blotterComplainantValues = blotter.getBlotterComplainantValues();
    await connection.query(blotterComplainantQuery, blotterComplainantValues);

    // blotter_suspect Table
    const blotterSuspectQuery = `
      INSERT INTO blotter_suspect (
        blotter_id, suspect_id
      ) VALUES (?, ?)
    `;
    const blotterSuspectValues = blotter.getBlotterSuspectValues();
    await connection.query(blotterSuspectQuery, blotterSuspectValues);

    await connection.commit();

    res.status(200).json({ success: true });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: 'Failed to create blotter!' });
    throw err;

  } finally {
    connection.end();
  }
}

// createBlotterEntry();

module.exports = { createBlotterEntry };