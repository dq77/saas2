import useModal from 'hooks/useModal'

export default () => {
  // 修改还款周期-默认还款周期
  const {
    visible,
    title,
    openHandle,
    cancleHandle,
  } = useModal('选择盘点仓库')

  return {
    visible,
    title,
    openHandle,
    cancleHandle,
  }
}
