import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import { Ref } from '@vue/composition-api'
import { getDaterange } from '@/utils/qjd'
interface submitTypes {
  createActivityRef: Ref;
  tableRef: Ref;
  success: Function;
  type: string;
}

// 校验表格必填项
const validateProduct = (tableData: Array<object>): boolean => {
  if (tableData.length === 0) {
    Message.warning('请先添加产品')
    return false
  }
  for (let i = 0; i < tableData.length; i++) {
    if (!(tableData[i] as any).goodsName) {
      Message.error(`第${i + 1}行产品名称未选择`)
      return false
    }
    if (!(tableData[i] as any).productSn) {
      Message.error(`第${i + 1}行产品型号未选择`)
      return false
    }
    if (!(tableData[i] as any).discountRate) {
      Message.error(`第${i + 1}行折扣未输入`)
      return false
    }
  }
  return true
}

interface restrictedTypes {
  isPurchaseRestricted: string | undefined,
  overRestrictedStrategy: string | undefined,
  restrictedQuantity: number | undefined
}

const validateRestricted = (detail: restrictedTypes): boolean => {
  if (detail.isPurchaseRestricted === 'Y') {
    if (!(detail.restrictedQuantity > 0)) {
      Message.warning('请输入限购数量')
      return false
    }
    if (!detail.overRestrictedStrategy) {
      Message.warning('请选择限购策略')
      return false
    }
  }
  return true
}
const validateCustomer = (isAllCustomerQualified: string, list: Array<object>): boolean => {
  if (isAllCustomerQualified === 'N' && list.length === 0) {
    Message.warning('请选择指定客户')
    return false
  }
  return true
}

export default ({
  createActivityRef,
  tableRef,
  success,
  type = undefined
}: submitTypes) => {
  // ajax
  const { factory: { createActivity, editActivity } } = ajaxStore
  // 提交-接口
  const { doResult, loading } = useAsync({
    request: type === 'edit' ? editActivity : createActivity,
    init: false,
    successCallBack: ({ code, message }): void => {
      if (code === '0') {
        success && success()
        Message.success('保存成功')
      }
    }
  })
  // 提交
  const sureHandle = (id): void => {
    const { formState } = createActivityRef.value ?? {}
    const { tableState } = tableRef.value ?? {}
    formState && formState.submitHandle(() => {
      const { formData } = formState
      const dataSource = tableState.dataSource
      const activityId: string | undefined = type === 'edit' ? id : undefined
      // 单品限购
      const discountActivityDetailDto = {
        isPurchaseRestricted: formData?.isPurchaseRestricted ?? undefined,
        overRestrictedStrategy: formData?.isPurchaseRestricted === 'Y' ? (formData?.overRestrictedStrategy ?? undefined) : undefined,
        restrictedQuantity: formData?.isPurchaseRestricted === 'Y' ? (formData?.restrictedQuantity ?? undefined) : undefined
      }
      if (!validateRestricted(discountActivityDetailDto)) return false
      // 时间
      const { start: startTime, end: endTime } = getDaterange(formData.activityTime)
      // 名称、客户
      const { name, isAllCustomerQualified, qualifiedCustomerIdList: list } = formData
      if (!validateCustomer(isAllCustomerQualified, list)) return false
      const qualifiedCustomerIdList = isAllCustomerQualified === 'N' ? list?.map(item => {
        return item.id
      }) : undefined
      // 判断产品数据不能为空
      if (!validateProduct(dataSource)) return false
      const goodsDiscountRequestDTOS = dataSource.map(item => {
        return {
          id: type === 'edit' ? (item.id ?? undefined) : undefined,
          goodsId: item.goodsId,
          discountRate: item.discountRate
        }
      })
      const params = {
        discountActivityDetailDto,
        startTime: startTime + ':00',
        endTime: endTime + ':00',
        name,
        isAllCustomerQualified,
        goodsDiscountRequestDTOS,
        qualifiedCustomerIdList,
        activityId,
        subType: 'GOODS_DISCOUNT'
      }
      doResult(params)
    })
  }

  return {
    loading,
    sureHandle
  }
}
