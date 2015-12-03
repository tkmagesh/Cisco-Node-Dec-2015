var accFactory = require('./accumulator');

var acc = accFactory();
console.log(acc.getResult()); //=> 0
acc.add(100);
acc.subtract(50);
acc.multiply(10);
acc.divide(2);
console.log(acc.getResult()); //=> 250
