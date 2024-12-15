import { call, put, takeLatest } from "redux-saga/effects";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { dbApp } from "../db/firebase";
import {
  fetchArticlesSuccess,
  FETCH_ARTICLES_REQUEST,
  ADD_ARTICLE_REQUEST,
} from "./actions";
const db = getDatabase(dbApp);

function* fetchArticlesSaga() {
  const articlesRef = ref(db, "articles/");
  try {
    const snapshot = yield new Promise((resolve, reject) => {
      onValue(
        articlesRef,
        (snapshot) => {
          resolve(snapshot);
        },
        (error) => {
          reject(error);
        }
      );
    });
    const data = snapshot.val();
    const articlesList = data ? Object.values(data) : [];
    yield put(fetchArticlesSuccess(articlesList));
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
function* addArticleSaga(action) {
  try {
    const newArticle = {
      id: Date.now().toString(),
      ...action.payload,
      tags: action.payload.tags.split(",").map((tag) => tag.trim()),
    };
    const articleRef = ref(database, `articles/${newArticle.id}`);
    yield call(set, articleRef, newArticle);
    yield put(fetchArticlesRequest());
  } catch (error) {
    console.error("Error adding article:", error);
  }
}
export function* watchArticlesSaga() {
  yield takeLatest(FETCH_ARTICLES_REQUEST, fetchArticlesSaga);
  yield takeLatest(ADD_ARTICLE_REQUEST, addArticleSaga);
}
