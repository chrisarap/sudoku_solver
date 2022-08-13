const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const sudokus = require('../controllers/puzzle-strings.js');

const puzzle = sudokus.puzzlesAndSolutions[0][0];
const puzzleSolution = sudokus.puzzlesAndSolutions[0][1];



chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('post /api/solve', () => {

    // #1
    test('valid puzzle string', done => {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle: puzzle})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, puzzleSolution);
        });
        done();
      });

      // #2
      test('missing puzzle string', done => {
        chai
          .request(server)
          .post('/api/solve')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field missing');
          });
          done();
        });
    });

});
