<template lang="pug">
.tab-main
  .home-title
    .title-left {{title}}
      span.title-unit(v-if='unit') 单位：{{unit}}
    .title-right
      slot(name='headRight')
  .table-main(v-loading='loading')
    Table.enterprise-detail-table(
      :dataSource='dataSource || []'
      :columns='columns'
    )
      template(slot='pledgorList' slot-scope='{row}')
        template(v-for='item in row.pledgorList')
          p {{item.name}}
      template(slot='personList' slot-scope='{row}')
        .p-font-bold 抵押权人：
          p(v-for='(item, index) in row.peopleInfo')
            template(v-if='!index || item.peopleName !== row.peopleInfo[index - 1].peopleName') {{item.peopleName}}
        .p-font-bold 债务人：
          p(v-for='(item, index) in row.pawnInfoList')
            template(v-if='!index || item.ownership !== row.pawnInfoList[index - 1].ownership') {{item.ownership}}
      template(slot='casePersons' slot-scope='{row}')
        p(v-for='item in row.casePersons')
          span.p-font-bold {{item.role}}：
          span {{item.name}}，
          span {{item.result}}
    Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import { inject, reactive, toRefs, watch } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  props: {
    title: {
      type: String
    },
    unit: {
      type: String
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    request: {
      type: Function,
      default: () => {}
    },
    requestDone: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Table,
    Pagination
  },
  setup(props, { slots, emit }) {
    const state = reactive({
      toTargetTop: () => {},
      targetRef: null
    })
    const { initEvent } = useEventBus({
      event: busStore.targetTab
    })
    initEvent(({data}) => {
      state.targetRef = data
      // 数据加载完毕后，再去计算ref到顶部的距离
      state.toTargetTop = () => {
        window.layoutScrollbar.wrap.scrollTo({
          top: state.targetRef.offsetTop,
          behavior: 'smooth'
        })
      }
    })
    const {
      loading,
      dataSource,
      pagination,
    } = useTable({
      request: props.request,
      defaultParams: {
        companyName: inject('companyName'),
      },
      callback: (res) => {
        emit('initDone', { title: props.title })
        return {
          totalCount: res.total,
          dataSource: res.list
        }
      },
    })

    watch(
      () => props.requestDone,
      (value, preValue) => {
        if (value) {
          state.toTargetTop()
        }
      }
    )

    return {
      loading,
      dataSource,
      pagination,
      slots,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-title
  font-size 16px
  color #494949
  margin-bottom 20px
  display flex
  justify-content space-between
  .title-unit
    font-size 14px
    color #A9AFB8
    margin-left 24px
.u-empty-tips
  color #999
  min-height 100px
  display flex
  justify-content center
  align-items center
.p-font-bold
  font-weight bold
</style>
