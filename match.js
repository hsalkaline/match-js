var $ = {}, _ = {}, etc = {};

function matches(value, pattern){
  var result = {vars: []};
  if (pattern === _)
  {
    result.matched = true;
    return result;
  }
  if (pattern === $)
  {
    result.matched = true;
    result.vars.push(value);
    return result;
  }
  //null
  if (pattern === null){
    result.matched = value === null;
    return result;
  }
  //primitives
  if (typeof pattern !== 'object')
  {
    result.matched = value === pattern;
    return result;
  }
  //regexps
  if (pattern instanceof RegExp)
  {
    result.matched = false;
    if (typeof value == 'string')
    {
      var match = value.match(pattern);
      result.matched = !!match;
      if (result.matched)
      {
        result.vars.push(match);
      }
    }
    return result;
  }
  //arrays
  if (Array.isArray(pattern))
  {
    result.matched = true;
    if(!Array.isArray(value)){
      result.matched = false;
    }
    for(var i = 0; i < pattern.length; i++)
    {
      if(pattern[i] == etc){
        result.matched = true;
        break; 
      }
      var matchInfo = matches(value[i], pattern[i]);
      if (!matchInfo.matched)
      {
        result.matched = false;
        break;
      }
      result.vars = result.vars.concat(matchInfo.vars);
    }
    return result;
  }
  //objects
  if (typeof pattern === 'object')
  {

  }
  //functions
  if (typeof pattern === 'function')
  {

  }
  
  return result;
}

function match(/*pattern1, pattern2, ...*/){
  var patterns = Array.prototype.slice.call(arguments);
  var vars = [];
  return function(object){
    for(var i = 0; pattern = patterns[i]; i++){
      var matchResult = matches(object, pattern[0]);
      if (matchResult.matched)
      {
        if (pattern[1] instanceof Function)
        {
          return pattern[1].apply(object, matchResult.vars);
        }
        return pattern[1];
      }
    }
    throw new Error('unable to match ' + object + ' against ' + patterns);
  };
}


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
//   [ [_, $, 2, etc], function(n){return n;}]
// );
// console.log(arrayF([0, 1, 2, 3 ,4 ,5]));

// var regexF = match(
//   [/123(.+)/, function(m){ return m[1]; }]
// );
// console.log(regexF("123456"));
