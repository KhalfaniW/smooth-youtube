import {combineEpics} from "redux-observable";
import {combineReducers} from "redux";

import {reduceAppState} from "./appReducer";

export const rootEpic = combineEpics();

export const rootReducer = combineReducers({
  reduceAppState,
});
