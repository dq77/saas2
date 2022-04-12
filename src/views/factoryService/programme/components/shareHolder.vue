<template lang="pug">
.p-share-holder-main
  CompanyBase(:companyName='companyName' @getBaseInfo='getBaseInfo')
  ShareHolderTable(:companyName='companyName')
  .p-card-main
    Card(title='关系图谱')
      RelationMap(:rootCompanyName='companyName' :regCode='baseInfo.creditCode' :active='active')
</template>
<script>
import Card from '@/components/Card'
import CompanyBase from './companyBase'
import ShareHolderTable from './shareHolderTable'
import RelationMap from './relationMap'
export default {
  props: {
    companyName: {
      type: String
    },
  },
  components: { Card, CompanyBase, ShareHolderTable, RelationMap },
  data() {
    return {
      loading: false,
      baseInfo: {},
      active: ''
    }
  },
  methods: {
    getBaseInfo(baseInfo) {
      this.getBaseInfo = baseInfo
      this.active = 'relationMap'
    }
  },
  mounted() {
  },
}
</script>
<style lang="stylus" scoped>
.p-card-main
  margin-top 30px
</style>
