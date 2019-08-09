import axios from 'axios'
import {
  getGuestDataUrl
} from 'common/js/config'

export function getGuestData(guestName) {
  return axios.get(getGuestDataUrl, {
    params: {
      guestName: guestName
    }
  })
}
