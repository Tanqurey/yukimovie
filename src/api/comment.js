import axios from 'axios'
import {
  newCommentUrl,
  loadNewCommentUrl,
  loadHotCommentUrl,
  judgeCommentUrl,
  loadUserCommentUrl,
  recommendCommentUrl
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

export function loadUserComment(userName, page) {
  return axios.get(loadUserCommentUrl, {
    params: {
      userName: userName,
      page: page
    }
  })
}

export function getRecommendComment(page) {
  return axios.get(recommendCommentUrl, {
    params: {
      page: page
    }
  })
}
