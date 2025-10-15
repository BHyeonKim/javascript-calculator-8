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

    const split = this.generateCustomSplitFunction(delimiter);

    const parsedArr = split(numString);
    const numArr = this.convertArrToNumArr(parsedArr);

    const result = numArr.reduce((acc, val) => acc + val, 0);

    Console.print('결과 : ' + result);
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

  generateCustomSplitFunction(delimiter = ''){
    return function(string){
      let regxString = ',|;'

      if(delimiter){
        regxString += '|' + delimiter
      }

      const regx = new RegExp(regxString)

      return string.split(regx)
    }
  }

  convertArrToNumArr(arr){
    if(!Array.isArray(arr)){
      throw new Error('배열이 아닙니다.');
    }

    const numArr = [];

    for(const item of arr){
      const num = Number(item);

      if(Number.isNaN(num)){
        throw new Error('배열에 숫자가 아닌 값이 들어있습니다.');
      }

      if(num <= 0){
        throw new Error('숫자는 양수만 가능합니다.')
      }

      numArr.push(num);
    }

    return numArr;
  }
}



export default App;
