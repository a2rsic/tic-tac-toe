const prompt = require("prompt");
const inquirer = require("inquirer");
const colors = require("colors");

const state = {
  player1: {
    name: null,
    value: "X",
  },
  player2: {
    name: null,
    value: "O",
  },
  xIsNext: true,
};

const board = {
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

const fieldsRange = {
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

function createBoard() {
  print(
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

const questions = [
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

function startGame() {
  inquirer.prompt(questions).then((answers) => {
    state.player1.name = answers["firstName"] || "X";
    state.player2.name = answers["secondName"] || "O";
    playerTurn(state.player1.value);
  });
}

function makeBoard(position, mark) {
  board[position] = mark.toUpperCase();
}

function playerTurn(player) {
  const properties = [
    {
      message: `Your turn ${checkPlayersName(player)}, enter coordinates`,
      name: "coordinates",
      validator: /[0-9 ]+/,
      warning:
        "Invalid input: you must enter the x and y coordinates separated by spaces",
      required: true,
    },
  ];

  prompt.start();

  prompt.get(properties, function (error, result) {
    const value = result["coordinates"].trim();
    const position = Object.keys(fieldsRange)[
      Object.values(fieldsRange).indexOf(value)
    ];

    if (validate(position)) {
      makeBoard(position, player);
      createBoard();

      if (checkWinner(player)) {
        print(`You won ${checkPlayersName(player)}`);
        return;
      } else if (isGameFinished()) {
        print("Game Tie");
        return;
      }
      const nextPlayer = player === "X" ? "O" : "X";
      playerTurn(nextPlayer);
    } else {
      checkFieldRange(value);
      playerTurn(player);
    }
  });
}

function checkFieldRange(value) {
  const values = Object.values(fieldsRange);
  const validField = values.includes(value);

  if (!validField) {
    print(
      "Invalid input: those coordinates are outside the playable area",
      "red"
    );
  } else {
    print("Invalid input: that space is already taken", "red");
  }
}

function print(msg, color = "green") {
  console.log(colors[color].bold(msg));
}

// function checkPlayersMark(mark) {
//   if (state.xIsNext) {
//     return (mark = state.player1.value);
//   } else {
//     return (mark = state.player2.value);
//   }
// }

function checkPlayersName(player) {
  if (player === "X") {
    return state.player1.name;
  } else {
    return state.player2.name;
  }
}

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

function checkWinner(player) {
  for (let i = 0; i < winCombinations.length; i++) {
    let mark = 0;
    for (let j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        mark++;
      }
      if (mark === 3) {
        return true;
      }
    }
  }
  return false;
}

function isGameFinished() {
  const isEndGame = Object.values(board).every((el) => el.trim());
  return isEndGame;
}

function validate(position) {
  return board[position] === " ";
}

print(
  "Game started : \n" +
    "    1     2     3 \n" +
    "1  1 1 | 1 2 | 1 3 \n" +
    "2  2 1 | 2 2 | 2 3 \n" +
    "3  3 1 | 3 2 | 3 3 \n"
);

startGame();
