import axios from 'axios'

export const apiConfig = {
  // root endpoint, using absolute url 
  // api: 'http://a10549a4.ngrok.io/api/v0',
  api: 'http://localhost:3000/api/v0',

  // api endpoints
  entity: 'entity',
  officer: 'officer',
  intermediary: 'intermediary',
  address: 'address'
}

export function createAxiosInstance(accessToken) {
  let headers = {
    'Content-Type': 'application/json',
  }
  if(accessToken) {
    headers = {
      ...headers,
      'Authorization': `Token ${accessToken}`
    }
  }
  return axios.create({
    baseURL: apiConfig.api,
    timeout: 180000,
    headers: headers
  });
}
