# javascript-calculator-precourse
## 기능 목록

> 문자열을 커스텀 구분자와 숫자 문자열로 파싱하여 튜플형태로 반환한다.
- [ ] 1. 시작 splitter(`//`)와 마지막 splitter(`\n`)의 시작 위치를 `startIndexOfSplitter`와 `endIndexOfSplitter`에 저장한다.
- [ ] 2. 시작 splitter(`//`)와 마지막 splitter(`\n`)가 둘다 존재하지 않으면(`SPLITTER_NOT_EXISTS`) 입력으로 들어온 문자열을 튜플 형태로 내보낸다.   
      (`string => [null, string]`)
- [ ] 3. 시작 splitter(`//`)와 마지막 splitter(`\n`)가 둘다 존재하고 정상 위치에 있으면 `delimiter`와 `numberString`을 파싱하고 리턴한다.   
      (`string => [delimiter, numberString]`)
- [ ] 4. 이외의 경우 입력이 잘못된 것으로 판단하여 Error를 Throw 한다.


> 쉼표(,) 또는 콜론(:)을 구분자로 가지는 문자열을 전달하는 경우 구분자를 기준으로 분리한 각 숫자의 합을 반환한다.

- [ ] 1. 입력값으로 주어진 문자열을 구분자를 기준으로 분리하여 반환한다.   
(`string => Array<string>`) 
- [ ] 2. 입력값으로 주어진 숫자의 합을 반환한다.   
(`Array<number> => number`)


> 앞의 기본 구분자(쉼표, 콜론) 외에 커스텀 구분자를 지정할 수 있다. 커스텀 구분자는 문자열 앞부분의 "//"와 "\n" 사이에 위치하는 문자를 커스텀 구분자로 사용한다.

- [ ] 1. 입력값으로 커스텀 구분자를 받아서, 커스텀 구분자를 기준으로 split하는 함수를 반환한다.   
(`string => Function`)

> 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시킨 후 애플리케이션은 종료되어야 한다.

- [ ] 1. 잘못된 입력값이 들어올 경우 Error를 Throw 한다.

## 실행 흐름
- [x] 1. 사용자의 입력값을 받습니다.   
(형식: "" => 0, "1,2" => 3, "1,2,3" => 6, "1,2:3" => 6, ?//;\n1;2;3" => 6)
- [ ] 2. 입력값을 구분자와 나머지 문자열로 파싱합니다.   
      2-1. 시작 splitter(`//`)와 마지막 splitter(`\n`)가 둘다 존재하지 않으면(`SPLITTER_NOT_EXISTS`) 커스텀 구분자가 없는것으로 판단하고 입력으로 들어온 문자열을 내보냅니다.   
      2-2. 시작 splitter(`//`)와 마지막 splitter(`\n`)가 둘다 존재하고 정상 위치에 있으면(`START_SPLITTER_POSITION` ,`END_SPLITTER_POSITION`) `delimiter`와 `numberString`을 파싱하고 리턴합니다.   
      2-3. 이외의 입력값은 오류로 판단하여 Error를 Throw 한다.
- [ ] 3. 주어진 구분자에 따라 split 함수를 생성합니다.
- [ ] 4. 나머지 문자열을 split 함수에 넘겨 숫자의 배열을 리턴받습니다.
- [ ] 5. 숫자를 다 더합니다.
- [ ] 6. 결과를 출력합니다.