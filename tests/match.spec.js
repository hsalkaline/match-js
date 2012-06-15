// var fac = match(
//   [0, 1],
//   [$, function(n){return n * fac(n - 1);}]
// );
// console.log(fac(3));

// var boolenize = match(
//   [0, false],
//   [_, true]
// );
// console.log(boolenize(4), boolenize(0));

// var arrayF = match(
//   [ [_, [$, _], 2, etc], function(n){return n;}]
// );
// console.log(arrayF([0, [1, 5], 2, 3 ,4 ,5]));

// var regexF = match(
//   [/123(.+)/, function(m){ return m[1]; }]
// );
// console.log(regexF("123456"));