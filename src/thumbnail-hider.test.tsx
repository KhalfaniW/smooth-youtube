import {Provider} from "react-redux";
import {
  fireEvent,
  getByText,
  getAllByText,
  queryByText,
} from "@testing-library/react";
import React from "react";

import {ActionNames, ThumbnailHider} from "./thumbnail-hider";
import {
  getEffectStore,
  getTotalThumbnailsHidden,
} from "./redux/modules/rxjsEpics";
import {injectElement, showReactElement} from "./replace-element";
import {insertYouTubeHTML} from "./__test__/youtube-tools";
import configureStore from "./redux/configure-store";

export const userActions = {
  hideThumbnail: (container: HTMLElement) => {
    const hideThumbnailButton = getByText(
      container,
      ActionNames.hideThumbnailButtonText,
    );
    fireEvent.click(hideThumbnailButton);
  },
  getIsThumbnailShown: (container: HTMLElement) => {
    return queryByText(container, "Thumbnail Is Shown") !== null;
  },
  showThumbnailAtIndex: (container: HTMLElement, index: number) => {
    const showThumbnailButton = getAllByText(
      container,
      ActionNames.showThumbnailButtonText,
    )[index];

    fireEvent.click(showThumbnailButton);
  },
  hideThumbnailAtIndex: (container: HTMLElement, index: number) => {
    const hideThumbnailButton = getAllByText(
      container,
      ActionNames.hideThumbnailButtonText,
    )[index];

    fireEvent.click(hideThumbnailButton);
  },
};

test("replacement item can be clicked", () => {
  const mockFunction = jest.fn(() => {});
  insertYouTubeHTML();

  const reactOriginalPair = injectElement({
    currentDocument: document,
    jsx: (
      <button onClick={mockFunction}>
        {ActionNames.hideThumbnailButtonText}
      </button>
    ),
    index: 0,
  });
  showReactElement({elementPair: reactOriginalPair});

  userActions.hideThumbnail(reactOriginalPair.reactComponentContainer);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

test("replace 1 then show thumbnail", () => {
  insertYouTubeHTML();
  const store = configureStore();
  //TODO fix

  const elementPair = injectElement({
    currentDocument: document,
    jsx: (
      <Provider store={store}>
        <ThumbnailHider index={0} />
      </Provider>
    ),
    index: 0,
  });

  expect(userActions.getIsThumbnailShown(elementPair.reactComponentContainer));

  userActions.hideThumbnail(elementPair.reactComponentContainer);
  userActions.hideThumbnail(elementPair.reactComponentContainer);
  /* expect(userActions.getIsThumbnailShown(elementPair.reactComponentContainer));  */
});
test("replace 10 then show 5 thumbnails", () => {
  //TODO find in timemachine
  // expect().toBe();
});
