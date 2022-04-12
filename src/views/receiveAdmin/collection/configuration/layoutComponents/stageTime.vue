<template lang="pug">
.p-time-stage
  .u-cycle-wrapper(v-for='(cycle, cycleIndex) in stageConfig' :key='cycle.timeId')
    .u-cycle
      i.el-icon-time
      template(v-if='cycleIndex === stageConfig.length - 1')
        span.u-text.u-text-edit(@click='clickEditTime(cycle)') {{ cycle.beginTime }}-{{ cycle.endTime }}天
        el-popconfirm.u-btn(
          v-if='cycleIndex === stageConfig.length - 1'
          title='你确定要删除此条策略吗？'
          @confirm='confirmDel(cycle.timeId)'
        )
          i.u-icon-del(slot='reference') &times;
      template(v-else)
        span.u-text {{ cycle.beginTime }}-{{ cycle.endTime }}天
    .u-model-wrapper
      .u-btns
        el-button(@click='clickCreateModel(cycle.timeId)') 添加策略模型
      .u-model-blocks(v-if='cycle && cycle.strategyList && cycle.strategyList.length')
        ModelBlock(
          v-for='(model, modelIndex) in cycle.strategyList'
          :key='modelIndex'
          :data='model'
          :urgeWay='urgeWay'
          @changeSuccess='changeSuccess'
          @clickChange='clickChangeModel(model, cycle.timeId, modelIndex)'
        )
  .u-cycle-wrapper(style='height: 60px; margin-bottom: 30px;')
    .u-cycle
      i.el-icon-time
      el-button(type='text' @click='clickAddTime') + 添加时间段
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { Message } from 'element-ui'
import ModelBlock from './modelBlock'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default defineComponent({
  components: {
    ModelBlock,
  },
  props: {
    stageConfig: Array,
    urgeWay: String,
  },
  setup(props, { emit }) {
    // 点击添加时间段
    const clickAddTime = () => emit('clickAddTime')
    // 点击添加时间段
    const clickEditTime = (cycle) => emit('clickEditTime', cycle)
    // 删除时间段
    const confirmDel = (timeId) => {
      useAsync({
        request: ajaxStore.receive.configuration.delTime,
        params: { phaseId: timeId },
        successCallBack: (res) => {
          if (res?.code === '0') {
            Message.success('删除时间段成功')
            emit('changeSuccess')
          }
        }
      })
      emit('clickDelTime')
    }
    const changeSuccess = () => emit('changeSuccess')
    const clickCreateModel = (timeId) => emit('clickCreateModel', timeId)
    const clickChangeModel = (model, timeId, index) => emit('clickChangeModel', model, timeId, index)
    return {
      clickAddTime,
      clickEditTime,
      confirmDel,
      changeSuccess,
      clickCreateModel,
      clickChangeModel,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-time-stage
  margin-top 25px
  .u-cycle-wrapper
    position: relative
    padding-left 22px
    padding-bottom 38px
    &::before
      content ''
      position: absolute
      left 28px
      top 0
      width: 1px
      height: 100%
      background: #EAEBEE
  .u-cycle
    position: relative
    margin-bottom 10px
    font-size 14px
    color #383B42
    background: #fff
    .el-icon-time
      margin-right 10px
      color var(--defaultColor)
    .u-text
      margin-right 10px
    .u-text-edit,.u-icon-del
      cursor: pointer
      &:hover
        color var(--defaultColor)
  .u-model-wrapper
    padding-left 23px
  .u-btns
    margin-bottom 10px
  >>>.p-model-block
    margin-right: 20px
    margin-bottom: 20px
</style>
