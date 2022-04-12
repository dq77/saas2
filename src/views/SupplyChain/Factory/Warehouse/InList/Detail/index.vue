<template lang="pug">
.page-main
  Card(noTitle)
    el-collapse(v-model='activeNames')
      el-collapse-item(:title='txt+"信息"' :name='1')
        BaseInfo(
          :baseInfoList='baseInfoList'
          :baseInfoData='detailState.baseInfoData'
          v-loading='detailState.goodsLoading'
        )
      el-collapse-item(:title='txt+"产品"' :name='2')
        GoodsTableDetail(
          :columns='columns'
          :goodsData='detailState.goodsData'
          v-loading='detailState.goodsLoading'
        )
  .p-btns
    el-button(plain @click='clickGoBack') 返回
    el-button(type='primary' v-if='detailState.showBtnConfirm' @click='clickHandle("close", detailState.doResult)' :loading='loading') 关闭{{txt}}
    el-button(plain type='primary' v-if='detailState.showBtnConfirm' @click='clickHandle("confirm", detailState.doResult)' :loading='loading') 确认{{txt}}
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import BaseInfo from '@/views/SupplyChain/components/baseInfo'
import GoodsTableDetail from '@/views/SupplyChain/components/goodsTableDetail2/index'
// import GoodsTableDetail from './Components/whGoodsTableDetail'
import useBottomBtns from './useBottomBtns'
import useDetail from './useDetail'
import { baseInfoList, outBaseInfoList, getColumns } from './config.js'

export default defineComponent({
  components: {
    Card,
    BaseInfo,
    GoodsTableDetail,
  },
  setup(props, { root }) {
    const { query: { id, storageType }, name } = root.$route
    const txt = name === 'inDetail' ? '入库' : '出库'
    const detailState = useDetail({ id, name, txt })
    const state = reactive({
      detailState,
      activeNames: [1, 2]
    })

    // 整页底部按钮的事件执行逻辑
    const {
      clickGoBack,
      clickHandle,
      loading,
    } = useBottomBtns({
      id,
      storageType,
      txt,
    })

    return {
      txt,
      baseInfoList: name === 'inDetail' ? baseInfoList : outBaseInfoList,
      id,
      loading,
      columns: getColumns({ businessName: txt }),
      ...toRefs(state),
      clickGoBack,
      clickHandle,
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
