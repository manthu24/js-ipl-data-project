const fs = require('fs');
const csv = require('csv-parser');

const deliveriesData = fs.readFileSync('./src/data/deliveries.csv', 'utf8')
  .split('\n')
  .map((line) => line.split(','));

const dismissals = {};

deliveriesData.forEach((delivery) => {
  const batsman = delivery[6];
  const dismissalKind = delivery[18];
  const fielder = delivery[20];

  if (dismissalKind !== '""' && dismissalKind !== 'run out' && fielder && fielder.trim() !== '') {
    if (dismissals[batsman]) {
      if (dismissals[batsman][fielder]) {
        dismissals[batsman][fielder]++;
      } else {
        dismissals[batsman][fielder] = 1;
      }
    } else {
      dismissals[batsman] = { [fielder]: 1 };
    }
  }
});

const highestDismissals = {};

for (const batsman in dismissals) {
  let max = 0;
  let highestFielder = '';

  for (const fielder in dismissals[batsman]) {
    if (dismissals[batsman][fielder] > max) {
      max = dismissals[batsman][fielder];
      highestFielder = fielder;
    }
  }

  highestDismissals[batsman] = { fielder: highestFielder, count: max };
}

const outputPath = './src/public/output/dismissedBy.json';
fs.writeFileSync(outputPath, JSON.stringify(highestDismissals, null, 2));
