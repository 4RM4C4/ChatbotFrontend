import axios from 'axios'
import { CHATENDPOINT } from '../utils/config'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const postChat = (dataToSend) => {
  const config = {
    headers: { Authorization: token },
    withCredentials: true,
  }

  const request = axios.post(
    CHATENDPOINT,
    dataToSend,
    config,
  )
  return request.then((response) => response)
}

const getChats = () => {
  const request = axios.get(
    CHATENDPOINT,
    {
      withCredentials: true,
    },
  )
  return request.then((response) => response.data)
}

export default { getChats, postChat, setToken }
