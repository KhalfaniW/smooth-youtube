import {ReactComponent} from "*.svg";
import React, {ReactElement} from "react";
import ReactDOM from "react-dom";

export interface HTMLElementReplacementPair {
  originalElementToReplace: HTMLElement;
  reactComponentContainer: HTMLElement;
}
export enum ElementShown {
  React = "React",
  Original = "Original",
}

/* export function injectElement({currentDocument: Document}) { */
export function injectElement({
  currentDocument,
  jsx,
  index = 1,
}: {
  currentDocument: Document;
  jsx: ReactElement;
  index: number;
}): HTMLElementReplacementPair {
  const {
    thumbnailContainer,
    originalThumbnail,
  } = getThumbnailAndThumbnailContainer({
    currentDocument,
    thumbnailIndex: index,
  });

  const reactThumbnailParent = buildReactComponentContainer({
    originalElementContainer: thumbnailContainer,
    currentDocument,
    jsx: jsx,
    elementIdName: "thumbnail",
  });
  const thumbnailReplacementPair: HTMLElementReplacementPair = {
    originalElementToReplace: originalThumbnail!,
    reactComponentContainer: reactThumbnailParent!,
  };
  /* showReactElement({elementPair: thumbnailReplacementPair}); */

  return thumbnailReplacementPair;
}

export function buildReactComponentContainer({
  originalElementContainer,
  currentDocument,
  jsx,
  elementIdName,
}: {
  originalElementContainer: HTMLElement;
  currentDocument: Document;
  jsx: ReactElement;
  elementIdName: string;
}): HTMLElement {
  const reactContainer = buildReactContainer({
    currentDocument,
    elementIdName,
  });
  originalElementContainer.appendChild(reactContainer);
  ReactDOM.render(jsx, reactContainer);
  return reactContainer;
}

export function getElementShown({
  elementPair,
}: {
  elementPair: HTMLElementReplacementPair;
}): ElementShown {
  const isOriginalHidden =
    elementPair.originalElementToReplace.style.visibility === "hidden";
  const isReactHidden =
    elementPair.originalElementToReplace.style.visibility === "react";

  if (isReactHidden && isOriginalHidden) {
    throw Error("Both react and originial elements are hidden");
  }
  if (!isReactHidden && !isOriginalHidden) {
    throw Error("Both react and originial elements are visibile");
  }

  if (isOriginalHidden) {
    return ElementShown.React;
  }

  return ElementShown.Original;
}
export function getThumbnailAndThumbnailContainer({
  currentDocument,
  thumbnailIndex,
}: {
  currentDocument: Document;
  thumbnailIndex: number;
}) {
  const thumbnailContainer = currentDocument.getElementsByTagName(
    "ytd-thumbnail",
  )[thumbnailIndex] as HTMLElement;
  const originalThumbnail = thumbnailContainer.querySelector<HTMLElement>(
    "#thumbnail",
  );
  return {
    thumbnailContainer,
    originalThumbnail,
  };
}
export function getReactComponent({
  elementPair,
}: {
  elementPair: HTMLElementReplacementPair;
}) {
  const reactElementParentWithOneReactChild =
    elementPair.reactComponentContainer;
  return reactElementParentWithOneReactChild.children[0];
}

function buildReactContainer({
  currentDocument,
  elementIdName,
}: {
  currentDocument: Document;
  elementIdName: string;
}) {
  const thumbnailReactContainer = currentDocument.createElement("div");
  thumbnailReactContainer.setAttribute(
    "name",
    `${elementIdName}-react-container`,
  );
  return thumbnailReactContainer;
}

export function showReactElement({
  elementPair,
}: {
  elementPair: HTMLElementReplacementPair;
}) {
  elementPair.originalElementToReplace.style.visibility = "hidden";
  elementPair.reactComponentContainer.style.visibility = "";
}

export function showOriginalElement({
  elementPair,
}: {
  elementPair: HTMLElementReplacementPair;
}) {
  elementPair.originalElementToReplace.style.visibility = "";
  elementPair.reactComponentContainer.style.visibility = "hidden";
}
