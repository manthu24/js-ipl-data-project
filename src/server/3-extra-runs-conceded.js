const fs = require('fs');
const csv = require('csv-parser');

// Read matches data
const matchesData = fs.readFileSync('./src/data/matches.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

// Read deliveries data
const deliveriesData = fs.readFileSync('./src/data/deliveries.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

// Create a dictionary to store extra runs conceded per team in 2016
const extraRuns = {};

// Filter matches for the year 2016
const year2016Matches = matchesData
  .filter((match) => match[1] === '2016'); // Assuming that the season is in the second column

// Extract match IDs for 2016
const year2016MatchIds = year2016Matches.map((match) => match[0]); // Assuming that the match ID is in the first column

// Calculate extra runs conceded
deliveriesData.forEach((delivery) => {
  const matchId = delivery[0]; // Assuming that the match ID is in the first column

  if (year2016MatchIds.includes(matchId)) {
    const bowlingTeam = delivery[3]; // Assuming that the bowling team is in the fourth column
    const extraRunsForMatch = parseInt(delivery[16], 10); // Assuming that extra runs is in the seventeenth column

    if (extraRuns[bowlingTeam]) {
      extraRuns[bowlingTeam] += extraRunsForMatch;
    } else {
      extraRuns[bowlingTeam] = extraRunsForMatch;
    }
  }
});

// Write the result to a JSON file
const outputPath = './src/public/output/extraRunsConceded2016.json';
fs.writeFileSync(outputPath, JSON.stringify(extraRuns, null, 2));
