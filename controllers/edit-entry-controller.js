const { connectToDatabase } = require('../models/db-connection.js');

async function getBlotterById(req, res) {
  try {
    const blotterId = req.params.blotterId;
    const connection = await connectToDatabase();

    const selectQuery = `
      SELECT
        c.firstname AS complainant_firstname,
        c.middlename AS complainant_middlename,
        c.lastname AS complainant_lastname,
        c.nickname AS complainant_nickname,
        c.age AS complainant_age,
        c.gender AS complainant_gender,
        c.civil_status AS complainant_civil_status,
        c.citizenship AS complainant_citizenship,
        c.birthdate AS complainant_birthdate,
        c.birthplace AS complainant_birthplace,
        c.occupation AS complainant_occupation,
        c.province AS complainant_province,
        c.city AS complainant_city,
        c.barangay AS complainant_barangay,
        c.house_no_street AS complainant_house_no_street,
        c.mobile_no AS complainant_mobile_no,
        c.tel_no AS complainant_tel_no,
        c.email AS complainant_email,
        s.firstname AS suspect_firstname,
        s.middlename AS suspect_middlename,
        s.lastname AS suspect_lastname,
        s.nickname AS suspect_nickname,
        s.age AS suspect_age,
        s.gender AS suspect_gender,
        s.civil_status AS suspect_civil_status,
        s.citizenship AS suspect_citizenship,
        s.birthdate AS suspect_birthdate,
        s.birthplace AS suspect_birthplace,
        s.occupation AS suspect_occupation,
        s.province AS suspect_province,
        s.city AS suspect_city,
        s.barangay AS suspect_barangay,
        s.house_no_street AS suspect_house_no_street,
        s.mobile_no AS suspect_mobile_no,
        s.tel_no AS suspect_tel_no,
        s.email AS suspect_email,
        b.blotter_id,
        b.street,
        b.barangay AS barangay,
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

module.exports = { getBlotterById };