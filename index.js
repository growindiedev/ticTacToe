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

  const getPlayerSymbol = () =>
    round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol();

  // const getDisplaySymbol = () =>
  //   round % 2 === 1 ? playerO.getSymbol() : playerX.getSymbol();

  return {
    playRound,
    getPlayerSymbol,
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
