import { take, call, put, fork } from 'redux-saga/effects'
import { replace, goBack, push } from 'react-router-redux'

import {
  GET_ENTITY,
  GET_ENTITY_BY_ID,
  GET_OFFICER,
  GET_OFFICER_BY_ID,
  GET_INTERMEDIARY,
  GET_INTERMEDIARY_BY_ID,
  GET_ADDRESS,
  GET_ADDRESS_BY_ID
} from '../constants/graph'

import {
  getEntitySuccess,
  getEntityFail,
  getEntityByIdSuccess,
  getEntityByIdFail,
  getOfficerSuccess,
  getOfficerFail,
  getOfficerByIdSuccess,
  getOfficerByIdFail,
  getIntermediarySuccess,
  getIntermediaryFail,
  getIntermediaryByIdSuccess,
  getIntermediaryByIdFail,
  getAddressSuccess,
  getAddressFail,
  getAddressByIdSuccess,
  getAddressByIdFail
} from '../actions/graph'

import {
  _getEntity,
  _getEntityById,
  _getOfficer,
  _getOfficerById,
  _getIntermediary,
  _getIntermediaryById,
  _getAddress,
  _getAddressById
} from '../services/graph'


//get entity
function* getEntityDataWorker(payload) {
  try {
    const response = yield call(_getEntity, payload)
    yield put(getEntitySuccess(response.data))
  } 
  catch(error) {
    yield put(getEntityFail(response.data))
  }
}
export function* watchGetEntityData() {
  while (true) {
    const { payload } = yield take(GET_ENTITY)
    yield fork(getEntityDataWorker, payload)
  }
}

//get entity by id
function* getEntityByIdWorker(payload) {
  try {
    const response = yield call(_getEntityById, payload)
    yield put(getEntityByIdSuccess(response.data))
  } 
  catch(error) {
    yield put(getEntityByIdFail(response.data))
  }
}
export function* watchGetEntityById() {
  while (true) {
    const { payload } = yield take(GET_ENTITY_BY_ID)
    yield fork(getEntityByIdWorker, payload)
  }
}

//get officer
function* getOfficerDataWorker(payload) {
  try {
    const response = yield call(_getOfficer, payload)
    yield put(getOfficerSuccess(response.data))
  } 
  catch(error) {
    yield put(getOfficerFail(response.data))
  }
}
export function* watchGetOfficerData() {
  while (true) {
    const { payload } = yield take(GET_OFFICER)
    yield fork(getOfficerDataWorker, payload)
  }
}

//get officer by id
function* getOfficerByIdWorker(payload) {
  try {
    const response = yield call(_getOfficerById, payload)
    yield put(getOfficerByIdSuccess(response.data))
  } 
  catch(error) {
    yield put(getOfficerByIdFail(response.data))
  }
}
export function* watchGetOfficerById() {
  while (true) {
    const { payload } = yield take(GET_OFFICER_BY_ID)
    yield fork(getOfficerByIdWorker, payload)
  }
}


//get intermediary
function* getIntermediaryDataWorker(payload) {
  try {
    const response = yield call(_getIntermediary, payload)
    yield put(getIntermediarySuccess(response.data))
  } 
  catch(error) {
    yield put(getIntermediaryFail(response.data))
  }
}
export function* watchGetIntermediaryData() {
  while (true) {
    const { payload } = yield take(GET_INTERMEDIARY)
    yield fork(getIntermediaryDataWorker, payload)
  }
}

//get intermediary by id
function* getIntermediaryByIdWorker(payload) {
  try {
    const response = yield call(_getIntermediaryById, payload)
    yield put(getIntermediaryByIdSuccess(response.data))
  } 
  catch(error) {
    yield put(getIntermediaryByIdFail(response.data))
  }
}
export function* watchGetIntermediaryById() {
  while (true) {
    const { payload } = yield take(GET_INTERMEDIARY_BY_ID)
    yield fork(getIntermediaryByIdWorker, payload)
  }
}

//get address
function* getAddressDataWorker(payload) {
  try {
    const response = yield call(_getAddress, payload)
    yield put(getAddressSuccess(response.data))
  } 
  catch(error) {
    yield put(getAddressFail(response.data))
  }
}
export function* watchGetAddressData() {
  while (true) {
    const { payload } = yield take(GET_ADDRESS)
    yield fork(getAddressDataWorker, payload)
  }
}

//get address by id
function* getAddressByIdWorker(payload) {
  try {
    const response = yield call(_getAddressById, payload)
    yield put(getAddressByIdSuccess(response.data))
  } 
  catch(error) {
    yield put(getAddressByIdFail(response.data))
  }
}
export function* watchGetAddressById() {
  while (true) {
    const { payload } = yield take(GET_ADDRESS_BY_ID)
    yield fork(getAddressByIdWorker, payload)
  }
}