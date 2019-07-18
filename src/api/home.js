import axios from 'axios'
import {
  apikey,
  doubanPrefix
} from 'common/js/config'

const nowPlayingUrl = doubanPrefix + '/nowplaying'

export function getPlayingMovies() {
  return axios.get(nowPlayingUrl, {
    params: {
      apikey: apikey,
    }
  })
}
