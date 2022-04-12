<template lang="pug">
.p-card
  .p-head
    .head-left 评估结果
    .head-right
      el-button.u-btn(type='text' @click='showReport') 评估记录
  .p-content(v-if='result.status === "4"')
    .p-chart
      #scoreChart
    .p-tips
      .tip-line(:gutter='24')
        .tip-item.desc-margin
          .p-desc
            .desc-label 偿还债务能力
            .desc-value {{resultTip.repay[result.grade]}}
        .tip-item
          .p-desc
            .desc-label 企业经营状态
            .desc-value {{resultTip.manager[result.grade]}}
      .tip-line(:gutter='24')
        .tip-item.desc-margin
          .p-desc
            .desc-label 违约风险
            .desc-value {{resultTip.risk[result.grade]}}
        .tip-item
          .p-desc
            .desc-label 违约概率
            .desc-value {{resultTip.chance[result.grade]}}
      .tip-line(:gutter='24')
        .tip-item
          .p-desc
            .desc-label 不确定因素对企业经营和发展
            .desc-value {{resultTip.influenceToDevelop[result.grade]}}
      .tip-line(:gutter='24')
        .tip-item
          .p-desc
            .desc-label 不确定因素对盈利和偿债能力
            .desc-value {{resultTip.influenceToRepay[result.grade]}}
  .p-error(v-else-if='result.status === "2" || result.status === "3"')
    .p-error-left
      img(v-if='result.status === "2"' :src='`${$assetsBaseUrl}/customerGuard/warn.png`')
      img(v-else :src='`${$assetsBaseUrl}/customerGuard/error.png`')
      .tip {{ result.status === "2" ? "退回：重新提交资料" : "拒绝：不建议授信" }}
      el-button.u-btn(type='text' @click='reApply') 重新发起
    .p-error-right
      .error-title {{ result.status === "2" ? "退回" : "拒绝" }}原因：
      .error-content
        .error-item(v-for='(item, index) in (result.riskReasonList || [])')
          .error-reason {{index+1}}.{{transformResult(item.ruleResult)}}
  .p-other(v-else)
    .result(v-if='result.status === "1"')
      i.icon.el-icon-loading
      span.gray 评估中，请耐心等待
    .result.gray(v-else) 暂无评估信息
  Modal(
    title="评估记录"
    :width="'800px'"
    :visible="visible"
    :showClose="false"
    cancleTxt="关闭"
    @cancleHandle="cancleHandle"
    :footer="null"
  )
    Table(:dataSource="tableState.dataSource" :columns="resultColumns" :loading='tableState.loading')
      template(slot='operate' slot-scope='{row, $index}')
        //- 操作
        .u-nowrap
          el-button.u-btn(type='text' @click='clickToDetail(row)') 查看
    Pagination(:pagination="tableState.pagination")
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import { reactive, toRefs, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { guageOption, resultColumns, resultTip } from '../config/index'

export default {
  components: {
    Modal,
    Table,
    Pagination
  },
  props: {
    companyName: {
      type: String,
      defaultValue: ''
    },
    creditCode: {
      type: String,
      defaultValue: ''
    },
    result: {
      type: Object,
      defaultValue: () => {}
    }
  },
  setup(props, {emit, root}) {
    const { customer: { precise: { getApplyList, reapply } } } = ajaxStore
    const state = reactive({
      visible: false,
      chartState: {},
      tableState: {},
      reapplyState: {}
    })
    // 重新发起
    state.reapplyState = useAsync({
      request: reapply,
      init: false
    })
    state.tableState = useTable({
      request: getApplyList,
      defaultParams: { companyName: props.companyName },
      isInit: false,
      callback: (data = {}) => {
        const { total = 0, records = [] } = data || {}
        return {
          totalCount: total,
          dataSource: records || []
        }
      }
    })
    const { perTimeout } = useTimeout()
    const { chartInit, setOption } = useCharts({
      option: guageOption(),
      id: 'scoreChart',
      isInit: false
    })
    // 跳转详情页
    const clickToDetail = (row) => {
      const { href } = root.$router.resolve({name: 'preciseStratificationDetail', query: {companyBasicCode: row.companyBasicCode}})
      window.open(href, '_blank')
    }
    const cancleHandle = () => {
      state.visible = false
      // state.tableState.resetHandle()
    }
    const showReport = () => {
      state.tableState.searchHandle({
        companyName: props.companyName
      })
      state.visible = true
    }
    const transformResult = (list) => {
      return list.join('；')
    }
    const reApply = () => {
      MessageBox.confirm('确认重新发起？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '关闭',
        type: 'warning',
        roundButton: true
      }).then(() => {
        state.reapplyState.doResult({
          creditCode: props.creditCode,
          companyName: props.companyName,
        }).then(({code, data}) => {
          if (code === '0') {
            Message.success('发起成功')
            root.$router.push({name: 'preciseStratificationEdit', query: {companyBasicCode: data}})
          }
        })
      })
    }
    watch(() => props.result, (val, preVal) => {
      // const scoreObj = {
      //   A: 100,
      //   B: 80,
      //   C: 60,
      //   D: 40,
      //   E: 20
      // }
      perTimeout(() => {
        // 设置数据
        setOption(guageOption(val?.grade || '获取失败', val?.score || 0))
        chartInit()
      })
    }, { immediate: true })
    return ({
      resultColumns,
      resultTip,
      transformResult,
      reApply,
      clickToDetail,
      cancleHandle,
      showReport,
      ...toRefs(state)
    })
  },
}
</script>
<style lang="stylus" scoped>
.p-card
  flex 3
  padding 10px 20px
  background #fff
  border-radius 4px
  height 200px
.p-head
  display flex
  justify-content space-between
  align-items center
  .head-left
    font-weight 500
    color: #494949
.p-other
  display flex
  justify-content center
  align-items center
  height 150px
  .result span
    margin-left 5px
    line-height 12px
.p-content
  display flex
  justify-content space-between
  align-items center
  .p-chart
    flex 180px 0 0
  .p-tips
    flex 1
    .tip-line
      display flex
      justify-content flex-start
      align-items center
      margin-bottom 10px
      .tip-item
        flex 1
.p-error
  display flex
  justify-content space-between
  align-items center
  padding-top 10px
  color #383B42
  .p-error-left
    flex 180px 0 0
    display flex
    justify-content center
    align-items center
    flex-flow column wrap
    img
      width 50px
      height 50px
    .tip
      margin-top 10px
  .p-error-right
    flex 1
    border 1px solid #F2F2F6
    background #fff
    padding 10px
    height 130px
    overflow-y scroll
    .error-content
      .error-item
        margin-top 5px
.p-desc
  display flex
  justify-content space-between
  align-items center
  border-left 2px solid #3B68F0
  background #EEF0F5
  padding 0 10px
  height 26px
  .desc-label
    color #848484
  .desc-value
    color #383B42
.yellow
  color #FEBB27
.desc-margin
  margin-right 10px
#scoreChart
  width 150px
  height 150px
.gray
  color #848484
</style>
