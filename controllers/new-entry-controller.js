const { connectToDatabase } = require('../models/db-connection.js');
const Blotter = require('../models/blotter.js');
const blotterJson = require('../models/blotter.json');

async function createBlotterEntry(req, res) {
  const connection = await connectToDatabase();

  try {
    await connection.beginTransaction();

    const blotter = new Blotter(req.body);

    // Complainant Query
    const complainantQuery = `
      INSERT INTO complainant (
        firstname, middlename, lastname, nickname, age, gender, civil_status,
        citizenship, birthplace, birthdate, occupation, province, city, barangay,
        house_no_street, mobile_no, tel_no, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const complainantValues = blotter.getComplainantData();
    const [complainantResult] = await connection.query(complainantQuery, complainantValues);
    const complainantId = complainantResult.insertId;
    blotter.setComplainantId(complainantId);

    // Suspect Query
    const suspectQuery = `
      INSERT INTO suspect (
        firstname, middlename, lastname, nickname, age, gender, civil_status,
        citizenship, birthplace, birthdate, occupation, province, city, barangay,
        house_no_street, mobile_no, tel_no, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const suspectValues = blotter.getSuspectData();
    const [suspectResult] = await connection.query(suspectQuery, suspectValues);
    const suspectId = suspectResult.insertId;
    blotter.setSuspectId(suspectId);

    // Blotter
    const blotterQuery = `
      INSERT INTO blotter (
        blotter_id, street, barangay, narrative
      ) VALUES (?, ?, ?, ?)
    `;
    const blotterValues = blotter.getBlotterData();
    await connection.query(blotterQuery, blotterValues);

    // Blotter complainant
    const blotterComplainantQuery = `
      INSERT INTO blotter_complainant (
        blotter_id, complainant_id, date_time_reported, date_time_incident
      ) VALUES (?, ?, ?, ?)
    `;
    const blotterComplainantValues = blotter.getBlotterComplainantData();
    await connection.query(blotterComplainantQuery, blotterComplainantValues);

    // Blotter suspect
    const blotterSuspectQuery = `
      INSERT INTO blotter_suspect (
        blotter_id, suspect_id
      ) VALUES (?, ?)
    `;
    const blotterSuspectValues = blotter.getBlotterSuspectData();
    await connection.query(blotterSuspectQuery, blotterSuspectValues);

    await connection.commit();

    res.status(200).json({ success: true });

  } catch (err) {
    await connection.rollback();
    console.error('Error inserting data: ', err);
    res.status(500).json({ error: 'Failed to insert data' });

  } finally {
    connection.end();
  }
}

module.exports = { createBlotterEntry };