/**
 * @fileOverview
 * A module to take a function and convert it into an object and from
 * the object, back into a function. The object is suitable for
 * JSON.stringify().
 */
'use strict';
var is = require('is2');
var debug = require('debug')('func-serialize');
var util = require('util');

/**
 * Given an input, describing a task for a worker, create an object that can be
 * serialized to JSON and sent to the worker.
 * @param {Object} task An object describing a task
 * @return {Boolean|Object} False on failure, and a serialized object on
 * success.
 */
exports.toObj = function (func) {
  if (!is.func(func))  return false;

  var str = func.toString();
  var re = /function\s*(\w*)\s*\((.*)\)\s*{([^\0]*)}/m;
  var match = re.exec(str);
  if (!match)  return false;

  var obj = {};
  obj.name = match[1];
  obj.params = match[2].split(',');
  obj.code = match[3];

  return obj;
};

/**
 * Given an object that describes a function, convert the object into a
 * function.
 * @param {Object} obj The object describing the function.
 * @return {Boolean|Function} False on failure and a function object on success.
 */
exports.toFunc = function (obj) {
  if (!is.obj(obj) || !obj.code || !obj.params)  return false;

  function construct(constructor, params) {
    function F() { return constructor.apply(this, params); }
    F.prototype = constructor.prototype;
    return new F();
  }

  var params;
  try {
    params = JSON.parse(JSON.stringify(obj.params));
  } catch(err) {
    debug('error in toFunc with task.params:'+util.inspect(obj.params));
    return false;
  }

  params.push(obj.code);
  var taskFunc = construct(Function, params);
  return taskFunc;
};

