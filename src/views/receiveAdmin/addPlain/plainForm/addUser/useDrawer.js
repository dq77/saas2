import { ref } from '@vue/composition-api'

export default () => {
  // 是否显示
  const visible = ref(false)
  // 切换显示or隐藏
  const check = value => { visible.value = value }

  return {
    visible,
    check
  }
}
