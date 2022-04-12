// 列表用到的属性和方法
export default function useList(root) {
  const { $router } = root

  // 操作按钮
  const buttonHandle = (detail) => {
    const { label, row } = detail
    if (label === '查看') {
      if (row.goodsQuantity > 0) {
        $router.push({ name: 'inDetail', query: {id: row.billId }})
      } else {
        $router.push({ name: 'outDetail', query: {id: row.billId }})
      }
    }
  }

  return {
    buttonHandle,
  }
}
