const {
  validate,
  findInputError,
  isGameFinished,
  checkPlayersName,
  askQuestions,
} = require("../src/index");

const { emptyBoard, validInputFields, inputQuestions } = require("./utils");

const inquirer = require("inquirer");

describe("validate()", () => {
  const boardUnderTest = { ...emptyBoard, 1: "X", 2: "O", 3: "X", 4: "X" };
  test("should return FALSE if field has some value", () => {
    const expectedFiledValid = false;

    const isFieldValid = validate(boardUnderTest, 1);

    expect(isFieldValid).toBe(expectedFiledValid);
  });

  test("should return TRUE if field has no value", () => {
    const expectedFieldValid = true;

    const isFieldValid = validate(boardUnderTest, 5);

    expect(isFieldValid).toBe(expectedFieldValid);
  });
});

describe("findInputError()", () => {
  test('should return "Invalid input: out of range" if is not in range', () => {
    const expectedErrorMessage =
      "Invalid input: those coordinates are outside the playable area";

    const invalidFieldRange = "1 4";

    const errorMessage = findInputError(validInputFields, invalidFieldRange);

    expect(errorMessage).toBe(expectedErrorMessage);
  });

  test('should return "Invalid input: space is already taken" if is in range but taken', () => {
    const expectedErrorMessage = "Invalid input: that space is already taken";

    const validFieldInput = "3 3";

    const errorMessage = findInputError(validInputFields, validFieldInput);

    expect(errorMessage).toBe(expectedErrorMessage);
  });
});

describe("isGameFinished()", () => {
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
  test("should return TRUE if all fields filled out with values", () => {
    const gameFinished = true;
    const isFinished = isGameFinished(fullBoard);
    expect(isFinished).toBe(gameFinished);
  });
});

describe("checkPlayersName()", () => {
  const expectedState = {
    player1: {
      name: "Player 1",
      value: "X",
    },
    player2: {
      name: "Player 2",
      value: "O",
    },
  };
  test("should return first player's name", () => {
    const playerX = expectedState.player1.value;

    const player = checkPlayersName("X");

    expect(player).toBe(playerX);
  });

  test("should return second player's name ", () => {
    const playerO = expectedState.player2.value;

    const player = checkPlayersName("O");

    expect(player).toBe(playerO);
  });
});

describe("askQuestions()", () => {
  jest.mock("inquirer");

  test("should check users name inputs", async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({
      firstName: "Player 1",
      secondName: "Player 2",
    });

    const expectedOutput = {
      firstName: "Player 1",
      secondName: "Player 2",
    };

    await expect(askQuestions(inputQuestions)).resolves.toEqual(expectedOutput);
  });
});
