import { ref } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useCreate from './useCreate'
// 针对当前pop逻辑，有一定的业务性
/**
 * @param root
 * @param callBack 下一步回调
 * @param operationModule 模块标识
 */
export default ({
  root,
  callBack,
  operationModule
}) => {
  const { $route: { name, query: { hasGuide } }, $router } = root
  const { credit: { getIsGuide } } = ajaxStore
  // create
  const createState = useCreate()
  // 是否显示
  const visible = ref(Number(hasGuide) === 1)
  // 是否做过指引了
  const isGuide = ref(false)
  // 判断是否做过指引
  const { loading, doResult } = useAsync({
    request: getIsGuide,
    init: false,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        visible.value = data === 0
        isGuide.value = data !== 0
      }
      // 无论成功失败与否，只要从操作指引页进入即进行指引
      if (hasGuide) {
        visible.value = Number(hasGuide) === 1
      }
    }
  })
  // 无operationModule则该模块不需要进行指引
  operationModule && doResult({ operationModule })
  // next
  const nextHandle = ({ end, step }) => {
    callBack && callBack({ end, step })
    if (end) {
      visible.value = false
      $router.push({ name })
      // 未做过指引时，最后告知接口已做过指引
      operationModule && !isGuide.value && createState.doResult({ operationModule })
    }
  }

  return {
    visible,
    loading,
    nextHandle
  }
}
