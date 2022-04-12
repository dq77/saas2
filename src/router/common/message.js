const MessageList = () => import(/* webpackChunkName: "group-common" */ '@/views/common/Message/MessageList')
const MessageSubscribe = () => import(/* webpackChunkName: "group-common" */ '@/views/common/Message/MessageSubscribe')
const pages = [
  { path: 'message/list', name: 'messageList', components: { default: MessageList }, meta: { crumbs: ['消息中心', '我的消息'] } },
  { path: 'message/subscribe', name: 'messageSubscribe', components: { default: MessageSubscribe }, meta: { crumbs: ['消息中心', '消息订阅'] } },
]

export default pages
