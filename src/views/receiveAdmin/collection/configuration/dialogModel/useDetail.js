export default function ({
  urgeWay,
  formState,
  strategyState,
  propsData,
}) {
  const init = () => {
    formState.setFormItem('title', propsData.title)
    formState.setFormItem('channels', propsData.channels)
    formState.setFormItem('messageTemplateCode', propsData.messageTemplateCode)
    formState.setFormItem('strategys', propsData.modelStrategy.map(item => {
      return {
        objectReferenceId: item.objectReferenceId,
        compareWay: item.compareWay,
        compareValue: item.compareValue,
        suffixText: item.suffixText,
        objectType: item.objectType, // 后端需要
      }
    }))
    if (urgeWay === 'STAFF') {
      formState.setFormItem('receiver', propsData.receiver)
      const options = [{ roleName: propsData.receiverDesc, roleCode: propsData.receiver }]
      formState.setConfig('receiver', 'options', options)
    }
  }
  init()
}
