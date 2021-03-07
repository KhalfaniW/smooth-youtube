import {Provider} from "react-redux";
import {injectReactInto, HTMLElementReplacementPair} from "inject-react";
import React, {ReactElement} from "react";
import ReactDOM from "react-dom";

import {RecommendationWrapper} from "./recommendation-wrapper";
import DOMSelectors from "./tools/youtube-element-selectors";
import store from "./redux/modules/store";

type Store = any;

interface InitializerSettings {
  onComplete?: () => void;
  renderAtIndex?: (index: number) => JSX.Element;
  currentDocument?: Document;
  currentStore: Store;
}
export async function initializeIntoDOM(
  {
    currentStore = store,
    renderAtIndex = (index: number) => (
      <Provider store={currentStore}>
        <RecommendationWrapper index={index} />
      </Provider>
    ),
    currentDocument,
    onComplete = () => {},
  }: InitializerSettings = {
    currentStore: store,
    renderAtIndex: (index: number) => (
      <Provider store={currentStore}>
        <RecommendationWrapper index={index} />
      </Provider>
    ),
    currentDocument: document,
    onComplete: () => {},
  },
) {
  DOMSelectors.getAllThumbnails(currentDocument!).forEach(
    (element, thumbnailIndex) => {
      const elementPair = injectElement({
        currentDocument: document!,
        jsx: renderAtIndex(thumbnailIndex),
        index: thumbnailIndex,
      });
    },
  );
}

function injectElement({
  currentDocument,
  jsx,
  index = 2,
}: {
  currentDocument: Document;
  jsx: ReactElement;
  index: number;
}): HTMLElementReplacementPair {
  const thumbnailContainer = DOMSelectors.getAllThumbnails(currentDocument)[
    index
  ] as HTMLElement;
  const originalThumbnail = thumbnailContainer.querySelector<HTMLElement>(
    "#thumbnail",
  );

  const thumbnailReplacementPair: HTMLElementReplacementPair = injectReactInto({
    immediateParentNode: thumbnailContainer,
    nonRecursiveChildFilterFunction: (element: HTMLElement) => {
      return element === originalThumbnail;
    },
    previousElementPairs: [],
    renderAtIndex: (index: number) => jsx,
    ReactDomRenderFunction: ReactDOM.render,
  })[0];

  return thumbnailReplacementPair;
}
