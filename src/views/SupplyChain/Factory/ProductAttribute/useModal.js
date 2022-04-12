import useModal from 'hooks/useModal'
import { ref } from '@vue/composition-api'

export default () => {
  const type = ref()
  // 修改企业年度授信总额
  const {
    visible,
    title,
    detail,
    openHandle,
    setTitle,
    setDetail,
    cancleHandle
  } = useModal()
  const handleEdit = (title, detail = {}, t) => {
    type.value = t
    setTitle(title)
    setDetail(detail)
    openHandle()
  }
  return {
    visible,
    title,
    detail,
    handleEdit,
    openHandle,
    cancleHandle,
    type
  }
}
