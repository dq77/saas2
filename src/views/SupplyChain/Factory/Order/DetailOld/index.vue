<template lang="pug">
  .page-main
    OrderStatus(v-if='queryId' :processInstanceId='processInstanceId' :orderFormData='orderFormData')
    el-collapse.el-collapse(:value='[1,2,3,4]')
      el-collapse-item(:name='1' :title='["add", "added"].includes(editStatus) ? "第一步：添加基础信息" : "基础信息"')
        OrderBase(:queryId='queryId' :editStatus='editStatus' :orderFormData='orderFormData' @baseHandle='baseHandle')
      el-collapse-item(:name='2' :title='["add", "added"].includes(editStatus) ? "第二步：添加产品" : "产品"')
        ProductList(ref='refProductList' :editStatus='editStatus' :queryId='queryId' :baseInfo='baseInfo' :isClearProduct='isClearProduct' :customerId='orderFormData.customerId' :projectId='orderFormData.projectId' @productHandle='productHandle')
      el-collapse-item(v-if='queryId && orderFormData.status !== 0' :name='3' title='发货信息')
        deliver-info(:queryId='queryId' :status='orderFormData.status')
      el-collapse-item(v-if='queryId && orderFormData.status !== 0' :name='4' title='退货信息')
        reverse-order-info(:queryId='queryId')
    .p-button(v-if='["detail"].includes(editStatus)')
      el-button(type='primary' plain @click="$router.push({name:'orderManage'})" weblogs-anchor='supplyChain-factory-order-edit-return') 返回
      el-button(type='primary' v-if='orderFormData.status === 1' plain @click="cancelOrderHandle") 取消订单
      el-button(type='primary' v-if='orderFormData.status === 2' plain @click="cancelOrderHandle") 关闭订单
    .p-button(v-else)
      el-button(type='primary' plain @click="$router.push({name:'orderManage'})" :weblogs-anchor='queryId?"supplyChain-factory-order-edit-return":"supplyChain-factory-order-return"') 返回
      el-button(type='primary' v-if='orderFormData.status === 0 || orderFormData.status === 1' plain @click="cancelOrderHandle") 取消订单
      el-button(type='primary' v-if='!queryId || (queryId && orderFormData.status == 0 && editStatus === "edit")' :loading='loading' :disabled='productList.length <= 0' @click="submitOrder" :weblogs-anchor='queryId?"supplyChain-factory-order-edit-save":"supplyChain-factory-order-save"') 保存
      el-button(type='primary' v-if='orderFormData.status === 0 && editStatus === "audit" ' @click="approvedOrderHandle") 审核通过
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import { ref, reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import OrderStatus from './Components/OrderStatus'
import OrderBase from './Components/OrderBase'
import ProductList from './Components/OrderProduct/index'
import DeliverInfo from './Components/DeliverInfo'
import ReverseOrderInfo from './Components/ReverseOrderInfo'

export default {
  components: {
    OrderStatus,
    OrderBase,
    ProductList,
    DeliverInfo,
    ReverseOrderInfo
  },
  setup(props, { root }) {
    const { factory: { getOrderBasicInfo, createOrder, updateOrder, cancelOrder, approvedOrder } } = ajaxStore
    const { id, processInstanceId, editFlag } = root.$route.query
    const refProductList = ref()
    const state = reactive({
      baseInfo: {},
      productList: [],
      queryId: id || '',
      processInstanceId: processInstanceId || '',
      // editStatus 状态 add ,added, detail, edit, submit, audit
      editStatus: editFlag || 'add',
      orderFormData: {},
      signObj: {},
      isClearProduct: false,
      // orderStatus: ''
    })
    // 成功回调
    const successCallBack = ({ data }) => {
      const { orderFreightPayVO } = data
      const result = data
      result.freightPayType = orderFreightPayVO?.name ?? ''
      result.freightCondition = orderFreightPayVO?.description ?? ''
      result.orderInvoiceVO && (result.invoiceCompany = result.orderInvoiceVO.invoiceCompany)
      console.log('result---------------', result)
      state.orderFormData = result
      // console.log(state.orderFormData.status, 'state.orderFormData')
    }
    const handleFormSubmitData = () => {
      const submitData = {}
      Object.keys({...state.orderFormData}).forEach(key => {
        submitData[key] = state.orderFormData[key]
        if (key === 'orderFreightPayVO') {
          submitData.orderFreightPayDTO = state.orderFormData[key]
          delete submitData[key]
        }
        if (key === 'orderInvoiceVO') {
          submitData.orderInvoiceDTO = state.orderFormData[key]
          delete submitData[key]
        }
        if (key === 'orderOptionsVOS') {
          submitData.orderOptionsDTOS = state.orderFormData[key]
          delete submitData[key]
        }
      })
      // console.log(submitData, 'submitData')
      return submitData
    }
    // 获取订单基础信息
    const { doResult: _getOrderBasicInfo } = useAsync({
      request: getOrderBasicInfo,
      init: state.queryId,
      params: {
        id: state.queryId
      },
      successCallBack
    })
    // 基础信息回传
    const baseHandle = (res, isClearProduct) => {
      state.baseInfo = res
      // state.orderFormData.customerId = res.customerId
      // state.orderFormData.projectId = res.projectId
      state.editStatus === 'add' && (state.editStatus = 'added')
      isClearProduct && refProductList.value.clearProductList()
    }
    const { doResult: _cancelOrder } = useAsync({
      request: cancelOrder,
      init: false,
      params: { orderId: state.queryId },
      successCallBack: ({code, data}) => {
        _getOrderBasicInfo()
      }
    })
    const { doResult: _approvedOrder } = useAsync({
      request: approvedOrder,
      init: false,
      params: { orderId: state.queryId },
      successCallBack: ({code, data}) => {
        _getOrderBasicInfo()
      }
    })
    const cancelOrderHandle = () => {
      MessageBox.confirm('确定要取消这个订单吗？', '提示', {
        type: 'warning',
        roundButton: true,
      }).then(() => {
        _cancelOrder()
      })
    }
    const approvedOrderHandle = () => {
      MessageBox.confirm('确定要审核通过这个订单吗？', '提示', {
        type: 'warning',
        roundButton: true,
      }).then(() => {
        _approvedOrder()
      })
    }
    // 订单信息回传
    const productHandle = (productList) => {
      console.log(productList, 'emit==》productList')
      state.productList = productList
    }
    const validNotQuantity = () => {
      return state.productList.some((row, index) => {
        if (row.quantity === 0) {
          Message.warning(`第${index + 1}行数量不能为0`)
        }
        return row.quantity === 0
      })
    }
    const validNotExtendAttribute = () => {
      return state.productList.some((row, index) => {
        if (row.extendAttribute?.some(inner => !inner.valueId)) {
          Message.warning(`第${index + 1}行属性信息需要补全`)
        }
        return row.extendAttribute?.some(val => !val.valueId)
      })
    }
    // 提交
    const submitOrder = () => {
      // const param = {...state.baseInfo}
      let param = {}
      if (JSON.stringify(state.baseInfo) !== '{}') {
        param = {...state.baseInfo}
      } else {
        param = handleFormSubmitData()
      }
      if (state.editStatus === 'edit') {
        param.id = state.queryId
      }
      if (validNotQuantity()) return
      if (validNotExtendAttribute()) return
      param.orderItemDTOS = state.productList
      doResult(param).then((res) => {
        if (res.code === '0' && res.data) {
          Message.success('提交成功')
          root.$router.push({name: 'orderManage'})
        }
      })
    }
    // 提交接口
    const { doResult, loading } = useAsync({
      init: false,
      request: state.editStatus === 'edit' ? updateOrder : createOrder
    })
    return {
      refProductList,
      baseHandle,
      productHandle,
      submitOrder,
      cancelOrderHandle,
      approvedOrderHandle,
      loading,
      ...toRefs(state),
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-collapse
  padding: 20px;
  background-color: #fff;
  border none
  .el-collapse-item__header
    font-size 16px
  .el-collapse-item__wrap
    border-bottom none
  .el-collapse-item__header.is-active
    border-bottom-color #EBEEF5
.p-button
  margin-top 40px
  text-align center
</style>
