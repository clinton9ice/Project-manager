const date = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let Day = date.getDate();
const Month = date.getMonth();
const Year = date.getFullYear();
const dateCombined = `${months[Month]} ${Day}, ${Year}`;

module.exports = { Day, Year, Month, dateCombined, date };
