const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let puzzlSol = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('Unit Tests', () => {

  test('valid 81 string', () => {
    assert.strictEqual(solver.validate(puzzle).solution, puzzlSol);
  });

  test('string with invalid character (not 1-9 or .)', () => {
    assert.strictEqual(
      solver.validate('l.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.E7.').error,
      'Invalid characters in puzzle'
    );
  });

  test('puzzle string with not 81 length ', () => {
    assert.strictEqual(
      solver.validate('l.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.E7').error,
      'Expected puzzle to be 81 characters long'
    );
  });

  test('valid row placement ', () => {
    assert.strictEqual(
      solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '7'),
      false
    );
  });

  test('invalid row placement ', () => {
    assert.strictEqual(
      solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '2', '1'),
      'row'
    );
  });

  test('valid column placement ', () => {
    assert.strictEqual(
      solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '7'),
      false
    );
  });

  test('invalid column placement ', () => {
    assert.strictEqual(
      solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '6'),
      'column'
    );
  });

  test('valid region placement ', () => {
    assert.strictEqual(
      solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '7'),
      false
    );
  });

  test('invalid region placement ', () => {
    assert.strictEqual(
      solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '2'),
      'region'
    );
  });

  test('valid puzzle pass', () => {
    assert.strictEqual(solver.validate(puzzle).solution, puzzlSol);
  });

  test('invalid puzzle fail', () => {
    let test = puzzle.split('');
    test[0] = 9;
    test = test.join('');

    assert.strictEqual(solver.validate(test).error, 'Puzzle cannot be solved');
  });

  test('expected solution', () => {
    assert.strictEqual(solver.validate(puzzle).solution, puzzlSol);
  });
});
