<template lang='pug'>
.u-top-title(:class='img')
  .container
    .title-name {{ title }}
    .sub-title {{ subTitle }}
    .btn(@click='btnClick') {{ status ? '立即体验' : '立即开通' }}
</template>

<script>

export default {

  data () {
    return {
    }
  },
  props: {
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    status: {
      type: Boolean
    },
    img: {
      type: String
    }
  },
  methods: {
    btnClick() {
      this.$emit('btnClick')
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
}
</script>

<style lang='stylus' scoped>
.u-top-title
  &.creditsales-system
    background-image url('//cdn.qjdchina.com/static-online/saas/factoryService/home/recommendService/creditsales-system-top-title-bg.png')
  &.dealer-stratification
    background-image url('//cdn.qjdchina.com/static-online/saas/factoryService/home/recommendService/dealer-stratification-top-title-bg.png')
  &.evaluation-developer
    background-image url('//cdn.qjdchina.com/static-online/saas/factoryService/home/recommendService/evaluation-developer-top-title-bg.png')
  &.smart-contract
    background-image url('//cdn.qjdchina.com/static-online/saas/factoryService/home/recommendService/smart-contract-top-title-bg.png')
  &.supply-coordination
    background-image url('//cdn.qjdchina.com/static-online/saas/factoryService/home/recommendService/supply-coordination-top-title-bg.png')
  height 200px
  background-repeat no-repeat
  background-position center right
  background-size auto 100%
  background-color #001241
  color #FFF
  .title-name
    font-size 38px
    padding-top 26px
    height 79px
    line-height 53px
  .sub-title
    font-size 16px
    height 22px
    line-height 22px
    margin-top 6px
  .btn
    width 100px
    height 34px
    border 1px solid #FFF
    font-size 14px
    line-height 34px
    text-align center
    margin-top 20px
    cursor pointer
</style>
