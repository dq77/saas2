// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

// 企业关联关系
export const relationship = {
  OWN: '法人',
  SERVE_ALL: '任职',
  INVEST: '投资',
  // BRANCH: '分支',
  // LAW: '诉讼',
  // CAC: '竞合',
  // EQ: '债务'
}
