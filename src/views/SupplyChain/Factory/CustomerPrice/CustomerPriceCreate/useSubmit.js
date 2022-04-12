import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default function ({ root, formData, tableData }) {
  // 从formData和tableData提取要提交的数据
  const mergeData = () => {
    const res = {
      params: {},
      validated: {
        result: true,
        msg: ''
      }
    }
    if (!formData.value.customerId) {
      res.validated.result = false
      res.validated.msg = '请先选择客户'
      return res
    }
    res.params.customerId = formData.value.customerId
    const goods = []
    for (let i = 0; i < tableData.value.length; i++) {
      const row = tableData.value[i]
      if (!row.goodsId) {
        res.validated.result = false
        res.validated.msg = `第${i + 1}行需要选择产品`
        break
      } else if (typeof row.price !== 'number') {
        res.validated.result = false
        res.validated.msg = `第${i + 1}行需要填写客户单价`
        break
      } else {
        const goodItem = {
          goodsId: row.goodsId,
          price: row.price
        }
        row.id && (goodItem.id = row.id)
        goods.push(goodItem)
      }
    }
    res.params.userGoodsPriceDTOList = goods
    return res
  }

  // 预设提交接口
  const { doResult, loading } = useAsync({
    init: false,
    request: ajaxStore.factory.updateCustomerPrice,
    successCallBack(res) {
      if (res.code === '0') {
        Message.success('提交成功')
        backHandle()
      }
    }
  })

  // 提交时需要表单数据的验证
  const validateHandle = ({ result, msg }) => {
    if (result === false) {
      Message.error(msg)
    }
  }

  // 提交功能
  const submitHandle = () => {
    const { params, validated } = mergeData()
    validateHandle(validated)
    validated.result && doResult(params)
  }
  // 返回上一页
  const backHandle = () => root.$router.back()

  return {
    loading,
    submitHandle,
    backHandle,
  }
}
