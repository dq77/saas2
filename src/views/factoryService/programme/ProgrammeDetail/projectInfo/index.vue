<template lang="pug">
.p-detail-main
  AddBtn
  CardTitle(title='建筑工程商信息')
  CompanInfo(type='realEstateCompany')
  CardTitle(title='项目公司')
  CompanInfo(type='projectCompany')
  CardTitle(title='项目信息')
  ProjectBase
</template>

<script>
import AddBtn from './addBtn'
import CompanInfo from '../companyInfo/index'
import CardTitle from '../components/cardTitle'
import ProjectBase from './projectBase'
export default {
  components: {
    CompanInfo,
    AddBtn,
    CardTitle,
    ProjectBase
  }
}
</script>
<style lang="stylus" scoped>
.p-detail-main
  background #fff
  padding 20px
  box-shadow 4px 6px 8px 0px #EEF1FC
  margin-bottom 20px
  .p-detail-flex
    display flex
    margin-bottom 30px
</style>
