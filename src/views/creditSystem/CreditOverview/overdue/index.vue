<template lang="pug">
.overdue
  Header(:title="'逾期总览'")
  .overdue-content
    //- 待业务员催收的逾期额度排名top10
    Wait
    //- 经销商逾期额度排名top10
    Distributor
</template>
<script>
import Header from '../header'
import Wait from './wait'
import Distributor from './distributor'

export default {
  components: {
    Header,
    Wait,
    Distributor
  }
}
</script>
<style lang="stylus" scoped>
.overdue-content
  display flex
</style>
