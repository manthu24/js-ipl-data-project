const fs = require('fs');
const csv = require('csv-parser');

const deliveriesData = fs.readFileSync('./src/data/deliveries.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

const batsmanData = {};

deliveriesData.forEach((delivery) => {
  const season = delivery[1];
  const batsman = delivery[6];
  const runs = parseInt(delivery[15], 10);
  const isNoBall = delivery[13] === '0';

  if (isNoBall) {
    if (batsmanData[season]) {
      batsmanData[season][batsman] = batsmanData[season][batsman] || { runs: 0, balls: 0 };
      batsmanData[season][batsman].runs += runs;
      batsmanData[season][batsman].balls += 1;
    } else {
      batsmanData[season] = { [batsman]: { runs, balls: 1 } };
    }
  }
});

const batsmanStrikeRate = {};

for (const season in batsmanData) {
  batsmanStrikeRate[season] = {};
  for (const batsman in batsmanData[season]) {
    const runs = batsmanData[season][batsman].runs;
    const balls = batsmanData[season][batsman].balls;
    batsmanStrikeRate[season][batsman] = ((runs / balls) * 100).toFixed(2);
  }
}

const outputPath = './src/public/output/batsmanStrikeRatePerSeason.json';
fs.writeFileSync(outputPath, JSON.stringify(batsmanStrikeRate, null, 2));
