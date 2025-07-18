class Blotter {
  constructor(data, blotterId) {
    this.blotterId = blotterId;
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
      'narrative', 'category', 'status'
    ];

    complainantFields.forEach((field) => this[field] = data[field]);
    suspectFields.forEach((field) => this[field] = data[field]);
    caseDetailsFields.forEach((field) => this[field] = data[field]);
  }

  #getValues(fields) {
    return fields.map((field) => this[field])
  }

  getComplainantValues(includeBotterId = false) {
    const complainantFields = [
      'comFirstname', 'comMiddlename', 'comLastname', 'comNickname',
      'comAge', 'comGender', 'comCivilStatus', 'comCitizenship',
      'comBirthplace', 'comBirthdate', 'comOccupation', 'comProvince',
      'comCity', 'comBarangay', 'comHouseNoStreet', 'comMobileNo',
      'comTelNo', 'comEmail'
    ];

    return (includeBotterId)
      ? [...this.#getValues(complainantFields), this.blotterId]
      : this.#getValues(complainantFields);
  }

  getSuspectValues(includeBlotterId = false) {
    const suspectFields = [
      'susFirstname', 'susMiddlename', 'susLastname', 'susNickname',
      'susAge', 'susGender', 'susCivilStatus', 'susCitizenship',
      'susBirthplace', 'susBirthdate', 'susOccupation', 'susProvince',
      'susCity', 'susBarangay', 'susHouseNoStreet', 'susMobileNo',
      'susTelNo', 'susEmail'
    ];

    return (includeBlotterId)
      ? [...this.#getValues(suspectFields), this.blotterId]
      : this.#getValues(suspectFields);
  }

  getBlotterValues() {
    const blotterFields = [
      'street', 'barangay', 'dateTimeReported',
      'dateTimeIncident', 'narrative',
      'category', 'status', 'blotterId'
    ];

    return this.#getValues(blotterFields);
  }

  getBlotterComplainantValues() {
    return [
      this.blotterId,
      this.complainantId
    ]
  }

  getBlotterSuspectValues() {
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