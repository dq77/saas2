import useModal from 'hooks/useModal'

export default () => {
  // 变更授信
  const {
    visible,
    title,
    detail,
    setDetail,
    openHandle,
    cancleHandle,
  } = useModal('变更授信')

  const open = (detail) => {
    openHandle()
    setDetail(detail ?? {})
  }

  return {
    visible,
    title,
    detail,
    open,
    cancleHandle,
  }
}
