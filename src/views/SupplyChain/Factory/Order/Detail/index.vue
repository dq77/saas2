<template lang="pug">
.page-main
  Card(noTitle)
    OrderSteps(
      :processInstanceId='processInstanceId'
    )
    el-collapse.p-collapse(:value='collapseState.activedCollapses')
      template(
        v-for='item in collapseState.collapseList'
      )
        el-collapse-item(
          v-if='item.isShow'
          :name='item.name'
          :title='item.title'
        )
          BaseInfoDetail(
            :formData='detailState.baseInfoData'
            v-loading='detailState.baseInfoLoading'
            v-if='item.name === "0"'
          )
          template(v-else-if='item.name === "1"')
            GoodsTableDetail(
              :goodsData='detailState.goodsData'
              :baseInfoData='detailState.baseInfoData'
              v-loading='detailState.goodsLoading'
            )
            GoodsSummary(:summary='detailState.summary')
          DeliverInfo(
            :orderId='orderId'
            :status='orderStatus'
            v-else-if='routeName === "orderDetail" && item.name === "2"'
          )
          ReverseOrderInfo(
            :queryId='orderId'
            v-else-if='routeName === "orderDetail" && item.name === "3"'
          )
  .p-btns
    el-button(plain @click='clickGoBack') 返回
    el-button(plain type='primary' v-if='showBtnCancel' @click='clickClose' :loading='closeLoading') {{ btnCancelLabel }}
    el-button(type='primary' v-if='showBtnPassAudit' @click='clickPassAudit' :loading='auditLoading') 审核通过
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import BaseInfoDetail from '@/views/SupplyChain/components/baseInfoDetail'
import GoodsTableDetail from '@/views/SupplyChain/components/goodsTableDetail2'
import GoodsSummary from '@/views/SupplyChain/components/goodsSummary'
import OrderSteps from './orderSteps'
import DeliverInfo from './deliverInfo'
import ReverseOrderInfo from './reverseOrderInfo'
import useCollapse from './useCollapse'
import useDetail from './useDetail'
import useBottomBtns from './useBottomBtns'

export default defineComponent({
  components: {
    Card,
    OrderSteps,
    BaseInfoDetail,
    GoodsTableDetail,
    GoodsSummary,
    DeliverInfo,
    ReverseOrderInfo,
  },
  setup(props, { root }) {
    const { id: orderId, orderStatus, processInstanceId } = root.$route.query
    const routeName = root.$route.name
    // 按钮显示状态
    const showBtnCancel = ['0', '1', '2'].indexOf(orderStatus) > -1
    const showBtnPassAudit = routeName === 'orderAudit'

    // 取消按钮只有订单状态为0、1、2时显示
    const btnCancelLabel = orderStatus === '2' ? '关闭订单' : '取消订单'

    const collapseState = useCollapse({ routeName })
    const detailState = useDetail({ orderId })

    // 整页底部按钮的事件执行逻辑
    const {
      clickGoBack,
      clickClose,
      clickPassAudit,
      closeLoading,
      auditLoading,
    } = useBottomBtns({
      orderId,
      orderStatus,
    })

    const state = reactive({
      collapseState,
      detailState,
    })

    return {
      routeName,
      orderId,
      orderStatus,
      processInstanceId,
      showBtnCancel,
      showBtnPassAudit,
      btnCancelLabel,
      closeLoading,
      auditLoading,
      ...toRefs(state),
      clickGoBack,
      clickClose,
      clickPassAudit,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-collapse
  border none
  background-color: #fff;
  >>>.el-collapse-item__header
    font-size 16px
  >>>.el-collapse-item__wrap
    border-bottom none
  >>>.el-collapse-item__header.is-active
    border-bottom-color #EBEEF5
.p-btns
  padding-top 40px
  padding-bottom 40px
  text-align: center
</style>
