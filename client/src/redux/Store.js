import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loading } from "./loading";
import { reducer } from "./reducer";

const composeEnhancers = composeWithDevTools({});

const rootReducers = combineReducers({
  reducer,
  loading,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
