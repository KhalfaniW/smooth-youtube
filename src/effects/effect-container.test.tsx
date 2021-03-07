import {
  extractAllRecommendations,
  fetchInfoFromIds,
} from "youtube-recommendation-scraper";

import {insertYouTubeHTML} from "../__test__/youtube-tools";
jest.setTimeout(999999);
test("inject saved videoinfos into the store", async () => {
  insertYouTubeHTML();
  console.log(await fetchInfoFromIds(extractAllRecommendations()));
});
