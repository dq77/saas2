<template lang="pug">
.page-main
  top-nav(
    :collapseItems='collapseItems'
    :currentKey='tabState.currentKey'
    @changeTopNav='tabState.changeTopNav'
  )
  el-collapse(v-model='activedCollapses' class='page-container')
    el-collapse-item(title='发货信息' name='a1' id='a1')
      DeliverInfo(
        ref='deliverInfoRef'
        @changeWareHouse='changeWareHouse'
        @showWarehouse='showWarehouse'
      )
    el-collapse-item(title='货物明细' name='a2' id='a2')
      GoodsTable(
        ref='goodsTableRef'
      )
  .page-operate
    el-button(
      plain
      @click='bottomBtnsState.clickBack'
    ) 返回
    el-button(
      weblogs-anchor="supplyChain-factory-deliver-create-sure"
      type='primary'
      :loading='bottomBtnsState.sureLoading'
      @click='bottomBtnsState.clickSure'
    ) 确定
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import TopNav from '../../Components/TopNav'
import DeliverInfo from '../Components/DeliverInfo.vue'
import GoodsTable from './goodsTable/index'
import { collapseItems, defaultActivedCollapses } from './config'
import useTab from './useTab'
import useBottomBtns from './useBottomBtns'

export default {
  components: {
    DeliverInfo,
    GoodsTable,
    TopNav
  },
  setup(props, {root}) {
    const routeName = root.$route.name
    const activedCollapses = ref(defaultActivedCollapses)

    const deliverInfoRef = ref()
    const goodsTableRef = ref()

    const tabState = useTab({
      defaultKey: collapseItems[0].key
    })

    const bottomBtnsState = useBottomBtns({
      deliverInfoRef,
      goodsTableRef,
      routeName,
    })

    const state = reactive({
      tabState,
      bottomBtnsState,
    })

    // 显示仓库
    const showWarehouse = (v) => goodsTableRef.value.showWarehouse(v)
    // 变更仓库
    const changeWareHouse = (warehouseId, warehouseName) => {
      goodsTableRef.value.changeWareHouse(warehouseId, warehouseName)
    }

    return {
      deliverInfoRef,
      goodsTableRef,
      collapseItems,
      activedCollapses,
      ...toRefs(state),
      showWarehouse,
      changeWareHouse,
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-container
  background-color #fff
  padding 20px
.page-operate
  text-align center
  margin-top 30px
</style>
