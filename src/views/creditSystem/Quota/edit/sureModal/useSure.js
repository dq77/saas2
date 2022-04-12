import useModal from 'hooks/useModal'

export default () => {
  // 修改还款周期-默认还款周期
  const {
    visible,
    title,
    openHandle,
    cancleHandle,
  } = useModal('确认提交授信申请？')

  return {
    visible,
    title,
    openHandle,
    cancleHandle,
  }
}
