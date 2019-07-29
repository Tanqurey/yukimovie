import Movie from 'common/js/movie'
import Star from 'common/js/star'
import User from 'common/js/user'

import {
  getImage
} from 'api/kit'

import {
  concatStringFromArray
} from 'api/kit'

export function modifyMovieData(json) {
  let movieObj = {}
  movieObj.title = json.title
  movieObj.id = json.id
  movieObj.originalTitle = json.original_title
  movieObj.imageUrl = getImage(json.images.large)

  if (json.pubdate) {
    movieObj.pubdate = json.pubdate
  } else if (json.pubdates) {
    movieObj.pubdate = concatStringFromArray(json.pubdates)
  } else {
    movieObj.pubdate = ''
  }

  if (json.casts) {
    let actors = []
    json.casts.forEach(item => {
      let actor = {}
      actor.name = item.name
      actor.id = item.id
      actor.name_en = item.name_en
      actor.avatar = item.avatars === null ? 'common/images/default-avatar.jpg' : getImage(item.avatars.large)
      actors.push(new Star(actor))
    })
    movieObj.actors = actors
  } else {
    movieObj.actors = null
  }

  if (json.countries) {
    movieObj.countries = json.countries
  } else {
    movieObj.countries = ''
  }

  if (json.directors) {
    let directors = []
    json.directors.forEach(item => {
      let director = {}
      director.name = item.name
      director.id = item.id
      director.name_en = item.name_en
      director.avatar = item.avatars === null ? 'common/images/default-avatar.jpg' : getImage(item.avatars.large)
      directors.push(new Star(director))
    })
    movieObj.directors = directors
  } else {
    movieObj.directors = null
  }

  if (json.durations) {
    movieObj.durations = concatStringFromArray(json.durations)
  } else {
    movieObj.durations = ''
  }

  if (json.languages) {
    movieObj.language = concatStringFromArray(json.languages)
  } else {
    movieObj.language = ''
  }

  if (json.photos) {
    let photos = []
    json.photos.forEach(item => {
      let photo = getImage(item.thumb)
      photos.push(photo)
    })
    movieObj.photos = photos
  } else {
    movieObj.photos = null
  }

  if (json.genres) {
    movieObj.tags = concatStringFromArray(json.genres)
  } else {
    movieObj.tags = ''
  }

  if (json.rating) {
    if (json.rating.average) {
      movieObj.score = json.rating.average

    } else {
      movieObj.score = json.rating
    }
  } else {
    movieObj.score = '暂无评分'
  }

  if (json.summary) {
    movieObj.introduction = json.summary
  } else {
    movieObj.introduction = ''
  }

  if (json.year) {
    movieObj.year = json.year
  } else {
    movieObj.year = ''
  }

  return new Movie(movieObj)
}


export function modifyStar(json) {
  let star = {}
  star.name = json.name
  star.avatar = getImage(json.avatars.large)
  star.name_en = json.name_en
  star.introduction = json.summary
  star.id = json.id
  star.birthday = json.birthday
  star.bornPlace = json.born_place

  if (json.photos) {
    let photos = []
    json.photos.forEach(item => {
      let photo = getImage(item.thumb)
      photos.push(photo)
    })
    star.photos = photos
  } else {
    star.photos = null
  }

  if (json.works) {
    let artworks = []
    json.works.forEach(item => {
      artworks.push(modifyMovieData(item.subject))
    })
    star.artworks = artworks
  } else {
    star.artworks = null
  }

  return new Star(star)
}

export function modifyUser(json) {
  let user = {}
  user.whatsUp = json.whatsUp
  user.level = json.level
  user.fansCount = json.fansCount
  user.subscribeCount = json.subscribeCount
  user.lastLoginTime = json.lastLoginTime
  user.userName = json.userName
  user.isAdmin = json.isAdmin

  return new User(user)
}
