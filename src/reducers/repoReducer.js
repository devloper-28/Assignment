// repoReducer.js
import {
    SET_REPOSITORIES,
    SET_DATA_END,
    PREV_PAGE,
    NEXT_PAGE,
    TOGGLE_ACCORDION,
  } from "../actions/actionTypes";
  
  const initialState = {
    repositories: [],
    currentPage: 1,
    isDataEnd: false,
    activeAccordion: null,
  };
  
  const repoReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_REPOSITORIES:
        return {
          ...state,
          repositories: action.payload,
        };
      case SET_DATA_END:
        return {
          ...state,
          isDataEnd: action.payload,
        };
      case PREV_PAGE:
        return {
          ...state,
          currentPage: state.currentPage - 1,
        };
      case NEXT_PAGE:
        return {
          ...state,
          currentPage: state.currentPage + 1,
        };
      case TOGGLE_ACCORDION:
        return {
          ...state,
          activeAccordion: state.activeAccordion === action.payload ? null : action.payload,
        };
      default:
        return state;
    }
  };
  
  export default repoReducer;
  