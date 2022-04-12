<template lang="pug">
  .page-main
    //- OrderStatus(v-if='queryId' :processInstanceId='processInstanceId' :orderFormData='orderFormData')
    el-collapse.el-collapse(:value='[1,2]')
      el-collapse-item(:name='1' :title='["add", "added"].includes(editStatus) ? "第一步：添加基础信息" : "基础信息"')
        OrderBase(:queryId='queryId' :editStatus='editStatus' :orderFormData='orderFormData' @baseHandle='baseHandle')
      el-collapse-item(:name='2' :title='["add", "added"].includes(editStatus) ? "第二步：添加产品" : "产品"')
        ProductList(ref='refProductList' :editStatus='editStatus' :queryId='queryId' :baseInfo='baseInfo' @productHandle='productHandle')
    //- .p-button(v-if='["detail"].includes(editStatus)')
    //-   el-button(type='primary' plain @click="$router.push({name:'dealerOrderManage'})") 返回
    .p-button
      //- el-button(type='primary' plain @click="$router.push({name:'dealerOrderManage'})") 返回
      el-button(type='primary' plain @click="goBackClick" weblogs-anchor="supplyChain-customer-order-return") 返回
      el-button(v-if='editStatus !== "detail"' type='primary' :loading='loading' :disabled='productList.length <= 0' @click="submitOrder" weblogs-anchor="supplyChain-customer-order-save") 保存
    sign-dialog(:title='modelState.title' :visible='modelState.visible' :detail='modelState.detail' @updateList='() => {}' @cancleHandle='modelState.cancleHandle')
</template>
<script>
import { Message } from 'element-ui'
// import Router from '@/router'
import { ref, reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import OrderStatus from './Components/OrderStatus'
import OrderBase from './Components/OrderBase'
import ProductList from './Components/OrderProduct/index'
import SignDialog from './Components/SignDialog'
import useModal from 'hooks/useModal'
import useLoading from 'hooks/useLoading'

export default {
  components: {
    OrderStatus,
    OrderBase,
    ProductList,
    SignDialog
  },
  setup(props, { root }) {
    const { dealer: { getOrderBasicInfo, createOrder, updateOrder } } = ajaxStore
    const { id, processInstanceId, editFlag } = root.$route.query
    const refProductList = ref()
    const modelState = useModal('签署电子订货单')
    const state = reactive({
      baseInfo: {},
      productList: [],
      queryId: id || '',
      processInstanceId: processInstanceId || '',
      // editStatus 状态 add ,added, detail, edit, submit
      editStatus: editFlag || 'add',
      orderFormData: {},
      signObj: {},
      modelState
    })
    // loading
    const {
      loading,
      checkLoading
    } = useLoading()
    // 成功回调
    const successCallBack = ({ data }) => {
      const { orderFreightPayVO } = data
      const result = data
      result.freightPayType = orderFreightPayVO ? orderFreightPayVO.name : ''
      result.freightCondition = orderFreightPayVO ? orderFreightPayVO.description : ''
      result.orderInvoiceVO && (result.invoiceCompany = result.orderInvoiceVO.invoiceCompany)
      state.orderFormData = result
    }
    // 获取订单基础信息
    useAsync({
      request: getOrderBasicInfo,
      init: state.queryId,
      params: {
        id: state.queryId
      },
      successCallBack
    })
    // 签约
    // const updateList = () => {}
    // 基础信息回传
    const baseHandle = (res, projectChange) => {
      state.baseInfo = res
      state.orderFormData.customerId = res.customerId
      state.orderFormData.projectId = res.projectId
      state.editStatus === 'add' && (state.editStatus = 'added')
    }
    // 订单信息回传
    const productHandle = (productList) => {
      // console.log(productList, 'emit==》productList')
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
      checkLoading(true)
      const param = {...state.baseInfo}
      if (state.editStatus === 'edit') {
        param.id = state.queryId
      }
      if (validNotQuantity()) return
      if (validNotExtendAttribute()) return
      param.orderItemDTOS = state.productList
      doResult(param).then((res) => {
        if (res.code === '0' && res.data) {
          Message.success('提交成功')
          // loading = true
          // 查询电子订货单信息
          setTimeout(function() {
            getOrderBasicInfo({
              id: res.data.id,
            }).then(resOrder => {
              checkLoading(false)
              const {data, code} = resOrder.data || {}
              if (code === '0') {
                state.signObj = {
                  id: data.id,
                  processInstanceId: data.processInstanceId
                }
                signClick({
                  id: data.id,
                  deliverFile: data.orderBlankFileKey
                })
              }
            })
          }, 2000)
          // root.$router.push({name: 'dealerOrderManage'})
        }
      })
    }
    const goBackClick = () => {
      root.$router.push({ name: 'dealerOrderManage', query: {isInit: true}})
    }
    const signClick = (detail) => {
      modelState.openHandle()
      modelState.setDetail(detail)
    }
    // 提交接口
    const { doResult } = useAsync({
      init: false,
      request: state.editStatus === 'edit' ? updateOrder : createOrder,
      preCallback: () => checkLoading(true),
    })
    return {
      refProductList,
      baseHandle,
      productHandle,
      submitOrder,
      loading,
      ...toRefs(state),
      goBackClick
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
