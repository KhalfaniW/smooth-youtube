import "./index.css";

import {Provider} from "react-redux";
import {range} from "lodash";
import React from "react";

import {Thing, Thing2} from "./App";
import {
  injectElement,
  showOriginalElement,
  showReactElement,
  ElementShown,
} from "./replace-element";
import store from "./redux/modules/store";

const dispatch = 5,
  appState = 2;

let pairs: any = [];
function handleStoreChange() {
  const currentStore = store.getState();
  if (pairs.length < 1) return;

  showOriginalElement({elementPair: pairs[0]});
}

const unsubscribe = store.subscribe(handleStoreChange);

pairs = [
  injectElement({
    currentDocument: document,
    jsx: (
      <>
        <Provider store={store}>
          <br />
          <Thing dispatch={dispatch} appState={appState} />
        </Provider>
      </>
    ),
    index: 0,
  }),
  injectElement({
    currentDocument: document,
    jsx: (
      <>
        <Provider store={store}>
          <Thing2 dispatch={dispatch} appState={appState} />
        </Provider>
      </>
    ),
    index: 1,
  }),
  injectElement({
    currentDocument: document,
    jsx: (
      <>
        <br />
        <Provider store={store}>
          <Thing2 dispatch={dispatch} appState={appState} />
        </Provider>
      </>
    ),
    index: 2,
  }),
];
/* window["debug"] = {
 *   pairs,
 *   showReactElement,
 *   run: () =>
 *     pairs.forEach((pair) => {
 *       showReactElement({elementPair: pair});
 *     }),
 * }; */
pairs.forEach((pair) => {
  /* showReactElement({elementPair: pair}); */
});
setTimeout(() => {
  console.log(pairs);
}, 2000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
