import useModal from 'hooks/useModal'

export default () => {
  // 修改企业年度授信总额
  const {
    visible,
    title,
    detail,
    setDetail,
    setTitle,
    openHandle,
    cancleHandle
  } = useModal('授信总额度修改')
  // 企业年度授信总额-编辑
  const moneyEditHandle = (detail) => {
    const money = Number(detail.creditLine)
    setTitle(money ? '授信总额度修改' : '授信总额度添加')
    setDetail(detail || {})
    openHandle()
  }
  // 企业年度授信总额-取消
  const moneyCancleHandle = () => cancleHandle()

  return {
    visible,
    title,
    detail,
    moneyEditHandle,
    moneyCancleHandle,
  }
}
