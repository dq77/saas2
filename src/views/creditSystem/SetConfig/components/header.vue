<template lang="pug">
.p-total
  .p-total-title
    span {{ title }}
    CustomInfo
      span 请根据企业的实际情况设置本年度可用于授信的资金总额
  .p-total-main
    .p-total-value {{ detail && customKey ? customFn ? customFn(detail[customKey]) : detail[customKey] : '' }}
    .p-total-btn(
      icon='el-icon-edit'
      weblogs-anchor="common-control-edit"
      @click="editHandle"
    )
      i.el-icon-edit(v-if="!(detail && detail[customKey])")
      | &nbsp;{{'编辑'}}
</template>
<script>
import CustomInfo from './customInfo'

export default {
  props: {
    title: String,
    customKey: String,
    customFn: Function,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    CustomInfo
  },
  setup(props, { emit }) {
    const editHandle = () => emit('editHandle', props.detail)

    return {
      editHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-total
  height 130px
  background url('//cdn.qjdchina.com/static-online/saas/creditSystem/setConfig/setCreditBg.png') no-repeat
  background-size 100% 100%
  color #fff
  display flex
  flex-flow column nowrap
  align-content center
  margin-top 11px
  .p-total-title
    font-size 16px
    line-height 22px
    margin-top 35px
    text-align center
  .p-total-main
    display flex
    justify-content center
    align-items: center
    height 45px
    margin-top 7px
    .p-total-value
      font-size 32px
    .p-total-btn
      padding: 5px 10px
      border-radius: 2px
      border: 1px solid #FFFFFF
      font-size 12px
      color #fff
      margin-left 10px
      cursor pointer
</style>
