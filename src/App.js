import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const userInput = await this.getUserInput();

    Console.print('결과 : ' + userInput);
  }

  async getUserInput(){
    try{
      const userInput = await Console.readLineAsync('덧샘할 문자열을 입력해 주세요.\n');
      
      return userInput;
    } catch (error){
      throw new Error('입력과정에서 오류가 발생했습니다.');
    }
  }
}



export default App;
