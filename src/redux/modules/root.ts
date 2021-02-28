import {combineEpics} from "redux-observable";
import {combineReducers} from "redux";

import {
  pingEpic,
  initializeAppInjectEpic,
  hideThumbnailEpic,
  showThumbnailEpic,
} from "./rxjsEpics";
import {reduceAppState} from "./appReducer";

export const rootEpic = combineEpics(
  pingEpic,
  initializeAppInjectEpic,
  showThumbnailEpic,
  hideThumbnailEpic,
);

export const rootReducer = combineReducers({
  reduceAppState,
});
