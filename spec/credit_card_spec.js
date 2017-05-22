const CreditCard = require('../src/credit_card.js');
describe('CreditCard', () => {
  "use strict";
  const validCardNumber = '49927398716';
  const invalidCardNumber = '49927398717';
  let validCard, invalidCard;

  beforeEach(() => {
    validCard = new CreditCard('jim', validCardNumber, '$1000');
    invalidCard = new CreditCard('jim', invalidCardNumber, '$1000');
  });

  it('reports whether the number passes the luhn check', () => {
    expect(invalidCard.isLuhnCompliant()).not.toBeTruthy();
    expect(validCard.isLuhnCompliant()).toBeTruthy();
  });

  it('stores a cardholder', () => {
    expect(validCard.cardholder).toEqual('jim');
  });

  it('stores a card limit', () => {
    expect(validCard.limit).toEqual(1000);
  });

  it('stores a balance', () => {
    expect(validCard.balance).toEqual(0);
  });

  describe('#charge', () => {
    it('does not accept charges over the card limit', () => {
      validCard.charge('$2000');
      expect(validCard.balance).toEqual(0);
      validCard.charge('$1000');
      validCard.charge('$1001');
      expect(validCard.balance).toEqual(1000);
    });

    it('does not charge cards with an invalid number', () => {
      invalidCard.charge('$2000');
      expect(invalidCard.balance).toEqual(0);
    });

    it('accepts valid charges', () => {
      validCard.charge('$200.00');
      expect(validCard.balance).toEqual(200);
    });
  });

  describe('#credit', () => {
    it('does not credit cards with an invalid number', () => {
      invalidCard.credit('$2000');
      expect(invalidCard.balance).toEqual(0);
    });

    it('accepts valid credits', () => {
      validCard.credit('$200.00');
      expect(validCard.balance).toEqual(-200);
    });
  });
});
