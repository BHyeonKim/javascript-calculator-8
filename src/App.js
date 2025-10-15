import { Console } from '@woowacourse/mission-utils';

const START_SPLITTER = '//';
const END_SPLITTER = '\\n';

const SPLITTER_LENGTH = START_SPLITTER.length;
const DELIMITER_CHARACTER_LENGTH = 1;

const START_SPLITTER_POSITION = 0;
const END_SPLITTER_POSITION = SPLITTER_LENGTH + DELIMITER_CHARACTER_LENGTH;

const SPLITTER_NOT_EXISTS = -1;

class App {
  async run() {
    const userInput = await this.getUserInput();

    const [delimiter, numString] =this.parseStringToDelimiterAndNumberString(userInput);

    Console.print('구분자 : ' + delimiter);
    Console.print('숫자배열 : ' + numString);
  }

  async getUserInput(){
    try{
      const userInput = await Console.readLineAsync('덧샘할 문자열을 입력해 주세요.\n');
      
      return userInput;
    } catch (error){
      throw new Error('입력과정에서 오류가 발생했습니다.');
    }
  }

  parseStringToDelimiterAndNumberString(string){
    const startIndexOfSplitter = string.indexOf(START_SPLITTER);
    const endIndexOfSplitter = string.indexOf(END_SPLITTER);
    

    if(startIndexOfSplitter === SPLITTER_NOT_EXISTS && endIndexOfSplitter === SPLITTER_NOT_EXISTS){
      return [null, string];
    }


    if(startIndexOfSplitter === START_SPLITTER_POSITION && endIndexOfSplitter === END_SPLITTER_POSITION ){
      const delimiter = string.slice(startIndexOfSplitter + SPLITTER_LENGTH, endIndexOfSplitter);
      const numberString = string.slice(endIndexOfSplitter + SPLITTER_LENGTH);

      return [delimiter, numberString]
    }else{
      throw new Error('구분자의 입력이 잘못되었습니다.')
    }
  }

  generateSplitFunction(delimiter = ''){
    return function(string){
      return string.split(delimiter)
    }
  }
}



export default App;
