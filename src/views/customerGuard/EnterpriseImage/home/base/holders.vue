<template lang="pug">
.base-holders(v-loading='loading')
  .base-title 股东
  .base-person
    .base-person-item(@click='goModule("base-actualController")')
      .base-person-logo
        template(v-if='actualController.name') {{actualController.name.substr(0, 1)}}
        template(v-else) 无
      .base-person-content
        .base-person-detail
          .base-person-title 疑似控制人
          .base-person-btn 查看控制链路
        .base-person-name
          template(v-if='actualController.name') {{actualController.name}}
          template(v-else) 暂无数据
    .base-person-item(@click='goModule("base-beneficiary")')
      .base-person-logo
        template(v-if='holdingBo.name') {{holdingBo.name.substr(0, 1)}}
        template(v-else) 无
      .base-person-content
        .base-person-detail
          .base-person-title 最终受益人
          .base-person-btn 查看股权链路
        .base-person-name
          template(v-if='holdingBo.name') {{holdingBo.name}}
          template(v-else) 暂无数据
  Table.enterprise-detail-table(
    :dataSource="dataSource"
    :columns="holdersColumns"
    :index='true'
    :border='true'
    :class='{"table-hide" : !showAll}'
  )
    template(slot='name' slot-scope='{row}')
      .p-table-img-wrap
        img.u-table-img(:src='row.logo' v-if='row.logo')
        .u-table-img-text(v-else) {{row.name.substr(-2)}}
        span {{row.name}}
  .table-btn-more(@click='changeMore' v-if='!showAll') 加载更多...
</template>

<script>
import { holdersColumns } from './config'
import { reactive, toRefs, inject, watch } from '@vue/composition-api'
import Table from '@/components/qjd/table'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    Table
  },
  setup(props, { root }) {
    const state = reactive({
      showAll: false,
      companyName: inject('companyName'),
      creditCode: inject('creditCode'),
      holdingBo: {},
      actualController: {}
    })

    const changeMore = () => {
      state.showAll = !state.showAll
    }

    state.showAll = props.dataSource.length <= 3

    const goModule = (link) => {
      root.$router.push({
        name: 'enterpriseImage',
        query: {
          companyName: state.companyName,
          creditCode: state.creditCode,
          link,
          hash: new Date().getTime()
        }
      })
    }

    const { loading, result } = inject('scanningInfo')

    const setChainList = (list) => {
      if (!list) { return }
      let max = 0
      let maxItem = ''
      list.map((item) => {
        if (parseFloat(item.percent) > max) {
          max = parseFloat(item.percent)
          maxItem = item
        }
      })
      if (!maxItem) { maxItem = list[0] }
      state.holdingBo = maxItem
    }

    const setHoldingBo = (value) => {
      const list = value?.tycHumanHoldingBOPage?.list
      setChainList(list)
    }
    setHoldingBo(result.value)

    const setActualControler = (value) => {
      const actualControllerList = value?.tycActualControlBO?.actualControllerList
      state.actualController = actualControllerList?.length ? actualControllerList[0] : {}
    }
    setActualControler(result.value)
    watch(
      () => result.value,
      (value) => {
        setHoldingBo(value)
        setActualControler(value)
      }
    )

    return {
      holdersColumns,
      changeMore,
      goModule,
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-title
  color #494949
  margin-top 24px
  font-size 14px
  margin-bottom 10px
.base-title:before
  content ''
  border-left 3px solid #3B68F0
  margin-right 6px
.p-table-img-wrap
  display flex
  align-items center
  .u-table-img
    width 40px
    height 40px
    margin 0 10px
  .u-table-img-text
    width 40px
    height 40px
    margin 0 10px
    line-height 40px
    font-size 14px
    text-align: center
    color #fff
    background #7eb3da
    border-radius 4px
.table-btn-more
  color #3B68F0
  font-size 14px
  padding 5px 48px
  border 1px solid #3B68F0
  border-radius 4px
  width 166px
  height 32px
  line-height 22px
  margin 20px auto 0 auto
  text-align center
  cursor pointer
.table-hide
  height 222px
  overflow hidden
.base-person
  margin-bottom 20px
  display flex
  .base-person-item
    width 35%
    margin-right 3%
    padding 27px 18px
    border 1px solid #F2F2F6
    display flex
    cursor pointer
    .base-person-logo
      width 42px
      height 42px
      border-radius 2px
      background #AAD4FF
      font-size 16px
      color #ffffff
      text-align center
      line-height 42px
    .base-person-content
      display flex
      margin-left 18px
      .base-person-detail
        font-size 14px
        color #494949
        margin-bottom 5px
        .base-person-title
          margin-right 10px
          min-width 80px
          margin-bottom 5px
      .base-person-name
        font-size 14px
        color #3B68F0
      .base-person-btn
        font-size 12px
        color #C79F5F
  .base-person-item:first-child
    .base-person-logo
      background #C9B0E3
  .base-person-item:hover
    background #F8F9FD
</style>
