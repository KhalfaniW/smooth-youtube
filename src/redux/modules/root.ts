import {combineEpics} from "redux-observable";
import {combineReducers} from "redux";

import {pingEpic} from "./rxjsEpics";
import {reduceAppState} from "./appReducer";

export const rootEpic = combineEpics(pingEpic);

export const rootReducer = combineReducers({
  reduceAppState,
});
