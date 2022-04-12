<template lang="pug">
.p-main(v-loading='getDetailLoading || publishLoading || createLoading || editLoading')
  .p-canvas-flex
    introduce
    board(
      :dataSource='workFlowData'
      :dialogShow='dialogShow'
      @showDialog='showDialog'
      @addNode='addNode'
      @hideNode='hideNode'
      @showNode='showNode'
    )
    formDialog(
      v-for='(item, index) in workFlowData'
      :key='index'
      :formData='item'
      :dialogShow='item.active'
      :currentIndex='index'
      @close='showDialog'
      @save='setData'
      @deleteNode='deleteNode'
    )
  .p-bottom
    span.p-status-main(v-if='hasSave')
      i.el-icon-check
      span.p-save-status 已保存
    el-button(type='text' @click='save') 保存
    el-button(type='primary' :disabled='!hasSave' @click='publish') 发布
</template>

<script>
import introduce from './introduce'
import board from './board'
import formDialog from './formDialog'
import { defaultNode } from './config'
import { reactive, toRefs } from '@vue/composition-api'
import useFlow from '../hooks/useFlow'
export default {
  components: {
    introduce,
    board,
    formDialog
  },
  setup(props, {root}) {
    const state = reactive({
      dialogShow: false,
      hasSave: false,
      formData: defaultNode,
    })

    const { applicationCode, businessCode, publishStatus, status, businessName, applicationName } = root.$route.query

    if (publishStatus === 2 || (status === 1 && publishStatus === 0)) {
      state.hasSave = true
    }

    const showDialog = ({formData, show, index}) => {
      setIndex({index})
      state.dialogShow = show || !state.dialogShow
      state.formData = formData
    }

    const save = () => {
      let result = true
      workFlowData.value.map((item, index) => {
        if (item.nodeName && item.approver.length && item.operationNoPass) {
          setData({
            index,
            key: 'hasError',
            value: false
          })
        } else {
          setData({
            index,
            key: 'hasError',
            value: true
          })
          result = false
        }
      })
      if (result) {
        const sumbitData = {
          applicationCode,
          businessCode,
          businessName,
          applicationName,
          id: followDetail.value?.id,
          taskAddRequests: []
        }
        workFlowData.value.map((item, index) => {
          sumbitData.taskAddRequests.push({
            // approverType=1:如果approver等于1，则为1，大于1，则为2；
            // approverType=2:设置2； 动态审批人类型
            // approverType=3:设置3；
            candidateType: item.approverType === 1 ? (item.approver.length === 1 ? 1 : 2) : item.approverType,
            candidateValues: item.approver,
            listenerEventCode: item.operationPass,
            name: item.nodeName,
            rejectEventCode: item.operationNoPass,
            sort: index
          })
        })
        if (followDetail.value?.id) {
          sumbitData.taskUpdateRequests = sumbitData.taskAddRequests
          sumbitData.taskAddRequests = undefined
          editFlow(sumbitData)
        } else {
          createFlow(sumbitData)
        }
      }
    }

    const publish = () => {
      publishFlow({
        id: followDetail.value?.id
      })
    }

    const saveCallBack = () => {
      state.hasSave = true
      root.$message.success('保存成功')
      getFlowDetail({
        applicationCode,
        businessCode
      })
    }

    const publishCallBack = () => {
      root.$message.success('发布成功')
      root.$router.push({
        name: 'processConfigHome'
      })
    }

    const getDetailCallBack = (data) => {
      if (data) {
        const defaultData = []
        data.taskResponses.map((item, index) => {
          const { id, name, candidateType, candidateValues, listenerEventCode, rejectEventCode } = item
          // const approver = []
          // for (const key in candidateValues) {
          //   const formatNumber = parseFloat(candidateValues[key])
          //   const value = typeof formatNumber === 'number' && !isNaN(formatNumber) ? formatNumber : candidateValues[key]
          //   approver.push(value)
          // }
          defaultData.push({
            hasError: false,
            active: false,
            id,
            nodeName: name,
            approverType: candidateType === 2 ? 1 : candidateType,
            approver: candidateValues,
            operationPass: listenerEventCode,
            operationNoPass: rejectEventCode
          })
        })
        resetData({
          data: defaultData
        })
      }
    }

    const {
      followDetail,
      getFlowDetail,
      setIndex,
      setData,
      addNode,
      deleteNode,
      hideNode,
      showNode,
      workFlowData,
      resetData,
      publishFlow,
      editFlow,
      createFlow,
      publishLoading,
      createLoading,
      editLoading,
      getDetailLoading,
    } = useFlow({
      publishCallBack,
      editCallBack: saveCallBack,
      createCallBack: saveCallBack,
      getDetailCallBack
    })

    getFlowDetail({
      applicationCode,
      businessCode
    })

    return {
      getDetailLoading,
      showDialog,
      setData,
      addNode,
      deleteNode,
      hideNode,
      showNode,
      workFlowData,
      save,
      publish,
      publishLoading,
      createLoading,
      editLoading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-main
  background #ffffff
  border-radius 4px
  border 1px solid #EAEBEE
  margin 0 20px
  position relative
  .p-canvas-flex
    display flex
    position relative
    overflow hidden
  .p-bottom
    padding 14px 0
    box-shadow 0px -2px 6px 0px rgba(51, 75, 133, 0.2)
    display flex
    justify-content center
    .p-status-main
      line-height 30px
      color #848484
      margin-right 10px
      i
        font-size 16px
        margin-right 5px
</style>
