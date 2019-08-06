export default class User {
  constructor({
    userName,
    whatsUp,
    exp,
    level,
    fansList,
    subscribeList,
    lastLoginTime,
    isAdmin,
  }) {
    this.userName = userName
    this.whatsUp = whatsUp
    this.exp = exp
    this.level = level
    this.fansList = fansList
    this.subscribeList = subscribeList
    this.lastLoginTime = lastLoginTime
    this.isAdmin = isAdmin
  }
}

export const MAX_LEVEL = 7
export const levelExp = {
  LEVEL_0_EXP: 0,
  LEVEL_1_EXP: 6,
  LEVEL_2_EXP: 32,
  LEVEL_3_EXP: 64,
  LEVEL_4_EXP: 2000,
  LEVEL_5_EXP: 4800,
  LEVEL_6_EXP: 12000,
  LEVEL_7_EXP: 99000
}


export const activityCategoty = {
  DAILY_LOGIN: 0,
  POST_A_MOMENT: 1,
  POST_A_COMMENT: 2
}

export const activityAddExp = [1, 2, 4]
