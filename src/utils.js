import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './messages';

async function getUserInput(promptMessage = MESSAGE.MESSAGE_INTRODUCE) {
  try {
    const userInput = await Console.readLineAsync(`${promptMessage}\n`);

    return userInput;
  } catch {
    throw new Error(MESSAGE.ERROR_INPUT);
  }
}

function printResult(result){
  Console.print(`결과 : ${result}`);
}

const Utils = {
  getUserInput,
  printResult
}

export default Utils