import {createEpicMiddleware} from "redux-observable";
import {createStore, applyMiddleware} from "redux";

import { initializeEffectStore } from './modules/effectStore';
import {rootEpic, rootReducer} from "./modules/root";

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  initializeEffectStore();
  return store;
}
