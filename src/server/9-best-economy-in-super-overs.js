const fs = require('fs');
const csv = require('csv-parser');

const deliveriesData = fs.readFileSync('./src/data/deliveries.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

const superOverBowlerData = {};

deliveriesData.forEach((delivery) => {
  const isSuperOver = delivery[9] === '1';
  const bowler = delivery[8];
  const runs = parseInt(delivery[17], 10);

  if (isSuperOver) {
    superOverBowlerData[bowler] = superOverBowlerData[bowler] || { runs: 0, balls: 0 };
    superOverBowlerData[bowler].runs += runs;
    superOverBowlerData[bowler].balls += 1;
  }
});

const economyData = {};

for (const bowler in superOverBowlerData) {
  economyData[bowler] = (superOverBowlerData[bowler].runs / superOverBowlerData[bowler].balls) * 6;
}

let bestEconomyBowler = '';
let bestEconomy = Infinity;

for (const bowler in economyData) {
  if (economyData[bowler] < bestEconomy) {
    bestEconomy = economyData[bowler];
    bestEconomyBowler = bowler;
  }
}

const outputPath = './src/public/output/bestEconomyInSuperOvers.json';
fs.writeFileSync(outputPath, JSON.stringify({ bowler: bestEconomyBowler, economy: bestEconomy }, null, 2));
