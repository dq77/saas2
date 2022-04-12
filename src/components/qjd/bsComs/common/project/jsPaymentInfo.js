import { ref } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'
import { Message } from 'element-ui'

export default () => {
  const tableData = ref([])
  const hasAmount = (surveyData) => {
    if (surveyData.contractAmount) {
      return true
    } else {
      Message.error('填写项目预计回款信息前，请先填写项目合同总金额!')
      return false
    }
  }
  const addRow = () => {
    tableData.value.push({
      paymentNode: '', // 付款节点
      paymentType: '', // 付款方式
      paymentDate: '', // 预计付款时间
      paymentComputeType: '', // 付款金额计算方式
      paymentProportion: '', // 付款比例
      paymentAmount: '', // 付款金额
    })
  }
  const caculatePayRatio = ({val, $index, surveyData}) => {
    if (hasAmount(surveyData)) {
      const ratio = val.target.value / (surveyData.contractAmount * 10000)
      tableData.value[$index].paymentProportion = toAmountStr(ratio * 100, 2)
    } else {
      tableData.value[$index].paymentAmount = ''
    }
  }
  const caculatePayAmount = ({val, $index, surveyData}) => {
    if (hasAmount(surveyData)) {
      const payAmount = surveyData.contractAmount * 10000 * val.target.value / 100
      tableData.value[$index].paymentAmount = toAmountStr(payAmount, 2)
    } else {
      tableData.value[$index].paymentProportion = ''
    }
  }
  const clickPayCalculateType = ({val, $index}) => {
    if (val === 2) {
      tableData.value[$index].paymentProportion = ''
    }
    if (val === 1) {
      tableData.value[$index].paymentAmount = ''
    }
  }
  const deleteRow = ({row, index}) => {
    tableData.value.splice(index, 1)
  }
  const handlePaymentData = (data) => {
    tableData.value = data.projectPayList || []
    // tableData.value.splice(0, tableData.value.length, ...data.projectPayList)
  }
  const hasPaymentList = () => {
    const isValidate = tableData.value.every(obj => {
      return Object.keys(obj).every((item, index) => {
        delete obj.extCode
        delete obj.extProjectCode
        return obj[item] !== null && obj[item] !== ''
      })
    })
    if (!isValidate) {
      Message.warning('请输入完整的项目预计回款信息')
      return false
    }
    return true
  }
  return {
    tableData,
    addRow,
    deleteRow,
    caculatePayRatio,
    caculatePayAmount,
    clickPayCalculateType,
    handlePaymentData,
    hasPaymentList
  }
}
