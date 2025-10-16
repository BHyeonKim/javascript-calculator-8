import { Console } from '@woowacourse/mission-utils';
import {
  END_SPLITTER,
  END_SPLITTER_POSITION,
  SPLITTER_LENGTH,
  SPLITTER_NOT_EXISTS,
  START_SPLITTER,
  START_SPLITTER_POSITION,
} from './constants';
import MESSAGE from './messages'

class App {
  async run() {
    try {
      const userInput = await this.getUserInput();

      const [delimiter, numString] =
        this.parseStringToDelimiterAndNumberString(userInput);

      const split = this.generateCustomSplitFunction(delimiter);

      const parsedArr = split(numString);
      const numArr = this.convertArrToNumArr(parsedArr);

      const result = numArr.reduce((acc, val) => acc + val, 0);

      Console.print(`결과 : ${result}`);
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

  async getUserInput() {
    try {
      const userInput = await Console.readLineAsync(
        `${MESSAGE.MESSAGE_INTRODUCE}\n`,
      );

      return userInput;
    } catch {
      throw new Error(MESSAGE.ERROR_INPUT);
    }
  }

  parseStringToDelimiterAndNumberString(string) {
    const startIndexOfSplitter = string.indexOf(START_SPLITTER);
    const endIndexOfSplitter = string.indexOf(END_SPLITTER);

    if (
      startIndexOfSplitter === SPLITTER_NOT_EXISTS &&
      endIndexOfSplitter === SPLITTER_NOT_EXISTS
    ) {
      return [null, string];
    }

    if (
      startIndexOfSplitter === START_SPLITTER_POSITION &&
      endIndexOfSplitter === END_SPLITTER_POSITION
    ) {
      const delimiter = string.slice(
        startIndexOfSplitter + SPLITTER_LENGTH,
        endIndexOfSplitter,
      );
      const numberString = string.slice(endIndexOfSplitter + SPLITTER_LENGTH);

      return [delimiter, numberString];
    }
    throw new Error(MESSAGE.ERROR_INPUT_WRONG_DELIMITER);
  }

  generateCustomSplitFunction(delimiter = '') {
    return function (string) {
      let regxString = ',|;';

      if (delimiter) {
        regxString += `|${delimiter}`;
      }

      const regx = new RegExp(regxString);

      return string.split(regx);
    };
  }

  convertArrToNumArr(arr) {
    if (!Array.isArray(arr)) {
      throw new Error(MESSAGE.ERROR_NOT_ARRAY);
    }

    const numArr = [];

    for (const item of arr) {
      const num = Number(item);

      if (Number.isNaN(num)) {
        throw new Error(MESSAGE.ERROR_NOT_NUMBER);
      }

      if (num <= 0) {
        throw new Error(MESSAGE.ERROR_ONLY_POSITIVE);
      }

      numArr.push(num);
    }

    return numArr;
  }
}

export default App;
