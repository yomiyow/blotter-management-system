const { connectToDatabase } = require('../models/db-connection.js');

async function getReports(req, res) {
  const connection = await connectToDatabase();
  try {
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
        DATE_FORMAT(b.date_time_reported, '%b %e, %Y at %l:%i %p') AS date_time_reported,
        b.date_time_incident,
        b.category,
        b.status
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id;
    `;

    const [result] = await connection.query(selectQuery);
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
  }
}

async function searchBlotterRecord(req, res) {
  const connection = await connectToDatabase();
  const searchTerm = req.query.term;
  try {
    const searchQuery = `
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
        DATE_FORMAT(b.date_time_reported, '%b %e, %Y at %l:%i %p') AS date_time_reported,
        b.date_time_incident,
        b.category,
        b.status
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      WHERE 
        b.blotter_id LIKE ? OR
        b.date_time_reported LIKE ? OR
        b.category LIKE ? OR
        b.status LIKE ?;
    `;
    const [searchResult] = await connection.query(searchQuery, Array(4).fill(`%${searchTerm}%`));
    res.status(200).json(searchResult);

  } catch (err) {
    console.error(err.stack);
    return;
  } finally {
    connection.end();
  }
}

async function getSortedBlotterRecords(req, res) {
  const connection = await connectToDatabase();
  const { column, order } = req.query;
  try {
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
        DATE_FORMAT(b.date_time_reported, '%b %e, %Y at %l:%i %p') AS date_time_reported,
        b.date_time_incident,
        b.category,
        b.status
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      ORDER BY ${column} ${order};
    `;

    const [rows] = await connection.query(selectQuery);
    res.status(200).json(rows);

  } catch (err) {
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function getFilteredBlotterRecords(req, res) {
  const connection = await connectToDatabase();
  const { barangay, category, status } = req.query;

  try {
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
        DATE_FORMAT(b.date_time_reported, '%b %e, %Y at %l:%i %p') AS date_time_reported,
        b.date_time_incident,
        b.category,
        b.status
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      WHERE
        (COALESCE(?, '') = '' OR b.barangay = ?) AND
        (COALESCE(?, '') = '' OR b.category = ?) AND
        (COALESCE(?, '') = '' OR b.status = ?);
    `;

    const values = [barangay, barangay, category, category, status, status];
    const [rows] = await connection.query(selectQuery, values);
    res.status(200).json(rows);

  } catch (err) {
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function getBarangays(req, res) {
  const connection = await connectToDatabase();
  try {
    const selectQuery = `SELECT DISTINCT (barangay) FROM blotter ORDER BY barangay ASC`;
    const [rows] = await connection.query(selectQuery);
    res.status(200).json(rows);

  } catch (err) {
    console.error(err);
    return;
  }
}

module.exports = {
  getReports,
  searchBlotterRecord,
  getSortedBlotterRecords,
  getFilteredBlotterRecords,
  getBarangays
};