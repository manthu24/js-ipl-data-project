const fs = require('fs');
const csv = require('csv-parser');

const matchesWonPerTeamPerYear = {};

fs.createReadStream('./src/data/matches.csv')
  .pipe(csv())
  .on('data', (row) => {
    const year = row.season;
    const winner = row.winner;
    if (winner) {
      matchesWonPerTeamPerYear[year] = matchesWonPerTeamPerYear[year] || {};
      matchesWonPerTeamPerYear[year][winner] = (matchesWonPerTeamPerYear[year][winner] || 0) + 1;
    }
  })
  .on('end', () => {
    const outputPath = './src/public/output/matchesWonPerTeamPerYear.json';
    fs.writeFileSync(outputPath, JSON.stringify(matchesWonPerTeamPerYear, null, 2));
  });
