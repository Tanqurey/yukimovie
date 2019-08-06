export default class Comment {
  constructor({
    movieInfo,
    commentTitle,
    commentContent,
    usefulList,
    uselessList,
    createTime,
    userName,
    rating
  }) {
    this.movieInfo = movieInfo
    this.commentTitle = commentTitle
    this.commentContent = commentContent
    this.usefulList = usefulList
    this.uselessList = uselessList
    this.createTime = createTime
    this.userName = userName
    this.rating = rating
  }
}
