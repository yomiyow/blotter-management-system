const Blotter = require('../models/blotter.js');
const { connectToDatabase } = require('../models/db-connection.js');
const sendEmail = require('../services/email-service.js');

async function getBlotterById(req, res) {
  const blotterId = req.query.blotterId;
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
        b.date_time_reported,
        b.date_time_incident,
        b.category,
        b.status
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      WHERE b.blotter_id = ?;  
    `;
    const [blotterRecord] = await connection.query(selectQuery, blotterId);
    res.status(200).json(blotterRecord[0]);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blotter' });
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function updateBlotterById(req, res) {
  const connection = await connectToDatabase();

  try {
    const blotterId = req.params.blotterId;
    const blotter = new Blotter(req.body, blotterId);
    const includeBlotterId = true;

    await connection.beginTransaction();

    // send email only if status has changed
    const query = 'SELECT status FROM blotter WHERE blotter_id = ?';
    const [originalBlotter] = await connection.query(query, [blotterId]);
    console.log(originalBlotter[0].status);
    console.log(blotter.status);

    if (originalBlotter[0].status !== blotter.status) {
      sendEmailToComplainant(blotter);
    }

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
      SET 
        street = ?, barangay = ?, date_time_reported = ?,
        date_time_incident = ?, narrative = ?, category = ?,
        status = ?
      WHERE blotter_id = ?;
    `;
    const blotterValues = blotter.getBlotterValues();
    await connection.query(updateBlotterQuery, blotterValues);

    await connection.commit();

    res.status(200).json({
      message: 'Blotter updated successfully.'
    });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: 'Failed to update blotter record' });
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function sendEmailToComplainant(blotter) {
  const complainantEmail = blotter.comEmail;
  const emailSubject = 'Update on your Blotter Status'
  const emailText = `
    <p>Dear <strong>${blotter.comFirstname} ${blotter.comMiddlename} ${blotter.comLastname}</strong>,</p>
    <p>
      We are writing to inform you that the status of your complaint with Blotter ID: <strong>${blotter.blotterId}</strong> has been updated.
    </p>
    <p>
      The current status is: <strong>${blotter.status}</strong>.
    </p>
    <p>
      Please do not hesitate to contact us if you have any questions or require further assistance regarding your complaint.
    </p>
    <p>
      Thank you for your cooperation.
    </p>
    <p>
      Sincerely,<br>
      <strong>Malolos City Police Station</strong><br>
      Address: Malolos Bulacan<br>
      Phone: 0933-610-4327<br>
      Facebook: Malolos Cps Bulacan Ppo<br>
      Email: maloloscitypolice@gmail.com
    </p>
  `;
  try {
    await sendEmail(complainantEmail, emailSubject, emailText);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
}

module.exports = { getBlotterById, updateBlotterById };