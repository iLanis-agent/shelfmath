const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { boards: boardsTruth, brackets: bracketsTruth, screws: screwsTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the shelf length must be from 1 to 1200 inches with no decimal places",
  "the shelf count must be from 1 to 100000 with no decimal places",
  "the board length must be from 1 to 1200 inches with no decimal places",
  "a shelf must not be longer than a board",
  "the bracket gap must be from 1 to 1200 inches with no decimal places",
  "the bracket count must be from 1 to 1000000 with no decimal places",
  "the screws a bracket must be from 1 to 100 with no decimal places",
  "the screws a box must be from 1 to 100000 with no decimal places",
  "the board count must be from 1 to 100000 with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
