const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

function generateCustomBlotterId() {
  const uuid = uuidv4().replace(/-/g, '').substring(0, 11);
  const dateToday = dayjs().format('MMDDYY');
  const blotterId = `${dateToday}-${uuid}`;

  return blotterId;
}

function dateAndTimeToday() {
  return dayjs().format('YYYY-MM-DD | h:mm A');
}

function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
}

module.exports = { generateCustomBlotterId, dateAndTimeToday, isValidPassword };