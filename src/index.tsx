import {Provider} from "react-redux";
import React from "react";

import {ThumbnailHider} from "./thumbnail-hider";
import store from "./redux/modules/store";

type Store = any;

interface InitializerSettings {
  onComplete?: () => void;
  renderAtThumbnailIndex?: (index: number) => JSX.Element;
  currentDocument?: Document;
  currentStore: Store;
}
export async function initializeStoreIntoDOM(
  {
    currentStore = store,
    renderAtThumbnailIndex = (index: number) => (
      <Provider store={currentStore}>
        <ThumbnailHider index={index} />
      </Provider>
    ),
    currentDocument = document,
    onComplete = () => {},
  }: InitializerSettings = {
    currentStore: store,
    renderAtThumbnailIndex: (index: number) => (
      <Provider store={currentStore}>
        <ThumbnailHider index={index} />
      </Provider>
    ),
    currentDocument: document,
    onComplete: () => {},
  },
) {
  currentStore.dispatch({
    type: "RESET",
  });
  await new Promise((resolve, reject) =>
    currentStore.dispatch({
      type: "INITIALIZE",
      document: currentDocument,
      onComplete: () => {
        onComplete();
        resolve(null);
      },
      renderAtIndex: renderAtThumbnailIndex,
    }),
  );
}
initializeStoreIntoDOM();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
