# Recipe App _v 2.0_

![recipe2](https://user-images.githubusercontent.com/52827441/83368329-5fed7780-a3f3-11ea-9a59-06343d8edf05.gif)

음식 레시피를 검색하고 로컬스토리지를 통해 원하는 음식 정보와 재료 목록을 저장할 수 있는 web app 입니다.

## About RecipeApp v 2.0

[[v 1.0 repo 로 이동](https://github.com/seong7/recipe-app)]

## 주요 기능

- 음식 검색
- 음식 별 좋아요 기능
- 레시피 별 재료 목록 제공

## 부가 설명

- ES6+기반의 **Front-end** 프로젝트입니다.
- Jest 를 사용해 부분적인 **TDD** 를 시행하였습니다.
- 기존 Version 1.0 에서 코드의 유지보수성을 높이기 위해 **refactoring** 시행하여 Version 2.0 을 개발하였습니다.
- **MVC 패턴**과 **OOP 개념**에 맞춰 작성되었습니다.
- React.js 를 모티브로 **Component 단위의 구조**로 설계하였습니다.
- Redux 를 모티브로 **Global State Management** 를 도입하였습니다.
- build 를 위해 **Webpack** 을 사용했습니다.
- UX 를 향상 시키기 위해 다양한 **사용자 친화적 요소**를 추가했습니다.
- **반응형**으로 디자인 되었습니다.

## 기술 스택

- Javascript (ES6+)
- HTML5 / CSS3
- Babel / Webpack / Jest

## 명령어

```bash
- dependency 설치 :
$ npm install

- dependency version 업데이트 :
$ npm update

- webpack dev server 시작 (development mode) :
$ npm start

- test :
$ npm test

- 변경 사항 있을 때마다 자동 test :
$ npm run watch
```
