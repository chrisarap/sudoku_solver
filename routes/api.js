'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, value, coordinate} = req.body;

      if (puzzle == undefined || value == undefined || coordinate == undefined) {
        return res.send({ error: 'Required field(s) missing' });
      }

      if (['1','2','3','4','5','6','7','8','9'].indexOf(value) < 0) {
        return res.send({ error: 'Invalid value' });
      }

      if ( coordinate.length != 2 || ['A','B','C','D','E','F','G','H','I'].indexOf(coordinate[0]) < 0 || ['1','2','3','4','5','6','7','8','9'].indexOf(coordinate[1]) < 0) {
        return res.send({ error: 'Invalid coordinate' });
      }

      console.log(solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value))

      // let myObj = {};
      //
      // solver.validate(puzzle) ? myObj = solver.validate(puzzle) : {};
      // return res.send(myObj);
    });

  app.route('/api/solve')
    .post((req, res) => {
      let myObj = {};

      solver.validate(req.body.puzzle) ? myObj = solver.validate(req.body.puzzle) : {};
      return res.send(myObj);
    });
};
