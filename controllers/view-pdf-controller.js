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
        DATE_FORMAT(b.date_time_reported, '%b %e, %Y %l:%i %p') AS date_time_reported,
        DATE_FORMAT(b.date_time_incident, '%b %e, %Y %l:%i %p') AS date_time_incident,
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
    console.error(err.stack);
    return;

  } finally {
    connection.end();
  }
}

async function buildPdf(req, res) {
  const blotter = await getBlotterById(req, res);

  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 40, bottom: 40,
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
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('Blotter Record', { align: 'center' })
    .moveDown(0.5)
    .fontSize(12)
    .font('Helvetica')
    .text(`Generated on: ${dateAndTimeToday()}`, { align: 'center' })
    .moveDown(1);

  // Complainant info
  doc
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('Complainant Information', { underline: true })
    .moveDown(0.5)
    .fontSize(12)
    .font('Helvetica')
    .text(`Name: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_fullname}`).moveDown(0.2)
    .font('Helvetica').text(`Nickname: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_nickname}`).moveDown(0.2)
    .font('Helvetica').text(`Age: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_age}`).moveDown(0.2)
    .font('Helvetica').text(`Gender: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_gender}`).moveDown(0.2)
    .font('Helvetica').text(`Civil Status: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_civil_status}`).moveDown(0.2)
    .font('Helvetica').text(`Citizenship: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_citizenship}`).moveDown(0.2)
    .font('Helvetica').text(`Birthdate: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_birthdate}`).moveDown(0.2)
    .font('Helvetica').text(`Birthplace: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_birthplace}`).moveDown(0.2)
    .font('Helvetica').text(`Occupation: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_occupation}`).moveDown(0.2)
    .font('Helvetica').text(`Address: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_address}`).moveDown(0.2)
    .font('Helvetica').text(`Mobile No: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_mobile_no}`).moveDown(0.2)
    .font('Helvetica').text(`Tel No: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_tel_no}`).moveDown(0.2)
    .font('Helvetica').text(`Email: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.complainant_email}`)
    .moveDown(1);

  // Suspect info
  doc
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('Suspect Information', { underline: true })
    .moveDown(0.5)
    .fontSize(12)
    .font('Helvetica')
    .text(`Name: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_fullname}`).moveDown(0.2)
    .font('Helvetica').text(`Nickname: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_nickname}`).moveDown(0.2)
    .font('Helvetica').text(`Age: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_age}`).moveDown(0.2)
    .font('Helvetica').text(`Gender: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_gender}`).moveDown(0.2)
    .font('Helvetica').text(`Civil Status: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_civil_status}`).moveDown(0.2)
    .font('Helvetica').text(`Citizenship: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_citizenship}`).moveDown(0.2)
    .font('Helvetica').text(`Birthdate: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_birthdate}`).moveDown(0.2)
    .font('Helvetica').text(`Birthplace: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_birthplace}`).moveDown(0.2)
    .font('Helvetica').text(`Occupation: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_occupation}`).moveDown(0.2)
    .font('Helvetica').text(`Address: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_address}`).moveDown(0.2)
    .font('Helvetica').text(`Mobile No: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_mobile_no}`).moveDown(0.2)
    .font('Helvetica').text(`Tel No: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_tel_no}`).moveDown(0.2)
    .font('Helvetica').text(`Email: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.suspect_email}`)
    .moveDown(1);

  // Blotter info
  doc
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('Blotter Information', { underline: true })
    .moveDown(0.5)
    .fontSize(12)
    .font('Helvetica')
    .text(`Street: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.street}`).moveDown(0.2)
    .font('Helvetica').text(`Barangay: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.barangay}`).moveDown(0.2)
    .font('Helvetica').text(`Date & Time Reported: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.date_time_reported}`).moveDown(0.2)
    .font('Helvetica').text(`Date & Time Incident: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.date_time_incident}`).moveDown(0.2)
    .font('Helvetica').text(`Narrative: `, { continued: true }).font('Helvetica-Bold').text(`${blotter.narrative}`)
    .moveDown(1);

  // Finalize the pdf
  doc.end();
}

module.exports = buildPdf;