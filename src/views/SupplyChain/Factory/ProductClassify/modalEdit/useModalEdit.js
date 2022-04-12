import { ref } from '@vue/composition-api'

export default ({
  cb
}) => {
  // 获取并处理数据
  const visible = ref(false)
  const setVisible = () => {
    visible.value = !visible.value
  }
  const cancleHandle = () => {
    visible.value = false
  }
  const successHandle = () => {
    cb && cb()
  }
  return {
    visible,
    setVisible,
    cancleHandle,
    successHandle,
  }
}
