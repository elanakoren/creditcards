"use strict"

class CreditCard {
  constructor(number) {
    this.number = number;
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
}

module.exports = CreditCard;
