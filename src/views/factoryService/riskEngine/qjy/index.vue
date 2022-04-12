<template lang="pug">
  .page-main
    .p-bg
      .p-title
        a(:href='href' target='_blank')
          img.p-logo(:src="`${$assetsBaseUrl}/factoryService/riskEngine/qjy-logo.png`")
          span 仟金眼-企业商业信息报告
</template>

<script>
export default {
  data() {
    return {
      // href: `https://${process.env.VUE_APP_QJC_HOST}`
      href: `https://${document.location.hostname}/partner/risk/credit/site`
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-bg
  min-height 500px
  background-color #fff
  overflow hidden
.p-title
  margin-top 100px
  font-size 20px
  text-align center
.p-logo
  width 136px
  height 40px
  margin-right 20px
  vertical-align middle
</style>
