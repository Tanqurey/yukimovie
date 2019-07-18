import Movie from 'common/js/movie'
import Actor from 'common/js/actor'
import User from 'common/js/user'
import Trailer from 'common/js/trailer'
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
      actor.name_en = item.name_en
      actor.avatar = getImage(item.avatars.large)
      actors.push(new Actor(actor))
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
    json.casts.forEach(item => {
      let director = {}
      director.name = item.name
      director.name_en = item.name_en
      director.avatar = getImage(item.avatars.large)
      directors.push(new Actor(director))
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
    movieObj.languages = concatStringFromArray(json.languages)
  } else {
    movieObj.languages = ''
  }

  if (json.photos) {
    let photos = []
    json.photos.forEach(item => {
      let photo = getImage(item.thumb)
      photos.push(photo)
    })
    movieObj.photos = photo
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

export function modifyUser(user) {
  return new User(user)
}
