<template lang="pug">
.page-main
  div(style="background: #fff;" v-loading="currentApis.plainLoading || currentApis.payLoading")
    .collapse-box
      Collapse(
        :columns="colColumns"
        :defaultActiveName="defaultActiveName"
      )
        //- 应收计划信息
        template(slot="plain")
          .detail_box
            el-button(type="text" @click="seeDetail") 查看详情
          Descriptions(
            :labelWidth="150"
            :columns="plainColumns"
            :dataSource=" currentApis.plainResult || {}"
          )
        //- 应收款项信息
        template(slot="pay")
          .detail_box
            el-button(type="text" @click="detailHandle") 查看详情
          Descriptions(
            :labelWidth="150"
            :columns="payColumns"
            :dataSource="currentApis.payResult || {}"
          )
            template(slot="returnedProportion" slot-scope="{ dataSource }")
              .water_box
                #water
                .percent
                  span 收款进度
                  span {{ dataSource.returnedProportion ? dataSource.returnedProportion : 0 }}%
                .text 当前收款进度值为： {{ dataSource.returnedProportion ? dataSource.returnedProportion : 0 }}%
  //- 款项详情
  Info(
    :title="infolApis.title"
    :visible="infolApis.visible"
    :detail="infolApis.detail"
    @cancleHandle="infolApis.cancleHandle"
  )
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import router from '@/router'
import Collapse from '@/components/qjd/collapse/index.vue'
import Descriptions from '@/components/qjd/descriptions/index.vue'
import useCharts from 'hooks/useCharts'
import useCurrent from './useCurrent'
// 计划详情
import Info from './info/index.vue'
import useInfo from './info/useInfo'
import {
  colColumns,
  defaultActiveName,
  plainColumns,
  payColumns,
  getOptions
} from './config'

export default {
  components: {
    Collapse,
    Descriptions,
    Info
  },
  setup(props, { root: { $route: { query: { id, saArmReceivablePlanId } } } }) {
    // 计划 - 查看详情
    const seeDetail = () => router.push({ name: 'InforSearchDetail', query: { id: saArmReceivablePlanId } })
    // infolApis
    const infolApis = useInfo()
    // chart
    const chartApis = useCharts({
      option: getOptions(0.8, 'rgb(254, 187, 39)'),
      id: 'water',
      isInit: false
    })
    // useCurrent
    const currentApis = useCurrent({ id, saArmReceivablePlanId, chartApis, getOptions })
    // 款项-  查看详情
    const detailHandle = () => infolApis.open(currentApis.payResult)
    // state
    const state = reactive({ infolApis, currentApis, chartApis })

    return {
      colColumns,
      defaultActiveName,
      plainColumns,
      payColumns,
      seeDetail,
      detailHandle,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail_box
  display: flex
  justify-content: flex-end
  padding: 10px 0
.water_box
  position relative
  top -50%
  width: 200px
  height: 200px;
  #water
    width: 200%
    height: 200%
  .title
    position absolute
    left 0
    top 50px
  .percent
    display: flex
    flex-direction: column
    position: absolute
    text-align: center
    width: 60px
    height: 40px
    top 100%
    left 100%
    margin-left: -25px
    margin-top: -15px
  .text
    position absolute
    right -300px
    top 100%
</style>
