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
            @complete='completeBaseInfo'
          )
          ProductInfo(
            ref='tableRef'
            v-else-if='item.name === "1"'
          )
  .p-btns
    el-button(plain @click='clickGoBack') 返回
    el-button(type='primary' @click='clickSaveOrder' :loading='saveLoading') 保存订单
  SignDialog(
    :title='dialogState.title'
    :visible='dialogState.visible'
    :detail='dialogState.detail'
    @close='signCloseHandle'
    @success='signCloseHandle'
  )
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import Card from '@/components/Card'
import SignDialog from '@/views/SupplyChain/Dealer/Order/components/SignDialog'
import useModal from 'hooks/useModal'
import useOrderCache from '../useOrderCache'
import BaseInfo from './baseInfo/index'
import ProductInfo from './productInfo/index'
import useSubmit from './useSubmit'
import { sourceType, collapseList, activedCollapses } from './config'

export default {
  components: {
    Card,
    BaseInfo,
    ProductInfo,
    SignDialog,
  },
  setup(props, { root }) {
    const baseInfoData = ref()
    const baseInfoRef = ref()
    const tableRef = ref()
    /**
     * id 订单ID
     * useCache 为'1'时表示开启订单缓存
     */
    const { useCache } = root.$route.query
    // 签署订货单弹窗
    const dialogState = useModal('签署电子订货单')

    const state = reactive({
      baseInfo: {},
      productInfo: [],
      dialogState,
    })
    // 整页底部按钮的事件执行逻辑
    const {
      clickGoBack,
      clickSave,
      saveLoading,
    } = useSubmit({
      sourceType,
      baseInfoData,
      tableRef
    })

    // 完成基本信息的编辑
    const completeBaseInfo = (v, needRestProduct) => {
      baseInfoData.value = v
      // 重置表格的customerId，projectId
      tableRef.value[0].resetBaseInfo(v)
      // 如果客户、项目变更，则重置表格
      if (needRestProduct) tableRef.value[0].clearTableData()
    }

    // 订单缓存state
    const { startAutoCache, getOrderCache, delOrderCache } = useOrderCache(() => {
      const data = baseInfoData.value || {}
      data.productList = tableRef.value[0].getTableData() || []
      return data
    })

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

    // 点击签署订货单
    const clickSign = (data) => {
      dialogState.setDetail({
        id: data?.id ?? '',
        deliverFile: data?.orderBlankFileKey ?? ''
      })
      dialogState.openHandle()
    }

    // 点击保存订单，要特殊处理订单缓存的逻辑
    const clickSaveOrder = () => {
      clickSave(async (data) => {
        Message.success('提交成功')
        if (store.state?.curFactory?.customerType === 1) {
          const signer = await store.dispatch('user/getSignerOfPerson')
          if (signer.realNameStatus === 2) {
            // 个人用户如果已实名，则可签收
            clickSign(data)
          } else {
            MessageBox.confirm(
              '您未完成时实名认证，请前往订货大师App完成实名认证',
              '提示',
              {
                type: 'warning',
                showCancelButton: false,
              }
            ).then(() => {
              root.$router.push({ name: 'dealerOrderManage' })
            })
            delOrderCache()
          }
        } else {
          clickSign(data)
        }
      })
    }

    // 点击关闭弹窗
    const signCloseHandle = () => {
      delOrderCache()
      dialogState.cancleHandle()
      root.$router.push({ name: 'dealerOrderManage' })
    }

    return {
      sourceType,
      baseInfoRef,
      tableRef,
      baseInfoData,
      collapseList,
      activedCollapses,
      saveLoading,
      ...toRefs(state),
      completeBaseInfo,
      clickGoBack,
      clickSaveOrder,
      signCloseHandle,
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
