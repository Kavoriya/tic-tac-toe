const Cell = () => {
  let value = 0;
  const addToken = (token) => {
    value = token;
  }
  const getValue = () => value;

  return {addToken, getValue};
}

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
  const putToken = (row, column, token) => {
    if (board[row][column].getValue() == 0) {
      board[row][column].addToken(token);
    } else {
      console.log("Cell is occupied!");
    }
  }
  const printBoard = () => {
    const boardWithCellValues = board.map((row => row.map(cell => cell.getValue())));
    console.log(boardWithCellValues);
  }

  return {getBoard, putToken, printBoard};
}

const GameController = (
  playerOneName = "Player 1",
  playerTwoName = "Player 2" 
) => 
{
  let board = Gameboard();  

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${activePlayer.name} turn`);
  }

  const switchPlayerTurn = () => {
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
  };
  
  const playRound = (row, column) => {
    board.putToken(row, column, getActivePlayer().token);
    let isAWin = (checkRows(row) || checkColumns(column) || checkDiagonalsLeft() || checkDiagonalsRight()) ? true : false;
    if (isAWin) {
      finishGame();
    } else {
      switchPlayerTurn();
      printNewRound();
    }
    
  }

  const finishGame = () => {
    console.log(`${getActivePlayer().name} won!`);
    // board = Gameboard();
  }

  const checkRows = (row) => {
    for (let i = 0; i < 3; i++) {
      if (board.getBoard()[row][i].getValue() != getActivePlayer().token) {
        return false;
      }
    }
    return true;
  }

  const checkColumns = (column) => {
    for (let i = 0; i < 3; i++) {
      if (board.getBoard()[i][column].getValue() != getActivePlayer().token) {
        return false;
      }
    }
    return true;
  }

  const checkDiagonalsLeft = () => { // from top-left to bottom-right
      for (let i = 0; i < 3; i++) {
        if (board.getBoard()[i][i].getValue() != getActivePlayer().token) {
          return false;
        }
      }
      return true;
  }
  

  const checkDiagonalsRight = () => { // from top-right to bottom-left
      let i = 2;
      for (let j = 0; j < 3; j++) {
        if (board.getBoard()[i][j].getValue() != getActivePlayer().token) {
          return false;
        }
        i--;
      }
      return true;
  }

  printNewRound();

  return {
    playRound,
    getActivePlayer
  };
}

const game = GameController();