import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import batchQueryInventory from '@/utils/qjd/supplyChain/batchQueryInventory'

export default function () {
  const state = reactive({
    needCheckInventory: true, // 是否可超库存，前端暂时无用，由后端校验
    needShowInvenstory: false, // 是否显示库存
    excessInventory: [], // 超库存产品行
  })

  // 查询库存配置
  useAsync({
    request: ajaxStore.factory.getInventoryConfig,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        state.needCheckInventory = res.data.negativeInventoryFlag === 0
        state.needShowInvenstory = res.data.isShowQuantity === 1
      }
    }
  })

  // 为产品行设置库存量
  const setCurrentInventorys = ({ rows, orderId }) => {
    batchQueryInventory({
      rows,
      orderId,
      request: ajaxStore.factory.getCurrentInventorys
    })
  }

  return {
    ...toRefs(state),
    setCurrentInventorys,
  }
}
