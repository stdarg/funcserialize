'use strict';

function test(a,b,c) {
  console.log('%s+%s=%s',a,b,a+b);
  return a+b+c;
}

var funcserialize = require('./index');
var obj = funcserialize.toObj(test);
console.log(JSON.stringify(obj));
var func = funcserialize.toFunc(obj);
console.log(func(1,2,4));
