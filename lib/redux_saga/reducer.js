import { FETCH_ARTICLES_SUCCESS } from "./actions";
const initialState = {
  articles: [],
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};
