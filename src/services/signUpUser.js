import axios from 'axios'
import { USERSIGNUP } from '../utils/config'

const signUpPost = (credentials) => {
  const request = axios.post(
    USERSIGNUP,
    credentials,
    { withCredentials: true },
  )
  return request.then((response) => response.data)
}

export default { signUpPost }
