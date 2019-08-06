import axios from 'axios'
import {
  newCommentUrl,
  loadNewCommentUrl,
  loadHotCommentUrl,
  judgeCommentUrl,
  queryCountUrl
} from 'common/js/config'

export function newComment(comment, userName, movieInfo) {
  return axios.post(newCommentUrl, {
    params: {
      comment: comment,
      userName: userName,
      movieInfo: movieInfo
    }
  })
}

export function loadNewComment(movieInfo, page) {
  return axios.get(loadNewCommentUrl, {
    params: {
      movieInfo: movieInfo,
      page: page
    }
  })
}

export function loadHotComment(movieInfo, page) {
  return axios.get(loadHotCommentUrl, {
    params: {
      movieInfo: movieInfo,
      page: page
    }
  })
}

export function judgeComment(flag, comment, commentUser) {
  return axios.post(judgeCommentUrl, {
    params: {
      judgeFlag: flag,
      comment: comment,
      commentUser: commentUser
    }
  })
}

export function queryCount(comment) {
  return axios.get(queryCountUrl, {
    params: {
      comment: comment
    }
  })
}
