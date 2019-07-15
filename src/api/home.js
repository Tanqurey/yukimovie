import axios from 'axios'
import {
  apikey,
} from 'common/js/config'

const nowPlayingUrl = '/nowplaying'

export function getPlayingMovies() {
  return axios.get(nowPlayingUrl, {
    params: {
      apikey: apikey
    }
  })
}
