const fs = require('fs');
const sql = fs.readFileSync('insert_youtube.sql', 'utf8');
const lines = sql.split('\n');
console.log('--- TR TITLES ---');
let count = 0;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("'tr',") || lines[i].includes("''tr'',") || lines[i].match(/'tr',/)) {
        console.log(lines[i - 11].trim().replace(/^'|',$/g, ''));
        count++;
    }
}
console.log(`Total TR Titles extracted: ${count}`);
