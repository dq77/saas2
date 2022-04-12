// 列表用到的属性和方法
export default function useList(root) {
  const { $router } = root

  // 操作按钮
  const buttonHandle = (detail) => {
    const { label, row } = detail
    if (label === '查看') {
      $router.push({name: 'reverseOrderderDetail', query: {id: row.id, type: 'look'}})
    }
    if (label === '退货处理') {
      $router.push({name: 'reverseOrderderDetail', query: {id: row.id}})
    }
  }

  // 排序
  const sortChange = (data, currentTab) => {
    const { prop, order, searchInfo, searchHandle } = data
    const orderVals = {
      ascending: 1, // 升序
      descending: 2, // 降序
    }
    // 商品维度 排序类型 1:入库在途量 2:出库在途量 3:库存量
    let orderByType = {
      lockQuantity: 1,
      canSellQuantity: 2,
      stockQuantity: 3,
    }
    if (currentTab === '2') {
      orderByType = {
        lockInTransitQuantity: 1,
        lockOutTransitQuantity: 2,
        stockQuantity: 3,
      }
    }
    searchHandle({
      ...searchInfo.value,
      orderByType: order ? orderByType[prop] : null,
      descAsc: orderVals[order]
    })
  }

  return {
    buttonHandle,
    sortChange,
  }
}
