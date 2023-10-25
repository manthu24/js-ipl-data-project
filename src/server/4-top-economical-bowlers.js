const fs = require('fs');
const csv = require('csv-parser');

const matchesData = fs.readFileSync('./src/data/matches.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

const deliveriesData = fs.readFileSync('./src/data/deliveries.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

const extraRuns = {};

const year2016Matches = matchesData
  .filter((match) => match[1] === '2016');

const year2016MatchIds = year2016Matches.map((match) => match[0]);

deliveriesData.forEach((delivery) => {
  const matchId = delivery[0];

  if (year2016MatchIds.includes(matchId)) {
    const bowlingTeam = delivery[3];
    const extraRunsForMatch = parseInt(delivery[16], 10);

    if (extraRuns[bowlingTeam]) {
      extraRuns[bowlingTeam] += extraRunsForMatch;
    } else {
      extraRuns[bowlingTeam] = extraRunsForMatch;
    }
  }
});

const outputPath = './src/public/output/extraRunsConceded2016.json';
fs.writeFileSync(outputPath, JSON.stringify(extraRuns, null, 2));
