var assert = require('assert');
var Match = require('match-js');

var factorial = Match.match(
  [0, 1],
  [1, 1],
  [Match.$, function(n){ return n * factorial(n - 1);}]
);

assert.equal(factorial(5), 1 * 2 * 3 * 4 * 5);

