# Shelf Math

Shelf board and bracket arithmetic. The 4 shelves of 30 inches from 96 inch boards take 2 boards, 3 shelves from each board, leaving 72 inches.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The boards truth** - boards: each board (1 to 1200 inches) is cut into as many whole shelves (1 to 1200 inches) as fit, and the shelf count (1 to 100000) is divided by that, rounded up, with the inches left.
- **The brackets truth** - brackets: the shelf length over the bracket gap (1 to 1200 inches), rounded up, plus 1, times the shelves.
- **The screws truth** - screws: the brackets (1 to 1000000) times the screws a bracket (1 to 100), divided by the screws a box (1 to 100000), rounded up, with the screws left.
- **The cost truth** - cost: the boards (1 to 100000) and the brackets, each at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not seen any wall or shelf and does not know the fasteners, the studs, the bracket ratings or the load, and it gives no verdict that a shelf is strong enough or safe to load. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/shelfmath/
Repo: https://github.com/iLanis-agent/shelfmath
