'use strict';
var assert = require('assert');
var is = require('is2');
var funcserialize = require('../index');

describe('toObj', function() {
  it('Should serialize a function into an object.', function() {

    var funca = function test2(a,b,c) {
      console.log('%s+%s=%s',a,b,a+b);
      return a+b+c;
    };

    var obj = funcserialize.toObj(funca);

    assert.ok(is.obj(obj));
    assert.ok(is.str(obj.name) && obj.name === 'test2');
    assert.ok(is.array(obj.params) && obj.params.length === 3 &&
              obj.params[0] === 'a' && obj.params[1] === 'b' &&
              obj.params[2] === 'c');
    assert.ok(is.str(obj.code) &&
              obj.code === '\n      console.log(\'%s+%s=%s\',a,b,a+b);'+
              '\n      return a+b+c;\n    ');
  });
});

describe('toObj', function() {
  it('Should deserialize an object into a function.', function() {

    var obj = {};
    obj.name = 'test2';
    obj.params = [ 'a', 'b', 'c' ];
    obj.code = '\n      console.log(\'%s+%s=%s\',a,b,a+b);'+
      '\n      return a+b+c;\n    ';
    var test2 = funcserialize.toFunc(obj);
    assert.ok(is.func(test2));
    assert.ok(test2(1,2,4) === 7);
  });
});

