const CreditCard = require('../src/credit_card.js');

describe('CreditCard', () => {
  const validCardNumber = '49927398716';
  const invalidCardNumber = '49927398717';

  it('reports whether the number passes the luhn check', () => {
    const validCard = new CreditCard('jim', validCardNumber, '$1000');
    const invalidCard = new CreditCard('jim', invalidCardNumber, '$1000');
    expect(invalidCard.isLuhnCompliant()).not.toBeTruthy();
    expect(validCard.isLuhnCompliant()).toBeTruthy();
  });

  it('stores a cardholder', () => {
    const card = new CreditCard('jim', validCardNumber, '$1000');
    expect(card.cardholder).toEqual('jim');
  });

  it('stores a card limit', () => {
    const card = new CreditCard('jim', validCardNumber, '$1000');
    expect(card.limit).toEqual(1000);
  });

  it('stores a balance', () => {
    const card = new CreditCard('jim', validCardNumber, '$1000');
    expect(card.balance).toEqual(0);
  });

  describe('#charge', () => {
    it('does not accept charges over the card limit', () => {
      const card = new CreditCard('jim', validCardNumber, '$1000');
      card.charge('$2000');
      expect(card.balance).toEqual(0);
      card.charge('$1000');
      card.charge('$1001');
      expect(card.balance).toEqual(1000);
    });

    it('does not charge cards with an invalid number', () => {
      const card = new CreditCard('jim', invalidCardNumber, '$1000');
      card.charge('$2000');
      expect(card.balance).toEqual(0);
    });

    it('accepts valid charges', () => {
      const card = new CreditCard('jim', validCardNumber, '$1000');
      card.charge('$200.00');
      expect(card.balance).toEqual(200);
    });
  });

  describe('#credit', () => {
    it('does not credit cards with an invalid number', () => {
      const card = new CreditCard('anne', invalidCardNumber, '$1000');
      card.credit('$2000');
      expect(card.balance).toEqual(0);
    });

    it('accepts valid credits', () => {
      const card = new CreditCard('anne', validCardNumber, '$1000');
      card.credit('$200.00');
      expect(card.balance).toEqual(-200);
    });
  });
});
