'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let myObj = {};


      let {puzzle, value, coordinate} = req.body;

      if (puzzle == undefined || value == undefined || coordinate == undefined) {
        myObj = { error: 'Required field(s) missing' };
        console.log(req.body, myObj);
        return res.send(myObj);
      }

      if (puzzle.length != 81) {
        myObj = { error: 'Expected puzzle to be 81 characters long' };
        console.log(req.body, myObj);
        return res.send(myObj);
      }

      if ((/[^0-9\.]/g).test(puzzle)) {
        myObj = { error: 'Invalid characters in puzzle' };
        console.log(req.body, myObj);
        return res.send(myObj);
      }

      if (['1','2','3','4','5','6','7','8','9'].indexOf(value) < 0) {
        myObj = { error: 'Invalid value' };
        console.log(req.body, myObj);
        return res.send(myObj);
      }

      if ( coordinate.length != 2 || ['A','B','C','D','E','F','G','H','I'].indexOf(coordinate[0]) < 0 || ['1','2','3','4','5','6','7','8','9'].indexOf(coordinate[1]) < 0) {
        myObj = { error: 'Invalid coordinate' };
        console.log(req.body, myObj);
        return res.send(myObj);
      }

      let iValues = {
        A: 0,
        B: 9,
        C: 18,
        D: 27,
        E: 36,
        F: 45,
        G: 54,
        H: 63,
        I: 72,
      };

      let coordinateExist = Number(`${iValues[coordinate[0]] + Number(coordinate[1]) - 1}`);

      if (puzzle[coordinateExist] != '.') {
        puzzle = puzzle.split('');
        puzzle[coordinateExist] = '.';
        puzzle = puzzle.join('');
      }
      console.log(typeof coordinateExist, puzzle);

      let validRow    = solver.checkRowPlacement    (puzzle, coordinate[0], coordinate[1], value);
      let validCol    = solver.checkColPlacement    (puzzle, coordinate[0], coordinate[1], value)
      let validRegion = solver.checkRegionPlacement (puzzle, coordinate[0], coordinate[1], value);

      if (!validRow && !validCol && !validRegion) {
        myObj = {valid: true};
        console.log(req.body, myObj);
        return res.send(myObj);
      } else {
        myObj = {valid: false, conflict: [validRow, validCol, validRegion].filter(x => x)};
        console.log(req.body, myObj);
        return res.send(myObj);
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      let myObj = {};

      solver.validate(req.body.puzzle) ? myObj = solver.validate(req.body.puzzle) : {};
      return res.send(myObj);
    });
};
