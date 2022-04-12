import useModal from 'hooks/useModal'

export default () => {
  // 修改还款周期-默认还款周期
  const {
    visible,
    title,
    openHandle,
    cancleHandle,
    detail,
    setDetail
  } = useModal('确认入库')

  return {
    visible,
    title,
    openHandle,
    cancleHandle,
    detail,
    setDetail
  }
}
