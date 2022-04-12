import useModal from 'hooks/useModal'

export default () => {
  // useModal
  const {
    visible,
    title,
    detail,
    setDetail,
    openHandle,
    cancleHandle,
  } = useModal('添加收款')

  const open = detail => {
    setDetail(detail)
    openHandle()
  }

  return {
    visible,
    title,
    detail,
    open,
    cancleHandle,
  }
}
