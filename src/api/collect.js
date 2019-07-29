import axios from 'axios'
import {
  addToCollectionUrl
} from 'common/js/config'

export function addToCollection(id, title, directors, userName) {
  return axios.post(addToCollectionUrl, {
    params: {
      id: id,
      title: title,
      directors: directors,
      userName: userName
    }
  })
}
