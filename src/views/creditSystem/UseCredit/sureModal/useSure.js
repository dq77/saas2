import useModal from 'hooks/useModal'

export default () => {
  // 修改还款周期-默认还款周期
  const {
    visible,
    title,
    openHandle,
    cancleHandle,
    setDetail,
    detail
  } = useModal('关单确定')

  return {
    visible,
    title,
    openHandle,
    cancleHandle,
    setDetail,
    detail
  }
}
