import {Provider} from "react-redux";
import React from "react";

import { ThumbnailHider } from '../../thumbnail-hider';
import {
  getEffectStore,
  getTotalThumbnailsHidden,
} from "../../redux/modules/rxjsEpics";
import {initializeEffectStore} from "../../redux/modules/effectStore";
import {initializeStoreIntoDOM} from "../..";
import {insertYoutubeHtml} from "../youtube-tools";
import { userActions } from '../../thumbnail-hider.test';
import store from "../../redux/modules/store";

const youtubeThumbnailSelector = "ytd-thumbnail";

test("initialize by replacing all thumbnails", () => {
  insertYoutubeHtml();

  initializeEffectStore();
  initializeStoreIntoDOM();

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
  initializeStoreIntoDOM();

  const totalThumbnailsInMockDocument = document.querySelectorAll(
    youtubeThumbnailSelector,
  ).length;

  [1, 2, 3].forEach((index) => {
    store.dispatch({
      type: "SHOW_THUMBNAIL",
      index,
    });
  });

  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument - 3,
  );
  [2, 3, 40].forEach((index) => {
    store.dispatch({
      type: "HIDE_THUMBNAIL",
      index,
    });
  });

  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument - 1,
  );
});
test("element is in DOM", () => {
  const testString = "* testString *";

  insertYoutubeHtml();
  initializeEffectStore();
  initializeStoreIntoDOM({
    renderAtThumbnailIndex: (index: number) => {
      return (
        <Provider store={store}>
          <ThumbnailHider index={0} />
          {testString}
        </Provider>
      );
    },
  });

  const containerElement = getEffectStore().elementPairs[0]
    .reactComponentContainer;
  expect(containerElement.innerHTML).toContain(testString);
});

test("hide and show some thumbnails as user", () => {
  insertYoutubeHtml();
  initializeEffectStore();
  initializeStoreIntoDOM();

  const totalThumbnailsInMockDocument = document.querySelectorAll(
    youtubeThumbnailSelector,
  ).length;

  [1].forEach((index) => {
    userActions.showThumbnailAtIndex(
      getEffectStore().elementPairs[index].reactComponentContainer,
      0,
    );
  });

  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument - 1,
  );

  [1].forEach((index) => {
    userActions.hideThumbnailAtIndex(
      getEffectStore().elementPairs[index].reactComponentContainer,
      0,
    );

    /* userActions.hideThumbnailAtIndex(document.body, index); */
  });

  expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
    totalThumbnailsInMockDocument,
  );

  /* [1, 2, 3].forEach((index) => {
     *   userActions.toggleThumbnailAtIndex(document.body, index);
     * });

     * expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
     *   totalThumbnailsInMockDocument - 3,
     * );

     * [2, 3].forEach((index) => {
     *   userActions.toggleThumbnailAtIndex(document.body, index);
     * });

     * expect(getTotalThumbnailsHidden(getEffectStore())).toBe(
     *   totalThumbnailsInMockDocument - 1,
     * ); */
});
