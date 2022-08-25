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

// function updateCell(e) {
//   e.target.textContent = "X";
//   console.log("why", e.target.dataset.index);
// }

const gameController = (() => {
  let playerX = Player("X");
  let playerO = Player("O");
  let round = 1;

  const playRound = (index) => {
    gameBoard.setGridCell(index, getPlayerSymbol());
    round++;
  };

  const getPlayerSymbol = () =>
    round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol();

  return {
    playRound,
  };
})();

const displayController = (() => {
  document.querySelectorAll(".grid-item").forEach((item) => {
    gameController.playRound(item.dataset.index);
    let symbol = gameBoard.getGridCell(item.dataset.index);
    item.addEventListener("click", (e) => setCellDisplay(e, symbol));
  });

  function setCellDisplay(e, symbol) {
    e.target.textContent = symbol;
    console.log("whoop");
  }
})();

// document
//   .querySelectorAll(".grid-item")
//   .forEach((item) =>
//     item.addEventListener(
//       "click",
//       gameBoard.setGridCell(e.target.dataset.index, "X")
//     )
//   );
