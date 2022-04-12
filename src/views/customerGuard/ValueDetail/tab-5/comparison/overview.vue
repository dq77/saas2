<template lang='pug'>
.overview
  .tab-header 行业概览
  ButtonGroup.tab-button(
    title='报告期'
    :dataSource='buttonGroupApi.dataSource'
    :current='buttonGroupApi.current'
    @change='changeGroup'
  )
  .overview-basic
    .overview-basic__content
      .overview-basic__company
        .overview-basic--type.overview-basic__company--type 上市公司
        .overview-basic--text {{ `已披露${(avgData && avgData.companyNumber) || 0}家上市公司 `}}
      .overview-basic__industry
        .overview-basic--type.overview-basic__industry--type 行业类型
        .overview-basic--text {{ industry || '-' }}
    .overview-basic__tips 以下统计数据均为行业平均数据
  .overview-detail
    //- config配置
    dl.overview-dl(v-for='(item, index) in config' :key='item.title')
      dt.overview-dt {{ item.title }}
      //- 每一条概览
      dd.overview-dd(v-for='(list, listIndex) in item.lists' :key='list.name')
        .overview-dd-name {{ list.name }}
        //- 平均值 通过valueKey来赋值
        .overview-dd-ratio(v-if='avgData && (avgData[list.valueKey] || avgData[list.valueKey] === 0)')
          span.ratio--value {{ list.render ? `${list.render(avgData[list.valueKey])}${list.unit}` : avgData[list.valueKey] }}
          span.ratio--img
            img.is-up(v-if='avgData[list.flagKey] === 1' :src='`${$assetsBaseUrl}/customerGuard/up.png`')
            img.is-down(v-if='avgData[list.flagKey] === 0' :src='`${$assetsBaseUrl}/customerGuard/down.png`')
        .overview-dd-ratio(v-else) -
</template>

<script>
// components
import ButtonGroup from '../../../components/buttonGroup'
import { reactive, toRefs, watch } from '@vue/composition-api'
// hooks
import useButtonGroup from '../../../hooks/useButtonGroup'
// others
import { toAmountStr } from '@/utils/util'
import { solvencyConfig, operationConfig, profitabilityConfig, companySizeConfig } from './config'
import { assetsBaseUrl } from '@/utils/config'

export default {
  props: {
    avgData: {
      type: Object,
      default: () => ({})
    },
    reportDate: {
      type: Array,
      default: () => ([])
    },
    industry: String
  },
  emits: ['parentCurrentItem'],
  components: {
    ButtonGroup
  },
  setup (props, {root, emit}) {
    const state = reactive({
      config: [],
      buttonGroupApi: {}
    })
    state.config = [
      {
        title: '偿债能力',
        lists: solvencyConfig
      },
      {
        title: '营运能力',
        lists: operationConfig
      },
      {
        title: '盈利能力',
        lists: profitabilityConfig
      },
      {
        title: '公司规模',
        lists: companySizeConfig
      }
    ]

    // useButtonGroup
    const changeGroup = ({ item, index }) => {
      state.buttonGroupApi.changeGroup({ item, index })
      emit('parentCurrentItem', props.reportDate[index])
    }

    watch(() => props.reportDate, (val) => {
      if (val.length) {
        const config = props.reportDate.map(item => {
          return item.slice(0, -3)
        })
        state.buttonGroupApi = useButtonGroup({ config })
      }
    })

    return {
      toAmountStr,
      assetsBaseUrl,
      ...toRefs(state),
      changeGroup
    }
  }
}
</script>

<style lang='stylus' scoped>
// header
.tab-header
  padding 15px 0
  font-size 16px
  font-weight 500
  color #494949
  line-height 22px
  border-bottom 1px solid #EAEBEE
// button
.tab-button
  margin 25px 0
// basic
.overview-basic
  display flex
  align-items center
  &__content
    flex-grow 1
    display flex
  &__company
    display flex
    padding-right 75px
    border-right 1px solid #E0E0E0
    align-items center
    &--type
      color #3B68F0
  &__industry
    display flex
    padding-left 75px
    align-items center
    &--type
      color #C79F5F
  &__tips
    font-size 12px
    color #A9AFB8
  &--type
    margin-right 8px
    font-size 18px
    font-family SourceHanSansCN-Heavy, SourceHanSansCN
    font-weight 800
  &--text
    font-size 16px
    font-weight 500
    color #494949
// detail
.overview-detail
  display flex
  justify-content space-between
  margin-top 20px
  padding 20px 35px
  background #F8F9FD
dl, dt, dd
  padding 0
  margin 0
.overview-dl
  padding 0 35px
  flex 1
  border-left 1px dashed #E0E0E0
  &:first-child
    padding-left 0
    border-left 0
  &:last-child
    padding-right 0
.overview-dt
  font-size 14px
  color #3B68F0
  font-weight 600
  line-height 20px
.overview-dd
  display flex
  justify-content space-between
  margin-top 8px
  font-size 12px
  font-weight 500
  color #6D7278
  line-height 17px
  &-ratio
    display: flex
    align-items: center
    .ratio--img
      display flex
      align-items center
      justify-content flex-end
      width 23px
    img
      height 15px
</style>
