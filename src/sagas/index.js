// index.js
import { all } from "redux-saga/effects";
import repoSaga from "./repoSaga";

function* rootSaga() {
  yield all([repoSaga()]);
}

export default rootSaga;
