/* eslint-disable no-undef */
const calculateMatchesPerYear = require('../src/server/1-matches-per-year');

const matchesData = [
  { season: '2015' },
  { season: '2015' },
  { season: '2016' },
  { season: '2016' },
  { season: '2017' },
];

test('Calculating the number of matches played per year', () => {
  const result = calculateMatchesPerYear(matchesData);

  it('should correctly calculate matches for the year 2015', () => {
    expect(result['2015']).toBe(2);
  });

  it('should correctly calculate matches for the year 2016', () => {
    expect(result['2016']).toBe(2);
  });

  it('should correctly calculate matches for the year 2017', () => {
    expect(result['2017']).toBe(1);
  });
});
