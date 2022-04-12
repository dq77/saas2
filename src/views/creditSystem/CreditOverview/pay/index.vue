<template lang="pug">
.pay
  Header(:title="'还款总览'")
  .pay-content
    //- 待收欠款占比
    Percent
    //- 经销商欠款排名
    Rank
</template>
<script>
import Header from '../header'
import Percent from './percent'
import Rank from './rank'

export default {
  components: {
    Header,
    Percent,
    Rank
  }
}
</script>
<style lang="stylus" scoped>
.pay-content
  display flex
  padding 30px 20px
</style>
