/* eslint-disable */
import { Message, MessageBox } from 'element-ui'
import { ref, computed } from '@vue/composition-api'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default function ({ id, storageType, txt }) {
  const { wmstorageinfoClose, wmstorageinfoConfirm, wmoutboundinfoClose, wmoutboundinfoConfirm } = ajaxStore.factory

  let closeApi
  let confirmApi
  if (txt === '入库') {
    closeApi = wmstorageinfoClose
    confirmApi = wmstorageinfoConfirm
  } else {
    closeApi = wmoutboundinfoClose
    confirmApi = wmoutboundinfoConfirm
  }

  // 点击返回
  const clickGoBack = () => router.go(-1)

  const type = ref('')

  // 计算是关闭还是确认
  const tipTxt = computed(() => {
    return (type.value === 'close' ? '关闭' : '确认')
  })

  let params = {}

  // 点击取消
  let loading = false
  const clickHandle = (val, cb) => {
    type.value = val
    if (txt === '入库') {
      params = {
        storageType: Number(storageType),
        wmStorageInfoId: id
      }
    } else {
      params = {
        storageType: Number(storageType),
        wmOutboundInfoId: id
      }
    }
    MessageBox.confirm(`确定要${tipTxt.value}${txt}吗？`, '提示', {
      type: 'warning',
      roundButton: true,
    }).then(() => {
      // 关闭、确认
      const { loading: loading2 } = useAsync({
        request: type.value === 'close' ? closeApi : confirmApi,
        params,
        successCallBack: (res) => {
          if (res?.code === '0') {
            Message.success(`${tipTxt.value}${txt}成功`)
            cb && cb()
          }
        }
      })
      loading = loading2
    }).catch((err) => {
      console.log(err)
    })
  }

  return {
    clickGoBack,
    clickHandle,
    loading,
  }
}
