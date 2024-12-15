export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";
export const ADD_ARTICLE_REQUEST = "ADD_ARTICLE_REQUEST";
export const ADD_ARTICLE_SUCCESS = "ADD_ARTICLE_SUCCESS";
export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});
export const fetchArticlesSuccess = (articles) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
});
export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});
export const addArticleRequest = (article) => ({
  type: ADD_ARTICLE_REQUEST,
  payload: article,
});
export const addArticleSuccess = (article) => ({
  type: ADD_ARTICLE_SUCCESS,
  payload: article,
});
