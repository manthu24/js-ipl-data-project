const fs = require('fs');
const csv = require('csv-parser');

// Read matches data
const matchesData = fs.readFileSync('./src/data/matches.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

const tossWinMatchWinCount = {};

matchesData.forEach((match) => {
  const tossWinner = match[6];
  const matchWinner = match[10];

  if (tossWinner === matchWinner) {
    if (tossWinMatchWinCount[tossWinner]) {
      tossWinMatchWinCount[tossWinner]++;
    } else {
      tossWinMatchWinCount[tossWinner] = 1;
    }
  }
});

const outputPath = './src/public/output/tossWinMatchWin.json';
fs.writeFileSync(outputPath, JSON.stringify(tossWinMatchWinCount, null, 2));
