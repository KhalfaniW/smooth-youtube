import {createEpicMiddleware} from "redux-observable";
import {createStore, applyMiddleware} from "redux";

import {createEffectStore, updateEffectStore} from "./modules/effectStore";
import {rootEpic, rootReducer} from "./modules/root";
import thunk from "redux-thunk";

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  updateEffectStore(createEffectStore());
  return store;
}
