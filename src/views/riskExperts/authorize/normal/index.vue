<template lang="pug">
.page-main
  .p-background
    .p-header
      el-button.p-btn(@click="goback") 返回上级
      .p-title 标准评估信息授权
      .p-tip 根据仟金顶评估标准，以下相关主体与个人需进行授权以及后续资料提交，您可根据厂家实际情况选择授权主体及资料提交。
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
          el-button(type='text' @click="accurateHandle(row)" v-weblogs.click='"赊销评估-标准评估-授权列表页-发起授权点击"' v-if="row.authorizationStatus !== 'AUTHORIZED'") 发起授权
    .p-control
      //- el-button(type="primary", @click="submitHandle" :loading='startState.loading' v-weblogs.click='"赊销评估-标准评估-授权列表页-下一步"') 发起评估
      el-button.p-btn(@click="saveHandle") 任务暂存
  AuthModal(title='授权方式', :visible='visible', :detail='currentInfo' mode='normal' @cancleHandle='cancleHandle')
</template>

<script>
import { Message } from 'element-ui'
import { reactive, toRefs, onMounted, onUnmounted } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import AuthModal from '../AuthModal'
import { status, columns } from './config'
import { toMobileUrl } from '@/utils/enums'
import useAsync from 'hooks/useAsync'

export default {
  components: { Table, AuthModal },
  setup(props, { root }) {
    const { $route: { query: { taskId } } } = root
    // 基础数据
    const state = reactive({
      visible: false,
      currentInfo: {},
      tableState: {},
      startState: {},
      timer: null,
      evaluateList: [],
      authorizationStatus: true,
    })

    // 接口
    const { creditEvaluation: { getAccreditList, startStandardEvaluation } } = ajaxStore.riskExperts

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
        state.evaluateList = data?.evaluateObject?.detailList || []
        state.tenantId = data?.tenantId
        if (data?.evaluateObject?.detailList) {
          state.authorizationStatus = data?.evaluateObject?.detailList.some(item => {
            return (item.authorizationStatus && item.authorizationStatus !== 'AUTHORIZED')
          })
        }
        return {
          totalCount,
          dataSource: pagedRecords || []
        }
      }
    })

    // 返回
    const goback = () => {
      root.$router.push({
        name: 'uploadMaterials',
        query: {
          id: taskId,
          mode: 'standard',
        }
      })
    }
    state.startState = useAsync({
      request: startStandardEvaluation,
      init: false
    })
    // 发起授权
    const accurateHandle = (info) => {
      const hostname = toMobileUrl[location.hostname] || 'https://saas-mobile-testa.qjdchina.com/'
      state.currentInfo = {
        ...info,
        url: `${hostname}riskexperts/authBegin?accreditId=${info.id}&tenantId=${state.tenantId}&isCompany=${info.role === '企业' ? 0 : 1}`,
      }
      state.visible = true
    }
    // 发起赊销评估
    const submitHandle = () => {
      if (state.authorizationStatus) return Message.warning('授权状态均为【已授权】方可发起评估')
      state.startState.doResult({id: taskId}).then(res => {
        if (res.code === '0') {
          root.$router.push({
            name: 'creditTaskList',
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
      status,
      columns,
      goback,
      accurateHandle,
      submitHandle,
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
.p-header
  display flex
  justify-content flex-start
  align-items center
  .p-title
    margin-left 20px
    font-weight 500
    color #494949
    font-size 18px
  .p-tip
    margin 5px 0 0 5px
    color #A8A8A8
.p-detail
  margin-top 30px
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
</style>
