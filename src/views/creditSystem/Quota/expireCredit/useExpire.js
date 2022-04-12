import useModal from 'hooks/useModal'

export default () => {
  // 失效授信
  const {
    visible,
    title,
    detail,
    setDetail,
    openHandle,
    cancleHandle,
  } = useModal('确认失效此授信？')

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
