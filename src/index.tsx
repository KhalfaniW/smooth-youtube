import {Provider} from "react-redux";
import React from "react";

import {ThumbnailHider} from "./thumbnail-hider";
import store from "./redux/modules/store";
interface InitializerSettings {
  onComplete: () => void;
  renderAtThumbnailIndex: (index: number) => JSX.Element;
  currentDocument: Document;
}
export function initializeStoreIntoDOM(
  {
    renderAtThumbnailIndex = (index: number) => (
      <Provider store={store}>
        <ThumbnailHider index={index} />
      </Provider>
    ),
    currentDocument = document,
    onComplete = () => {},
  }: InitializerSettings = {
    renderAtThumbnailIndex: (index: number) => (
      <Provider store={store}>
        <ThumbnailHider index={index} />
      </Provider>
    ),
    currentDocument: document,
    onComplete: () => {},
  },
) {
  store.dispatch({
    type: "RESET",
  });

  store.dispatch({
    type: "INITIALIZE",
    document: currentDocument,
    onComplete,
    renderAtIndex:
      renderAtThumbnailIndex ||
      ((index: number) => (
        <Provider store={store}>
          <ThumbnailHider index={index} />
        </Provider>
      )),
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
