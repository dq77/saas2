import { ref, onUnmounted } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function (getOrderData) {
  const orderCache = ref(null) // 服务端缓存
  let timer = null // 保存缓存的定时器
  let openAuthCahce = false // 是否开启自动缓存
  let cacheStr = '{"productList":[]}' // 客户端上一次缓存的数据
  // 自动缓存订单的逻辑
  const timerCache = () => {
    if (!timer && openAuthCahce) {
      timer = window.setTimeout(() => {
        const newCacheStr = JSON.stringify(getOrderData())
        if (newCacheStr !== cacheStr) {
          createOrderCache({
            data: newCacheStr,
            successCb: () => {
              cacheStr = newCacheStr
              timer = null
              timerCache()
            },
            errorCb: () => {
              timer = null
              timerCache()
            }
          })
        } else {
          timer = null
          timerCache()
        }
      }, 5000)
    }
  }

  const startAutoCache = async () => {
    openAuthCahce = true
    timerCache()
    onUnmounted(() => {
      endAutoCache()
    })
  }

  // 关闭自动缓存
  const endAutoCache = () => {
    openAuthCahce = false
    window.clearTimeout(timer)
  }

  // 创建订单缓存
  const createOrderCache = async ({ data, successCb, errorCb }) => {
    const { doResult } = useAsync({
      request: ajaxStore.factory.createOrderCache,
      init: false,
    })

    const res = await doResult({ orderCache: data })
    if (res?.code === '0') {
      successCb()
    } else {
      errorCb(res)
    }
  }
  // 获取缓存的订单
  const getOrderCache = async () => {
    const { doResult } = useAsync({
      request: ajaxStore.factory.getOrderCache,
      init: false,
    })

    const res = await doResult()
    if (res?.code === '0' && res?.data) {
      orderCache.value = res.data
      cacheStr = res.data.orderCache
    } else {
      orderCache.value = null
    }
    return orderCache.value
  }
  // 删除缓存的订单
  const delOrderCache = async (successCb, errorCb) => {
    const { doResult } = useAsync({
      request: ajaxStore.factory.delOrderCache,
      init: false
    })
    const res = await doResult()
    if (res?.code === '0') {
      successCb && successCb()
    } else {
      errorCb && errorCb(res)
    }
  }

  return {
    orderCache,
    startAutoCache,
    endAutoCache,
    getOrderCache,
    delOrderCache,
  }
}
