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

```text
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

#### Redis 설치

책에서 나오는 XMPP 프로토콜 대신 Redis 사용하기 때문에 Redis를 설치해준다

\[MAC 기준\] Redis 설치

```bash
brew install redis
```

Redis 구동

```bash
redis-server
```

Redis CLI Client로 테스트

```bash
redis-cli
```

#### sniper.cy.ts 구현

책을 보며 sniper.cy.ts를 구현한다
Application Runner와 테스트코드를 작성한다.

```typescript
class ApplicationRunner {
  private driver: AuctionSniperDriver | null; // java가 null을 지원하다보니 이렇게..

  constructor() {
    this.driver = new AuctionSniperDriver(1000);
  }
  public startSellingItem(auction: any) {
    this.driver?.showsSniperStatus('joining'); // ES6 symbol을 넣고 싶다.
  }

  public showsSniperHasLostAuction() {
    this.driver?.showsSniperStatus('lost');
  }
}
```

```typescript
describe('Auction sniper e2e test', () => {
  let auction: FakeAuctionServer;
  let application: ApplicationRunner;

  beforeEach(() => {
    auction = new FakeAuctionServer('item-54321');
    application = new ApplicationRunner();
  });

  it('sniper joins auction util autcion closes', () => {
    auction.startSellingItem();
    application.startSellingItem(auction);
    auction.hasReceivedJoinRequestFromSniper();
    auction.announceClosed();
    //application.showsSniperHasLostAuction();
  });
});
```

### 8. main.ts와 app(app/index.html) 구현

`app/index.html`를 만든다.

여기서 app.js를 불러와서 main 함수를 실행할 수 있도록 한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module">
      import Main from '/js/main.js';
      new Main();
    </script>
  </head>
  <body></body>
</html>
```

### 9. app 실행 스크립트 구현

app을 실행하기 위한 작업을 합니다.

#### 9-1. `package.json`에 스크립트 추가

```json
"scripts": {
  "app": "tsc-watch src/main.ts -t es6 --outDir app/js --onSuccess \"http-server app -p 3000\""
}
```

#### 9-2. app 실행

```bash
yarn app
```

코드의 변경이 일어날 때 마다 `app.js`에 자동으로 컴파일해준다.

#### 9-3. Fake Server와 Driver를 구현한다

- sniper.cy.ts
- fake-auction-server.ts
- auction-sniper-driver.ts

### 10. Test가 통과하도록 main함수를 만든다

src/main.ts

```typescript
export default class Main {
  constructor(itemId: string) {
    const status = document.createElement('div');
    status.id = 'sniper-status';
    status.textContent = 'joining';
    document.body.appendChild(status);
  }
}
```
