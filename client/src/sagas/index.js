import { fork, all } from 'redux-saga/effects'
import {
  watchGetEntityData,
  watchGetEntityById,
  watchGetOfficerData,
  watchGetOfficerById,
  watchGetIntermediaryData,
  watchGetIntermediaryById,
  watchGetAddressData,
  watchGetAddressById
} from './graph'

export default function* root() {
  yield all([
    fork(watchGetEntityData),
    fork(watchGetEntityById),
    fork(watchGetOfficerData),
    fork(watchGetOfficerById),
    fork(watchGetIntermediaryData),
    fork(watchGetIntermediaryById),
    fork(watchGetAddressData),
    fork(watchGetAddressById)
  ])
}