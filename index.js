const gameBoard = () => {
  let board = ["", "", "", "", "", "", ""];
};

function updateCell(e) {
  e.target.textContent = "X";
}

document
  .querySelectorAll(".grid-item")
  .forEach((item) => item.addEventListener("click", (e) => updateCell(e)));

// document
//   .getElementById("woof")
//   .addEventListener("click", (e) => (e.target.textContent = "ewd"));
