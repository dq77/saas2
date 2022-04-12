import useModal from 'hooks/useModal'

export default ({
  customTitle = '批量添加'
} = {}) => {
  // 修改还款周期-默认还款周期
  const {
    visible,
    title,
    openHandle,
    cancleHandle
  } = useModal(customTitle ?? '批量添加')

  return {
    visible,
    title,
    openHandle,
    cancleHandle,
  }
}
