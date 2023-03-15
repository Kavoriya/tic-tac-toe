const Cell = () => {
  let value = "";
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
    board[row][column].addToken(token);
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
      token: "X"
    },
    {
      name: playerTwoName,
      token: "O"
    }
  ];

  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;

  let numberOfTurns = 0;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${activePlayer.name} turn`);
  }

  const switchPlayerTurn = () => {
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
  };
  
  const playRound = (row, column) => {
    if (board == undefined) return;
      board.putToken(row, column, getActivePlayer().token);
      numberOfTurns++;
      console.log(`Number of turns: ${numberOfTurns}`);
      let isAWin = (checkRows(row) || checkColumns(column) || checkDiagonalsLeft() || checkDiagonalsRight()) ? true : false;
      if (isAWin) {
        finishGame();
        board = undefined;
        return `${getActivePlayer().name} won!`;
      } else if (numberOfTurns >= 9) {
        console.log("Draw!");
        return 'Draw!';
      } else {
        switchPlayerTurn();
      }
      printNewRound();
  }

  const finishGame = () => {
    console.log(`${getActivePlayer().name} won!`);
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
    getActivePlayer,
    getBoard: board.getBoard
  };
}

const ScreenController = (() => {
  let game = GameController();
  let playerTurn = document.querySelector('.player-turn');
  let display = document.querySelector('.display');
  let winner = document.querySelector('.winner');

  const updateDisplay = () => {
    display.textContent = '';
    playerTurn.textContent = game.getActivePlayer().name;

    const board = game.getBoard();
    board.forEach(row => {
      row.forEach(cell => {
        let button = document.createElement('button');
        button.textContent = cell.getValue();
        button.classList.add('cell');
        button.setAttribute('data-row', board.indexOf(row));
        button.setAttribute('data-column', row.indexOf(cell));
        display.append(button);
      })
    })
  }

  const handleClickOnDisplay = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if (!selectedRow || !selectedColumn) {
      return;
    }
    if (game.getBoard()[selectedRow][selectedColumn].getValue() != '') {
      return;
    }
    let isGameOver = game.playRound(selectedRow, selectedColumn);
    updateDisplay();
    if (isGameOver != undefined) {
      winner.textContent = isGameOver;
      // game = GameController();
      updateDisplay();
    }
  }

  display.addEventListener('click', handleClickOnDisplay);

  updateDisplay();
  
})();





