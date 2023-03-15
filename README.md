# webflux-crud-front
webflux-crud-back을 실행하고 결과볼 수 있는 간단한 front
### backend source
[webflux-crud-back](https://github.com/m3rri/webflux-crud-back)
### 테스트 순서
1. chrome_cors.bat 실행(cors 정책을 disabled 상태로 변경하고 chrome을 실행하도록 함)
2. analysis.html 오픈
3. USER NAME 입력 (입력 안하면 undefined로 들어감)(이 단계 이후 바로 MONITOR START 할 수 있음)  
   `a1`이 입력되어있는 element에는 `a1`~`a3` 입력해볼 수 있음  
   ID 수기로 숫자 입력 (primary key)
4. UNIT START는 1개만 add~update 현황 볼 수 있음
5. BULK START는 좌측 element 입력한 숫자 이상 ~ 우측 element 입력한 숫자 이하의 값을 add~update 해줌
6. MONITOR START 하면 비어있는 아래쪽 공간에 list가 실시간으로 update됨
