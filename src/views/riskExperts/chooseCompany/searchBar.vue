<template lang="pug">
.choose-company-searchbar
  el-autocomplete.p-input(
    popper-class='choose-company-searchbar-autocomplete'
    placeholder='请输入公司全称/简称/关键字'
    v-model='companyName'
    :fetch-suggestions='searchHandle'
    @select='handleSelect'
    @change='handleSelect'
    @focus='handleFocus'
    @blur='handleBlur'
    :trigger-on-focus='false'
  )
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useDebounce from 'hooks/useDebounce'
export default {
  setup(props, { root, emit }) {
    const state = reactive({
      companyName: '',
      list: [],
    })
    const { getCompanyList } = ajaxStore.customer.enterprise
    const { run } = useDebounce()
    const handleSelect = ({ creditCode, value, legalPersonName }) => {
      if (state.companyName) {
        emit('select', { companyName: value, creditCode, legalPersonName })
      } else {
        emit('select', { companyName: '', creditCode: '', legalPersonName: '' })
      }
    }

    const { loading, doResult } = useAsync({
      request: getCompanyList,
      init: false
    })

    const querySearchAsync = (queryString, cb) => {
      if (queryString) {
        doResult({
          name: queryString,
          pageNo: 1,
          pageSize: 20
        }).then(({code, data}) => {
          if (code === '0') {
            const list = []
            data && data.list && data.list.forEach((item) => {
              list.push({
                value: item.companyName,
                creditCode: item.creditCode,
                legalPersonName: item.legalPersonName
              })
            })
            state.list = list
            if (!list.length) emit('loading', false)
            cb(list)
          }
        })
      } else {
        cb(state.list)
      }
    }

    const handleFocus = (event) => {
      if (state.list.length) emit('loading', true)
    }
    const handleBlur = (event) => {
      emit('loading', false)
    }

    const searchHandle = (queryString, cb) => {
      emit('loading', true)
      run(() => querySearchAsync(queryString, cb), 500)
    }

    return {
      loading,
      handleFocus,
      handleBlur,
      handleSelect,
      searchHandle,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus">
.choose-company-searchbar-autocomplete.el-autocomplete-suggestion
  box-shadow none
  .popper__arrow
    display none
  .el-autocomplete-suggestion__wrap
    background #ffffff
.choose-company-searchbar-autocomplete.el-popper[x-placement^=bottom]
  border 1px solid #3B68F0
  margin-top -50px
  padding-top 50px
  background none
  overflow hidden
</style>
<style lang="stylus" scoped>
.choose-company-searchbar
  width 100%
  .p-input
    width 100%
</style>
