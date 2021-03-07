import {fetchStoredRecommendations} from "../redux/modules/storage";
import {VideoInfo} from "youtube-recommendation-scraper";

async function fetchVideoInfoGroup(videoIds: Array<string>) {
  return (dispatch) => {
    return fetchStoredRecommendations().then(
      (savedDataString) =>
        dispatch({
          type: "RETRIEVE_SAVED_DATA_HANDLED",
          recommendationGroup: JSON.parse(savedDataString) as Array<VideoInfo>,
        }),
      (error) => {
        throw error;
      },
    );
  };
}

export function updateVideoInfoGroup(retrievedVideoIds: Array<string>) {
  return (dispatch, getState) => {
    const newVideoIdsNeeded = getVideoIdsThatDontHaveInfo(
      getState().recommendationGroup,
      retrievedVideoIds,
    );

    return fetchStoredRecommendations().then(
      (savedDataString) =>
        dispatch({
          type: "RETRIEVE_SAVED_DATA_HANDLED",
          recommendationGroup: JSON.parse(savedDataString) as Array<VideoInfo>,
        }),
      (error) => {
        throw error;
      },
    );
  };
}
function getVideoIdsThatDontHaveInfo(
  videoInfoGroup: String,
  retrievedVideoIds: Array<string>,
) {}
