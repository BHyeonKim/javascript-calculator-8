import CONSTANTS from './constants.js';
import MESSAGE from './messages.js';
import Utils from './utils.js'

class App {
  async run() {
    try {
      const userInput = await Utils.getUserInput();

      const [delimiter, numString] =
        this.#parseStringToDelimiterAndNumberString(userInput);

      const split = this.#generateCustomSplitFunction(delimiter);

      const parsedArr = split(numString);
      const numArr = this.#convertArrToNumArr(parsedArr);

      const result = numArr.reduce((acc, val) => acc + val, 0);

      Utils.printResult(`결과 : ${result}`);
    } catch (error) {
      let errorMessage = '[ERROR]';

      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += MESSAGE.ERROR_RUNTIME;
      }

      throw new Error(errorMessage);
    }
  }

  #parseStringToDelimiterAndNumberString(string) {
    const startIndexOfSplitter = string.indexOf(CONSTANTS.START_SPLITTER);
    const endIndexOfSplitter = string.indexOf(CONSTANTS.END_SPLITTER);

    if (
      startIndexOfSplitter === CONSTANTS.SPLITTER_NOT_EXISTS &&
      endIndexOfSplitter === CONSTANTS.SPLITTER_NOT_EXISTS
    ) {
      return [null, string];
    }

    if (
      startIndexOfSplitter === CONSTANTS.START_SPLITTER_POSITION &&
      endIndexOfSplitter === CONSTANTS.END_SPLITTER_POSITION
    ) {
      const delimiter = string.slice(
        startIndexOfSplitter + CONSTANTS.SPLITTER_LENGTH,
        endIndexOfSplitter,
      );
      const numberString = string.slice(endIndexOfSplitter + CONSTANTS.SPLITTER_LENGTH);

      return [delimiter, numberString];
    }
    throw new Error(MESSAGE.ERROR_INPUT_WRONG_DELIMITER);
  }

  #generateCustomSplitFunction(delimiter = '') {
    return (string) => {
      let regxString = ',|:';

      if (delimiter) {
        regxString += `|${delimiter}`;
      }

      const regx = new RegExp(regxString);

      return string.split(regx);
    };
  }

  #convertArrToNumArr(arr) {
    if (!Array.isArray(arr)) {
      throw new Error(MESSAGE.ERROR_NOT_ARRAY);
    }

    return arr.map((item) => {
      const num = Number(item);

      if (Number.isNaN(num)) {
        throw new Error(MESSAGE.ERROR_NOT_NUMBER);
      }

      if (num <= 0) {
        throw new Error(MESSAGE.ERROR_ONLY_POSITIVE);
      }

      return num;
    });
  }
}

export default App;
