const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

function generateCustomBlotterId() {
  const uuid = uuidv4().replace(/-/g, '').substring(0, 11);
  const dateToday = dayjs().format('MMDDYY');
  const blotterId = `${dateToday}-${uuid}`;

  return blotterId;
}

module.exports = generateCustomBlotterId;