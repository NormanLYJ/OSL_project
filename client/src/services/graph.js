import {apiConfig, createAxiosInstance} from './api'
const {api,
  entity,
  officer,
  address,
  intermediary
  } = apiConfig;
  
const axios = createAxiosInstance();
const headers = {
}

export async function _getEntity(payload) {
  let url = `${api}/${entity}`
  return await axios.get(url, {headers: headers})
}
export async function _getEntityById(payload) {
  const {id} = payload
  let url = `${api}/${entity}/${id}`
  return await axios.get(url, {headers: headers})
}


export async function _getOfficer(payload) {
  let url = `${api}/${officer}`
  return await axios.get(url, {headers: headers})
}
export async function _getOfficerById(payload) {
  const {id} = payload
  let url = `${api}/${officer}/${id}`
  return await axios.get(url, {headers: headers})
}


export async function _getIntermediary(payload) {
  let url = `${api}/${intermediary}`
  return await axios.get(url, {headers: headers})
}
export async function _getIntermediaryById(payload) {
  const {id} = payload
  let url = `${api}/${intermediary}/${id}`
  return await axios.get(url, {headers: headers})
}


export async function _getAddress(payload) {
  let url = `${api}/${address}`
  return await axios.get(url, {headers: headers})
}
export async function _getAddressById(payload) {
  const {id} = payload
  let url = `${api}/${address}/${id}`
  return await axios.get(url, {headers: headers})
}
