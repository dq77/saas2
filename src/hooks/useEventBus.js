import Bus from '@/utils/bus'
import { onBeforeUnmount, onMounted } from '@vue/composition-api'
/**
 * 场景：适用于eventBus事件触发和监听使用
 * @param event 事件名称
 * @param callback 响应事件回调方法
 */
export default ({
  event
}) => {
  const initEvent = (callback) => {
    // 监听事件
    onMounted(() => {
      Bus.$on(event, callback)
    })
    // 移除监听
    onBeforeUnmount(() => {
      Bus.$off(event)
    })
  }

  // 触发事件
  const emitEvent = (data) => {
    Bus.$emit(event, data)
  }

  return {
    initEvent,
    emitEvent
  }
}
