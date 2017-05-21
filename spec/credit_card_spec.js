var CreditCard = require('../src/credit_card.js');

describe('CreditCard', () => {
  it('reports whether the number passes the luhn check', () => {
    const validCard = new CreditCard([4, 9, 9, 2, 7, 3, 9, 8, 7, 1, 6]);
    const invalidCard = new CreditCard([4, 9, 9, 2, 7, 3, 9, 8, 7, 1, 7]);
    expect(invalidCard.isLuhnCompliant()).not.toBeTruthy();
    expect(validCard.isLuhnCompliant()).toBeTruthy();
  });
});
