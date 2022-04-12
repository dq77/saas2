import useModal from 'hooks/useModal'

export default () => {
  // useModal
  const {
    visible,
    title,
    detail,
    openHandle,
    cancleHandle,
    setDetail,
  } = useModal('调整记录')

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
