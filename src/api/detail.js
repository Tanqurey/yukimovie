import axios from 'axios'
import {
  apikey,
  movieDetailUrl
} from 'common/js/config'

export function getMovieDetail(id) {
  return axios.get(movieDetailUrl + id, {
    params: {
      apikey: apikey,
    }
  })
}
