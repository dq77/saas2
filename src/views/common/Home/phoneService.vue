<template lang='pug'>
.phone-service
  .card
    .title
      .left-txt 咨询服务
    .phone-content
      .phone-left
        i.icon.iconfont.service-pic.iconzixunfuwu
      .phone-right
        .care-item
          span 咨询电话：
          span.phone-num 400-6121-666
        .care-item
          span 服务时间：全年 9:00 - 21:00
</template>

<script>
import Card from '@/components/Card'

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
.phone-service
  margin-top 20px
  .phone-content
    color #494949
    display flex
    padding 0 20px 20px
    .phone-left
      .service-pic
        font-size 40px
        margin-right 10px
        color #3b68f0
    .phone-right
      flex 1 0 auto
      padding 1px 0
      .care-item+.care-item
        margin-top 4px
      .phone-num
        font-size 16px
</style>
