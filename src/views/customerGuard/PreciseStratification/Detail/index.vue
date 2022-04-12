<template lang="pug">
.page-main
  .p-head
    CardCompany(:companyInfo='infoState.companyInfo')
    CardResult(:result='infoState.result' :companyName='infoState.companyInfo.name' :creditCode='infoState.companyInfo.creditCode')
  Tab(:current='current' :detail='detail' @setCurrent='setCurrent')
  .p-content
    CompanyBlock(
      v-show='current === "one"'
      :companyInfo='infoState.companyInfo'
      :companyStockList='infoState.companyStockList'
      :companyMaterialList='infoState.companyMaterialList'
    )
    LegalBlock(
      v-show='current === "two"'
      :legalInfo='infoState.legalInfo'
      :legalMaterialList='infoState.legalMaterialList'
      :legalHouseList='infoState.legalHouseList'
      :spouseLegalInfo='infoState.spouseLegalInfo'
      :spouseLegalMaterialList='infoState.spouseLegalMaterialList'
      :spouseLegalHouseList='infoState.spouseLegalHouseList'
    )
    PersonBlock(
      v-show='current === "three"'
      :personInfo='infoState.personInfo'
      :personMaterialList='infoState.personMaterialList'
      :personHouseList='infoState.personHouseList'
      :spousePersonInfo='infoState.spousePersonInfo'
      :spousePersonMaterialList='infoState.spousePersonMaterialList'
      :spousePersonHouseList='infoState.spousePersonHouseList'
    )
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Tab from './components/tab'
import CardCompany from './components/cardCompany'
import CardResult from './components/cardResult'
import CompanyBlock from './components/companyBlock'
import PersonBlock from './components/personBlock'
import LegalBlock from './components/legalBlock'
import useInfo from './hooks/useInfo'

export default {
  components: {
    CardCompany,
    CardResult,
    Tab,
    CompanyBlock,
    PersonBlock,
    LegalBlock
  },
  setup(props, {root}) {
    // state
    const state = reactive({
      current: 'one',
      detail: {
        one: false,
        two: false,
        three: false,
      },
      infoState: {},
    })
    // 获取info
    state.infoState = useInfo({
      params: {
        companyBasicCode: root.$route.query.companyBasicCode
      }
    })
    const setCurrent = (status) => {
      state.current = status
    }

    return {
      setCurrent,
      ...toRefs(state),
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-head
  display flex
  justify-content flex-start
  align-items center
.p-content
  margin 0 0 20px
  background #fff
  padding-bottom 100px
</style>
