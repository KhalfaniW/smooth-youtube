import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {HTMLElementReplacementPair} from "inject-react";
import {
  VideoInfo,
  MaybeVideoInfo,
  extractAllRecommendations,
  fetchInfoFromIds,
} from "youtube-recommendation-scraper";

export const ActionNames = {};
window["elementGroup"] = [];

export function RecommendationWrapper({index}: {index: number}) {
  const hiddenVideoIds = useSelector((state: any) => {
    return state.reduceAppState.hiddenVideoIds;
  });

  const [
    videoReccomendationElement,
    setVideoReccomendationElement,
  ] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = extractReccomendationReference(index);
    setVideoReccomendationElement(element);
    const videoId = extractAllRecommendations(element.innerHTML)[0];
    return () => {};
  }, []);

  useEffect(() => {
    const element = extractReccomendationReference(index);
    const thisVideoId = extractAllRecommendations(element.innerHTML)[0];
    if (hiddenVideoIds.includes(thisVideoId)) {
      element.style.display = "none";
    }
    return () => {};
  }, [hiddenVideoIds]);
  const dispatch = useDispatch();

  return <div style={{zIndex: 44, position: "relative"}}>222ELEMENT2</div>;
}
function extractReccomendationReference(index): HTMLElement {
  return document!.querySelectorAll("ytd-thumbnail")[index].parentNode!
    .parentNode!.parentNode!.parentNode! as HTMLElement;
}

async function initializeAndFetchNewInfos(html, dispatch): Promise<void> {
  const newVideoIds = getIdsNotYetFetched({
    //TODO hyrdate
    currentVideoInfoGroup: [],
    newIds: extractAllRecommendations(html),
  });

  const maybeVideoInfoGroup = await fetchInfoFromIds(newVideoIds);
  dispatch({
    type: "RETREIVED_NEW_VIDEOINFOS",
    newVideos: maybeVideoInfoGroup.filter((maybeInfo) => maybeInfo !== null),
  });
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
const appStorageId = "smooth-yt-recommendation-edit";

async function fetchStoredRecommendations() {
  const emptyArrayAsString = "[]";
  return localStorage.getItem(appStorageId) || emptyArrayAsString;
}
