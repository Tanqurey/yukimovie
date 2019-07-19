export default class User {
  constructor({
    userName,
    whatsUp,
    exp,
    level,
    fansCount,
    subscribeCount
  }) {
    this.userName = userName
    this.whatsUp = whatsUp
    this.exp = exp
    this.level = level
    this.fansCount = fansCount,
      this.subscribeCount = subscribeCount
  }
}

export const MAX_LEVEL = 7
export const levelExp = {
  LEVEL_0_EXP: 0,
  LEVEL_1_EXP: 200,
  LEVEL_2_EXP: 600,
  LEVEL_3_EXP: 1250,
  LEVEL_4_EXP: 8800,
  LEVEL_5_EXP: 20000,
  LEVEL_6_EXP: 48000,
  LEVEL_7_EXP: 99000
}


export const activityCategoty = {
  DAILY_LOGIN: 0,
  POST_A_COMMENT: 1,
  POST_A_MOMENT: 1,
  GET_A_FAN: 2
}

export const activityAddExp = [1, 2, 4]
