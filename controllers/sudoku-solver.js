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

    // create sudoku
    for (var i = 0; i < 9; i++) {
      for (var j = 1; j <= 9; j++) {
        let myKey = `${letters[i] + j}`;
        Object.assign(arr, {[myKey]: (puzzleString[count] == '.' ? [1,2,3,4,5,6,7,8,9] : Number(puzzleString[count]))});
        count++;
      }
    }

    // extract rows and columns
    let myRow = this.createRow(arr);
    let myColumns = this.createColumn(arr);

    // remove existing values
    console.log(arr);
    arr = this.cleanRowsAndColumns(arr, myRow, 'row');
    arr = this.cleanRowsAndColumns(arr, myColumns, 'column');
    console.log(arr);

    // cleanSector
    cleanSector(arr);

  } // end solve method

  createRow(arr) {
    let rows = {
      'A' : [],
      'B' : [],
      'C' : [],
      'D' : [],
      'E' : [],
      'F' : [],
      'G' : [],
      'H' : [],
      'I' : []
    };

    for (let key in arr) {
      if(typeof arr[key] == 'number') {
        rows[key[0]].push(arr[key]);
      }
    }

    console.log(rows);
    return rows
  } // end createRow

  createColumn(arr) {
    let columns = {
      '1' : [],
      '2' : [],
      '3' : [],
      '4' : [],
      '5' : [],
      '6' : [],
      '7' : [],
      '8' : [],
      '9' : []
    };

    for (let key in arr) {
      if(typeof arr[key] == 'number') {
        columns[key[1]].push(arr[key]);
      }
    }

    console.log(columns);

    return columns
  } // end createRow


  cleanRowsAndColumns(arr, rows, type){
    let res = {};
    let flag = type == 'row' ? 0 : 1;

    for (let key in arr) {
      if(typeof arr[key] != 'number') {
        let filteredArr = arr[key].filter(x => rows[key[flag]].indexOf(x) < 0);
        Object.assign(res, { [key]: filteredArr.length == 1 ? filteredArr[0] : filteredArr });
      } else {
        Object.assign(res, { [key]: arr[key] });
      }
    }

    return res;
  } // end cleanRows

  cleanSector(arr) {
    let sectors = {
      1: ['ABC', '123'],
      2: ['ABC', '456'],
      3: ['ABC', '789'],

      4: ['DEF', '123'],
      5: ['DEF', '456'],
      6: ['DEF', '789'],

      7: ['GHI', '123'],
      8: ['GHI', '456'],
      9: ['GHI', '789']
    };
  }


}

module.exports = SudokuSolver;
