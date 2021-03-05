const maxItemAssociation = require('./index');

const cases = [
  [[], []],
  [[[], []], []],
  [
    [
      ['a', 'b'],
      ['a', 'c'],
      ['d', 'e'],
    ],
    ['a', 'b', 'c'],
  ],
  [
    [
      ['a', 'c'],
      ['b', 'd'],
      ['b', 'i'],
      ['d', 'a'],
    ],
    ['a', 'b', 'c', 'd', 'i'],
  ],
  [[['a', 'c']], ['a', 'c']],
  [
    [
      ['a', 'c'],
      ['d', 'e'],
    ],
    ['a', 'c'],
  ],
  [
    [
      ['b', 'c'],
      ['a', 'd'],
      ['e', 'j'],
      ['a', 'm'],
      ['j', 'r'],
      ['r', 'z'],
    ],
    ['e', 'j', 'r', 'z'],
  ],
  ['a', 'The argument must be an array.'],
  [{ a: 'b', b: 'c' }, 'The argument must be an array.'],
  [190, 'The argument must be an array.'],

];

describe('return max items associates', () => {
  test.each(cases)('given %p as argument and returns %p', (inputMessage, expectedResult) => {
    const result = maxItemAssociation(inputMessage);
    expect(result).toEqual(expectedResult);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});

test('result no to be null or undefined', () => {
  const result = maxItemAssociation([
    ['a', 'b'],
    ['a', 'c'],
    ['d', 'e'],
  ]);
  expect(result).not.toBeNull();
  expect(result).not.toBeUndefined();
});

