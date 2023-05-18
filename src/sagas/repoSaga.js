// repoSaga.js
import { put, takeEvery } from "redux-saga/effects";
import {
  setRepositories,
  setDataEnd,
} from "../actions/repoActions";
import { FETCH_REPOSITORIES } from "../actions/actionTypes";

function* fetchRepositoriesSaga(action) {
  try {
    const response = yield fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${action.payload}`
    );
    const data = yield response.json();
    yield put(setRepositories(data.items));
    yield put(setDataEnd(data.items.length === 0));
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

function* repoSaga() {
  yield takeEvery(FETCH_REPOSITORIES, fetchRepositoriesSaga);
}

export default repoSaga;
