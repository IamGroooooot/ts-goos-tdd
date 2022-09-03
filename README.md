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

두 폴더가 생성되어 있어야 함

- fixtures/
- support/

### 5. npx tsc --init

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

cypress/e2e/sniper.cy.ts 생성

Ok run spec 실행

### 7. ../sniper.cy.ts 수정

> GOOS 책 - 101p, 102p
> 5단계로 이루어진다.
> 경매에서 품목 판매하고 ...
