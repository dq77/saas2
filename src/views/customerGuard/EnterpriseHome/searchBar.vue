<template lang="pug">
.p-enterprise-home-main
  el-autocomplete.p-input(
    placeholder='请输入公司全称/简称/关键字'
    v-model='companyName'
    :fetch-suggestions='searchHandle'
    @select='handleSelect'
    :trigger-on-focus='false'
  )
  el-button.p-btn(type="primary" icon="el-icon-search" size='large' @click='doSearch') 查一下
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useDebounce from 'hooks/useDebounce'
export default {
  setup(props, { root }) {
    const state = reactive({
      companyName: '',
      list: [],
    })
    const { getCompanyList } = ajaxStore.customer.enterprise
    const { run } = useDebounce()
    const handleSelect = ({ creditCode, value }) => {
      root.$router.push({
        name: 'enterpriseImage',
        query: {
          companyName: value,
          creditCode
        }
      })
    }

    const doSearch = () => {
      if (state.companyName) {
        root.$router.push({
          name: 'enterpriseSearchList',
          query: {
            companyName: state.companyName
          }
        })
      } else {
        root.$message.error('请输入公司全称/简称/关键字')
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
            data && data.list.forEach((item) => {
              list.push({
                value: item.companyName,
                creditCode: item.creditCode
              })
            })
            state.list = list
            cb(list)
          }
        })
      } else {
        cb(state.list)
      }
    }

    const searchHandle = (queryString, cb) => {
      run(() => querySearchAsync(queryString, cb), 500)
    }

    return {
      loading,
      handleSelect,
      searchHandle,
      doSearch,
      ...toRefs(state)
    }
  }
}
</script>
<style lang='stylus'>
.p-enterprise-home-main
  .el-input--small
    .el-input__inner
      height 48px
      line-height 48px
      border-radius 4px 0 0 4px
  .el-button--small
    height 48px
    line-height 48px
    font-size 14px
  .el-button
    border-radius 0 4px 4px 0
</style>
<style lang="stylus" scoped>
.p-enterprise-home-main
  display flex
  width 80%
  margin 0 auto 30px auto
  .p-input
    width 80%
</style>
