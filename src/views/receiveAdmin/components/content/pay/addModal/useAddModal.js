import { ref } from '@vue/composition-api'
import useModal from 'hooks/useModal'

export default () => {
  // 类型
  const type = ref('add')
  // useModal
  const {
    visible,
    title,
    detail,
    openHandle,
    cancleHandle,
    setDetail,
  } = useModal('应收款项')

  const open = (detail, t) => {
    type.value = t
    setDetail(detail)
    openHandle()
  }

  const cancle = () => {
    cancleHandle()
    setDetail(null)
  }

  return {
    visible,
    title,
    detail,
    type,
    open,
    cancle,
  }
}
