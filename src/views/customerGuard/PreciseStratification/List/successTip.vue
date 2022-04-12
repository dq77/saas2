<template lang="pug">
.p-main
  img.p-img(:src="`${$assetsBaseUrl}/customerGuard/do-success.png`")
  .p-success
    div 提交成功
    .success-do 是否立即开始客户评估
</template>
<script>

export default {
  components: {},
  props: {},
  setup(props, { emit }) {
    return {
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  display flex
  align-items center
  justify-self center
  flex-flow column nowrap
  .p-img
    width 86px
    height 86px
  .p-success
    margin 15px 0
    text-align center
    .success-do
      margin-top 10px
</style>
