import axios from 'axios'

const reqConfig = axios.create({
  baseURL: "http://192.168.1.239:3000",
  timeout: 5000
})

export function get(url, data) {
  return reqConfig.get(url, data)
}

export function post(url, data) {
  return reqConfig.post(url, data)
}
