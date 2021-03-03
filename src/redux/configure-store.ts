import {createEpicMiddleware} from "redux-observable";
import {createStore, applyMiddleware} from "redux";

import {createEffectStore, updateEffectStore} from "./modules/effectStore";
import {rootEpic, rootReducer} from "./modules/root";

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  updateEffectStore(createEffectStore());
  return store;
}
