<template lang="pug">
.p-tabs
  .tab-left
    .tab-item(:class="current === 'one' ? 'current' : ''" @click='setCurrent("one")')
      .tab-title 企业信息
    .tab-item(:class="current === 'two' ? 'current' : ''" @click='setCurrent("two")')
      .tab-title 法人代表及配偶
    .tab-item(:class="current === 'three' ? 'current' : ''" @click='setCurrent("three")')
      .tab-title 实控人及配偶
  .tab-right
    //- el-button.u-btn(type='text' @click='showSubmit') 资料提交记录
</template>
<script>
import { watch } from '@vue/composition-api'

export default {
  props: {
    current: {
      type: String,
      defaultValue: 'one'
    },
    detail: {
      type: Object,
      defaultValue: () => {}
    }
  },
  components: {
  },
  setup(props, {emit}) {
    const setCurrent = (status) => {
      emit('setCurrent', status)
    }
    const showSubmit = () => {
      emit('showSubmit')
    }
    watch(() => props.detail, (val, preVal) => {
    }, { immediate: true })
    return {
      showSubmit,
      setCurrent
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-tabs
  margin-top 10px
  display flex
  justify-content space-between
  align-items center
  background #fff
  .tab-left
    display flex
    justify-content center
    align-items center
    flex 600px 0 0
    .tab-item
      background #EEF0F5
      flex 1
      margin-right 1px
      height 50px
      display flex
      justify-content center
      align-items center
      cursor pointer
      &:last-child
        margin-right 0
      .tab-title
        font-size 16px
        position relative
        color #494949
      .tab-detail
        font-size 12px
        margin-left 10px
        color #848484
        position absolute
        top 3px
        right -42px
        .el-icon-check
          position absolute
          top 3px
    .current
      background #ffffff
      color #3B68F0
      .tab-detail
        color #3B68F0
  .tab-right
    margin-right 20px
</style>
