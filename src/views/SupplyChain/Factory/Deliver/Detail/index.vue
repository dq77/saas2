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
        type='detail'
        :queryStatus='paramUpdateFlag'
        :deliverId='deliverId'
        :orderId='orderId'
      )
    el-collapse-item(title='货物明细' name='a2' id='a2')
      GoodsTableDetail(:columns='columns' :goodsData='detailState.tableList')
      GoodsSummary(:summary='detailState.summary')
  .page-operate
    el-button(
      plain
      @click='clickBack'
    ) 返回
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import TopNav from '../../Components/TopNav'
import DeliverInfo from '../Components/DeliverInfo.vue'
import GoodsTableDetail from '@/views/SupplyChain/components/goodsTableDetail2/index'
import GoodsSummary from '@/views/SupplyChain/components/goodsSummary'
import { collapseItems, defaultActivedCollapses, columns } from './config'
import useTab from './useTab'
import useDetail from './useDetail'

export default {
  components: {
    TopNav,
    DeliverInfo,
    GoodsTableDetail,
    GoodsSummary,
  },
  setup(props, {root}) {
    const { deliverId, orderId, status } = root.$route.query || {}
    const activedCollapses = ref(defaultActivedCollapses)

    const paramFlag = typeof status === 'string' ? '2' : '1'
    const paramUpdateFlag = typeof status === 'string'

    const detailState = useDetail({
      deliverId,
      paramFlag,
      paramUpdateFlag,
    })

    const tabState = useTab({
      defaultKey: collapseItems[0].key
    })

    // 点击返回
    const clickBack = () => {
      root.$router.go(-1)
    }

    const state = reactive({
      tabState,
      detailState,
    })

    return {
      collapseItems,
      activedCollapses,
      columns,
      paramFlag,
      paramUpdateFlag,
      deliverId,
      orderId,
      ...toRefs(state),
      clickBack,
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
