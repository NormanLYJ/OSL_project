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
  
  //get entity
  export function getEntity(payload) {
    return {
      type: GET_ENTITY,
      payload
    };
  }
  export function getEntitySuccess(payload) {
    return {
      type: GET_ENTITY_SUCCESS,
      payload
    };
  }
  export function getEntityFail(payload) {
    return {
      type: GET_ENTITY_FAIL,
      payload
    };
  }
  
  //get entity by id
  export function getEntityById(payload) {
    return {
      type: GET_ENTITY_BY_ID,
      payload
    };
  }
  
  export function getEntityByIdSuccess(payload) {
    return {
      type: GET_ENTITY_BY_ID_SUCCESS,
      payload
    };
  }
  
  export function getEntityByIdFail(payload) {
    return {
      type: GET_ENTITY_BY_ID_FAIL,
      payload
    };
  }

  //get officer
  export function getOfficer(payload) {
    return {
      type: GET_OFFICER,
      payload
    };
  }
  export function getOfficerSuccess(payload) {
    return {
      type: GET_OFFICER_SUCCESS,
      payload
    };
  }
  export function getOfficerFail(payload) {
    return {
      type: GET_OFFICER_FAIL,
      payload
    };
  }
  
  //get officer by id
  export function getOfficerById(payload) {
    return {
      type: GET_OFFICER_BY_ID,
      payload
    };
  }
  
  export function getOfficerByIdSuccess(payload) {
    return {
      type: GET_OFFICER_BY_ID_SUCCESS,
      payload
    };
  }
  
  export function getOfficerByIdFail(payload) {
    return {
      type: GET_OFFICER_BY_ID_FAIL,
      payload
    };
  }

  //get intermediary
  export function getIntermediary(payload) {
    return {
      type: GET_INTERMEDIARY,
      payload
    };
  }
  export function getIntermediarySuccess(payload) {
    return {
      type: GET_INTERMEDIARY_SUCCESS,
      payload
    };
  }
  export function getIntermediaryFail(payload) {
    return {
      type: GET_INTERMEDIARY_FAIL,
      payload
    };
  }
  
  //get intermediary by id
  export function getIntermediaryById(payload) {
    return {
      type: GET_INTERMEDIARY_BY_ID,
      payload
    };
  }
  
  export function getIntermediaryByIdSuccess(payload) {
    return {
      type: GET_INTERMEDIARY_BY_ID_SUCCESS,
      payload
    };
  }
  
  export function getIntermediaryByIdFail(payload) {
    return {
      type: GET_INTERMEDIARY_BY_ID_FAIL,
      payload
    };
  }

  //get address
  export function getAddress(payload) {
    return {
      type: GET_ADDRESS,
      payload
    };
  }
  export function getAddressSuccess(payload) {
    return {
      type: GET_ADDRESS_SUCCESS,
      payload
    };
  }
  export function getAddressFail(payload) {
    return {
      type: GET_ADDRESS_FAIL,
      payload
    };
  }
  
  //get address by id
  export function getAddressById(payload) {
    return {
      type: GET_ADDRESS_BY_ID,
      payload
    };
  }
  
  export function getAddressByIdSuccess(payload) {
    return {
      type: GET_ADDRESS_BY_ID_SUCCESS,
      payload
    };
  }
  
  export function getAddressByIdFail(payload) {
    return {
      type: GET_ADDRESS_BY_ID_FAIL,
      payload
    };
  }
