<template lang="pug">
.page-main
  .p-header
    Tabs(page='myRealEstateReport')
    MainSearch
  Card(noTitle)
    el-button(type="primary" @click='switchDialogApply' weblogs-anchor='factory-customerEvaluation-report-apply').p-btns 申请研究报告
    Table(:dataSource="dataSource" :columns="applyListColumns" :loading="loading")
      template(slot='operate' slot-scope='{row}')
        el-button(type='text' @click='clickBtnCancel(row)' v-if='row.applyStatus === "DOING"') 取消
        el-button(type='text' @click='clickBtnDownload(row)' v-if='row.applyStatus === "DONE"')
          template(v-if='row.fileKey' weblogs-anchor='factory-customerEvaluation-report-apply-download') 下载
          template(v-else) 查看报告
        el-button(type='text' @click='clickBtnReason(row)' v-if='row.applyStatus === "REJECT" && row.rejectReason') 查看原因
    Pagination(:pagination="pagination")
  DialogApply(:dialogShow='dialogApplyShow' @comfirm='searchHandle' @close='switchDialogApply')
</template>

<script>
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import Table from '@/components/qjd/table'
import { ref } from '@vue/composition-api'
import Card from '@/components/Card'
import ajaxStore from '@/apis'
import { applyListColumns } from './config'
import useAsync from 'hooks/useAsync'
import DialogApply from './dialogApply'
import Tabs from '../components/tabs'
import MainSearch from '../components/mainSearch'
import { toPrefixUrl } from '@/utils/util'

export default {
  components: {
    Pagination,
    Table,
    Card,
    DialogApply,
    Tabs,
    MainSearch
  },
  setup(props, { root }) {
    const dialogApplyShow = ref(false)

    const { getReportList, updateReport } = ajaxStore.factoryService.realEstate

    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      request: getReportList,
      isInit: true,
    })

    const { doResult: cancelApply } = useAsync({
      request: updateReport,
      init: false
    })

    const clickBtnCancel = (row) => {
      root.$confirm('确认取消本次申请的研究报告？', '确认取消', {
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            cancelApply({
              id: row.id,
              applyStatus: 'CANCAL'
            }).then(({code}) => {
              if (code === '0') {
                searchHandle()
                done()
                instance.confirmButtonLoading = false
              }
            })
          } else {
            done()
          }
        }
      }).then(() => {
        root.$message.success('已取消')
      }).catch(() => {})
    }

    const clickBtnDownload = (row) => {
      if (row.fileKey) {
        window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${row.fileKey}`))
      } else {
        window.open(`/web/realEstateReport?reportId=${row.id}`)
      }
    }

    const clickBtnReason = (row) => {
      this.$alert(`驳回本次申请的原因是${row.rejectReason}`, '驳回原因')
    }

    const switchDialogApply = () => {
      dialogApplyShow.value = !dialogApplyShow.value
    }

    return {
      loading,
      dataSource,
      pagination,
      applyListColumns,
      clickBtnCancel,
      clickBtnDownload,
      clickBtnReason,
      switchDialogApply,
      dialogApplyShow,
      searchHandle
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-header
  display flex
  justify-content space-between
.p-btns
  margin-bottom 20px
</style>
