import axios from 'axios'
import {
  searchUserUrl
} from 'common/js/config'

export const searchUser = (userName) => {
  return axios.get(searchUserUrl, {
    params: {
      userName: userName,
    }
  })
}
