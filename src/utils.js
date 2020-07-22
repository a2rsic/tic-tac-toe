const emptyBoard = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};
const validInputFields = {
  1: "1 1",
  2: "1 2",
  3: "1 3",
  4: "2 1",
  5: "2 2",
  6: "2 3",
  7: "3 1",
  8: "3 2",
  9: "3 3",
};

const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const inputQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "Enter name of first player:",
    default: "X",
  },
  {
    type: "input",
    name: "secondName",
    message: "Enter  name of second player:",
    default: "O",
  },
];

module.exports = {
  emptyBoard,
  validInputFields,
  winCombinations,
  inputQuestions,
};
