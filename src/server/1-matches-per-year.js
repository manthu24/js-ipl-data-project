const fs = require('fs');
const csv = require('csv-parser');

const matchesPerYear = {};

fs.createReadStream('./src/data/matches.csv')
  .pipe(csv())
  .on('data', (row) => {
    const year = row.season;
    matchesPerYear[year] = (matchesPerYear[year] || 0) + 1;
  })
  .on('end', () => {
    const outputPath = './src/public/output/matchesPerYear.json';
    fs.writeFileSync(outputPath, JSON.stringify(matchesPerYear, null, 2));
  });
