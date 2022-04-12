<template lang="pug">
.page-main
  Card(noTitle)
    el-collapse.p-collapse(:value='activedCollapses')
      template(
        v-for='item in collapseList'
      )
        el-collapse-item(
          v-if='item.isShow'
          :name='item.name'
          :title='item.title'
        )
          BaseInfo(
            ref='baseInfoRef'
            v-if='item.name === "0"'
            :sourceType='sourceType'
            :orderId='orderId'
            @complete='completeBaseInfo'
          )
          ProductInfo(
            ref='tableRef'
            v-else-if='item.name === "1"'
            :orderId='orderId'
            :baseInfo='baseInfoData'
            :customerId='baseInfoData && baseInfoData.customerId && baseInfoData.customerId.customerId'
            :projectId='baseInfoData && baseInfoData.projectId && baseInfoData.projectId.projectId'
          )
  .p-btns
    el-button(plain @click='clickGoBack') 返回
    el-button(plain type='primary' v-if='showBtnCancel' @click='clickClose' :loading='closeLoading') {{ btnCancelLabel }}
    el-button(type='primary' @click='clickSaveOrder' :loading='saveLoading') 保存订单
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import { Message } from 'element-ui'
import Card from '@/components/Card'
import useOrderCache from '../useOrderCache'
import BaseInfo from './baseInfo/index'
import ProductInfo from './productInfo/index'
import useSubmit from './useSubmit'
import useDetail from './useDetail'

import { sourceType, collapseList, activedCollapses } from './config'

export default {
  components: {
    Card,
    BaseInfo,
    ProductInfo,
  },
  setup(props, { root }) {
    const baseInfoData = ref()
    const baseInfoRef = ref()
    const tableRef = ref()
    /**
     * orderStatus 订单状态：{0: '待审核',1: '已审核',2: '进行中',3: '已关闭',4: '已取消',5: '已完成'},
     * id 订单ID
     * processInstanceId 用于步骤条展示
     * useCache 为'1'时表示开启订单缓存
     */
    const { id: orderId, processInstanceId, useCache } = root.$route.query
    const orderStatus = String(root.$route.query?.orderStatus ?? '')
    const routeName = root.$route.name

    // 按钮显示状态
    const showBtnCancel = orderStatus === 'orderCreate' && ['0', '1', '2'].indexOf(orderStatus) > -1

    // 取消按钮只有订单状态为0、1、2时显示
    const btnCancelLabel = orderStatus === '2' ? '关闭订单' : '取消订单'


    const state = reactive({
      baseInfo: {},
      productInfo: [],
    })
    // 整页底部按钮的事件执行逻辑
    const {
      clickGoBack,
      clickClose,
      clickSave,
      saveLoading,
      closeLoading,
    } = useSubmit({
      sourceType,
      routeName,
      orderId,
      orderStatus,
      baseInfoData,
      tableRef,
    })

    if (routeName === 'orderEdit' && orderId) {
      useDetail({
        orderId,
        baseInfoRef,
        tableRef,
      })
    }

    // 完成基本信息的编辑
    const completeBaseInfo = (v, needRestProduct) => {
      baseInfoData.value = v
      // 重置表格的customerId，projectId
      tableRef.value[0].resetBaseInfo(v)
      // 如果经销商、项目变更，则重置表格
      if (needRestProduct) tableRef.value[0].clearTableData()
    }

    // 订单缓存state
    const { startAutoCache, getOrderCache, delOrderCache } = useOrderCache(() => {
      const data = baseInfoData.value || {}
      data.productList = tableRef.value[0].getTableData() || []
      return data
    })

    // 使用订单缓存
    if (routeName === 'orderCreate') {
      // 开启订单缓存
      startAutoCache()
      if (useCache === '1') {
        // 使用订单缓存
        getOrderCache().then(res => {
          const orderCache = JSON.parse(res?.orderCache ?? '{"productList": []}')
          const productList = orderCache.productList ?? []
          delete orderCache.productList
          baseInfoRef.value[0].initCacheBaseInfo(orderCache)
          tableRef.value[0].initCacheTableData(productList)
        })
      }
    }

    // 点击保存订单，要特殊处理订单缓存的逻辑

    const clickSaveOrder = async () => {
      await clickSave(async (data) => {
        Message.success('提交成功')
        await delOrderCache()
        root.$router.push({ name: 'orderManage' })
      })
    }

    return {
      sourceType,
      orderId,
      processInstanceId,
      orderStatus,
      baseInfoRef,
      tableRef,
      showBtnCancel,
      btnCancelLabel,
      baseInfoData,
      collapseList,
      activedCollapses,
      completeBaseInfo,
      ...toRefs(state),
      clickGoBack,
      clickClose,
      clickSaveOrder,
      closeLoading,
      saveLoading,
    }
  },
}
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
