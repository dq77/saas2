<template lang="pug">
.p-search-input
  SearchCompany(width='330px' :type='type' :weblogs='weblogs')
  // .p-hot-key
    span 热门搜索：
    template(v-for='(item, index) in hotKey')
      .p-key-item(:key='item.value' @click='doSearch(item.value)') {{item.name}}
        span(v-if='index !== hotKey.length - 1') |
</template>

<script>
import SearchCompany from './searchCompany'
import useRealEstateList from '../hooks/useRealEstateList'
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    type: {
      type: String,
      default: 'realEstate'
    },
    weblogs: { // 埋点
      type: String,
      default: ''
    }
  },

  components: {
    SearchCompany
  },

  setup(props, { root }) {
    const { getCompanyDetailList, realEstateDetailList } = useRealEstateList()

    const state = reactive({
      hotKey: []
    })

    const initHotKey = async () => {
      await getCompanyDetailList()
      if (realEstateDetailList.value && realEstateDetailList.value.length) {
        realEstateDetailList.value.slice(0, 3).map((item) => {
          state.hotKey.push({
            name: item.comName,
            value: item.comWholeName
          })
        })
      }
    }

    initHotKey()

    const doSearch = (companyName) => {
      if (props.type === 'realEstate') {
        root.$router.push({
          name: 'realEstateDetail',
          query: {
            companyName,
            hash: new Date().getTime()
          }
        })
      }
      if (props.type === 'related') {
        root.$router.push({
          name: 'relatedRealEstate',
          query: {
            companyName,
            hash: new Date().getTime()
          }
        })
      }
    }

    return {
      doSearch,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-search-input
  height 40px
  color #494949
.p-search-input,
.p-hot-key
  display flex
  align-items center
.p-hot-key
  margin-left 16px
.p-key-item:hover
  color #3C5DA4
  cursor pointer
.p-key-item
  span
    margin 0 10px
    color #CDD0D4
</style>
