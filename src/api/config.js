import axios from 'axios'
import {
  modifyWhatsUpUrl
} from 'common/js/config'

export const modifyWhatsUp = function (userName, whastsUp) {
  return axios.post(modifyWhatsUpUrl, {
    params: {
      userName: userName,
      whatsUp: whastsUp
    }
  })
}
