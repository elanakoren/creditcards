"use strict"

class CreditCard {
  constructor(cardholder, number, limit) {
    this.number = this.formatNumber(number);
    this.cardholder = cardholder;
    this.limit = parseInt(limit.slice(1), 10);
    this.balance = 0;
    this.isLuhnCompliant = this.isLuhnCompliant(this.number);
  }

  formatNumber(number) {
    let formattedNumber = [];
    for (var i = 0; i < number.length; i++) {
      formattedNumber[i] = parseInt(number[i], 10);
    }
    return formattedNumber;
  }

  isLuhnCompliant(number) {
    let runningTotal = 0;
    let currentDigit = 0;
    const evenFlag = this.number.length % 2
    for (var i = this.number.length-1; i >= 0; i--) {
        if (i % 2 === evenFlag) {
          currentDigit = this.number[i] * 2;
          if (currentDigit > 9) {
            currentDigit = currentDigit - 9;
          }
        }
        else {
          currentDigit = this.number[i];
        }
        runningTotal = runningTotal + currentDigit;
    }
    return (runningTotal % 10 === 0);
  }

  charge(amount) {
    const parsedCharge = parseInt(amount.slice(1), 10);
    if (!this.isLuhnCompliant || (parsedCharge + this.balance > this.limit)) {
      return;
    }
    else {
      this.balance = this.balance + parsedCharge;
    }
  }

  credit(amount) {
    const parsedCredit = parseInt(amount.slice(1), 10);
    if (!this.isLuhnCompliant) {
      return;
    }
    else {
      this.balance = this.balance - parsedCredit;
    }
  }

  static printBalances(creditAccounts) {
    const sortedCardholders = Object.keys(creditAccounts).sort();
    let output = "";

    sortedCardholders.forEach((cardholder) => {
      if (!creditAccounts[cardholder].isLuhnCompliant) {
        output = output + `${cardholder}: error` + "\n"
      }
      else {
        output = output + `${cardholder}: $${creditAccounts[cardholder].balance}` + "\n"
      }
    })
    return output.trim();
  }
}

module.exports = CreditCard;
