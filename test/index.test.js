const { checkPlayersName } = require("../src/index");
const { startGame } = require("../src/index");
const { isGameFinished } = require("../src/index");
const { checkWinner } = require("../src/index");
const { makeBoard } = require("../src/index");
const { playerTurn } = require("../src/index");
const { validate } = require("../src/index");
const { checkFieldRange } = require("../src/index");
const { board } = require("../src/index");
const { winCombinations } = require("../src/index");

const mockFn = jest.fn();

const boardUnderTest = {
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

const fieldsRangeUnderTest = {
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

test("validate() should return false if field has some value", () => {
  const fullBoard = {
    1: "X",
    2: "X",
    3: "X",
    4: "X",
    5: "X",
    6: "X",
    7: "X",
    8: "X",
    9: "X",
  };

  const expectedFiledValid = false;
  const isFieldValid = validate(fullBoard, 1);
  expect(isFieldValid).toBe(expectedFiledValid);
});

test("validate() should return true if field has no value", () => {
  const fullBoardTest = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };

  const expectedFieldValid = true;
  const isFieldValid = validate(1);
  expect(isFieldValid).toBe(expectedFieldValid);
});

test("checkFieldRange() should return false if is not valid field range", () => {
  const values = Object.values(fieldsRangeUnderTest).includes("1 4");

  // const validField =
});

// test("isGameFinished() should return true if all fields filled out with values", () => {
//   const fullBoard = {
//     1: "X",
//     2: "X",
//     3: "X",
//     4: "X",
//     5: "X",
//     6: "X",
//     7: "X",
//     8: "X",
//     9: "X",
//   };

//   const gameFinished = true;
//   const isFinished = isGameFinished(fullBoard);

//   expect(isFinished).toBe(gameFinished);
// });

test("should check is game not finished", () => {
  const endGame = Object.values(boardUnderTest).every((el) => el.trim());
  expect(endGame).not.toBeTruthy();
});

test("should check is game finished", () => {
  const endGame = Object.values(boardUnderTest).every((el) => !el.trim());
  expect(endGame).toBeTruthy();
});
