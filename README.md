funcserialize
=============

A module to take a function and convert it into an object. And then, with the
same object, convert it back into a function. The object is suitable for
conversion to JSON via `JSON.stringify`.

Why? Until we have function.toSource(), to serialize and then deserialize a
function, you need to:

1. Create a String representation with function.toString()
2. Parse the argument names and the code from the string representation
3. Use new function in a closure that returns FUnction.apply(inst, array)

The 2nd and 3rd steps are a bit tricky, so I created this module.

If you find yourself in the unusual situation where you need to communicate
code, this might help.

## Installation

    $ npm install funcserialize

## API

### toObj(func)

Given an input, describing a task for a worker, create an object that can be
serialized to JSON and sent to the worker.

#### Params:

* **Object** *func* A function to be converted into an object.

#### Return:

* **Boolean|Object** False on failure, and a serialized object on success.

### toFunc(obj)

Given an object that describes a function, convert the object into a
function.

#### Params:

* **Object** *obj* The object describing the function.

#### Return:

* **Boolean|Function** False on failure and a function object on success.

## Example

    function test(a,b,c) {
      console.log('%s+%s=%s',a,b,a+b);
      return a+b+c;
    }

    var funcserialize = require('funcserialize');
    var obj = funcserialize.toObj(test);
    console.log(JSON.stringify(obj));
    var func = funcserialize.toFunc(obj);
    console.log(func(1,2,4));

The output from the above code is:

    $ node example.js
    {"name":"test","params":["a","b","c"],"code":"\n  console.log('%s+%s=%s',a,b,a+b);\n  return a+b+c;\n"}
    1+2=3
    7

## LICENSE

The MIT License (MIT)

Copyright (c) 2013 Edmond Meinfelder

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

