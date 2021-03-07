import * as _ from "lodash";
import produce from "immer";
import {VideoInfo} from "youtube-recommendation-scraper";
enum ThumbnailStates {
  HIDDEN = "hidden",
  SHOWN = "shown",
}
type VideoIdAndRecommendationTime = {
  id: string;
  timeSinceEpoch: number;
};
type VideoManagerState = {
  hasFetchedNewVideoInfos: boolean;
  hasObtainedSavedData: boolean;
  isSaveRecommendationsActive: boolean;
  allVideoInfos: Array<VideoInfo>;
  hiddenVideoIds: Array<string>;
  recommendedVideoIds: Array<string>;

  //use this data to derive frequency and importance of a recommendation
  // recommendationsAndTime: Array<VideoIdAndRecommendationTime>;
};

export function reduceAppState(
  state: VideoManagerState = {
    hasObtainedSavedData: false,
    isSaveRecommendationsActive: false,
    hasFetchedNewVideoInfos: false,
    allVideoInfos: [],
    recommendedVideoIds: [],
    hiddenVideoIds: [],
    // recommendationsAndTime: [],
  },
  action: any,
): any {
  return produce(state, (draftState: VideoManagerState) => {
    switch (action.type) {
      case "RESET":
        const resetStateValue = undefined;
        return resetStateValue;
      case "FETCH_ID_INFO":
        draftState.isSaveRecommendationsActive = true;
        return draftState;
      case "FETCHED_NEW_VIDEOINFOS":
        draftState.hasObtainedSavedData = true;
        return draftState;
      case "SET_CURRENT_RECCOMENDATIONS":
        draftState.recommendedVideoIds = action.recommendedVideoIds;
        return draftState;
      case "SAVE_RECOMMENDATIONS":
        draftState.isSaveRecommendationsActive = true;
        return draftState;
      case "SAVE_RECOMMENDATIONS_HANDLED":
        draftState.isSaveRecommendationsActive = false;
        return draftState;

      case "OBTAINED_SAVED_VIDEOINFOS":
        draftState.hasObtainedSavedData = true;
        draftState.allVideoInfos.push(...action.savedVideoInfos);
        draftState.hiddenVideoIds.push(
          ...draftState.allVideoInfos.map((videoInfo) => videoInfo.id),
        );
        return draftState;

      default:
        return state;
    }
  });
}
