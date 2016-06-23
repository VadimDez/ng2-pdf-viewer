System.register(["./global.js", "./example.js"], function (_export) {
  "use strict";

  var odds, nums, bob, _ref, a, b, _getASTNode, a, b, c, _getASTNode2,

  // object matching shorthand
  // binds `op`, `lhs` and `rhs` in scope
  op, lhs, rhs, _ref3, a, _ref4, _ref4$0, a, tail;

  // Can be used in parameter position
  function g(_ref2) {
    var x = _ref2.name;

    console.log(x);
  }

  // Destructuring + defaults arguments
  function r(_ref5) {
    var x = _ref5.x;
    var y = _ref5.y;
    var _ref5$w = _ref5.w;
    var w = _ref5$w === undefined ? 10 : _ref5$w;
    var _ref5$h = _ref5.h;
    var h = _ref5$h === undefined ? 10 : _ref5$h;

    return x + y + w + h;
  }

  function f(x) {
    var y = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

    // y is 12 if not passed (or passed as undefined)
    return x + y;
  }

  function f(x) {
    for (var _len = arguments.length, y = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      y[_key - 1] = arguments[_key];
    }

    // y is an Array
    return x * y.length;
  }

  function f(x, y, z) {
    return x + y + z;
  }
  // Pass each elem of array as argument

  function f() {
    {
      var x = undefined;
      {
        // okay, block scoped name
        var _x2 = "sneaky";
      }
      // okay, declared with `let`
      x = "bar";
    }
  }

  function factorial(_x4) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
      var n = _x4;

      "use strict";
      _again = false;
      var acc = _arguments.length <= 1 || _arguments[1] === undefined ? 1 : _arguments[1];
      if (n <= 1) return acc;
      _arguments = [_x4 = n - 1, n * acc];
      _again = true;
      acc = undefined;
      continue _function;
    }
  }

  // Stack overflow in most implementations today,
  // but safe on arbitrary inputs in ES2015
  return {
    setters: [function (_globalJs) {}, function (_exampleJs) {}],
    execute: function () {

      // Expression bodies
      odds = evens.map(function (v) {
        return v + 1;
      });
      nums = evens.map(function (v, i) {
        return v + i;
      });

      // Statement bodies
      nums.forEach(function (v) {
        if (v % 5 === 0) fives.push(v);
      });

      // Lexical this
      bob = {
        _name: "Bob",
        _friends: [],
        printFriends: function printFriends() {
          var _this = this;

          this._friends.forEach(function (f) {
            return console.log(_this._name + " knows " + f);
          });
        }
      };

      // list matching
      _ref = [1, 2, 3];
      a = _ref[0];
      b = _ref[2];

      a === 1;
      b === 3;

      // object matching
      _getASTNode = getASTNode();
      a = _getASTNode.op;
      b = _getASTNode.lhs.op;
      c = _getASTNode.rhs;
      _getASTNode2 = getASTNode();
      op = _getASTNode2.op;
      lhs = _getASTNode2.lhs;
      rhs = _getASTNode2.rhs;
      g({ name: 5 });

      // Fail-soft destructuring
      _ref3 = [];
      a = _ref3[0];

      a === undefined;

      // Fail-soft destructuring with defaults
      _ref4 = [];
      _ref4$0 = _ref4[0];
      a = _ref4$0 === undefined ? 1 : _ref4$0;

      a === 1;r({ x: 1, y: 2 }) === 23;f(3) == 15;f(3, "hello", true) == 6;f.apply(undefined, [1, 2, 3]) == 6;tail = factorial(100000);

      _export("tail", tail);
    }
  };
});

//# sourceMappingURL=data:application/json;base64,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OztvQkFJSixVQUFVLEVBQUU7QUFETixPQUFDLGVBQUwsRUFBRTtBQUFnQixPQUFDLGVBQVosR0FBRyxDQUFJLEVBQUU7QUFBWSxPQUFDLGVBQU4sR0FBRztxQkFLWCxVQUFVLEVBQUU7QUFBNUIsUUFBRSxnQkFBRixFQUFFO0FBQUUsU0FBRyxnQkFBSCxHQUFHO0FBQUUsU0FBRyxnQkFBSCxHQUFHO0FBTWpCLE9BQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFBOzs7Y0FHRixFQUFFO0FBQVAsT0FBQzs7QUFDTixPQUFDLEtBQUssU0FBUyxDQUFDOzs7Y0FHRixFQUFFOztBQUFYLE9BQUMsMkJBQUcsQ0FBQzs7QUFDVixPQUFDLEtBQUssQ0FBQyxDQUFDLEFBTVIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLENBQUEsQUFPcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxBQUtWLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxBQUt4QixDQUFDLGtCQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxBQXdCTCxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyIsImZpbGUiOiJyZWdpc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vZ2xvYmFsLmpzXCI7XHJcbmltcG9ydCBcIi4vZXhhbXBsZS5qc1wiO1xyXG5cclxuLy8gRXhwcmVzc2lvbiBib2RpZXNcclxudmFyIG9kZHMgPSBldmVucy5tYXAodiA9PiB2ICsgMSk7XHJcbnZhciBudW1zID0gZXZlbnMubWFwKCh2LCBpKSA9PiB2ICsgaSk7XHJcblxyXG4vLyBTdGF0ZW1lbnQgYm9kaWVzXHJcbm51bXMuZm9yRWFjaCh2ID0+IHtcclxuICBpZiAodiAlIDUgPT09IDApXHJcbiAgICBmaXZlcy5wdXNoKHYpO1xyXG59KTtcclxuXHJcbi8vIExleGljYWwgdGhpc1xyXG52YXIgYm9iID0ge1xyXG4gIF9uYW1lOiBcIkJvYlwiLFxyXG4gIF9mcmllbmRzOiBbXSxcclxuICBwcmludEZyaWVuZHMoKSB7XHJcbiAgICB0aGlzLl9mcmllbmRzLmZvckVhY2goZiA9PlxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLl9uYW1lICsgXCIga25vd3MgXCIgKyBmKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gbGlzdCBtYXRjaGluZ1xyXG52YXIgW2EsICxiXSA9IFsxLDIsM107XHJcbmEgPT09IDE7XHJcbmIgPT09IDM7XHJcblxyXG4vLyBvYmplY3QgbWF0Y2hpbmdcclxudmFyIHsgb3A6IGEsIGxoczogeyBvcDogYiB9LCByaHM6IGMgfVxyXG4gID0gZ2V0QVNUTm9kZSgpXHJcblxyXG4vLyBvYmplY3QgbWF0Y2hpbmcgc2hvcnRoYW5kXHJcbi8vIGJpbmRzIGBvcGAsIGBsaHNgIGFuZCBgcmhzYCBpbiBzY29wZVxyXG52YXIge29wLCBsaHMsIHJoc30gPSBnZXRBU1ROb2RlKClcclxuXHJcbi8vIENhbiBiZSB1c2VkIGluIHBhcmFtZXRlciBwb3NpdGlvblxyXG5mdW5jdGlvbiBnKHtuYW1lOiB4fSkge1xyXG4gIGNvbnNvbGUubG9nKHgpO1xyXG59XHJcbmcoe25hbWU6IDV9KVxyXG5cclxuLy8gRmFpbC1zb2Z0IGRlc3RydWN0dXJpbmdcclxudmFyIFthXSA9IFtdO1xyXG5hID09PSB1bmRlZmluZWQ7XHJcblxyXG4vLyBGYWlsLXNvZnQgZGVzdHJ1Y3R1cmluZyB3aXRoIGRlZmF1bHRzXHJcbnZhciBbYSA9IDFdID0gW107XHJcbmEgPT09IDE7XHJcblxyXG4vLyBEZXN0cnVjdHVyaW5nICsgZGVmYXVsdHMgYXJndW1lbnRzXHJcbmZ1bmN0aW9uIHIoe3gsIHksIHcgPSAxMCwgaCA9IDEwfSkge1xyXG4gIHJldHVybiB4ICsgeSArIHcgKyBoO1xyXG59XHJcbnIoe3g6MSwgeToyfSkgPT09IDIzXHJcblxyXG5cclxuZnVuY3Rpb24gZih4LCB5PTEyKSB7XHJcbiAgLy8geSBpcyAxMiBpZiBub3QgcGFzc2VkIChvciBwYXNzZWQgYXMgdW5kZWZpbmVkKVxyXG4gIHJldHVybiB4ICsgeTtcclxufVxyXG5mKDMpID09IDE1XHJcbmZ1bmN0aW9uIGYoeCwgLi4ueSkge1xyXG4gIC8vIHkgaXMgYW4gQXJyYXlcclxuICByZXR1cm4geCAqIHkubGVuZ3RoO1xyXG59XHJcbmYoMywgXCJoZWxsb1wiLCB0cnVlKSA9PSA2XHJcbmZ1bmN0aW9uIGYoeCwgeSwgeikge1xyXG4gIHJldHVybiB4ICsgeSArIHo7XHJcbn1cclxuLy8gUGFzcyBlYWNoIGVsZW0gb2YgYXJyYXkgYXMgYXJndW1lbnRcclxuZiguLi5bMSwyLDNdKSA9PSA2XHJcblxyXG5cclxuZnVuY3Rpb24gZigpIHtcclxuICB7XHJcbiAgICBsZXQgeDtcclxuICAgIHtcclxuICAgICAgLy8gb2theSwgYmxvY2sgc2NvcGVkIG5hbWVcclxuICAgICAgY29uc3QgeCA9IFwic25lYWt5XCI7XHJcbiAgICB9XHJcbiAgICAvLyBva2F5LCBkZWNsYXJlZCB3aXRoIGBsZXRgXHJcbiAgICB4ID0gXCJiYXJcIjtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBmYWN0b3JpYWwobiwgYWNjID0gMSkge1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG4gIGlmIChuIDw9IDEpIHJldHVybiBhY2M7XHJcbiAgcmV0dXJuIGZhY3RvcmlhbChuIC0gMSwgbiAqIGFjYyk7XHJcbn1cclxuXHJcbi8vIFN0YWNrIG92ZXJmbG93IGluIG1vc3QgaW1wbGVtZW50YXRpb25zIHRvZGF5LFxyXG4vLyBidXQgc2FmZSBvbiBhcmJpdHJhcnkgaW5wdXRzIGluIEVTMjAxNVxyXG5leHBvcnQgY29uc3QgdGFpbCA9IGZhY3RvcmlhbCgxMDAwMDApIl19