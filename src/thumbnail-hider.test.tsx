import {fireEvent, getByText} from "@testing-library/react";
import React from "react";

import {ActionNames} from "./thumbnail-hider";
import {
  HTMLElementReplacementPair,
  injectElement,
  showReactElement,
} from "./replace-element";
import {insertYoutubeHtml} from "./__test__/youtube-tools";
import configureStore from "./redux/configure-store";

const elementActions = {
  hideThumbnail: (container: HTMLElement) => {
    const showThumbnailButton = getByText(container, ActionNames.showThumbnail);
    fireEvent.click(showThumbnailButton);
  },
};

const initialStore = configureStore();

test("replacement item can be clicked", () => {
  const mockFunction = jest.fn(() => {});
  insertYoutubeHtml();

  const reactOriginalPair = injectElement({
    currentDocument: document,
    jsx: <button onClick={mockFunction}>{ActionNames.showThumbnail}</button>,
    index: 0,
  });
  showReactElement({elementPair: reactOriginalPair});

  elementActions.hideThumbnail(reactOriginalPair.reactComponentContainer);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

test("replace 1 then show thumbnail", () => {
  const mockFunction = jest.fn(() => {});
  insertYoutubeHtml();

  const reactOriginalPair = injectElement({
    currentDocument: document,
    jsx: <button onClick={mockFunction}>{ActionNames.showThumbnail}</button>,
    index: 0,
  });
  showReactElement({elementPair: reactOriginalPair});

  elementActions.hideThumbnail(reactOriginalPair.reactComponentContainer);

  expect(mockFunction).toHaveBeenCalledTimes(1);
  // expect().toBe();
});

test("replace 10 then show 5 thumbnails", () => {
  // expect().toBe();
});
