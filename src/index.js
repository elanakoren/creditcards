"use strict";
const CreditCard = require('../src/credit_card.js');
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('fixture.txt')
});

let creditAccounts = {};
lineReader.on('line', function (line) {
  let parsedLine = line.split(' ');
  let operation = parsedLine[0];
  let cardholder = parsedLine[1];

  if (operation === 'Add') {
    const newCard = new CreditCard(cardholder, parsedLine[2], parsedLine[3]);
    creditAccounts[cardholder] = newCard;
  }
  else if (operation === 'Charge') {
    const card = creditAccounts[cardholder];
    const amount = parsedLine[2];
    card.charge(amount);
  }
  else if (operation === 'Credit') {
    const card = creditAccounts[cardholder];
    const amount = parsedLine[2];
    card.credit(amount);
  }
});

lineReader.on('close', function(line) {
  console.log(creditAccounts)
})
