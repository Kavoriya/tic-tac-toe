const checkLines = (row, column) => {
    let isAWin = true;
    for (let i = 0; i < 3; i++) {
      if (board.getBoard()[row][i].getValue() != getActivePlayer().token) {
        isAWin = false;
      }
    }
    if (isAWin) {
      return isAWin;
    }
    for (let i = 0; i < 3; i++) {
      if (board.getBoard()[i][column].getValue() != getActivePlayer().token) {
        isAWin = false;
      }
    }
    return isAWin;
  }

  const checkDiagonals = (row, column) => {
    if ((row == 0 && column == 0) || (row == 2 && column == 2)) {
      let isAWin = true;
      for (let i = 0; i < 3; i++) {
        if (board.getBoard()[i][i].getValue() != getActivePlayer().token) {
          return false;
        }
      }
      return isAWin;
    }
     
    else if ((row == 0 && column == 2) || (row == 2 && column == 0)) {
      let isAWin = true;
      let i = 2;
      for (let j = 0; j < 3; j++) {
        if (board.getBoard()[i][j].getValue() != getActivePlayer().token) {
          return false;
        }
        i--;
      }
      return isAWin;

    } else return false;
  }

  const checkCenter = () => {
    return checkDiagonalsLeft() || checkDiagonalsRight();
  }

  console.log(`Three in a row: ${checkRows(row)}`);
    console.log(`Three in a column: ${checkColumns(column)}`);
    if ((row == 0 && column == 0) || (row == 2 && column == 2)) {
      console.log(`Three in a left diagonal: ${checkDiagonalsLeft()}`);
    }
    if ((row == 0 && column == 2) || (row == 2 && column == 0)) {
      console.log(`Three in a right diagonal: ${checkDiagonalsRight()}`);
    }
    if (row == 1 & column == 1) {
      console.log(`Three in center: ${checkCenter()}`);
    }

    isAWin = (checkRows(row) || checkColumns(column)) ? true : false; 
    if ((row == 0 && column == 0) || (row == 2 && column == 2)) {
      isAWin = checkDiagonalsLeft() ? true : false;
    }
    if ((row == 0 && column == 2) || (row == 2 && column == 0)) {
      isAWin = checkDiagonalsRight() ? true : false;
    }
    if (row == 1 & column == 1) {
      isAWin = checkCenter() ? true : false;
    }