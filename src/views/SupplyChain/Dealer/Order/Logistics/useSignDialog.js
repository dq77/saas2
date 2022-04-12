import { ref } from '@vue/composition-api'
import useModal from 'hooks/useModal'

export default () => {
  const payType = ref('')
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
  const payCancleHandle = () => cancleHandle()
  // list还款周期-新增、修改、删除
  const payOperateHandle = (type, detail) => {
    payType.value = type
    openHandle()
    setTitle(typeList[type].title)
    setDetail(detail)
  }

  return {
    payType,
    visible,
    title,
    detail,
    payCancleHandle,
    payOperateHandle
  }
}
