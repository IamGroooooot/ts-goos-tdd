# GOOS 실습

## Dependency

```bash
yarn add -D cypress http-server tsc-watch typescript
```

## Cypress Setting

### 1. Cypress 실행

```bash
npx cypress open
# yarn npx cypress open
```

아래와 같이 출력되며 새로운 창이 떠야 함.

```text
It looks like this is your first time using Cypress: 10.7.0

✔  Verified Cypress! /Users/juhyeong/Library/Caches/Cypress/10.7.0/Cypress.app

Opening Cypress...
```

### 2. E2E Testing 선택

### 3. 아래의 continue 선택

### 4. Electron 선택

cypress 디렉터리 아래에 두 폴더가 생성되어 있어야 함

- fixtures/
- support/

### 5. tsconfig 설정

새로운 터미널을 열고

```bash
npx tsc --init
```

프로젝트용 tsconfig 생성

#### 5-1. 프로젝트용 tsconfig 설정

tsconfig.json

```json
// 생략
"compilerOptions": {
  "target": "ES2019",
  "lib": ["ES2019", "DOM"],
  "module": "ES2015" /* Specify what module code is generated. */,
  "moduleResolution": "node"
}
// 생략
```

#### 5-2. cypress용 tsconfig 설정

cypress/tsconfig.json

```json
{
  "extends": "../tsconfig.json", // tsconfig 상속
  "compilerOptions": {
    "types": ["node", "cypress"] // code completion을 위해 cypress 타입 추가
  }
}
```

### 6. Create new empty spec

다시 npx cpress open

#### 6-1. cypress/e2e/sniper.cy.ts 생성

#### 6-2. Ok run spec 실행

Create new empty spec

다음과 같이 떠야 함

```
Missing baseUrl in compilerOptions. tsconfig-paths will be skipped
GET /__/ 200 1.218 ms - -
GET /__/assets/index.5606b365.css 200 3.124 ms - -
GET /__/assets/index.664db1a2.js 200 7.265 ms - -
// ...
```

### 7. ../sniper.cy.ts 수정

GOOS 책 101p, 102p 참고해서 코드 작성

> 5단계로 이루어진다.
> \1. when an auction is selling an item, 2. And and Auctin sinper has started to bid that auction, 3. ...
