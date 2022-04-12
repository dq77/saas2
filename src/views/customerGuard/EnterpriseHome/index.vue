<template lang="pug">
.search-main
  .search-input
    SearchBar
  .search-hot(v-loading='loading') 热门搜索：
    template(v-for='(item, index) in hotList')
      span.p-name(@click='handleSelect(item)') {{item.shortName}}
      span.p-line(v-if='index !== hotList.length -1') |
</template>

<script>
import SearchBar from './searchBar'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default {
  components: {
    SearchBar
  },
  setup(props, { root }) {
    const handleSelect = ({ creditCode, fullName }) => {
      root.$router.push({
        name: 'enterpriseImage',
        query: {
          companyName: fullName,
          creditCode
        }
      })
    }

    const { getHotSearchList } = ajaxStore.customer.enterprise

    const { loading, result: hotList } = useAsync({
      request: getHotSearchList
    })

    return {
      handleSelect,
      loading,
      hotList
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-main
  background url('//cdn.qjdchina.com/static-online/saas/customerGuard/search-bottom-bg.png') center bottom no-repeat #fff
  background-size 100%
  height 90%
  min-height 400px
  margin 0 20px
  padding 150px 0 0 0
.search-select
  width 80%
  height 93px
  line-height 93px
  font-size 14px
.p-line
  margin 0 5px
  color #CDD0D4
  font-size 12px
.search-hot
  text-align center
  color #494949
  font-size 14px
  margin-top 50px
.p-name
  cursor pointer
.p-name:hover
  color #3B68F0
</style>
