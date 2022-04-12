import { Message } from 'element-ui'

export default ({
  formRef,
  spouseFormRef,
  getFormState,
  getSpouseFormState,
  getTableState,
  getDelTable,
  uploadRef,
  spouseUploadRef,
}) => {
  // 验证table格式
  const checkTable = () => {
    return !getTableState().dataSource.some(item => {
      if (!item.rightHolder) Message.error('请填写法人房屋所有人')
      // if (!item.locateLocationCode) Message.error('请填写法人房屋省市区')
      // if (!item.locateLocation) Message.error('请填写法人房屋详细地址')
      // if (!item.houseFloor) Message.error('请填写法人房屋楼层')
      // if (!item.buildingArea) Message.error('请填写法人建筑面积')
      // if (!item.houseValue) Message.error('请填写法人房产价值')

      return !item.rightHolder
      // return !item.rightHolder || !item.buildingArea || !item.locateLocation || !item.houseFloor || !item.locateLocationCode || !item.houseValue
    })
  }
  // 检查验证
  const check = async () => {
    const { submitHandle: checkForm } = formRef.value ?? {}
    const { submitHandle: checkSpouseForm } = spouseFormRef.value ?? {}
    const { checkUpload } = uploadRef.value ?? {}
    const { checkUpload: checkSpouseUpload } = spouseUploadRef.value ?? {}
    const validList = await Promise.all([checkForm(), checkSpouseForm(), checkTable(), checkUpload(), checkSpouseUpload()])
    const result = !validList.some(item => !item)
    return result
  }
  const getFormData = () => {
    const { getDataSource } = uploadRef.value ?? {}
    const { getDataSource: getSpouseDataSource } = spouseUploadRef.value ?? {}
    return {
      baseInfo: getFormState().formData,
      spouseBaseInfo: getSpouseFormState().formData,
      tableInfo: getTableState().dataSource,
      delTableInfo: getDelTable(),
      uploadInfo: getDataSource(),
      spouseUploadInfo: getSpouseDataSource()
    }
  }
  return {
    check,
    getFormData,
  }
}
