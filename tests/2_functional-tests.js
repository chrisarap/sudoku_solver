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

        // #3
        test('invalid character', done => {

          let test = puzzle.slice();
          test = test.split('');
          test[0] = 'c';
          test = test.join('');

          chai
            .request(server)
            .post('/api/solve')
            .send({puzzle: test})
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.error, 'Invalid characters in puzzle');
            });
            done();
          });

          // #4
          test('incorrect length', done => {

            let test = puzzle.slice();
            test = test.split('');
            test.pop();
            test = test.join('');

            chai
              .request(server)
              .post('/api/solve')
              .send({puzzle: test})
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
              });
              done();
            });

          // #5
          test('cannot be solved', done => {

            let test = puzzle.slice();
            test = test.split('');
            test[0] = '9';
            test = test.join('');

            chai
              .request(server)
              .post('/api/solve')
              .send({puzzle: test})
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
              });
              done();
          });

    });

    suite('post /api/check', () => {

      // #6
      test('check a puzzle with all fields', done => {
        let coordinate = 'A1';
        let value = '7';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isTrue(res.body.valid);
          });
          done();
      });

      // #7
      test('single conflict', done => {
        let coordinate = 'A1';
        let value = '6';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid);
            assert.equal(res.body.conflict, 'region');
          });
          done();
      });

      // #8
      test('multiple conflicts', done => {
        let coordinate = 'B2';
        let value = '7';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid);
            assert.equal(res.body.conflict[0], 'row');
            assert.equal(res.body.conflict[1], 'column');
          });
          done();
      });

      // #9
      test('all placement conflicts', done => {
        let coordinate = 'F2';
        let value = '7';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid);
            assert.equal(res.body.conflict[0], 'row');
            assert.equal(res.body.conflict[1], 'column');
            assert.equal(res.body.conflict[2], 'region');
          });
          done();
      });

      // #10
      test('missing required fields', done => {
        let coordinate = 'F2';
        let value = '7';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing');
          });
          done();
      });

      // #11
      test('invalid value', done => {
        let coordinate = 'F2';
        let value = '1';
        let puzzle = sudokus.puzzlesAndSolutions[1][0].replace('1', 'z')
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid characters in puzzle');
          });
          done();
      });

      // #12
      test('incorrect length', done => {
        let coordinate = 'F2';
        let value = '1';
        let puzzle = '123';

        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          });
          done();
      });

      // #13
      test('invalid coordinate', done => {
        let coordinate = 'Z2';
        let value = '7';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid coordinate');
          });
          done();
      });

      // #14
      test('invalid character value', done => {
        let coordinate = 'Z2';
        let value = 'X';
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle, coordinate, value})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid value');
          });
          done();
      });

    });

});
