import {Provider} from "react-redux";
import React from "react";

import {ThumbnailHider} from "../../thumbnail-hider";
import {getTotalThumbnailsHidden} from "../../redux/modules/rxjsEpics";

import {initializeStoreIntoDOM} from "../..";
import {insertYouTubeHTML} from "../youtube-tools";
/* import configureStore from "redux-mock-store"; //ES6 modules */
import {userActions} from "../../thumbnail-hider.test";
import DOMSelectors from "../../tools/youtube-element-selectors";
import configureStore from "../../redux/configure-store";

jest.setTimeout(10 * 1000);

jest.mock("../../redux/modules/effectStore", () => ({
  ...jest.requireActual("../../redux/modules/effectStore"),
  updateEffectStore: jest.fn(),
  retrieveEffectStore: jest.fn(),
}));

import {
  EffectStore,
  updateEffectStore,
  retrieveEffectStore,
  createEffectStore,
} from "../../redux/modules/effectStore";

test("initialize by replacing all thumbnails", async () => {
  const store = configureStore();
  let effectStoreObject = new TestEffectStoreObject();
  const obtainEffectStore = () => effectStoreObject.retrieveEffectStore();

  insertYouTubeHTML();
  await initializeStoreIntoDOM({currentStore: store});

  const totalThumbnailsInMockDocument = document.querySelectorAll(
    DOMSelectors.thumbnailSelector,
  ).length;

  expect(DOMSelectors.getAllThumbnails(document)).toHaveLength(74);

  expect(obtainEffectStore().elementPairs).toHaveLength(
    totalThumbnailsInMockDocument,
  );

  expect(getTotalThumbnailsHidden(obtainEffectStore())).toEqual(
    totalThumbnailsInMockDocument,
  );
});

test("hide and show some thumbnails", async () => {
  insertYouTubeHTML();
  const store = configureStore();
  let effectStoreObject = new TestEffectStoreObject();
  const obtainEffectStore = () => effectStoreObject.retrieveEffectStore();

  await initializeStoreIntoDOM({currentStore: store});
  //TODO figure out how to put this in the on complete function
  const totalThumbnailsInMockDocument = document.querySelectorAll(
    DOMSelectors.thumbnailSelector,
  ).length;

  [1, 2, 3].forEach((index) => {
    store.dispatch({
      type: "SHOW_THUMBNAIL",
      index,
    });
  });

  expect(getTotalThumbnailsHidden(obtainEffectStore())).toBe(
    totalThumbnailsInMockDocument - 3,
  );
  [2, 3, 40].forEach((index) => {
    store.dispatch({
      type: "HIDE_THUMBNAIL",
      index,
    });
  });

  expect(getTotalThumbnailsHidden(obtainEffectStore())).toBe(
    totalThumbnailsInMockDocument - 1,
  );
});
test("element is in DOM", async () => {
  const testString = "* testString *";
  const store = configureStore();
  const effectStoreObject = new TestEffectStoreObject();
  const obtainEffectStore = () => effectStoreObject.retrieveEffectStore();

  insertYouTubeHTML();
  //initializeEffectStore();
  await initializeStoreIntoDOM({
    renderAtThumbnailIndex: (index: number) => {
      return (
        <Provider store={store}>
          <ThumbnailHider index={0} />
          {testString}
        </Provider>
      );
    },
    currentStore: store,
  });
  const containerElement = obtainEffectStore().elementPairs[0]
    .reactComponentContainer;
  expect(containerElement.innerHTML).toContain(testString);
});

test("hide and show some thumbnails as user", async () => {
  const store = configureStore();
  const effectStoreObject = new TestEffectStoreObject();
  const obtainEffectStore = () => effectStoreObject.retrieveEffectStore();

  insertYouTubeHTML();
  //initializeEffectStore();
  await initializeStoreIntoDOM({
    currentStore: store,
  });
  const totalThumbnailsInMockDocument = document.querySelectorAll(
    DOMSelectors.thumbnailSelector,
  ).length;

  [1].forEach((index) => {
    userActions.showThumbnailAtIndex(
      obtainEffectStore().elementPairs[index].reactComponentContainer,
      0,
    );
  });

  expect(getTotalThumbnailsHidden(obtainEffectStore())).toBe(
    totalThumbnailsInMockDocument - 1,
  );

  [1].forEach((index) => {
    userActions.hideThumbnailAtIndex(
      obtainEffectStore().elementPairs[index].reactComponentContainer,
      0,
    );

    /* userActions.hideThumbnailAtIndex(document.body, index); */
  });

  expect(getTotalThumbnailsHidden(obtainEffectStore())).toBe(
    totalThumbnailsInMockDocument,
  );

  /* [1, 2, 3].forEach((index) => {
     *   userActions.toggleThumbnailAtIndex(document.body, index);
     * });

     * expect(getTotalThumbnailsHidden(obtainEffectStore())).toBe(
     *   totalThumbnailsInMockDocument - 3,
     * );

     * [2, 3].forEach((index) => {
     *   userActions.toggleThumbnailAtIndex(document.body, index);
     * });

     * expect(getTotalThumbnailsHidden(obtainEffectStore())).toBe(
     *   totalThumbnailsInMockDocument - 1,
     * ); */
});

function TestEffectStoreObject() {
  const mockedUpdateEffectStore = updateEffectStore as jest.Mock<void>;
  const mockedRetrieveEffectStore = retrieveEffectStore as jest.Mock<
    EffectStore
  >;
  this.effectStore = createEffectStore();
  this.updateEffectStore = (newEffectStore) => {
    this.effectStore = newEffectStore;
  };
  this.retrieveEffectStore = (newEffectStore) => {
    return this.effectStore;
  };

  mockedUpdateEffectStore.mockImplementation(this.updateEffectStore);
  mockedRetrieveEffectStore.mockImplementation(this.retrieveEffectStore);
}
