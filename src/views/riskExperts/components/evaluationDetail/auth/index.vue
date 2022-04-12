<template lang="pug">
.p-main
  Tabs.p-tabs(
    v-if='mode === "ACCURATE_MODE"'
    :dataSource="tabCols"
    :defaultTab="defaultTab"
    @tabCLick="tabApis.tabCLick"
  )
  Table(v-if="mode !== 'ACCURATE_MODE'" :dataSource="singleList" :columns="columns")
    template(slot='titleName' slot-scope='{row}')
      div {{row.titleName ? row.titleName : row.role + '授权'}}
    template(slot='authorizationStatus' slot-scope='{row}')
      .authStatus
        .cycle(:class="row.authorizationStatus === 'AUTHORIZED' ? 'green' : 'red'")
        .text {{status[row.authorizationStatus] || '未授权'}}
    template(slot='info' slot-scope='{row}')
      div {{row.role === '企业' ? row.corporationName : row.name}}
      div(v-if="row.role === '企业'") {{`社会统一信用代码：${row.uniformCreditCode}`}}
      div(v-else) {{`身份证：${row.idNumber || ''}` | toWordHide('id')}}
  template(v-else)
    .p-list(v-for='(item, index) in authInfo' :key='index')
      Table(v-if="tabApis.currentTab === item.tabCol.value" :dataSource="item.list || []" :columns="columns")
        template(slot='titleName' slot-scope='{row}')
          div {{row.titleName ? row.titleName : row.role + '授权'}}
        template(slot='authorizationStatus' slot-scope='{row}')
          .authStatus
            .cycle(:class="row.authorizationStatus === 'AUTHORIZED' ? 'green' : 'red'")
            .text {{status[row.authorizationStatus] || '未授权'}}
        template(slot='info' slot-scope='{row}')
          div {{row.role === '企业' ? row.corporationName : row.name}}
          div(v-if="row.role === '企业'") {{`社会统一信用代码：${row.uniformCreditCode}`}}
          div(v-else) {{`身份证：${row.idNumber || ''}` | toWordHide('id')}}
    Table(v-if='tabCols.length === 0' :dataSource='[]' :columns="columns")
</template>

<script>
import { status, columns } from './config'
import { reactive, toRefs, watch } from '@vue/composition-api'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import Table from '@/components/qjd/table'

export default {
  components: {
    Tabs,
    Table
  },
  props: {
    mode: {
      type: String,
      default: 'ACCURATE_MODE'
    },
    authInfo: {
      type: Array,
      default: () => ([])
    },
  },
  setup(props, { root }) {
    const state = reactive({
      tabApis: {},
      tabCols: [],
      defaultTab: '1',
      singleList: []
    })
    state.tabApis = useTabs({ currentTab: '1' })

    watch(() => props.authInfo, (val) => {
      state.tabCols = props.authInfo.map(item => {
        return item.tabCol
      })
      state.singleList = props.authInfo?.[0]?.list ?? []
    })
    return {
      status,
      columns,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-tabs
  box-shadow none
  border none
  padding-left 0
.authStatus
  display flex
  align-items center
.cycle
  width 8px
  height 8px
  border-radius 4px
  margin-right 5px
.red
  background #FAAD14
.green
  background #52C41A
</style>
