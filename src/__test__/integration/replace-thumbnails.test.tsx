import {Provider} from "react-redux";
import React from "react";

import {ThumbnailHider} from "../../thumbnail-hider";
import {
  getEffectStore,
  getTotalThumbnailsHidden,
} from "../../redux/modules/rxjsEpics";
import {initializeEffectStore} from "../../redux/modules/effectStore";
import {initializeStoreIntoDOM} from "../..";
import {insertYouTubeHTML} from "../youtube-tools";
import configureStore from "redux-mock-store"; //ES6 modules
import {userActions} from "../../thumbnail-hider.test";
import store from "../../redux/modules/store";
import DOMSelectors from "../../tools/youtube-element-selectors";

const youtubeThumbnailSelector = DOMSelectors.thumbnailSelector;
jest.setTimeout(10 * 1000);

test("initialize by replacing all thumbnails", (done) => {
  insertYouTubeHTML();
  initializeEffectStore();
  initializeStoreIntoDOM({
    onComplete: () => {
      const totalThumbnailsInMockDocument = document.querySelectorAll(
        youtubeThumbnailSelector,
      ).length;

      expect(DOMSelectors.getAllThumbnails(document)).toHaveLength(74);
      expect(getEffectStore().elementPairs).toHaveLength(
        totalThumbnailsInMockDocument,
      );
      expect(getTotalThumbnailsHidden(getEffectStore())).toEqual(
        totalThumbnailsInMockDocument,
      );
      done();
    },
  });
});

const makeMockStore = configureStore();
test.only("hide and show some thumbnails", (done) => {
  insertYouTubeHTML();
  initializeEffectStore();
  initializeStoreIntoDOM({
    onComplete: () => {},
  });
  //TODO figure out how to put this in the on complete function
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
  done();
});
test("element is in DOM", (done) => {
  const testString = "* testString *";

  insertYouTubeHTML();
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
    onComplete: () => {
      const containerElement = getEffectStore().elementPairs[0]
        .reactComponentContainer;
      expect(containerElement.innerHTML).toContain(testString);

      done();
    },
  });
});

test("hide and show some thumbnails as user", (done) => {
  insertYouTubeHTML();
  initializeEffectStore();
  initializeStoreIntoDOM({
    onComplete: () => {
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
      done();
    },
  });
});
