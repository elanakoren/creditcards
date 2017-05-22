### Setup:

To set up the app, you need node installed. On a Mac, run `brew install node` at the terminal. (Otherwise, use your package manager of choice.) After that, install the app's dependencies by running `npm i` in the project root directory. Run tests at the terminal by typing `jasmine`. Finally, to run the program, input `node src/index.js [INPUT-FILENAME]` or `node src/index.js < [INPUT-FILENAME]` from the project root directory. I provided a fixture file (fixture.txt), adapted from the problem's specifications, but you don't need to use it.

### Why I chose Javascript:

This problem is simple enough that any popular language is suitable. Javascript is the language I'm currently working with, so it's what's freshest for me right now. Node also has good native support for working with I/O.

### A note about design:

I wanted to separate the credit card business logic from reading and parsing the file, so I created the `CreditCard` object, responsible for doing things like checking Luhn validity and maintaining balances. The actual parsing of the input is done in `src/index.js`. I decided to simply split each line of input on the space character - I considered using a CSV parser, but this seemed a little heavy-weight for the problem. If, in the future, we wanted to allow spaces in the name column (for example), I would switch to using a CSV library. I also decided to store all the credit cards in an object keyed off the cardholder name - this allows for easy lookup. In the future, if we wanted to allow for different cardholders to have the same name, I would switch to keying off a unique ID (possibly the card number). Within `CreditCard`, the card number is stored internally as an array of digits, because that makes iterating over each digit to check Luhn validity a little cleaner.
