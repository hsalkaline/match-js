var Match = require('../match.js');
var match = Match.match;
var _ = Match._;
var $ = Match.$;
var etc = Match.etc;

describe('match-js', function(){
  it('should match primitives', function(){
    var primitivesMatcher = match(
      [true, function(){ return 'boolean';}],
      [1, function(){ return 'number';}],
      ["1", function(){ return 'string';}],
      [null, function(){ return 'null';}],
      [undefined, function(){ return 'undefined';}]
    );
    expect(primitivesMatcher(true)).toBe('boolean');
    expect(primitivesMatcher(1)).toBe('number');
    expect(primitivesMatcher("1")).toBe('string');
    expect(primitivesMatcher(null)).toBe('null');
    expect(primitivesMatcher(undefined)).toBe('undefined');
  });

  it('should match RegExps', function(){
    var regexMatcher = match(
      [/\w+/g, function(match){
        return match;
      }]
    );
    expect(regexMatcher('A quick brown fox')).toEqual(['A', 'quick', 'brown', 'fox']);
  });

  it('should match arrays', function(){
    var arrayMatcher = match(
      [ [1, 2, 3], function(){ return 'array'; }]
    );
    expect(arrayMatcher([1,2,3])).toBe('array');
  });

  it('should match objects', function(){
    var objectMatcher = match(
      [{a:1, b:2, c:3}, function(){return 'object';}]
    );
    expect(objectMatcher({a:1, b:2, c:3})).toBe('object');
  });

  it('should match by function', function(){
    var customMatcher = match(
      [function(n){ return n > 10;}, function(){return this;}]
    );
    expect(customMatcher(11)).toBe(11);
    expect(function(){return customMatcher(10);}).toThrow();
  });

  it('should match anything with _', function(){
    var anyMatcher = match(
      [_, 'match']
    );
    expect(anyMatcher(true)).toBe('match');
    expect(anyMatcher(1)).toBe('match');
    expect(anyMatcher("1")).toBe('match');
    expect(anyMatcher(null)).toBe('match');
    expect(anyMatcher(undefined)).toBe('match');
    expect(anyMatcher([1,2,3])).toBe('match');
    expect(anyMatcher({a: 1, b: 2, c: 3})).toBe('match');
  });

  it('should match anything with $ and provide access to match with a variable', function(){
    var varMatcher = match(
      [$, function(n){return n;}]
    );
    expect(varMatcher(true)).toBe(true);
    expect(varMatcher(1)).toBe(1);
    expect(varMatcher("1")).toBe("1");
    expect(varMatcher(null)).toBe(null);
    expect(varMatcher(undefined)).toBe(undefined);
    expect(varMatcher([1,2,3])).toEqual([1,2,3]);
    expect(varMatcher({a: 1, b: 2, c: 3})).toEqual({a: 1, b: 2, c: 3});
  });

  it('should provide `etc` syntax for arrays', function(){
    var etcMatcher = match(
      [[1,2,etc], 'match']
    );
    expect(etcMatcher([1,2,3,4])).toBe('match');
    expect(etcMatcher([1,2])).toBe('match');
  });

  it('should provide nested matching for arrays', function(){
    var nestedArrayMatcher = match(
      [
        [ 1, [2, [3, $] ], etc ],
        function(n){ return n; }
      ]
    );

    expect(nestedArrayMatcher([1, [2, [3, 4] ], 5 , 6])).toBe(4);
  });

  it('should provide nested matching for objects', function(){
    var nestedObjectMatcher = match(
      [
        { a: $, b: {c: 2, d: {e: $} } },
        function(a, b){ return a + b; }
      ]
    );
    expect(nestedObjectMatcher({ a: 1, b: {c: 2, d: {e: 3} } })).toBe(4);
  });

  it('should match in order, specified in matcher constructor', function(){
    var orderedMatcher = match(
      [_, 'anything'],
      [2, 'two']
    );
    expect(orderedMatcher(2)).toBe('anything');
  });

  it('should provide match with a context', function(){
    var contextMatcher = match(
      [_, function(){return this;}]
    );
    expect(contextMatcher('Lorem ipsum dolor sit amet')).toBe('Lorem ipsum dolor sit amet');
  });
});