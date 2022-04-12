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
          BaseInfoDetail(
            mode='dealer'
            sourceType='1'
            :formData='detailState.baseInfoData'
            v-loading='detailState.baseInfoLoading'
            v-if='item.name === "0"'
            @clickSign='clickSign'
          )
          template(v-else-if='item.name === "1"')
            GoodsTableDetail(
              :goodsData='detailState.goodsData'
              v-loading='detailState.goodsLoading'
            )
            GoodsSummary(:summary='detailState.summary')
  .p-btns
    el-button(plain @click='clickGoBack') 返回
  SignDialog(
    :title='dialogState.title'
    :visible='dialogState.visible'
    :detail='dialogState.detail'
    @close='dialogState.cancleHandle'
    @success='signSuccessHandle'
  )
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import router from '@/router'
import Card from '@/components/Card'
import useModal from 'hooks/useModal'
import BaseInfoDetail from '../../../components/baseInfoDetail'
import GoodsTableDetail from '../../../components/goodsTableDetail2'
import GoodsSummary from '@/views/SupplyChain/components/goodsSummary'
import SignDialog from '../components/SignDialog'
import { activedCollapses, collapseList } from './config'
import useDetail from './useDetail'

export default defineComponent({
  components: {
    Card,
    BaseInfoDetail,
    GoodsTableDetail,
    GoodsSummary,
    SignDialog,
  },
  setup(props, { root }) {
    const { id: orderId } = root.$route.query

    // 查看详情
    const detailState = useDetail({ orderId })
    // 签署订货单弹窗
    const dialogState = useModal('签署电子订货单')

    const state = reactive({
      activedCollapses,
      collapseList,
      detailState,
      dialogState
    })

    // 点击后退
    const clickGoBack = () => router.go(-1)

    // 点击签署订货单
    const clickSign = () => {
      dialogState.setDetail({
        id: state.detailState?.baseInfoData?.id ?? '',
        deliverFile: state.detailState?.baseInfoData?.orderBlankFileKey ?? ''
      })
      dialogState.openHandle()
    }
    const signSuccessHandle = () => {
      detailState.getOrderBaseInfo()
      dialogState.cancleHandle()
    }
    return {
      orderId,
      ...toRefs(state),
      clickGoBack,
      clickSign,
      signSuccessHandle,
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
