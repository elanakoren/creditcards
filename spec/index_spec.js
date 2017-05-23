const lineProcessor = require('../src/index.js');
const CreditCard = require('../src/credit_card.js');

describe('#processOperations', () => {
  "use strict";
  let fakeCreditAccounts;
  const tomsCard = new CreditCard('Tom', '49927398716', '$5000');
  describe('crediting', () => {
    beforeEach(() => {
      spyOn(tomsCard, 'credit');
      fakeCreditAccounts = {
        Tom: tomsCard
      }
    });
    
    it('delegates to the appopriate method in CreditCard', () => {
      const fn = lineProcessor(fakeCreditAccounts)
      fn('Credit Tom $500');
      expect(tomsCard.credit).toHaveBeenCalledWith('$500');
    });
  });

  describe('charging', () => {
    beforeEach(() => {
      spyOn(tomsCard, 'charge');
      fakeCreditAccounts = {
        Tom: tomsCard
      }
    });

    it('delegates to the appopriate method in CreditCard', () => {
      const fn = lineProcessor(fakeCreditAccounts)
      fn('Charge Tom $500');
      expect(tomsCard.charge).toHaveBeenCalledWith('$500');
    });
  });

  describe('adding', () => {
    it('adds a credit card', () => {
      const fn = lineProcessor(fakeCreditAccounts)
      fn('Add Jill 4111111111111111 $1000');
      expect(fakeCreditAccounts['Jill'].cardholder).toEqual('Jill');
    });
  })
});
