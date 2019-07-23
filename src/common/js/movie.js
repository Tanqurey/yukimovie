export default class Movie {
  constructor({
    title,
    id,
    originalTitle,
    imageUrl,
    pubdate,
    actors,
    countries,
    directors,
    durations,
    language,
    photos,
    tags,
    score,
    introduction,
    year
  }) {
    this.title = title,
      this.id = id,
      this.originalTitle = originalTitle,
      this.imageUrl = imageUrl,
      this.pubdate = pubdate,
      this.actors = actors,
      this.countries = countries,
      this.directors = directors,
      this.durations = durations,
      this.language = language,
      this.photos = photos,
      this.tags = tags,
      this.score = score,
      this.introduction = introduction,
      this.year = year
  }

}
