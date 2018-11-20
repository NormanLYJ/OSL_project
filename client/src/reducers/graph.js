import { fromJS } from 'immutable';

import {
  GET_ENTITY, 
  GET_ENTITY_SUCCESS, 
  GET_ENTITY_FAIL,
  GET_ENTITY_BY_ID, 
  GET_ENTITY_BY_ID_SUCCESS, 
  GET_ENTITY_BY_ID_FAIL,
  GET_OFFICER, 
  GET_OFFICER_SUCCESS, 
  GET_OFFICER_FAIL,
  GET_OFFICER_BY_ID, 
  GET_OFFICER_BY_ID_SUCCESS, 
  GET_OFFICER_BY_ID_FAIL,
  GET_INTERMEDIARY, 
  GET_INTERMEDIARY_SUCCESS, 
  GET_INTERMEDIARY_FAIL,
  GET_INTERMEDIARY_BY_ID, 
  GET_INTERMEDIARY_BY_ID_SUCCESS, 
  GET_INTERMEDIARY_BY_ID_FAIL,
  GET_ADDRESS, 
  GET_ADDRESS_SUCCESS, 
  GET_ADDRESS_FAIL,
  GET_ADDRESS_BY_ID, 
  GET_ADDRESS_BY_ID_SUCCESS, 
  GET_ADDRESS_BY_ID_FAIL
} 
  from '../constants/graph';

const initialState = fromJS({});

function graph (state = initialState, action) {
  switch (action.type) {
    case GET_ENTITY:
    case GET_ENTITY_BY_ID:
    case GET_ENTITY_FAIL:
    case GET_ENTITY_BY_ID_FAIL:
    case GET_OFFICER:
    case GET_OFFICER_BY_ID:
    case GET_OFFICER_FAIL:
    case GET_OFFICER_BY_ID_FAIL:
    case GET_INTERMEDIARY:
    case GET_INTERMEDIARY_BY_ID:
    case GET_INTERMEDIARY_FAIL:
    case GET_INTERMEDIARY_BY_ID_FAIL:
    case GET_ADDRESS:
    case GET_ADDRESS_BY_ID:
    case GET_ADDRESS_FAIL:
    case GET_ADDRESS_BY_ID_FAIL:
      return {
        ...state,
      };
    case GET_ENTITY_SUCCESS:
    case GET_ENTITY_BY_ID_SUCCESS:
    case GET_OFFICER_SUCCESS:
    case GET_OFFICER_BY_ID_SUCCESS:
    case GET_INTERMEDIARY_SUCCESS:
    case GET_INTERMEDIARY_BY_ID_SUCCESS:
    case GET_ADDRESS_SUCCESS:
    case GET_ADDRESS_BY_ID_SUCCESS:
      return {
        ...state,
        graphData: action.payload
      };
    default:
      return state;
  }
}

export default graph;

