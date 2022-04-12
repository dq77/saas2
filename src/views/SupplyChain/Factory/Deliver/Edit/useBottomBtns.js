import { Message } from 'element-ui'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { valiFile, getFiles } from '../utils'

export default function ({
  deliverInfoRef,
  goodsTableRef,
  routeName,
}) {
  const isEdit = routeName === 'deliverEdit'

  const handerDeliverInfoData = () => {
    const submitFormData = {}
    const { deliverInfo, uploadState, formState: { formData, loopFormData, submitHandle } } = deliverInfoRef.value
    const newFileList = getFiles(formData.fileList)
    submitFormData.extDeliverCode = deliverInfo.extDeliverCode // 外部发货编号
    submitFormData.extOrderId = deliverInfo.extId // 外部订单id
    isEdit ? submitFormData.id = deliverInfo.deliverId : submitFormData.orderId = deliverInfo.id
    loopFormData((item, key) => {
      if (key === 'receiptAddress') {
        submitFormData.provinceCode = item[key][0]
        submitFormData.cityCode = item[key][1]
        submitFormData.areaCode = item[key][2]
      } else if (key === 'fileArrayList') {
        submitFormData[key] = newFileList
      } else {
        submitFormData[key] = item[key]
      }
    })
    return {
      submitFormData,
      submitHandle,
      uploadState,
      newFileList,
      formData
    }
  }
  const { doResult: sureHandle, loading: sureLoading } = useAsync({
    request: isEdit ? ajaxStore.factory.editDeliver : ajaxStore.factory.createDeliver,
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        router.push({ name: 'deliveryManage' })
      }
    },
  })

  // 点击确定
  const clickSure = () => {
    const deliverItems = goodsTableRef.value.getEditData()
    const { submitHandle, submitFormData, uploadState, newFileList } = handerDeliverInfoData()
    const { isRequireInfo } = uploadState
    const { isHas, id } = valiFile(isRequireInfo.value, newFileList)
    if (!isHas) {
      Message.warning(`请上传${isRequireInfo.value[id].materialsName}`)
      return
    }
    if (deliverItems.length) {
      submitHandle(() => sureHandle({ deliverItemDTOS: deliverItems, ...submitFormData }))
    } else {
      Message.error('请选择发货货物明细！')
    }
  }
  // 点击返回
  const clickBack = () => router.go(-1)

  return {
    clickSure,
    clickBack,
    sureLoading,
  }
}
