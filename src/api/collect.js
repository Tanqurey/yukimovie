import axios from 'axios'
import {
  addToCollectionUrl,
  checkCollectedUrl,
  removeCollectionUrl,
  loadCollectionUrl
} from 'common/js/config'

export function addToCollection(id, title, directors, userName) {
  return axios.post(addToCollectionUrl, {
    params: {
      id: id,
      title: title,
      directors: directors,
      userName: userName
    }
  })
}

export function checkIsCollected(id, userName) {
  return axios.get(checkCollectedUrl, {
    params: {
      movieId: id,
      userName: userName
    }
  })
}

export function removeCollection(id, userName) {
  return axios.post(removeCollectionUrl, {
    params: {
      movieId: id,
      userName: userName
    }
  })
}

export function loadCollection(userName, page) {
  return axios.get(loadCollectionUrl, {
    params: {
      collectionOwner: userName,
      page: page
    }
  })
}
