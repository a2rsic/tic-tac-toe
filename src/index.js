const inquirer = require("inquirer");
const colors = require("colors");
const {
  emptyBoard,
  validInputFields,
  winCombinations,
  inputQuestions,
} = require("./utils");

const state = {
  player1: {
    name: "X",
    value: "X",
  },
  player2: {
    name: "O",
    value: "O",
  },
  board: { ...emptyBoard },
};

function askQuestions(questions) {
  return inquirer.prompt(questions);
}

function createBoard(board) {
  return (
    "\n" +
    " " +
    board[1] +
    " | " +
    board[2] +
    " | " +
    board[3] +
    "\n" +
    " " +
    board[4] +
    " | " +
    board[5] +
    " | " +
    board[6] +
    "\n" +
    " " +
    board[7] +
    " | " +
    board[8] +
    " | " +
    board[9] +
    "\n"
  );
}

function startGame() {
  print(
    "Game started : \n" +
      "    1     2     3 \n" +
      "1  1 1 | 1 2 | 1 3 \n" +
      "2  2 1 | 2 2 | 2 3 \n" +
      "3  3 1 | 3 2 | 3 3 \n"
  );

  askQuestions(inputQuestions).then((answers) => {
    state.player1.name = answers["firstName"];
    state.player2.name = answers["secondName"];
    playerTurn(state.player1.value);
  });
}

function updateBoard(board, position, mark) {
  board[position] = mark.toUpperCase();
  return board;
}

function playerTurn(player) {
  const coordinatesQuestions = [
    {
      message: `Your turn ${getPlayersName(player)}, enter coordinates`,
      name: "coordinates",
      validator: /[0-9 ]+/,
      warning:
        "Invalid input: you must enter the x and y coordinates separated by spaces",
      required: true,
    },
  ];

  inquirer.prompt(coordinatesQuestions).then((result) => {
    const value = result["coordinates"].trim();
    const position = Object.keys(validInputFields)[
      Object.values(validInputFields).indexOf(value)
    ];

    if (validate(state.board, position)) {
      const updatedBoard = updateBoard(state.board, position, player);
      const currentBoard = createBoard(updatedBoard);

      print(currentBoard);

      checkGameScore(player, currentBoard, winCombinations);
    } else {
      const error = findInputError(validInputFields, value);
      print(error, "red");
      playerTurn(player);
    }
  });
}

function checkGameScore(player, board, combinations) {
  if (checkWinner(player, board, combinations)) {
    print(`You won ${getPlayersName(player)}`);
    return "done";
  } else if (isGameFinished(board)) {
    print("Game Tie");
    return "tie";
  }
  const nextPlayer = player === "X" ? "O" : "X";
  playerTurn(nextPlayer);
}

function findInputError(validFields, value) {
  const values = Object.values(validFields);
  const validField = values.includes(value);
  if (!validField) {
    return "Invalid input: those coordinates are outside the playable area";
  } else {
    return "Invalid input: that space is already taken";
  }
}

function checkWinner(player, board, combinations) {
  for (let i = 0; i < combinations.length; i++) {
    let mark = 0;
    for (let j = 0; j < combinations[i].length; j++) {
      if (board[combinations[i][j]] === player) {
        mark++;
      }
      if (mark === 3) {
        return true;
      }
    }
  }
  return false;
}
function isGameFinished(board) {
  const isEndGame = Object.values(board).every((el) => el.trim());
  return isEndGame;
}

function validate(board, position) {
  return board[position] === " ";
}

function getPlayersName(player) {
  if (player === "X") {
    return state.player1.name;
  } else {
    return state.player2.name;
  }
}

function print(message, color = "green") {
  console.log(colors[color].bold(message));
}

startGame();

module.exports = {
  validate,
  findInputError,
  isGameFinished,
  getPlayersName,
  askQuestions,
  updateBoard,
  checkWinner,
  checkGameScore,
};
