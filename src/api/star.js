import axios from 'axios'
import {
  apikey,
  starDetailUrl
} from 'common/js/config'

export function getStarDetail(id) {
  return axios.get(starDetailUrl + id, {
    params: {
      apikey: apikey,
    }
  })
}
