import { Message } from 'element-ui'

export default ({
  formRef,
  getFormState,
  getTableState,
  getDelTable,
  uploadRef,
}) => {
  // 验证table格式
  const checkTable = () => {
    return !getTableState().dataSource.some(item => {
      if (!item.name) Message.error('请填写股东姓名')
      return !item.name
    })
  }
  // 检查验证
  const check = async () => {
    const { submitHandle: checkForm } = formRef.value ?? {}
    const { checkUpload } = uploadRef.value ?? {}
    const validList = await Promise.all([checkForm(), checkTable(), checkUpload()])
    const result = !validList.some(item => !item)
    return result
  }
  const getFormData = () => {
    const { getDataSource } = uploadRef.value ?? {}
    return {
      baseInfo: getFormState().formData,
      tableInfo: getTableState().dataSource,
      delTableInfo: getDelTable(),
      uploadInfo: getDataSource(),
    }
  }
  return {
    check,
    getFormData,
  }
}
