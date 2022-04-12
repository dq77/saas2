<template lang="pug">
.rating.card(v-loading='loading')
  //- 综合评分
  Score(:dataSource='dataSource')
  //- 机构评级
  Agencies(:dataSource='dataSource')
</template>

<script>
import Agencies from './agencies'
import Score from './score'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  components: { Agencies, Score },
}
</script>

<style lang="stylus" scoped>
.rating
  padding 20px
  background #ffffff
  width 100%
</style>
