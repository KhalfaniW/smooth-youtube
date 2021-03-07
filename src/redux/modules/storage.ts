import {VideoInfo} from "youtube-recommendation-scraper";

const appStorageId = "smooth-yt-recommendation-edit";

export async function fetchStoredRecommendations() {
  const emptyArrayAsString = "[]";
  return localStorage.getItem(appStorageId) || emptyArrayAsString;
}
async function saveRecommendations(recomendationsAsString: string) {
  localStorage.setItem(appStorageId, recomendationsAsString);
}

export function retrieveSavedData() {
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
export function savedReccomendationGroup(
  recommendationGroup: Array<VideoInfo>,
) {
  return (dispatch) => {
    return saveRecommendations(JSON.stringify(recommendationGroup)).then(
      () =>
        dispatch({
          type: "SAVE_RECOMMENDATIONS_HANDLED",
        }),
      (error) => {
        throw error;
      },
    );
  };
}
