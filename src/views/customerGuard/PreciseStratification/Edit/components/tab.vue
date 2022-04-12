<template lang="pug">
.p-tabs
  .tab-item(:class="current === 'one' ? 'current' : ''" @click='setCurrent("one")')
    .tab-title 1.企业信息
      .tab-detail
        span {{ detail.one ? '已填写' : '未填写'}}
        i.el-icon-check(v-if='detail.one')
  .tab-item(:class="current === 'two' ? 'current' : ''" @click='setCurrent("two")')
    .tab-title 2.法人代表及配偶
      .tab-detail
        span {{ detail.two ? '已填写' : '未填写'}}
        i.el-icon-check(v-if='detail.two')
  .tab-item(:class="current === 'three' ? 'current' : ''" @click='setCurrent("three")')
    .tab-title 3.实控人及配偶
      .tab-detail
        span {{ detail.three ? '已填写' : '未填写'}}
        i.el-icon-check(v-if='detail.three')
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
    watch(() => props.detail, (val, preVal) => {
    }, { immediate: true })
    return {
      setCurrent
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-tabs
  margin-top 10px
  display flex
  justify-content center
  align-items center
  background #F3F4F8
  .tab-item
    background #EEF0F5
    flex 1
    margin-right 10px
    height 60px
    display flex
    justify-content center
    align-items center
    cursor pointer
    border-radius 4px
    &:last-child
      margin-right 0
    .tab-title
      font-size 16px
      position relative
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
</style>
