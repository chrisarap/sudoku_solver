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
      return this.solve(puzzleString);
    }
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

    // repeat the process 15 times
    for (var i = 0; i < 15; i++) {
      // extract rows and columns
      let myRow = this.createRow(arr);
      let myColumns = this.createColumn(arr);

      // remove existing values
      arr = this.cleanRowsAndColumns(arr, myRow, 'row');
      arr = this.cleanRowsAndColumns(arr, myColumns, 'column');

      // cleanSector
      arr = this.cleanSector(arr);
    }

    // console.log(arr);

    // convert to string
    let answer = [];
    for (let myStr in arr) {
      answer.push(arr[myStr]);
    }

    let checkSum = answer.slice().reduce((sum, x) => sum + x);

    if (checkSum == 405) {
      return {solution: answer.join('')};
    } else {
      return {error: 'Puzzle cannot be solved'};
    }


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

    // console.log(rows);
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

    // console.log(columns);

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
    let sectors = [
      ['A','B','C'],
      ['D','E','F'],
      ['G','H','I']
    ];

    return this.repeatSector(arr, sectors);
  }

  // create 9 sector
  repeatSector(arr, sectors) {
    let myArr = [];
    let aux = [];
    let count = 0;
    let auxGroup = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 10; j++) {
        for (let k = 0; k < 3; k++) {
          let myStr = `${sectors[i][k] + j}`;

          auxGroup.push(myStr);
          if (typeof arr[myStr] == 'number') {
            aux.push(arr[myStr]);
          }

          if (j % 3 == 0 && count != 2) {
            count++;
          } else if (j % 3 == 0 && count == 2) {
            myArr.push([auxGroup, aux]);
            aux = [];
            auxGroup = [];
            count = 0;
          }
        }

      }
    }

    return this.renameBlock(arr, myArr);

  } // end repeatSector method

  renameBlock(arr, numToCheck){
    let test = [];

    let copyArr = Object.assign({}, arr);


    for (let keyArr in arr) {
      for (let key in numToCheck) {
        if(numToCheck[key][0].indexOf(keyArr) >= 0 && typeof arr[keyArr] != 'number') {
          let aux = arr[keyArr].filter(x => numToCheck[key][1].indexOf(x) < 0);
          copyArr[keyArr] = aux.length == 1 ? aux[0] : aux;
        }
      }
    }
      return copyArr;
  }


}

module.exports = SudokuSolver;
