const PDFDocument = require('pdfkit');
const { connectToDatabase } = require('../models/db-connection.js');
const { dateAndTimeToday } = require('../public/utils/utils.js');

async function getBlotterById(req, res) {
  const connection = await connectToDatabase();
  const blotterId = req.query.blotterId;
  try {
    const query = `
      SELECT
        b.blotter_id,
        CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
        c.nickname AS complainant_nickname,
        c.age AS complainant_age,
        c.gender AS complainant_gender,
        c.civil_status AS complainant_civil_status,
        c.citizenship AS complainant_citizenship,
        c.birthdate AS complainant_birthdate,
        c.birthplace AS complainant_birthplace,
        c.occupation AS complainant_occupation,
        CONCAT(c.house_no_street, ' ', c.barangay, ' ', c.city, ' ', c.province) AS complainant_address,
        c.mobile_no AS complainant_mobile_no,
        c.tel_no AS complainant_tel_no,
        c.email AS complainant_email,
        CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname) AS suspect_fullname,
        s.nickname AS suspect_nickname,
        s.age AS suspect_age,
        s.gender AS suspect_gender,
        s.civil_status AS suspect_civil_status,
        s.citizenship AS suspect_citizenship,
        s.birthdate AS suspect_birthdate,
        s.birthplace AS suspect_birthplace,
        s.occupation AS suspect_occupation,
        CONCAT(s.house_no_street, ' ', s.barangay, ' ', s.city, ' ', s.province) AS suspect_address,
        s.mobile_no AS suspect_mobile_no,
        s.tel_no AS suspect_tel_no,
        s.email AS suspect_email,
        b.street,
        b.barangay,
        bc.date_time_reported,
        bc.date_time_incident,
        b.narrative
      FROM blotter b
      INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
      INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
      INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
      INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
      WHERE b.blotter_id = ?;
    `;
    const [blotter] = await connection.query(query, blotterId);

    return blotter[0];

  } catch (err) {
    res.status(500).send('An error occurred while generating the PDF.');
    throw err;

  } finally {
    connection.end();
  }
}

async function buildPdf(req, res) {
  const blotter = await getBlotterById(req, res);

  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 20, bottom: 50,
      left: 50, right: 50
    }
  });

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename=blotter.pdf'
  });

  // write to PDF
  doc.pipe(res);

  // Header
  doc
    .fontSize(16)
    .text('Blotter Record', { align: 'center' })
    .moveDown(0.2)
    .fontSize(10)
    .text(`Generated on: ${dateAndTimeToday()}`, { align: 'center' })
    .moveDown();

  // complainant info
  doc
    .fontSize(12)
    .text('Complainant Information')
    .fontSize(10)
    .text(`Name: ${blotter.complainant_fullname}`)
    .text(`Nickname: ${blotter.complainant_nickname}`)
    .text(`Age: ${blotter.complainant_age}`)
    .text(`Gender: ${blotter.complainant_gender}`)
    .text(`Civil Status: ${blotter.complainant_civil_status}`)
    .text(`Citizenship: ${blotter.complainant_citizenship}`)
    .text(`Birthdate: ${blotter.complainant_birthdate}`)
    .text(`Birthplace: ${blotter.complainant_birthplace}`)
    .text(`Occupation: ${blotter.complainant_occupation}`)
    .text(`Address: ${blotter.complainant_address}`)
    .text(`Mobile No: ${blotter.complainant_mobile_no}`)
    .text(`Tel No: ${blotter.complainant_tel_no}`)
    .text(`Email: ${blotter.complainant_email}`)
    .moveDown();

  // Suspect info
  doc
    .fontSize(12)
    .text('Suspect Information')
    .fontSize(10)
    .text(`Name: ${blotter.suspect_fullname}`)
    .text(`Nickname: ${blotter.suspect_nickname}`)
    .text(`Age: ${blotter.suspect_age}`)
    .text(`Gender: ${blotter.suspect_gender}`)
    .text(`Civil Status: ${blotter.suspect_civil_status}`)
    .text(`Citizenship: ${blotter.suspect_citizenship}`)
    .text(`Birthdate: ${blotter.suspect_birthdate}`)
    .text(`Birthplace: ${blotter.suspect_birthplace}`)
    .text(`Occupation: ${blotter.suspect_occupation}`)
    .text(`Address: ${blotter.suspect_address}`)
    .text(`Mobile No: ${blotter.suspect_mobile_no}`)
    .text(`Tel No: ${blotter.suspect_tel_no}`)
    .text(`Email: ${blotter.suspect_email}`)
    .moveDown();

  // Suspect info
  doc
    .fontSize(12)
    .text('Blotter Information')
    .fontSize(10)
    .text(`Street: ${blotter.street}`)
    .text(`Barangay: ${blotter.barangay}`)
    .text(`Date & Time Reported: ${blotter.date_time_reported}`)
    .text(`Date & Time Incident: ${blotter.date_time_incident}`)
    .text(`Narrative: ${blotter.narrative}`)
    .moveDown();

  // Finalize the pdf
  doc.end();
}

module.exports = buildPdf;