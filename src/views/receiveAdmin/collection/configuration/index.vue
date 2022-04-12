<template lang="pug">
.page-main(v-loading='detailState.detailLoading')
  HeaderTabs(
    :activedTab='detailState.repayDayType'
    @changeTab='detailState.changeRepayDayType'
  )
  Card(noTitle noWrap style='margin-top: 10px;')
    .p-body
      .p-body-left
        SideTabs(
          :activedTab='detailState.urgeWay'
          @changeTab='detailState.changeUrgeWay'
        )
      .p-body-right
        .p-wrapper
          .p-title
            span 通用纬度
          StageGeneral(
            :modelArr='detailState.modelData.generalList'
            :urgeWay='detailState.urgeWay'
            @changeSuccess='modelBlockChange'
            @clickCreateModel='clickCreateGeneralModel'
            @clickChangeModel='clickChangeGeneralModel'
          )
        .p-wrapper
          .p-title
            span 时间阶段
          StageTime(
            :stageConfig='detailState.modelData.timeList'
            :urgeWay='detailState.urgeWay'
            @clickAddTime='clickAddTime'
            @clickEditTime='clickEditTime'
            @changeSuccess='modelBlockChange'
            @clickCreateModel='clickCreateTimeModel'
            @clickChangeModel='clickChangeTimeModel'
          )
  DialogModel(
    :visible='dialogModel.visible'
    :mode='dialogModel.mode'
    :repayDayType='dialogModel.repayDayType'
    :urgeWay='dialogModel.urgeWay'
    :dimension='dialogModel.dimension'
    :phaseId='dialogModel.phaseId'
    :data='dialogModel.data'
    @close='dialogModel.visible=false'
    @success='modelDialogSuccess'
  )
  DialogTime(
    :visible='dialogTime.visible'
    :mode='dialogTime.mode'
    :repayDayType='dialogTime.repayDayType'
    :urgeWay='dialogTime.urgeWay'
    :isFirst='dialogTime.isFirst'
    :editData='dialogTime.editData'
    @close='dialogTime.visible=false'
    @success='timeDialogSuccess'
  )
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import HeaderTabs from './layoutComponents/headerTabs'
import SideTabs from './layoutComponents/sideTabs'
import StageGeneral from './layoutComponents/stageGeneral'
import StageTime from './layoutComponents/stageTime'
import DialogModel from './dialogModel/index'
import DialogTime from './dialogTime/index'
import useDetail from './useDetail'

export default defineComponent({
  components: {
    Card,
    HeaderTabs,
    SideTabs,
    StageGeneral,
    StageTime,
    DialogModel,
    DialogTime,
  },
  setup() {
    const detailState = useDetail()

    const state = reactive({
      detailState,
      dialogModel: {
        mode: 'create', // 创建 create、编辑 edit
        visible: false,
        repayDayType: detailState.repayDayType,
        urgeWay: detailState.urgeWay,
        dimension: '', // 通用维度 GENERAL、时间维度 TIME
        phaseId: '', // 通用、时间段的id
        data: {}
      },
      dialogTime: { // 时间段弹窗只可添加，不可删除
        mode: 'create', // 创建 create、编辑 edit
        visible: false,
        repayDayType: detailState.repayDayType,
        urgeWay: detailState.urgeWay,
        editData: { // 默认的
          startDay: null,
          endDay: null
        },
      }
    })
    // 点击创建 通用维度
    const clickCreateGeneralModel = () => {
      state.dialogModel.mode = 'create'
      state.dialogModel.visible = true
      state.dialogModel.repayDayType = detailState.repayDayType
      state.dialogModel.urgeWay = detailState.urgeWay
      state.dialogModel.dimension = 'GENERAL'
      state.dialogModel.phaseId = detailState.modelData.generalId
      state.dialogModel.data = {}
    }
    // 点击修改 通用维度
    const clickChangeGeneralModel = (model, index) => {
      state.dialogModel.mode = 'edit'
      state.dialogModel.visible = true
      state.dialogModel.repayDayType = detailState.repayDayType
      state.dialogModel.urgeWay = detailState.urgeWay
      state.dialogModel.dimension = 'GENERAL'
      state.dialogModel.phaseId = detailState.modelData.generalId
      state.dialogModel.data = model
    }

    const modelDialogSuccess = () => {
      state.dialogModel.visible = false
      detailState.getDetailHandle()
    }

    const modelBlockChange = () => {
      detailState.getDetailHandle()
    }

    // 点击创建 时间段
    const clickAddTime = () => {
      state.dialogTime.mode = 'create'
      const len = detailState.modelData?.timeList?.length ?? 0
      if (len > 0) {
        state.dialogTime.editData.startDay = detailState.modelData.timeList[len - 1].endTime + 1
        state.dialogTime.editData.endDay = state.dialogTime.editData.startDay + 1
      } else {
        state.dialogTime.editData.startDay = 0
        state.dialogTime.editData.endDay = state.dialogTime.editData.startDay + 1
      }
      state.dialogTime.visible = true
    }

    // 点击编辑 时间段
    const clickEditTime = (cycle) => {
      state.dialogTime.mode = 'edit'
      state.dialogTime.editData.timeId = cycle.timeId
      state.dialogTime.editData.startDay = cycle.beginTime
      state.dialogTime.editData.endDay = cycle.endTime
      state.dialogTime.visible = true
    }

    // 点击创建 时间维度
    const clickCreateTimeModel = (timeId) => {
      state.dialogModel.mode = 'create'
      state.dialogModel.visible = true
      state.dialogModel.repayDayType = detailState.repayDayType
      state.dialogModel.urgeWay = detailState.urgeWay
      state.dialogModel.dimension = 'TIME'
      state.dialogModel.phaseId = timeId
      state.dialogModel.data = {}
    }

    // 点击修改 时间维度
    const clickChangeTimeModel = (model, timeId, index) => {
      state.dialogModel.mode = 'edit'
      state.dialogModel.visible = true
      state.dialogModel.repayDayType = detailState.repayDayType
      state.dialogModel.urgeWay = detailState.urgeWay
      state.dialogModel.dimension = 'TIME'
      state.dialogModel.phaseId = timeId
      state.dialogModel.data = model
    }

    const timeDialogSuccess = () => {
      state.dialogTime.visible = false
      detailState.getDetailHandle()
    }

    return {
      ...toRefs(state),
      clickCreateGeneralModel,
      clickChangeGeneralModel,
      modelBlockChange,
      modelDialogSuccess,
      clickAddTime,
      clickEditTime,
      timeDialogSuccess,
      clickCreateTimeModel,
      clickChangeTimeModel,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-body
  display flex
.p-body-left
  width 160px
.p-body-right
  flex 1
  padding-top 10px
  width 0
  border-left 1px solid #EAEBEE
.p-title
  padding 10px 0
  color #494949
  font-size 14px
  border-bottom 1px solid #EAEBEE
  span
    padding-left 8px
    border-left 3px solid #3B68F0
</style>
