const {
  validate,
  findInputError,
  isGameFinished,
  getPlayersName,
  askQuestions,
  updateBoard,
  checkWinner,
  checkGameScore,
} = require("../src/index");

const {
  emptyBoard,
  validInputFields,
  inputQuestions,
  winCombinations,
} = require("./utils");

const inquirer = require("inquirer");

describe("validate()", () => {
  const boardUnderTest = { ...emptyBoard, 1: "X", 2: "O", 3: "X", 4: "X" };
  test("should return FALSE if field has some value", () => {
    const expectedFiledValid = false;

    const isFieldValid = validate(boardUnderTest, 1);

    expect(isFieldValid).toBeFalsy();
    expect(isFieldValid).toBe(expectedFiledValid);
  });

  test("should return TRUE if field has no value", () => {
    const expectedFieldValid = true;

    const isFieldValid = validate(boardUnderTest, 5);

    expect(isFieldValid).toBeTruthy();
    expect(isFieldValid).toBe(expectedFieldValid);
  });
});

describe("checkGameScore()", () => {
  const boardUnderTest = { ...emptyBoard, 1: "X", 2: "O", 3: "X", 4: "X" };
  const winningBoard = { ...emptyBoard, 1: "X", 4: "X", 7: "X" };
  const tieBoard = {
    1: "X",
    2: "O",
    3: "X",
    4: "O",
    5: "X",
    6: "O",
    7: "X",
    8: "O",
    9: "X",
  };

  test("should return undefined if game is in progress", () => {
    const player = "X";
    const result = checkGameScore(player, boardUnderTest, winCombinations);

    expect(result).toBeUndefined();
  });

  test("should return 'done' if game have winner", () => {
    const player = "X";
    const expectedResult = "done";
    const result = checkGameScore(player, winningBoard, winCombinations);

    expect(result).toBe(expectedResult);
  });

  test("should return 'tie' if game not have a winner", () => {
    const player = "O";
    const expectedResult = "tie";
    const result = checkGameScore(player, tieBoard, winCombinations);

    expect(result).toBe(expectedResult);
  });
});

describe("findInputError()", () => {
  test('should return "Invalid input: out of range" if is not in range', () => {
    const expectedErrorMessage =
      "Invalid input: those coordinates are outside the playable area";

    const invalidFieldRange = "1 4";

    const errorMessage = findInputError(validInputFields, invalidFieldRange);

    expect(errorMessage).toBe(expectedErrorMessage);
    expect(errorMessage).not.toBe(" ");
  });

  test('should return "Invalid input: space is already taken" if is in range but taken', () => {
    const expectedErrorMessage = "Invalid input: that space is already taken";

    const validFieldInput = "3 3";

    const errorMessage = findInputError(validInputFields, validFieldInput);

    expect(errorMessage).toBe(expectedErrorMessage);
    expect(errorMessage).not.toBe(" ");
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

  const boardUnderTest = { ...emptyBoard, 1: "X", 2: "O", 3: "X", 4: "X" };

  test("should return TRUE if all fields filled out with values", () => {
    const gameFinished = true;

    const isFinished = isGameFinished(fullBoard);

    expect(isFinished).toBeDefined();
    expect(isFinished).toBeTruthy();
    expect(isFinished).toBe(gameFinished);
  });

  test("should return FALSE if all fields not filled out with values", () => {
    const gameFinished = false;

    const isFinished = isGameFinished(boardUnderTest);

    expect(isFinished).toBeDefined();
    expect(isFinished).toBeFalsy();
    expect(isFinished).toBe(gameFinished);
  });
});

describe("checkWinner()", () => {
  const winningBoard = { ...emptyBoard, 1: "X", 4: "X", 7: "X" };
  const inProgressBoard = { ...emptyBoard, 1: "X", 4: "O", 7: "X" };
  const tieBoard = {
    1: "X",
    2: "O",
    3: "X",
    4: "O",
    5: "X",
    6: "O",
    7: "X",
    8: "O",
    9: "X",
  };

  test("should return TRUE if have winner", () => {
    const winningPlayer = "X";
    const expectedResult = true;
    const output = checkWinner(winningPlayer, winningBoard, winCombinations);

    expect(output).toBeDefined();
    expect(output).toBe(expectedResult);
  });

  test("should return FALSE if game is in progress", () => {
    const player = "X";
    const expectedResult = false;
    const output = checkWinner(player, inProgressBoard, winCombinations);

    expect(output).toBeDefined();
    expect(output).toBe(expectedResult);
  });

  test("should return FALSE if game is tie", () => {
    const player = "O";
    const expectedResult = false;
    const output = checkWinner(player, tieBoard, winCombinations);

    expect(output).toBeDefined();
    expect(output).toBe(expectedResult);
  });

  test("should return FALSE if game just started", () => {
    const player = "X";
    const expectedResult = false;
    const output = checkWinner(player, emptyBoard, winCombinations);

    expect(output).toBeDefined();
    expect(output).toBe(expectedResult);
  });
});

describe("getPlayersName()", () => {
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

    const player = getPlayersName("X");

    expect(player).toBeDefined();
    expect(player).not.toBe(" ");
    expect(player).toBe(playerX);
  });

  test("should return second player's name ", () => {
    const playerO = expectedState.player2.value;

    const player = getPlayersName("O");

    expect(player).toBeDefined();
    expect(player).not.toBe(" ");
    expect(player).toBe(playerO);
  });
});

describe("updateBoard()", () => {
  test("should return board with filled space with appropriate mark", () => {
    const position = 1;
    const mark = "X";
    const currentBoard = { ...emptyBoard, [position]: mark };
    const filledBoard = updateBoard(emptyBoard, position, mark);

    expect(filledBoard[position]).not.toBe(" ");
    expect(filledBoard[position]).toBe(mark);
    expect(filledBoard).toEqual(currentBoard);
  });
});

describe("askQuestions()", () => {
  jest.mock("inquirer");

  const inputs = {
    firstName: "Player 1",
    secondName: "Player 2",
  };

  test("should check users name inputs", async () => {
    inquirer.prompt = jest.fn().mockResolvedValue(inputs);

    const expectedOutput = inputs;

    const answers = askQuestions(inputQuestions);

    await expect(answers).resolves.toEqual(expectedOutput);
    await expect(answers).resolves.not.toEqual({});
  });
});
