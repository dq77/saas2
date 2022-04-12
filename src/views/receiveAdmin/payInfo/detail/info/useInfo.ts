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
  } = useModal('详情')

  const open = (detail = null) => {
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
