import useBottomBtns from '../Detail/useBottomBtns'

// 列表用到的属性和方法
export default function useList(root, txt) {
  const { $router } = root

  // 新增点击
  const addHandle = () => {
    $router.push({name: txt === '入库' ? 'inAdd' : 'outAdd'})
  }
  // 批量导入
  const uploadHandle = () => $router.push({name: txt === '入库' ? 'inListUpload' : 'outListUpload', query: { type: 'warehouse' }})
  // 操作按钮
  const buttonHandle = (detail, cb) => {
    const { label, row } = detail
    const { id, status, storageType, outboundType } = row
    if (label === '查看') {
      if (txt === '入库') {
        $router.push({name: 'inDetail', query: { id, status, storageType }})
      } else {
        $router.push({name: 'outDetail', query: { id, status, storageType: outboundType }})
      }
    }
    const {
      clickHandle
    } = useBottomBtns({ id, storageType: storageType || outboundType, txt })
    if (label === '关闭') {
      clickHandle('close', cb)
    }
    if (label === '确认入库' || label === '确认出库') {
      clickHandle('confirm', cb)
    }
    if (label === '前往处理') {
      $router.push({ name: 'transfersDetail', query: { wmTransfersInfoId: row?.billId } })
    }
  }

  return {
    buttonHandle,
    addHandle,
    uploadHandle,
  }
}
