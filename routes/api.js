'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let myObj = {};

      solver.validate(req.body.puzzle) ? myObj = solver.validate(req.body.puzzle) : {};

      return res.send(myObj);
    });

  app.route('/api/solve')
    .post((req, res) => {
      let myObj = {};

      solver.validate(req.body.puzzle) ? myObj = solver.validate(req.body.puzzle) : {};

      return res.send(myObj);
    });
};
