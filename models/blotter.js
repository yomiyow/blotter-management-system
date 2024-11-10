const generateCustomBlotterId = require('./api.js');

class Blotter {
  constructor(data) {
    this.blotterId = generateCustomBlotterId();
    this.complainantId;
    this.comFirstname = data.comFirstname;
    this.comMiddlename = data.comMiddlename;
    this.comLastname = data.comLastname;
    this.comNickname = data.comNickname;
    this.comAge = data.comAge;
    this.comGender = data.comGender;
    this.comCivilStatus = data.comCivilStatus;
    this.comCitizenship = data.comCitizenship;
    this.comBirthplace = data.comBirthplace
    this.comBirthdate = data.comBirthdate;
    this.comOccupation = data.comOccupation;
    this.comProvince = data.comProvince;
    this.comCity = data.comCity;
    this.comBarangay = data.comBarangay;
    this.comHouseNoStreet = data.comHouseNoStreet;
    this.comMobileNo = data.comMobileNo;
    this.comTelNo = data.comTelNo;
    this.comEmail = data.comEmail;

    this.suspectId;
    this.susFirstname = data.susFirstname;
    this.susMiddlename = data.susMiddlename;
    this.susLastname = data.susLastname;
    this.susNickname = data.susNickname;
    this.susAge = data.susAge;
    this.susGender = data.susGender;
    this.susCivilStatus = data.susCivilStatus;
    this.susCitizenship = data.susCitizenship;
    this.susBirthplace = data.susBirthplace;
    this.susBirthdate = data.susBirthdate;
    this.susOccupation = data.susOccupation;
    this.susProvince = data.susProvince;
    this.susCity = data.susCity;
    this.susBarangay = data.susBarangay;
    this.susHouseNoStreet = data.susHouseNoStreet;
    this.susMobileNo = data.susMobileNo;
    this.susTelNo = data.susTelNo;
    this.susEmail = data.susEmail;

    this.street = data.street;
    this.barangay = data.barangay;
    this.dateTimeReported = data.dateTimeReported;
    this.dateTimeIncident = data.dateTimeIncident;
    this.narrative = data.narrative;
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