<template lang="pug">
.page-main
  .p-background
    .p-error(v-if='evaluateStatus === "REPEAT_AUTH"')
      i.p-icon.el-icon-warning
      .p-desc 评估被驳回：
      .p-error-list
        .p-error-item {{remark}}
    .p-header
      .p-title 精准评估信息授权
      .p-tip 根据仟金顶评估标准，以下相关主体与个人需进行授权以及后续资料提交，您可根据厂家实际情况选择授权主体及资料提交。
      el-button.p-back(@click="goback") 返回
    .p-block
      .p-name 被评估企业主体
      .p-detail
        Table(:dataSource="evaluateList || []", :columns="columns", :loading="tableState.tableLoading")
          template(slot='authStatus' slot-scope='{row}')
            .authStatus
              .cycle(:class="row.authorizationStatus === 'AUTHORIZED' ? 'green' : 'red'")
              .text {{status[row.authorizationStatus] || '未授权'}}
          template(slot='info' slot-scope='{row}')
            div {{row.role === '企业' ? row.corporationName : row.name}}
            div(v-if="row.role === '企业'") {{`社会统一信用代码：${row.uniformCreditCode}`}}
            div(v-else) {{`身份证：${row.idNumber}` | toWordHide('id')}}
          template(slot='operate' slot-scope='{row}')
            el-button(type='text' @click="accurateHandle(row)" v-weblogs.click='"赊销评估-精准评估-授权列表页-发起授权点击"' v-if="row.authorizationStatus !== 'AUTHORIZED'") 发起授权
    .p-block(v-for='(list, index) in (relevantList || [])' :key='index')
      .p-name {{list.corporationName}}
      .p-detail
        Table(:dataSource="list.detailList || []", :columns="columns", :loading="tableState.tableLoading")
          template(slot='authStatus' slot-scope='{row}')
            .authStatus
              .cycle(:class="row.authorizationStatus === 'AUTHORIZED' ? 'green' : 'red'")
              .text {{status[row.authorizationStatus] || '未授权'}}
          template(slot='info' slot-scope='{row}')
            div {{row.role === '企业' ? row.corporationName : row.name}}
            div(v-if="row.role === '企业'") {{`社会统一信用代码：${row.uniformCreditCode}`}}
            div(v-else) {{`身份证：${row.idNumber}` | toWordHide('id')}}
          template(slot='operate' slot-scope='{row}')
            el-button(type='text' @click="accurateHandle(row)" v-weblogs.click='"赊销评估-精准评估-授权列表页-发起授权点击"' v-if="row.authorizationStatus !== 'AUTHORIZED'") 发起授权
    .p-control
      el-button(v-if='!suppInfo' type="primary", @click="createHandle" :loading='createState.loading' v-weblogs.click='"赊销评估-精准评估-授权列表页-提交评估"') 提交评估
      el-button(v-else type="primary", @click="submitHandle" :loading='uploadState.loading' v-weblogs.click='"赊销评估-精准评估-授权列表页-下一步"') 上传评估资料
      el-button.p-btn(@click="saveHandle") 任务暂存
  AuthModal(title='授权方式', :visible='visible', :detail='currentInfo' mode='accurate' @cancleHandle='cancleHandle')
  Modal(
    title="确认发起资料提交"
    :width="'480px'"
    :visible="dialogVisible"
    @cancleHandle="nextCancelHanle"
    :footer="'custom'"
  )
    .modal-line 按仟金顶评估标准,授权还未完全
    .modal-line 授权及资料上传越多，评估更精准
    template(slot="footer")
      .custom_modal_footer
        el-button.p-btn(@click="nextCancelHanle") 继续授权
        el-button(type="primary", @click="nextSubmitHandle" :loading='uploadState.loading' v-weblogs.click='"赊销评估-精准评估-授权列表页-下一步"') 上传评估资料
</template>

<script>
import { Message } from 'element-ui'
import { reactive, toRefs, onMounted, onUnmounted } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Table from '@/components/qjd/table'
import Modal from '@/components/qjd/modal'
import AuthModal from '../AuthModal'
import useTable from 'hooks/useTable'
import { status, columns, modeEnums } from './config'
import { toMobileUrl } from '@/utils/enums'
import useAsync from 'hooks/useAsync'

export default {
  components: { Table, AuthModal, Modal },
  setup(props, { root }) {
    // mode: FAST_MODE: '快速评估', STANDARD_MODE: '标准评估', ACCURATE_MODE: '精准评估'
    const { $route: { query: { taskId, mode } } } = root
    // 基础数据
    const state = reactive({
      visible: false,
      currentInfo: {},
      tableState: {},
      uploadState: {},
      createState: {},
      timer: null,
      remark: '',
      evaluateStatus: false,
      suppInfo: true,
      tenantId: '',
      evaluateList: [],
      relevantList: [],
      dialogVisible: false,
    })

    // 接口
    const { creditEvaluation: { getAccreditList, updateNoAuthById, createEvaluateOnAuth } } = ajaxStore.riskExperts

    // table
    state.tableState = useTable({
      request: getAccreditList,
      isPage: false,
      defaultParams: {
        evaluateId: taskId,
        // queryStatus: 'ALL'
      },
      callback: (data = {}) => {
        const { totalCount = 0, pagedRecords = [] } = data || {}
        state.remark = data?.remark
        state.evaluateStatus = data?.evaluateStatus
        state.suppInfo = data?.suppInfo
        state.tenantId = data?.tenantId
        state.evaluateList = data?.evaluateObject?.detailList || []
        state.relevantList = data?.relevantList || []
        return {
          totalCount,
          dataSource: pagedRecords || []
        }
      }
    })

    // 上传资料
    state.uploadState = useAsync({
      request: updateNoAuthById,
      init: false
    })

    // 提交授权
    state.createState = useAsync({
      request: createEvaluateOnAuth,
      init: false
    })

    // 返回
    const goback = () => {
      root.$router.go(-1)
    }
    // 发起授权
    const accurateHandle = (info) => {
      console.log(info, 'info')
      const hostname = toMobileUrl[location.hostname] || 'https://saas-mobile-testa.qjdchina.com/'
      state.currentInfo = {
        ...info,
        url: `${hostname}riskexperts/authBegin?accreditId=${info.id}&tenantId=${state.tenantId}&isCompany=${info.role === '企业' ? 0 : 1}`,
      }
      state.visible = true
    }
    // 发起评估
    const createHandle = () => {
      state.createState.doResult({evaluateId: taskId}).then(res => {
        if (res.code === '0') {
          Message.success('发起成功')
          root.$router.push({
            name: 'creditTaskList',
          })
        }
      })
    }
    // 发起赊销评估
    const submitHandle = () => {
      if (state.evaluateList.every(item => item.authorizationStatus !== 'AUTHORIZED')) {
        if (state.relevantList.every(list => {
          const open = (list?.detailList || []).every(item => item.authorizationStatus !== 'AUTHORIZED')
          if (open) return true
        })) {
          return Message.warning('请先授权，授权成功后才可进行下一步操作！')
        }
      }
      if (state.evaluateList.some(item => item.authorizationStatus !== 'AUTHORIZED')) {
        state.dialogVisible = true
        return
      }
      if (state.relevantList.some(list => {
        const open = (list?.detailList || []).some(item => item.authorizationStatus !== 'AUTHORIZED')
        if (open) return true
      })) {
        state.dialogVisible = true
        return
      }
      state.uploadState.doResult({id: taskId}).then(res => {
        if (res.code === '0') {
          root.$router.push({
            name: 'uploadMaterials',
            query: {
              mode: modeEnums[mode],
              id: taskId
            }
          })
        }
      })
    }
    const nextCancelHanle = () => {
      state.dialogVisible = false
    }
    const nextSubmitHandle = () => {
      state.uploadState.doResult({id: taskId}).then(res => {
        if (res.code === '0') {
          root.$router.push({
            name: 'uploadMaterials',
            query: {
              mode: modeEnums[mode],
              id: taskId
            }
          })
        }
      })
    }
    // 暂存
    const saveHandle = () => {
      root.$router.push({
        name: 'creditTaskList'
      })
    }
    // 关闭弹框
    const cancleHandle = () => {
      state.visible = false
    }

    // 定时请求授信状态
    const recycleStatus = () => {
      state.timer = setInterval(() => {
        state.tableState.searchHandle({evaluateId: taskId})
      }, 30000)
    }

    onMounted(() => {
      recycleStatus()
    })
    onUnmounted(() => {
      if (state.timer) {
        clearTimeout(state.timer)
        state.timer = null
      }
    })

    return {
      ...toRefs(state),
      taskId,
      status,
      columns,
      goback,
      accurateHandle,
      createHandle,
      submitHandle,
      nextCancelHanle,
      nextSubmitHandle,
      saveHandle,
      cancleHandle
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-background
  background #fff
  padding 20px 30px
.p-error
  display flex
  background #FAF5E8
  height 90px
  color #D59509
  padding 15px
  margin-bottom 30px
  position relative
  .p-icon
    position absolute
    top -8px
    right -8px
    color #FAAD14
    font-size 24px
  .p-desc
    font-size 18px
  .p-error-list
    flex 1
    display flex
    flex-flow column wrap
    align-content flex-start
    .p-error-item
      margin-right 150px
      word-wrap break-word
      min-height 20px
      padding-top 2px
.p-header
  display flex
  justify-content flex-start
  align-items center
  .p-title
    font-weight 500
    color #494949
    font-size 18px
  .p-tip
    margin 5px 0 0 5px
    color #A8A8A8
  .p-back
    margin-left auto
.p-block
  margin-top 30px
  .p-name
    border-left 2px solid #3B68F0
    height 25px
    line-height 25px
    font-size 18px
    font-weight 500
    color #494949
    padding-left 10px
  .p-detail
    margin-top 15px
.p-control
  margin-top 30px
.authStatus
  display flex
  align-items center
.cycle
  width 8px
  height 8px
  border-radius 4px
  margin-right 5px
.red
  background #FAAD14
.green
  background #52C41A
.modal-line
  line-height 25px
</style>
