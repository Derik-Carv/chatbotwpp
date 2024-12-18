const XLSX = require('xlsx');
const path = require(`path`);
const filePath = path.join("./data/Pat.xlsx")

const book = XLSX.readFile(filePath);
const sheetName = book.SheetNames[0];
const sheet = book.Sheets[sheetName];

let data = XLSX.utils.sheet_to_json(sheet);

module.exports = { data };