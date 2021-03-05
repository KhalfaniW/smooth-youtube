import {ReactElement} from "react";
import ReactDOM from "react-dom";
import DOMSelectors from "./tools/youtube-element-selectors";
import {
  hideOriginalElement,
  showOriginalElement,
  getIsOriginalElementHidden,
  injectReactInto,
  showReactElement,
  ElementShown,
  getElementShown,
} from "inject-react";
import * as ij from "inject-react";

export interface HTMLElementReplacementPair {
  originalElementToReplace: HTMLElement;
  reactComponentContainer: HTMLElement;
}

export {
  ElementShown,
  showReactElement,
  getIsOriginalElementHidden,
  hideOriginalElement,
  showOriginalElement,
  getElementShown,
};

export function injectElement({
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
