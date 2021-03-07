import {
  VideoInfo,
  MaybeVideoInfo,
  extractAllRecommendations,
  fetchInfoFromIds,
} from "youtube-recommendation-scraper";

import {useEffect, useState} from "react";

//many effects will be dispached from here and require thier own state
// integrating this state into redux will cause actions and the store to get polluted
export function EffectContainer2({
  youtubeHomePageDocument = document,
  dispatch,
}: {
  youtubeHomePageDocument: Document;
  dispatch: (action: any) => void;
}) {
  useEffect(() => {
    initializeAndFetchNewInfos(
      youtubeHomePageDocument.body.innerHTML,
      dispatch,
    );
  }, [dispatch]);
  function onScrollEvent() {}

  useEffect(() => {
    window.addEventListener("scroll", onScrollEvent);
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
    };
  }, []);

  return null;
}

export default function EffectContainer({
  fetchSavedData,
  saveNewData,
  onDataRetreieved,
  onFetchVideo,
}: {
  fetchSavedData: () => Promise<string>;
  saveNewData: (savedJSON: string) => Promise<void>;
  onDataRetreieved: (retrievedData: string) => void;
  onFetchVideo: (ids: Array<VideoInfo>) => void;
}) {
  useEffect(() => {
    fetchSavedData().then((savedJSON) => {
      onDataRetreieved(savedJSON);
    });
  }, []);

  return null;
}

function getIdsNotYetFetched({
  currentVideoInfoGroup,
  newIds,
}: {
  currentVideoInfoGroup: Array<VideoInfo>;
  newIds: Array<string>;
}): Array<string> {
  const currentIds = currentVideoInfoGroup.map((videoInfo) => videoInfo.id);
  return newIds.filter((newId) => !currentIds.includes(newId));
}
async function initializeAndFetchNewInfos(html, dispatch): Promise<void> {
  const newVideoIds = getIdsNotYetFetched({
    currentVideoInfoGroup: [],
    newIds: extractAllRecommendations(html),
  });

  await fetchInfoFromIds(newVideoIds).then(
    (maybeVideoInfoGroup: Array<MaybeVideoInfo>) => {
      dispatch({
        type: "RETREIVED_NEW_VIDEOINFOS",
        newVideos: maybeVideoInfoGroup.filter(
          (maybeInfo) => maybeInfo !== null,
        ),
      });

      return;
    },
  );
}
