const Blotter = require('../models/blotter.js');
const { connectToDatabase } = require('../models/db-connection.js');

async function getBlotterById(req, res) {
  try {
    const blotterId = req.query.blotterId;
    const connection = await connectToDatabase();

    const selectQuery = `
      SELECT
        c.firstname AS comFirstname,
        c.middlename AS comMiddlename,
        c.lastname AS comLastname,
        c.nickname AS comNickname,
        c.age AS comAge,
        c.gender AS comGender,
        c.civil_status AS comCivilStatus,
        c.citizenship AS comCitizenship,
        c.birthdate AS comBirthdate,
        c.birthplace AS comBirthplace,
        c.occupation AS comOccupation,
        c.province AS comProvince,
        c.city AS comCity,
        c.barangay AS comBarangay,
        c.house_no_street AS comHouseNoStreet,
        c.mobile_no AS comMobileNo,
        c.tel_no AS comTelNo,
        c.email AS comEmail,
        s.firstname AS susFirstname,
        s.middlename AS susMiddlename,
        s.lastname AS susLastname,
        s.nickname AS susNickname,
        s.age AS susAge,
        s.gender AS susGender,
        s.civil_status AS susCivilStatus,
        s.citizenship AS susCitizenship,
        s.birthdate AS susBirthdate,
        s.birthplace AS susBirthplace,
        s.occupation AS susOccupation,
        s.province AS susProvince,
        s.city AS susCity,
        s.barangay AS susBarangay,
        s.house_no_street AS susHouseNoStreet,
        s.mobile_no AS susMobileNo,
        s.tel_no AS susTelNo,
        s.email AS susEmail,
        b.blotter_id,
        b.street,
        b.barangay,
        b.narrative,
        bc.date_time_reported,
        bc.date_time_incident
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      WHERE b.blotter_id = ?;  
    `;
    const [blotterRecord] = await connection.query(selectQuery, blotterId);
    res.json(blotterRecord);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

async function updateBlotterById(req, res) {
  const connection = await connectToDatabase();

  try {
    const blotterId = req.params.blotterId;
    const blotter = new Blotter(req.body, blotterId);
    const includeBlotterId = true;

    await connection.beginTransaction();

    // complainant Table
    const updateComplainantQuery = `
      UPDATE complainant
      SET
        firstname = ?, middlename = ?, lastname = ?, nickname = ?, age = ?,
        gender = ?, civil_status = ?, citizenship = ?, birthplace = ?, birthdate = ?,
        occupation = ?, province = ?, city = ?, barangay = ?, house_no_street = ?,
        mobile_no = ?, tel_no = ?, email = ?
      WHERE complainant_id = (
        SELECT complainant_id
          FROM blotter_complainant
          WHERE blotter_id = ?
      );
    `;
    const complainantValues = blotter.getComplainantValues(includeBlotterId);
    await connection.query(updateComplainantQuery, complainantValues);

    // suspect Table
    const updateSuspectQuery = `
      UPDATE suspect
      SET
        firstname = ?, middlename = ?, lastname = ?, nickname = ?, age = ?,
        gender = ?, civil_status = ?, citizenship = ?, birthplace = ?, birthdate = ?,
        occupation = ?, province = ?, city = ?, barangay = ?, house_no_street = ?,
        mobile_no = ?, tel_no = ?, email = ?
      WHERE suspect_id = (
        SELECT suspect_id
          FROM blotter_suspect
          WHERE blotter_id = ?
      );
    `;
    const suspectValues = blotter.getSuspectValues(includeBlotterId);
    await connection.query(updateSuspectQuery, suspectValues);

    // blotter Table
    const updateBlotterQuery = `
      UPDATE blotter
      SET street = ?, barangay = ?, narrative = ?
      WHERE blotter_id = ?;
    `;
    const blotterValues = blotter.getBlotterValues();
    await connection.query(updateBlotterQuery, blotterValues);

    // blotter_complainant Table
    const updateBlotterComplainantQuery = `
      UPDATE blotter_complainant 
      SET date_time_reported = ?, date_time_incident = ?
      WHERE blotter_id = ?;
    `;
    const includeIds = false;
    const blotterComplainant = blotter.getBlotterComplainantValues(includeIds);
    await connection.query(updateBlotterComplainantQuery, blotterComplainant);

    await connection.commit();

    res.status(200).json({
      message: 'Blotter updated successfully!'
    });

  } catch (err) {
    await connection.rollback();
    console.error('Error updating blotter: ', err);
    res.status(500).json({ message: 'Failed to update blotter record' });
    return;
  }
}

module.exports = { getBlotterById, updateBlotterById };