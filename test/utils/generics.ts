const fs = require('fs').promises;
import csv = require('csvtojson');

async function readJsonFile(filePath) {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function readCsvFile(filePath: string) {
    return csv().fromFile(filePath);
}

export default { readJsonFile, readCsvFile };