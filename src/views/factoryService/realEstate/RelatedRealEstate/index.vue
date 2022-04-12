<template lang="pug">
.page-main
  .p-header
    .p-title 关联公司
    mainSearch(type='related' weblogs='关联公司-搜索')
  BaseInfo.p-module(:companyName='companyName' @actualCompanyName='setActualCompanyName')
  Tabs.p-module(:companyName='companyName' :actualCompanyName='actualCompanyName')
</template>
<script>
import { toRefs, reactive, onMounted } from '@vue/composition-api'
import mainSearch from '../components/mainSearch'
import BaseInfo from './baseInfo'
import Tabs from './tabs'
import useRealEstateList from '../hooks/useRealEstateList'
export default {
  components: { BaseInfo, mainSearch, Tabs },

  setup(props, { root }) {
    const state = reactive({
      defaultCompany: '万科企业股份有限公司',
      companyName: '',
      actualCompanyName: ''
    })

    const { getCompanyList, realEstateList } = useRealEstateList()

    const setDefaultCompany = async () => {
      let { companyName } = root.$route.query
      await getCompanyList()
      if (realEstateList.value && realEstateList.value.length) {
        state.defaultCompany = realEstateList.value[0]
        if (realEstateList.value.join().indexOf(companyName) === -1) {
          companyName = state.defaultCompany
        }
      }
      state.companyName = companyName || state.defaultCompany
    }

    const setActualCompanyName = (name) => {
      state.actualCompanyName = name
    }

    onMounted(
      async () => {
        await setDefaultCompany()
      }
    )

    return {
      setActualCompanyName,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-header
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
.p-title
  color #383B42
  font-size 18px
.p-module
  margin-bottom 8px
</style>
