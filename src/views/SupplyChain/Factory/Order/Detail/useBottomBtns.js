import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default function ({ orderId, orderStatus }) {
  // 点击返回
  const clickGoBack = () => router.go(-1)

  // 请求 关闭订单
  const { doResult: doClose, loading: closeLoading } = useAsync({
    request: ajaxStore.factory.cancelOrder,
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const content = orderStatus === '0' ? '订单取消成功' : '订单关闭成功'
        Message.success(content)
        router.go(-1)
      }
    }
  })
  // 点击取消
  const clickClose = () => {
    const content = orderStatus === '0' ? '确定要取消这个订单吗？' : '确定要关闭这个订单吗？'
    MessageBox.confirm(content, '提示', {
      type: 'warning',
      roundButton: true,
    }).then(() => {
      doClose({ orderId })
    })
  }

  // 请求 审核
  const { doResult: doAudit, loading: auditLoading } = useAsync({
    request: ajaxStore.factory.approvedOrder,
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        Message.success('订单审核成功')
        router.go(-1)
      }
    }
  })
  // 点击审核通过
  const clickPassAudit = () => {
    doAudit({ orderId })
  }

  return {
    clickGoBack,
    clickClose,
    clickPassAudit,
    closeLoading,
    auditLoading,
  }
}
