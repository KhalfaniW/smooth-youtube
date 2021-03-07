import {Provider} from "react-redux";
import {
  extractAllRecommendations,
  VideoInfo,
  fetchInfoFromIds,
} from "youtube-recommendation-scraper";
import {injectReactInto, HTMLElementReplacementPair} from "inject-react";
import React from "react";
import ReactDOM from "react-dom";

import {RecommendationWrapper} from "./recommendation-wrapper";
import {insertYouTubeHTML} from "./__test__/youtube-tools";
import DOMSelectors from "./tools/youtube-element-selectors";
import EffectContainer from "./effects/effect-container";
import configureStore from "./redux/configure-store";

window["test"] = {
  fetchInfoFromIds,
  extractAllRecommendations,
} as any;

console.log("RENDER_FUNCTION:=", ReactDOM.render);
const store = configureStore();

injectEffectContainer({
  sibling: document.body as HTMLElement,
  render: () => (
    <Provider store={store}>
      <EffectContainer
        fetchSavedData={async () => window.localStorage.getItem("yt-1") || "[]"}
        saveNewData={async (str: string) => {}}
        onDataRetreieved={(savedJSON: string) => {
          console.log({savedJSON});
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
        onFetchVideo={(newVideoInfos: Array<VideoInfo>) => {
          /*
          const newVideoInfos = mockVideoInfos.filter((videoInfo) =>
            videoIds.includes(videoInfo.id),
          );
          store.dispatch({
            type: "FETCHED_NEW_VIDEOINFOS",
            savedVideoInfos: newVideoInfos,
          });
            */
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
