<template lang="pug">
div
  Header(:title="'放款总览'")
  .loan-content
    //- 业务员额度使用排名top
    Sale
    //- 经销商授信额度排名top10
    Distributor
</template>
<script>
import Header from '../header'
import Sale from './sale'
import Distributor from './distributor'

export default {
  components: {
    Header,
    Sale,
    Distributor
  }
}
</script>
<style lang="stylus" scoped>
.loan-content
  display flex
</style>
