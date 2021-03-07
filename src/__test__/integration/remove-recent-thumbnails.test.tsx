import {Provider} from "react-redux";
import {injectReactInto, HTMLElementReplacementPair} from "inject-react";
import React from "react";
import ReactDOM from "react-dom";

import {RecommendationWrapper} from "../../recommendation-wrapper";
import {allData} from "../__mocks__/mock-data";
import {insertYouTubeHTML} from "../youtube-tools";
import DOMSelectors from "../../tools/youtube-element-selectors";
import EffectContainer from "../../effects/effect-container";
import configureStore from "../../redux/configure-store";

const initialState = {};

const mockVideoInfos = allData.mockInfo;
const mockIds = allData.mockData;

jest.setTimeout(3000);
test.only("remove 3 videos because they have already been seen", (done) => {
  const store = configureStore();
  insertYouTubeHTML();

  const savedVideoIndexes = [1, 2, 3];
  const threeSavedVideos = JSON.stringify(
    savedVideoIndexes.map((index) => mockVideoInfos[index]),
  );

  injectEffectContainer({
    sibling: document.body as HTMLElement,
    render: () => (
      <Provider store={store}>
        <EffectContainer
          fetchSavedData={async () => threeSavedVideos}
          saveNewData={async (str: string) => {}}
          onDataRetreieved={(savedJSON: string) => {
            store.dispatch({
              type: "OBTAINED_SAVED_VIDEOINFOS",
              savedVideoInfos: JSON.parse(savedJSON),
            });
            store.dispatch({
              type: "SET_CURRENT_RECCOMENDATIONS",
              recommendedVideoIds: extractAllRecommendations(
                document.body.innerHTML,
              ),
            });
          }}
          fetchVideoInfo={(videoIds: Array<string>) => {
            const newVideoInfos = mockVideoInfos.filter((videoInfo) =>
              videoIds.includes(videoInfo.id),
            );
            store.dispatch({
              type: "FETCHED_NEW_VIDEOINFOS",
              savedVideoInfos: newVideoInfos,
            });
          }}
        />
      </Provider>
    ),
  });

  DOMSelectors.getAllThumbnails(document).forEach((element, thumbnailIndex) => {
    const elementPair = injectElement({
      currentDocument: document!,
      index: thumbnailIndex,
      jsx: (
        <Provider store={store}>
          <RecommendationWrapper index={thumbnailIndex} />
        </Provider>
      ),
    });
  });
  let hasNotCheckedVisisblity = true;
  store.subscribe(() => {
    const state = store.getState().reduceAppState;
    if (state.hasObtainedSavedData && hasNotCheckedVisisblity) {
      DOMSelectors.getAllThumbnails(document).forEach(
        (element, thumbnailIndex) => {
          if (thumbnailIndex > 7) {
            return;
          }

          if (savedVideoIndexes.includes(thumbnailIndex)) {
            expect(element).not.toBeVisible();
          } else {
            expect(element).toBeVisible();
          }
        },
      );
      hasNotCheckedVisisblity = false;
      done();
    }
  });
});

test("remove 3 videos because they have already been seen", (done) => {
  const store = configureStore();
  insertYouTubeHTML();

  const savedVideoIndexes = [1, 2, 3];
  const threeSavedVideos = JSON.stringify(
    savedVideoIndexes.map((index) => mockVideoInfos[index]),
  );

  injectEffectContainer({
    sibling: document.body as HTMLElement,
    render: () => (
      <Provider store={store}>
        <EffectContainer
          fetchSavedData={async () => threeSavedVideos}
          saveNewData={async (str: string) => {}}
          onDataRetreieved={(savedJSON: string) => {
            store.dispatch({
              type: "OBTAINED_SAVED_VIDEOINFOS",
              savedVideoInfos: JSON.parse(savedJSON),
            });
            store.dispatch({
              type: "SET_CURRENT_RECCOMENDATIONS",
              recommendedVideoIds: extractAllRecommendations(
                document.body.innerHTML,
              ),
            });
          }}
          fetchVideoInfo={(videoIds: Array<string>) => {
            const newVideoInfos = mockVideoInfos.filter((videoInfo) =>
              videoIds.includes(videoInfo.id),
            );
            store.dispatch({
              type: "FETCHED_NEW_VIDEOINFOS",
              savedVideoInfos: newVideoInfos,
            });
          }}
        />
      </Provider>
    ),
  });

  DOMSelectors.getAllThumbnails(document).forEach((element, thumbnailIndex) => {
    const elementPair = injectElement({
      currentDocument: document!,
      index: thumbnailIndex,
      jsx: (
        <Provider store={store}>
          <RecommendationWrapper index={thumbnailIndex} />
        </Provider>
      ),
    });
  });
  let hasNotCheckedVisisblity = true;
  store.subscribe(() => {
    const state = store.getState().reduceAppState;
    if (state.hasObtainedSavedData && hasNotCheckedVisisblity) {
      DOMSelectors.getAllThumbnails(document).forEach(
        (element, thumbnailIndex) => {
          if (thumbnailIndex > 7) {
            return;
          }

          if (savedVideoIndexes.includes(thumbnailIndex)) {
            expect(element).not.toBeVisible();
          } else {
            expect(element).toBeVisible();
          }
        },
      );
      hasNotCheckedVisisblity = false;
      done();
    }
  });
});

function injectEffectContainer({
  sibling,
  render,
}: {
  sibling: HTMLElement;
  render: () => JSX.Element;
}) {
  const thumbnailReplacementPair: HTMLElementReplacementPair = injectReactInto({
    immediateParentNode: sibling.parentNode as HTMLElement,
    nonRecursiveChildFilterFunction: (element: HTMLElement) => {
      return element === sibling;
    },
    previousElementPairs: [],
    renderAtIndex: (index: number) => render(),
    ReactDomRenderFunction: ReactDOM.render,
  })[0];
}
function injectElement({
  currentDocument,
  jsx,
  index = 2,
}: {
  currentDocument: Document;
  jsx: JSX.Element;
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
