import axios from 'axios'
import {
  apikey,
  doubanPrefix
} from 'common/js/config'

const rankMap = ['/us_box', '/new_movies', 'weekly']

export default function getRankData(index) {
  return axios.get(doubanPrefix + rankMap[index], {
    params: {
      apikey: apikey,
    }
  })
}
