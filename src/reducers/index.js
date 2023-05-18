// index.js
import { combineReducers } from "redux";
import repoReducer from "./repoReducer";

const rootReducer = combineReducers({
  repo: repoReducer,
});

export default rootReducer;
