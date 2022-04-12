<template lang="pug">
el-autocomplete(:style='{width}' placeholder='请输入企业名称' v-model='companyName' clearable @select='changeComapnyName' @change='change' :fetch-suggestions='querySearchAsync')
  i.icon.iconfont.iconsousuo.p-icon-search(slot='suffix')
</template>

<script>
import { toRefs, reactive } from '@vue/composition-api'
import useRealEstateList from '../hooks/useRealEstateList'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  props: {
    width: {
      type: String
    },
    type: {
      type: String,
      default: 'realEstate'
    },
    weblogs: { // 埋点
      type: String,
      default: ''
    }
  },

  setup(props, { root, emit }) {
    const state = reactive({
      companyName: '',
      companyList: []
    })
    const { getCompanyList, realEstateList, getRiskCompanyList, riskCompanyList } = useRealEstateList()
    if (props.type === 'riskCompanyList') {
      getRiskCompanyList({
        pageSize: 100
      }).then((res) => {
        const companyList = []
        riskCompanyList.value.records.map((item) => {
          companyList.push(item.name)
        })
        state.companyList = companyList
      })
    } else {
      getCompanyList()
    }

    state.companyList = realEstateList
    const changeComapnyName = (company) => {
      if (props.type === 'realEstate') {
        root.$router.push({
          name: 'realEstateDetail',
          query: {
            companyName: company.value,
            hash: new Date().getTime()
          }
        })
      }
      if (props.type === 'related') {
        root.$router.push({
          name: 'relatedRealEstate',
          query: {
            companyName: company.value,
            hash: new Date().getTime()
          }
        })
      }
      // 埋点
      if (props.weblogs) weblogsDom(props.weblogs)
      emit('select', company)
    }
    const change = (company) => {
      emit('change', company)
    }
    const querySearchAsync = (queryString, cb) => {
      const query = state.companyList.map((item) => {
        return { value: item }
      })
      const list = query.filter((item) => {
        return item.value.indexOf(queryString) > -1
      })
      cb(list)
    }
    return {
      changeComapnyName,
      querySearchAsync,
      change,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-icon-search
  font-size 30px
</style>
