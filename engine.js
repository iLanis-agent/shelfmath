// Shelf Math engine: the boards a set of shelves takes, the brackets, the screws and boxes, and the cost. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _LEN = "the shelf length must be from 1 to 1200 inches with no decimal places";
var _NSH = "the shelf count must be from 1 to 100000 with no decimal places";
var _STK = "the board length must be from 1 to 1200 inches with no decimal places";
var _LONG = "a shelf must not be longer than a board";
var _GAP = "the bracket gap must be from 1 to 1200 inches with no decimal places";
var _NBR = "the bracket count must be from 1 to 1000000 with no decimal places";
var _PER = "the screws a bracket must be from 1 to 100 with no decimal places";
var _BOX = "the screws a box must be from 1 to 100000 with no decimal places";
var _NBD = "the board count must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function boardsTruth(shelves, len, stock) {
  var n = _i(shelves, _NSH, 6, 1, 100000), l = _i(len, _LEN, 4, 1, 1200), s = _i(stock, _STK, 4, 1, 1200);
  if (l > s) throw new Error(_LONG);
  var per = Math.floor(s / l), k = Math.floor((n + per - 1) / per), left = k * s - n * l;
  return "The " + _pl(n, " shelf", " shelves") + " of " + l + " inches from " + s + " inch boards take " + _pl(k, " board", " boards") + ", " + _pl(per, " shelf", " shelves") + " from each board, leaving " + left + " inches.";
}
function bracketsTruth(shelves, len, gap) {
  var n = _i(shelves, _NSH, 6, 1, 100000), l = _i(len, _LEN, 4, 1, 1200), g = _i(gap, _GAP, 4, 1, 1200);
  var per = Math.floor((l + g - 1) / g) + 1;
  return "The " + _pl(n, " shelf", " shelves") + " of " + l + " inches with brackets " + g + " inches apart take " + _pl(per, " bracket", " brackets") + " a shelf, " + _pl(n * per, " bracket", " brackets") + " in all.";
}
function screwsTruth(brackets, per, box) {
  var b = _i(brackets, _NBR, 7, 1, 1000000), p = _i(per, _PER, 3, 1, 100), x = _i(box, _BOX, 6, 1, 100000);
  var t = b * p, k = Math.floor((t + x - 1) / x), left = k * x - t;
  return "The " + _pl(b, " bracket", " brackets") + " at " + _pl(p, " screw", " screws") + " each take " + _pl(t, " screw", " screws") + ", in boxes of " + x + " that is " + _pl(k, " box", " boxes") + ", leaving " + _pl(left, " screw", " screws") + ".";
}
function costTruth(boards, bprice, brackets, kprice) {
  var n = _i(boards, _NBD, 6, 1, 100000), p = _p(bprice, _PRICE, 5, 2, 1, 1000000), b = _i(brackets, _NBR, 7, 1, 1000000), q = _p(kprice, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(n, " board", " boards") + " at $" + _dec(p, 2) + " and " + _pl(b, " bracket", " brackets") + " at $" + _dec(q, 2) + " cost $" + _money(n * p + b * q) + ", boards $" + _money(n * p) + " and brackets $" + _money(b * q) + ".";
}
