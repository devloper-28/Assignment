// repoActions.js
import {
    SET_REPOSITORIES,
    SET_DATA_END,
    PREV_PAGE,
    NEXT_PAGE,
    TOGGLE_ACCORDION,
    FETCH_REPOSITORIES,
  } from "./actionTypes";
  
  export const fetchRepositories = (currentPage) => ({
    type: FETCH_REPOSITORIES,
    payload: currentPage,
  });
  
  export const setRepositories = (repositories) => ({
    type: SET_REPOSITORIES,
    payload: repositories,
  });
  
  export const setDataEnd = (isDataEnd) => ({
    type: SET_DATA_END,
    payload: isDataEnd,
  });
  
  export const prevPage = () => ({
    type: PREV_PAGE,
  });
  
  export const nextPage = () => ({
    type: NEXT_PAGE,
  });
  
  export const toggleAccordion = (index) => ({
    type: TOGGLE_ACCORDION,
    payload: index,
  });
  