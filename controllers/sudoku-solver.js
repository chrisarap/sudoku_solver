class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString == undefined) {
      return {error: 'Required field missing'};
    } else if(puzzleString.length != 81) {
      return {error: 'Expected puzzle to be 81 characters long'};
    } else {
      let rgx = /[^0-9\.]/;
      if(rgx.test(puzzleString)){
        return {error: 'Invalid characters in puzzle'};
      }
    }
    this.solve(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    let letters = 'ABCDEFGHI';
    let arr = {};
    let count = 0;


    for (var i = 0; i < 9; i++) {
      for (var j = 1; j <= 9; j++) {
        let myKey = `${letters[i] + j}`;
        Object.assign(arr, {[myKey]: (puzzleString[count] == '.' ? [1,2,3,4,5,6,7,8,9] : Number(puzzleString[count]))});
        count++;
      }
    }

    //let newArr = Object.entries(arr);

    for (var variable in arr) {
      if (typeof arr[variable] != 'number') {
        console.log(variable, arr[variable]);
      }

    }
  }




}

module.exports = SudokuSolver;
