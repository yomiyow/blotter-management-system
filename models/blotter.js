const generateCustomBlotterId = require('./api.js');

class Blotter {
  constructor(data) {
    this.blotterId = generateCustomBlotterId();
    this.complainantId;
    this.suspectId;

    const complainantFields = [
      'comFirstname', 'comMiddlename', 'comLastname', 'comNickname',
      'comAge', 'comGender', 'comCivilStatus', 'comCitizenship',
      'comBirthplace', 'comBirthdate', 'comOccupation', 'comProvince',
      'comCity', 'comBarangay', 'comHouseNoStreet', 'comMobileNo',
      'comTelNo', 'comEmail'
    ];

    const suspectFields = [
      'susFirstname', 'susMiddlename', 'susLastname', 'susNickname',
      'susAge', 'susGender', 'susCivilStatus', 'susCitizenship',
      'susBirthplace', 'susBirthdate', 'susOccupation', 'susProvince',
      'susCity', 'susBarangay', 'susHouseNoStreet', 'susMobileNo',
      'susTelNo', 'susEmail'
    ];

    const caseDetailsFields = [
      'street', 'barangay', 'dateTimeReported', 'dateTimeIncident',
      'narrative'
    ];

    complainantFields.forEach((field) => this[field] = data[field]);
    suspectFields.forEach((field) => this[field] = data[field]);
    caseDetailsFields.forEach((field) => this[field] = data[field]);
  }

  getComplainantData() {
    return [
      this.comFirstname,
      this.comMiddlename,
      this.comLastname,
      this.comNickname,
      this.comAge,
      this.comGender,
      this.comCivilStatus,
      this.comCitizenship,
      this.comBirthplace,
      this.comBirthdate,
      this.comOccupation,
      this.comProvince,
      this.comCity,
      this.comBarangay,
      this.comHouseNoStreet,
      this.comMobileNo,
      this.comTelNo,
      this.comEmail
    ];
  }

  getSuspectData() {
    return [
      this.susFirstname,
      this.susMiddlename,
      this.susLastname,
      this.susNickname,
      this.susAge,
      this.susGender,
      this.susCivilStatus,
      this.susCitizenship,
      this.susBirthplace,
      this.susBirthdate,
      this.susOccupation,
      this.susProvince,
      this.susCity,
      this.susBarangay,
      this.susHouseNoStreet,
      this.susMobileNo,
      this.susTelNo,
      this.susEmail
    ];
  }

  getBlotterData() {
    return [
      this.blotterId,
      this.street,
      this.barangay,
      this.narrative
    ];
  }

  getBlotterComplainantData() {
    return [
      this.blotterId,
      this.complainantId,
      this.dateTimeReported,
      this.dateTimeIncident
    ];
  }

  getBlotterSuspectData() {
    return [
      this.blotterId,
      this.suspectId
    ]
  }

  setComplainantId(complainantId) {
    this.complainantId = complainantId;
  }

  setSuspectId(suspectId) {
    this.suspectId = suspectId;
  }
}

module.exports = Blotter;