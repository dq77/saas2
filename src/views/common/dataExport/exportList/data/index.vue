<!--
 * @Date: 2021-07-28 10:46:26
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-12 10:54:41
-->
<template lang='pug'>
  div
    .project-list-content
      Card(noTitle noWrap style='margin-bottom: 10px;')
        .form-area
          el-form(:model='form' label-position='top')
            .search-area
              .search-item
                el-form-item(label='报表名称')
                  el-input(v-model='form.fileName' placeholder='请输入报表名称')
              .search-item
                el-form-item(label='状态')
                  el-select(v-model='form.status' placeholder='请选择状态')
                    el-option(v-for='(value,key) in statusList' :label='value' :value='key' :key='key')
              .search-item
                el-form-item(label='申请日期')
                  el-date-picker(v-model='form.timeList' start-placeholder='开始日期' end-placeholder='结束日期' type='daterange' value-format='yyyy-MM-dd' :editable='false' unlink-panels)
              .search-item.btn-list
                el-button(type='primary' :loading='loading' @click='querySearchForm') 搜索
                el-button(:loading='loading' @click='resetSearchForm') 重置
      Card(noTitle noWrap)
        .table-area
          el-table(:data='tableList' v-loading='loading' stripe)
            el-table-column(prop='createdTime' label='申请日期')
            el-table-column(prop='fileName' label='报表名称')
            el-table-column(prop='createdBy' label='申请账号')
            el-table-column(prop='status' label='状态')
              template(slot-scope='{row}')
                span {{ statusList[row.status] }}
            el-table-column(prop='operate' label='操作')
              template(slot-scope='{row}')
                el-button(v-if='row.status === 3' @click='downFile(row)' type='text' weblogs-anchor='common-dataExport-down') 下载
        el-pagination(:total='totalCount' :current-page.sync='pageNo' @current-change='changePage' layout='total, prev, pager, next, jumper')
</template>
<script>
import { onMounted, ref, reactive } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'
import ajaxStore from '@/apis'
import Card from '@/components/Card'
import { saasOrderStatus } from '@/utils/enums'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Card
  },
  setup(props, context) {
    const loading = ref(true)
    const tableList = ref([])
    const pageNo = ref(1)
    const totalCount = ref(0)
    const form = reactive({
      fileName: '',
      status: '',
      timeList: ''
    })
    const params = ref({})

    const statusList = {
      0: '生成中',
      1: '生成失败',
      2: '审批中',
      3: '审批通过',
      4: '审批不通过'
    }

    const downFile = async (row) => {
      window.open(`/saas-boss/boss/dataExportDownLoad/downLoad?exportId=${row.id}`)
    }

    // 获取表格信息
    const getTableList = async (params) => {
      params.PageSize = 10
      for (const key in params) {
        if (params[key] === '') {
          delete params[key]
        }
      }
      loading.value = true
      const { getDataExportList } = ajaxStore.common.dataExport
      const res = await getDataExportList(params)
      loading.value = false
      if (res.data && res.data.code === '0') {
        tableList.value = res.data.data.pagedRecords
        totalCount.value = res.data.data.totalCount
      }
    }

    const querySearchForm = async () => {
      pageNo.value = 1
      params.value = deepCopy(form)
      delete params.value.timeList
      if (form.timeList && form.timeList.length) {
        params.value.queryStartDate = form.timeList[0] + ' 00:00:00'
        params.value.queryEndDate = form.timeList[1] + ' 23:59:59'
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
      form,
      tableList,
      statusList,
      saasOrderStatus,
      getTableList,
      querySearchForm,
      resetSearchForm,
      changePage,
      downFile,
      toAmountStr
    }
  }
}
</script>
<style lang='stylus' scoped>
.form-area
  padding 20px 10px 0
  .search-area
    display flex
    flex-wrap wrap
    .search-item
      width 25%
      padding 0 10px
      .el-form-item__label
        color #494949
        line-height 14px
      .el-select,.el-date-editor
        width 100%
    .btn-list
      margin-left auto
      display flex
      justify-content flex-end
      align-items flex-end
      padding-bottom 18px
.table-area
  padding 20px
  .u-img
    width 60px
    height 60px
    img
      width 100%
  .u-edit
    cursor pointer
    margin-right 5px
    display inline-block
.el-pagination
  text-align right
  padding 20px
</style>
