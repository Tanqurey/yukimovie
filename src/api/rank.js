import axios from 'axios'
import {
  apikey
} from 'common/js/config'

const rankMap = ['/us_box', '/new_movies', 'weekly']

export default function getRankData(index) {
  return axios.get(rankMap[index], {
    params: {
      apikey: apikey
    }
  })
}
