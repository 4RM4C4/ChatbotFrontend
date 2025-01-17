import axios from 'axios'
import { USERLOGIN } from '../utils/config'

const loginPost = (credentials) => {
  const request = axios.post(
    USERLOGIN,
    credentials,
    { withCredentials: true },
  )
  return request.then((response) => response.data)
}

export default { loginPost }
