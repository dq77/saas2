<!--
 * @Date: 2021-08-09 11:13:59
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-19 15:45:00
-->
<template lang="pug">
  .page-main
    .risk-list-cooperate
      Card(noTitle noWrap style='margin-bottom: 10px;')
        .form-area
          el-form(:model="form")
            .search-area
              .search-item
                el-form-item(label="经销商名称")
                  el-input(v-model="form.dealerName" placeholder="请输入经销商名称")
              .search-item.btn-list
                el-button(type='primary' :loading='loading' @click='querySearchForm') 搜索
                el-button(:loading='loading' @click='resetSearchForm') 重置
      Card(noTitle noWrap)
        .table-area
          el-table(:data="tableList" v-loading='loading' stripe)
            el-table-column(prop="dealerName" label="经销商名称" min-width="120")
            el-table-column(label="排黑前置" min-width="120")
              template(slot-scope='{row}')
                span.dtl-btn(@click='clickDetail(row, 0)' weblogs-anchor='factory-openPlatform-risk-checkBlack-detail') 查看
            el-table-column(label="授信审批" min-width="120")
              template(slot-scope='{row}')
                span.dtl-btn(@click='clickDetail(row, 1)' weblogs-anchor='factory-openPlatform-risk-creditProcess-detail') 查看
            el-table-column(label="项目审批" min-width="120")
              template(slot-scope='{row}')
                span.dtl-btn(@click='clickDetail(row, 2)' weblogs-anchor='factory-openPlatform-risk-projectProcess-detail') 查看
            el-table-column(prop="loanPerformanceNums" label="历史货款履约次数" min-width="120")
              template(slot-scope='{row}')
                span {{ row.loanPerformanceNums !== null ? row.loanPerformanceNums : '-' }}
            el-table-column(prop="servicePerformanceNums" label="历史服务费履约" min-width="120")
              template(slot-scope='{row}')
                span {{ row.servicePerformanceNums !== null ? row.servicePerformanceNums : '-' }}
            el-table-column(prop="loanAbnormalNums" label="历史货款异常次数" min-width="120")
              template(slot-scope='{row}')
                span {{ row.loanAbnormalNums !== null ? row.loanAbnormalNums : '-' }}
            el-table-column(prop="serviceAbnormalNums" label="历史服务费异常次数" min-width="120")
              template(slot-scope='{row}')
                span {{ row.serviceAbnormalNums !== null ? row.serviceAbnormalNums : '-' }}
        el-pagination(:total='totalCount' :current-page.sync='pageNo' @current-change='changePage' layout='total, prev, pager, next, jumper')
      detailDialog(:show.sync='showDetail' @close='clickDetail' :row='detailRow')
</template>
<script>
import { onMounted, ref, reactive } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'
import ajaxStore from '@/apis'
import Card from '@/components/Card'
import detailDialog from './components/detailDialog'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Card, detailDialog
  },
  setup(props, context) {
    const loading = ref(true)
    const showDetail = ref(false)
    const tableList = ref([])
    const pageNo = ref(1)
    const totalCount = ref(0)
    const detailRow = ref({})
    const form = reactive({ dealerName: '' })
    const params = ref({})

    // 获取表格信息
    const getTableList = async (params) => {
      for (const key in params) {
        if (params[key] === '') {
          delete params[key]
        }
      }
      loading.value = true
      const res = await ajaxStore.factoryService.qjd.getRiskList(params)
      loading.value = false
      if (res.data && res.data.code === '0') {
        tableList.value = res.data.data.pagedRecords
        totalCount.value = res.data.data.totalCount
      }
    }

    const clickDetail = async (row, column) => {
      if (row) {
        detailRow.value = {
          column, id: row.id
        }
        showDetail.value = true
      } else {
        showDetail.value = false
      }
    }

    const querySearchForm = async () => {
      pageNo.value = 1
      params.value = deepCopy(form)
      delete params.value.timeList
      if (form.timeList && form.timeList.length) {
        params.value.principalExpiredTimeBegin = form.timeList[0] + ' 00:00:00'
        params.value.principalExpiredTimeEnd = form.timeList[1] + ' 23:59:59'
      }
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    const resetSearchForm = async () => {
      for (const key in form) {
        if (form[key] !== '') {
          form[key] = ''
          params.value[key] = ''
        }
      }
      querySearchForm()
    }

    const changePage = () => {
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    onMounted(() => {
      getTableList({ pageNo: pageNo.value })
    })

    return {
      pageNo,
      totalCount,
      loading,
      showDetail,
      detailRow,
      form,
      tableList,
      getTableList,
      clickDetail,
      querySearchForm,
      resetSearchForm,
      changePage,
      toAmountStr
    }
  }
}
</script>
<style lang="stylus">
.risk-list-cooperate
  .form-area
    padding 10px
    .search-area
      display flex
      flex-wrap wrap
      .search-item
        width 25%
        padding 0 10px
        .el-form-item__label
          display block
          width 100%
          text-align left
          color #494949
      .btn-list
        margin-left auto
        display flex
        justify-content flex-end
        align-items flex-end
        padding-bottom 18px
  .table-area
    padding 20px
    .dtl-btn
      color #409EFF
      cursor pointer
  .el-pagination
    text-align right
    padding 20px
</style>
