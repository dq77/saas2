const getMessageApis = (instanceQuiet) => {
  return {
    // 获取消息列表
    getMessageList: (data) => instanceQuiet.post('/message/inner/message/post', data),
    // 已读单条消息
    read: params => instanceQuiet.get('/message/inner/message/read', { params }),
    // 批量已读
    readMany: messageId => instanceQuiet.get('/message/inner/message/readMany/' + messageId),
    // 全量已读
    readAll: params => instanceQuiet.get('/message/inner/message/readAll', { params }),
    // 获取消息推送开关状态
    getSwitchState: (params) => instanceQuiet.get('/partner/user/switchConfig', { params }),
    // 改变消息推送开关状态
    setSwitchState: (data) => instanceQuiet.post('/partner/user/updateSwitch', data),
  }
}

export default getMessageApis
