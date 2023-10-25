const fs = require('fs');
const csv = require('csv-parser');


const matchesData = fs.readFileSync('./src/data/matches.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));


const highestPlayerOfTheMatchAwards = {};

matchesData.forEach((match) => {
  const season = match[1];
  const playerOfTheMatch = match[13];
  if (playerOfTheMatch) {
    if (highestPlayerOfTheMatchAwards[season]) {
      if (highestPlayerOfTheMatchAwards[season][playerOfTheMatch]) {
        highestPlayerOfTheMatchAwards[season][playerOfTheMatch]++;
      } else {
        highestPlayerOfTheMatchAwards[season][playerOfTheMatch] = 1;
      }
    } else {
      highestPlayerOfTheMatchAwards[season] = { [playerOfTheMatch]: 1 };
    }
  }
});

const highestAwardees = {};

for (const season in highestPlayerOfTheMatchAwards) {
  const awardees = highestPlayerOfTheMatchAwards[season];
  const highestAwardee = Object.keys(awardees).reduce((a, b) => (awardees[a] > awardees[b] ? a : b));
  highestAwardees[season] = highestAwardee;
}

const outputPath = './src/public/output/highestPlayerOfTheMatchAwards.json';
fs.writeFileSync(outputPath, JSON.stringify(highestAwardees, null, 2));
