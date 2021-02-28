import {Provider} from "react-redux";
import {fireEvent, getAllByText, queryByText} from "@testing-library/react";
import React from "react";

import {ActionNames, ThumbnailHider} from "../../thumbnail-hider";
import {
  getEffectStore,
  getTotalThumbnailsHidden,
} from "../../redux/modules/rxjsEpics";

import {initializeEffectStore} from "../../redux/modules/effectStore";
import {insertYoutubeHtml} from "../youtube-tools";
import {showOriginalElement} from "../../replace-element";
import configureStore from "../../redux/configure-store";

const youtubeThumbnailSelector = "ytd-thumbnail";

const userActions = {
  hideThumbnailAtIndex: (container: HTMLElement, index: number) => {
    const showThumbnailButton = getAllByText(
      container,
      ActionNames.showThumbnail,
    )[index];
    fireEvent.click(showThumbnailButton);
  },
  getIsThumbnailShown: (container: HTMLElement) => {
    return queryByText(container, "Thumbnail Is Shown") !== null;
  },
};

const initalTestStore = configureStore();
test("initialize by replacing all thumbnails", () => {
  insertYoutubeHtml();

  initializeEffectStore();
  initalTestStore.dispatch({
    type: "INITIALIZE",
    document: document,
    renderAtIndex: (index: number) => {
      <Provider store={initalTestStore}>
        <ThumbnailHider index={index} />
      </Provider>;
    },
  });

  const totalThumbnailsInMockDocument = document.querySelectorAll(
    youtubeThumbnailSelector,
  ).length;

  expect(getEffectStore().elementPairs.length).toBe(
    totalThumbnailsInMockDocument,
  );
  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument,
  );
});

test("hide and show some thumbnails", () => {
  insertYoutubeHtml();
  initializeEffectStore();

  initalTestStore.dispatch({
    type: "INITIALIZE",
    document: document,
    renderAtIndex: (index: number) => {
      <Provider store={initalTestStore}>
        <ThumbnailHider index={index} />
      </Provider>;
    },
  });

  const totalThumbnailsInMockDocument = document.querySelectorAll(
    youtubeThumbnailSelector,
  ).length;

  [1, 2, 3].forEach((index) => {
    initalTestStore.dispatch({
      type: "SHOW_THUMBNAIL",
      index,
    });
  });

  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument - 3,
  );
  [2, 3, 40].forEach((index) => {
    initalTestStore.dispatch({
      type: "HIDE_THUMBNAIL",
      index,
    });
  });

  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument - 3,
  );
});
