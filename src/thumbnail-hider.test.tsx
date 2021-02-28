import {Provider} from "react-redux";
import {fireEvent, getByText, queryByText} from "@testing-library/react";
import React from "react";

import {ActionNames, ThumbnailHider} from "./thumbnail-hider";
import {
  getEffectStore,
  getTotalThumbnailsHidden,
} from "./redux/modules/rxjsEpics";
import {injectElement, showReactElement} from "./replace-element";
import {insertYoutubeHtml} from "./__test__/youtube-tools";
import configureStore from "./redux/configure-store";

const userActions = {
  hideThumbnail: (container: HTMLElement) => {
    const showThumbnailButton = getByText(container, ActionNames.showThumbnail);
    fireEvent.click(showThumbnailButton);
  },
  getIsThumbnailShown: (container: HTMLElement) => {
    return queryByText(container, "Thumbnail Is Shown") !== null;
  },
};
const youtubeThumbnailSelector = "ytd-thumbnail";
test("replacement item can be clicked", () => {
  const mockFunction = jest.fn(() => {});
  insertYoutubeHtml();

  const reactOriginalPair = injectElement({
    currentDocument: document,
    jsx: <button onClick={mockFunction}>{ActionNames.showThumbnail}</button>,
    index: 0,
  });
  showReactElement({elementPair: reactOriginalPair});

  userActions.hideThumbnail(reactOriginalPair.reactComponentContainer);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

describe.only("tmp-describe block ", () => {
  test("effect", () => {
    document.body.innerHTML = insertYoutubeHtml();
    const initalTestStore = configureStore();

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
    /* initalTestStore.dispatch({type: "HIDE_THUMBNAIL", index: 0});
     * initalTestStore.dispatch({type: "HIDE_THUMBNAIL", index: 0}); */
    /* expect( ).toBe( ); */
  });

  test.skip("replace 1 then show thumbnail", () => {
    insertYoutubeHtml();

    const elementPair = injectElement({
      currentDocument: document,
      jsx: (
        <Provider store={initalTestStore}>
          <ThumbnailHider index={0} />
        </Provider>
      ),
      index: 0,
    });

    expect(
      userActions.getIsThumbnailShown(elementPair.reactComponentContainer),
    );

    userActions.hideThumbnail(elementPair.reactComponentContainer);
    /* userActions.hideThumbnail(elementPair.reactComponentContainer); */

    //TODO falsify
    expect(
      userActions.getIsThumbnailShown(elementPair.reactComponentContainer),
    );
  });
});
test("replace 10 then show 5 thumbnails", () => {
  // expect().toBe();
});
