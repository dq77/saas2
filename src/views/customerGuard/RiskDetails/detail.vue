<template lang="pug">
.rm-detail
  .rmd-total(v-loading='loading')
    GrayBlocks(:data='totalList')
  .rmd-list
    Form.rmd-list__form(
      ref="formRef"
      :formData="formData",
      :formConfig="formConfig"
    )
      template(slot='riskTypes')
        el-checkbox-group(v-model="checkList")
          el-checkbox(v-for='item in riskTypeList' :label="item.key" :key='item.key') {{ item.label }}
      .global-search-btn
        el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
        el-button.search-button(@click="resetFormHandle") 重置
    Table.rmd-list__table(:dataSource="dataSource || []", :columns="collectionColumns", :loading="tableLoading")
      template(slot='riskType' slot-scope='{row}')
        span {{ riskType[row.riskType] }}
      template(slot='operate' slot-scope='{row}')
        el-button(type='text' @click='toDetail(row)' weblogs-anchor='customerGuard-risk-detail') 详情
    Pagination.rmd-pagination(:pagination="pagination")
</template>

<script>
import { ref, reactive, toRefs, computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import GrayBlocks from '@/components/GrayBlocks'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import useLoading from 'hooks/useLoading'
import { riskType } from '@/utils/enums'
import { cFormData, getFormConfig, collectionColumns } from './config'

export default {
  components: { GrayBlocks, Form, Table, Pagination },
  setup(props) {
    // 基础数据
    const blocksData = ref([])
    const state = reactive({
      totalList: [
        { label: '关注企业数', number: 0, iconName: 'rm-1.png' },
        { label: '涉风险企业数', number: 0, iconName: 'rm-2.png' },
        { label: '预警', number: 0, iconName: 'rm-3.png' },
        { label: '提醒', number: 0, iconName: 'rm-4.png' }
      ]
    })
    const riskTypeList = computed(() => {
      return Object.keys(riskType).map(key => {
        return { label: riskType[key], key: key }
      })
    })
    const toDetail = (item) => {
      const url = `https://${process.env.VUE_APP_WEBTOOLS_HOST}/sentiment`
      const { riskType, riskId } = item
      switch (riskType) {
        case 'sfss':
          window.open(`${url}/detail?caseId=${riskId}`)
          break
        case 'zx':
          window.open(`${url}/executee/detail?caseId=${riskId}`)
          break
        case 'sx':
          window.open(`${url}/brokenPromise/detail?caseId=${riskId}`)
          break
        case 'xg':
          window.open(`${url}/heightLimit/detail?caseId=${riskId}`)
          break
        case 'xzcf':
          window.open(`${url}/administrativeSanction/detail?decisionNo=${riskId}`)
          break
        case 'jyyc':
          window.open(`${url}/businessAbnormality/detail?caseId=${riskId}`)
          break
        case 'dcdy':
          window.open(`${url}/chattelMortgage/detail?regNumber=${riskId}`)
          break
        default:
          break
      }
    }

    // ref
    const formRef = ref()
    // 接口
    const { getRiskDetailNum, getRiskDetailPage } = ajaxStore.risk
    const { getCountryList } = ajaxStore.common
    // loading
    const {
      loading,
      checkLoading
    } = useLoading()

    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      setConfig
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: getFormConfig,
    })

    // table & page
    const checkList = ref([])
    const {
      tableLoading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getRiskDetailPage })

    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const data = JSON.parse(JSON.stringify(formData.value))
        if (data?.time) {
          data.startTime = data?.time?.[0]
          data.endTime = data?.time?.[1]
        }
        if (data?.address) {
          data.provinceName = data.address[0]
        }
        data.riskTypes = checkList.value
        delete data.time
        delete data.address
        searchHandle({ ...data })
      })
    }
    // 重置
    const resetFormHandle = () => {
      checkList.value = []
      resetHandle()
      resetTableHandle()
    }

    // 查询省市区
    useAsync({
      isLoading: false,
      request: getCountryList,
      successCallBack: ({ data }) => {
        data && data.length && setConfig('address', 'options', JSON.parse(data))
      }
    })

    // 获取风险明细总计数据
    useAsync({
      request: getRiskDetailNum,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false),
      successCallBack: ({ data }) => {
        checkLoading(false)
        const { followNum, riskDealerNum, earlyWarningNum, remindNum } = data
        state.totalList[0].number = followNum
        state.totalList[1].number = riskDealerNum
        state.totalList[2].number = earlyWarningNum
        state.totalList[3].number = remindNum
      }
    })

    return {
      loading,
      blocksData,
      riskType,
      riskTypeList,
      toDetail,
      ...toRefs(state),
      // form table
      formRef,
      tableLoading,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      dataSource,
      pagination,
      collectionColumns,
      checkList
    }
  }
}
</script>

<style lang="stylus" scoped>
.rmd-total
  padding 20px
  margin-bottom 10px
  background #fff
  border-radius 4px
.rmd-list
  border-radius 4px
  overflow hidden
  &__form
    padding 20px 20px 2px
    margin-bottom 10px
    background #fff
  &__table
    background #fff
    padding 20px
.rmd-pagination
  margin-top 0
  background #fff

/deep/ .el-table th.el-table__cell
  background-color #F2F2F6
  color #494949
  font-weight 600
</style>
