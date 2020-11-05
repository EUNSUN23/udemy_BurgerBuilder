##Code Review (11.04)

#####burger-builder redux적용하며 배운점

\*\*어떤 state를 redux로 관리할 것인가?

-로컬 ui state (ex: 백드롭,모달 show/hide) : redux가 거의 필요없음

-어플리케이션이 종료되어 사라져도 무방한 데이터를 다루는 state (ex: posts, all users, burger orders)
:redux 적용가능

-페이지 렌더링에 중복적으로 필요한 client state
(ex: 유저의 authentication여부, 유저가 적용한 화면필터 등) : redux적용 가능

\*\*aciton명 수기로 입력하지 말고 js파일로 만들고 import해서 사용하기.

#####redux로 재료(ingredients), 가격(price) state 관리하기

-reducer.js에서 add, remove 액션에 따라 store에 저장된 재료와 가격 state를 바꿔주고,
Checkout.js(햄버거 주문내역 확인), Contact.js(주문자 정보& order내역 db에 전송)에서 이 state를 직접 끌어씀. (connect)

#####적용하면서 해결한 에러

######1. 리덕스, 리액트 버전 충돌

> WEBPACK_IMPORTED_MODULE_0_react\_\_\_default.a.createContext is not a function

이유&해결)
redux 최신버전 (v6.0.0)은 리액트(v16.4)로부터 제공되는 최신 context api를 사용한다고 한다.
내가 사용하고 있는 리액트는 한단계 이전버전이므로,
redux를 downgrade하거나 react, react dom을 upgrade시켜야함.

\*\*리액트 업그레이드 명령어:

`yarn upgrade react react-dom` or
`npm update react react-dom`

######2. redux의 compose method(connect할 때 유용)

예시1)

> import { createStore, applyMiddleware, compose } from 'redux'
> import thunk from 'redux-thunk'
> import DevTools from './containers/DevTools'
> import reducer from '../reducers'
> ...
> const store = createStore(
> reducer,
> compose(applyMiddleware(thunk), DevTools.instrument()) )

예시2)

> compose(
> withRouter,
> connect(mapStateToProps, mapDispatchToProps)
> )(App);
