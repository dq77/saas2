<template lang="pug">
.p-card
  .p-head {{companyInfo.name}}
  .p-line
    .line-label 经营状态：
    .line-value {{companyInfo.regStatus}}
  .p-line
    .line-label 经营地址：
    .line-value {{companyInfo.businessAddress}}
  //- .p-line
  //-   .line-label 资料情况：
  //-   .line-value.yellow 不完整
  //- .p-line
  //-   .line-label 经营状态：
  //-   .line-value 存续
  .p-line
    .line-label *（70-100]分段客户建议授信额度不大于300W
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      defaultValue: ''
    },
    companyInfo: {
      type: Object,
      defaultValue: () => {}
    }
  },
  components: {
  },
  setup(props, {emit}) {
  },
}
</script>
<style lang="stylus" scoped>
.p-card
  flex 2
  padding 15px 20px 20px
  background #fff
  border-radius 4px
  height 200px
  margin-right 10px
.p-head
  font-size 24px
  color #494949
  font-weight 500
.p-line
  display flex
  justify-content flex-start
  align-items center
  margin-top 10px
  color #494949
.yellow
  color #FEBB27
</style>
