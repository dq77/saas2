<template lang='pug'>
.p-search-company
  el-select.p-select(
    filterable
    placeholder='请输入企业名称'
    v-model='companyState.id'
    @change='doChange'
    remote
    :remote-method='search'
  )
    el-option(
      v-for='option in companyState.companyList'
      :key='option.id'
      :label='option.corpName'
      :value='option.id'
    )
  i.icon.iconfont.iconsousuo.p-icon-search
</template>

<script>
import useSaveAll from '../../hooks/useSaveAll'
import Router from '@/router'
import ajaxStore from '@/apis'
import useSearchCompany from '../hooks/useSearchCompany'
import { reactive, toRefs } from '@vue/composition-api'

export default {
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  emits: ['currentTabHandle'],
  setup(props, { emit, root }) {
    // api
    const { risk: { getPageCustomized } } = ajaxStore
    const state = reactive({
      companyState: {}
    })
    state.companyState = useSearchCompany({
      request: getPageCustomized
    })
    // useSaveAll
    const { doResult: saveDoResult } = useSaveAll()
    const doChange = (id) => {
      let current = null
      state.companyState.companyList.forEach(item => {
        if (item.id === id) current = item
      })
      saveDoResult({ companyName: current?.corpName })
      Router.push({
        name: 'valueDetail',
        query: {
          corpName: current?.corpName,
          id: current?.id
        }
      })

      emit('currentTabHandle')
    }

    const search = (corpName) => {
      state.companyState.doResult({ corpName })
    }

    state.companyState.doResult()
    return {
      search,
      doChange,
      ...toRefs(state),
    }
  }
}
</script>
<style lang='stylus'>
.p-select-company
  .el-input__suffix
    right 35px
</style>

<style lang='stylus' scoped>
.p-search-company
  position relative
.p-select
  width: 320px
.p-icon-search
  font-size 30px
  position absolute
  height 100%
  right 5px
  top 0
  text-align center
  color #c0c4cc
  transition all .3s
  pointer-events none
</style>
