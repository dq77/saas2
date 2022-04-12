import { ref } from '@vue/composition-api'
import useModal from 'hooks/useModal'

export default () => {
  const orgType = ref('')
  // 还款周期增删改-list
  const {
    visible,
    title,
    detail,
    cancleHandle,
    openHandle,
    setTitle,
    setDetail
  } = useModal()
  // list还款周期-取消
  const orgCancleHandle = () => cancleHandle()
  // list还款周期-新增、修改、删除
  const orgOperateHandle = (type, detail) => {
    orgType.value = type
    openHandle()
    setTitle(type === 'add' ? '添加授信额度' : type === 'edit' ? '修改授信额度' : '')
    setDetail(detail)
  }

  return {
    orgType,
    visible,
    title,
    detail,
    setTitle,
    orgCancleHandle,
    orgOperateHandle
  }
}
