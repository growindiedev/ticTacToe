const Player = (sign) => {
  const symbol = sign;

  const getSymbol = () => {
    return symbol;
  };

  return { getSymbol };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setGridCell = (index, symbol) => {
    if (index > board.length) return;
    board[index] = symbol;
    console.log("ray", board);
  };

  const getGridCell = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { reset, setGridCell, getGridCell };
})();

const gameController = (() => {
  let playerX = Player("X");
  let playerO = Player("O");
  let round = 0;

  const playRound = (index) => {
    gameBoard.setGridCell(index, getPlayerSymbol());
    round++;
    console.log("round", round);
  };

  const decideWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    combos.forEach((row) => {
      let a = row[0],
        b = row[1],
        c = row[2];
      if (
        gameBoard.getGridCell(a) !== "" &&
        gameBoard.getGridCell(a) === gameBoard.getGridCell(b) &&
        gameBoard.getGridCell(b) === gameBoard.getGridCell(c)
      ) {
        alert("you won");
        // needs a dialog box
      }
    });
    //check board array with combinations with combos
    //https://stackoverflow.com/questions/58113438/javascript-tic-tac-toe-check-if-someone-won
  };

  const getPlayerSymbol = () =>
    round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol();

  return {
    playRound,
    getPlayerSymbol,
    decideWinner,
  };
})();

const displayController = (() => {
  function updateGridCell(e, item) {
    if (!e.target.textContent) {
      gameController.playRound(item.dataset.index);
      e.target.textContent = gameBoard.getGridCell(item.dataset.index);
      document.querySelector(
        ".status>p"
      ).textContent = `Player ${gameController.getPlayerSymbol()}'s turn`;
      gameController.decideWinner();
    }
  }

  function resetGrid() {
    gameBoard.reset();
    document
      .querySelectorAll(".grid-item")
      .forEach(
        (item) => (item.textContent = gameBoard.getGridCell(item.dataset.index))
      );
  }

  document.querySelectorAll(".grid-item").forEach((item) => {
    item.addEventListener("click", (e) => updateGridCell(e, item));
  });

  document.querySelector(".control-btn").addEventListener("click", resetGrid);
})();
