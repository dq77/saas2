<template lang="pug">
.p-guide
  .u-img
  .u-title 下游账户类型未配置
  .u-desc 您还未配置下游账户类型，请先完成初始化配置后继续使用此功能
  .u-btns
    el-button(type='primary' @click='clickConfig') 前往配置
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(props, { root }) {
    const clickConfig = () => {
      root.$router.push({
        name: 'setBase',
        query: {
          module: 'supplyChain',
          function: 'accountType'
        }
      })
    }
    return {
      clickConfig
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-guide
  padding 170px 0
  text-align: center
  .u-img
    margin 0 auto
    width 230px
    height: 133px
    background url("//cdn.qjdchina.com/static-online/saas/creditSystem/overview/success.png") center no-repeat
    background-size: 100%
  .u-title
    margin-top 4px
    font-size 14px
    color #494949
  .u-desc
    margin-top 6px
    font-size 12px
    color #A9AFB8
  .u-btns
    margin-top 28px
</style>
