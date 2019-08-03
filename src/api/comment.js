import axios from 'axios'
import {
  newCommentUrl,
  loadCommentUrl
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

export function loadMovieComment(movieInfo, page) {
  return axios.get(loadCommentUrl, {
    params: {
      movieInfo: movieInfo,
      page: page
    }
  })
}
