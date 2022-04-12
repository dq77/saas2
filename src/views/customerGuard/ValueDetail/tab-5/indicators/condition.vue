<template lang='pug'>
.condition
  ButtonGroup.button-report(
    title='报告期'
    :dataSource='reportButtonGroupApi.dataSource'
    :current='reportButtonGroupApi.current'
    @change='changeReportGroup'
  )
  .condition-title 财务类型指标
    ButtonGroups(
      :config='allGroupApi.dataSource'
      :current='allGroupApi.current'
      @change='changeTypeGroup'
    )
</template>

<script>
import ButtonGroup from '../../../components/buttonGroup'
import ButtonGroups from '../../../components/buttonGroups'
import TabCard from '../../components/tabCard'

export default {
  props: {
    reportButtonGroupApi: {
      type: Object,
      default: () => ({})
    },
    allGroupApi: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['changeMonthHandle', 'changeTypeHandle'],
  components: {
    ButtonGroup,
    ButtonGroups,
    TabCard
  },
  setup (props, {emit}) {
    const changeReportGroup = (data) => {
      emit('changeMonthHandle', data)
    }
    const changeTypeGroup = (data) => {
      emit('changeTypeHandle', data)
    }

    return {
      changeReportGroup,
      changeTypeGroup
    }
  }
}
</script>

<style lang='stylus' scoped>
.condition-title
  margin-top 20px
  font-size 12px
  color #494949
.button-report
  margin-top 25px
.button-ability
  margin-top 10px
.condition__ability
  display flex
  align-items center
  flex-wrap wrap
.button--split
  margin 0 50px
  margin-top 10px
  height 20px
  border-left 1px solid #A9AFB8

@media screen and (max-width: 1300px){
  .button--split {
    visibility hidden
  }
}
</style>
