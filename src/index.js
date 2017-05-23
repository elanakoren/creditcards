"use strict";
const CreditCard = require('../src/credit_card.js');
const commandLineArgs = process.argv.slice(2);
let lineReader = require('readline');

if (commandLineArgs[0]) {
  lineReader = lineReader.createInterface({
    input: require('fs').createReadStream(commandLineArgs[0]),
  })
}
else {
  lineReader = lineReader.createInterface({
    input: process.stdin,
  })
}

let creditAccountsGlobal = {};
lineReader.on('line', lineProcessor(creditAccountsGlobal));

function lineProcessor(creditAccounts) {
  return function(line) {
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
  }
}

lineReader.on('close', function(line) {
  console.log(CreditCard.printBalances(creditAccountsGlobal));
})

module.exports = lineProcessor;
