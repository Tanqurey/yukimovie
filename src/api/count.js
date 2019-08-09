import axios from 'axios'
import {
  queryCountUrl,
  changeCountUrl,
  loadCountDetailUrl
} from 'common/js/config'

export function queryCount(comment) {
  return axios.get(queryCountUrl, {
    params: {
      comment: comment
    }
  })
}

export function changeCount(user, guest, handle) {
  return axios.post(changeCountUrl, {
    params: {
      handle: handle,
      user: user,
      guest: guest
    }
  })
}

export function loadCountDetail(cate, page, userName) {
  return axios.get(loadCountDetailUrl, {
    params: {
      cate: cate,
      page: page,
      userName: userName
    }
  })
}
