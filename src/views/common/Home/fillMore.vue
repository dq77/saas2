<template lang='pug'>
.p-fill-more
  img.more-img(:src='`${$assetsBaseUrl}/common/home/gongzhonghao.png`')
  img.fill-block(:src='`${$assetsBaseUrl}/common/home/fixed-code.png`')
</template>

<script>
import Card from '@/components/Card'
// import ajaxStore from '@/apis'

export default {
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {

  },
  watch: {
    data (val) {
      if (val) {
        this.initData()
      }
    }
  },
  components: {
    Card
  }
}
</script>

<style lang='stylus' scoped>
.p-fill-more
  z-index 3005
  position fixed
  right 20px
  top 74%
  width 84px
  height 84px
  .more-img
    width 84px
    height 84px
  &:hover
    .fill-block
      transition opacity .4s
      width 182px
      opacity 1
  .fill-block
    opacity 0
    height 187px
    width 0
    position absolute
    top -10px
    right 52px
</style>
