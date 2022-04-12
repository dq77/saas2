<template lang='pug'>
div
  .chart-legend
    Title(title='逾期金额')
    .btns(v-if="isShow")
      el-button(:type='current === 1 ? "primary" : "default"' @click='clickCheckOverdue(1)') 按月
      el-button(:type='current === 2 ? "primary" : "default"' @click='clickCheckOverdue(2)') 按年
  .legend-right(v-if='isShow')
    Unit.text(title='时点应收总额' style='margin-right: 36px;')
    Unit.text(title='时点逾期总额')
    Unit(title='单位：万元' style='padding-top: 15px;')
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Title from '../components/title'
import Unit from '../components/unit'
export default {
  props: {
    isShow: Boolean
  },
  components: {
    Title,
    Unit
  },
  setup(props, { emit }) {
    const state = reactive({
      current: 1
    })
    // methods
    const clickCheckOverdue = (key) => {
      state.current = key
      emit('clickCheckOverdue', state.current)
    }
    return {
      clickCheckOverdue,
      ...toRefs(state)
    }
  },
}
</script>
<style lang='stylus' scoped>
.chart-legend
  display flex
  justify-content space-between
  .btns
    padding-top 20px
.legend-right
  display inline-flex
  color #494949
  font-size 12px
  padding-left 17px
  .text
    position relative
    padding-top 15px
    margin-right 20px
    &:first-child:before, &:nth-child(2):before
      content ''
      position absolute
      width 10px
      height 10px
      left -14px
      top 18px
      background: #3b68f0
    &:nth-child(2):before
      background: #8cc5f6
</style>
