import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { articlesReducer } from "./reducer";
import { watchArticlesSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  articles: articlesReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchArticlesSaga);

export default store;
