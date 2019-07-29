export const apikey = '0b2bdeda43b5688921839c8ecb20399b'
export const doubanPrefix = "/api"

export const localUrl = 'http://localhost:3000/'

export const loginUrl = localUrl + 'user/login'
export const secureQuestionUrl = localUrl + 'user/secureQuestion'
export const checkAnswerUrl = localUrl + 'user/checkAnswer'
export const resetPasswordUrl = localUrl + 'user/resetPassword'
export const registerUrl = localUrl + 'user/register'
export const checkNameUrl = localUrl + 'user/checkName'
export const searchUserUrl = localUrl + 'search/user'
export const addToCollectionUrl = localUrl + 'collect/add'

export const rankMap = ['/us_box', '/new_movies', '/weekly']
export const movieDetailUrl = doubanPrefix + '/subject/'
export const starDetailUrl = doubanPrefix + '/celebrity/'

export const SERVER_ERR_NOTICE = "服务器异常"

export const CURRENT_USER_KEY = '__CURRENT_USER__'

export const CURRENT_USER_EXPIRES_TIME = "2d"

export const ERR_OK = 200

export const DEFAULT_SWIPER_OPTIONS = {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true,
  observer: true,
  observeParents: true
}
