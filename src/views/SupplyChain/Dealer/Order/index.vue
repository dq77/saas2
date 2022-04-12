<template lang="pug">
  .page-main
    .order-list-content
      TopTotalInfo(:isInit='Boolean(isInit)')
      Card(noTitle useFor='search' style='margin-bottom: 10px;')
        Form(
          ref="formRef"
          :formData="formState.formData",
          :formConfig="formState.formConfig"
        )
          .global-search-btn-feed
            el-button.search-button(
              type="primary"
              @click="searchFormHandle"
              :loading="tableState.loading"
            ) 搜索
            el-button.search-button(@click="resetFormHandle") 重置
      Card(noTitle)
        //- table
        el-button.creat-order-btn(
          type='primary'
          weblogs-anchor="supplyChain-customer-order-create"
          :loading='getCacheLoading'
          @click='clickCreateOrder'
        ) 新建订单
        Table(
          :dataSource="tableState.dataSource"
          :columns="columns"
          :loading="tableState.loading"
          @sortChange="sortChange"
          :isEmptySet='true'
        )
          template(slot='operate' slot-scope='{row}')
            //- 操作
            .u-nowrap
              el-button.u-btn(type='text' @click='clickToDetail(row)' weblogs-anchor="supplyChain-customer-order-detail") 查看
              el-button.u-btn(v-if='row.deliveryStatus' type='text' @click='clickToLogisticsDetail(row)' weblogs-anchor="supplyChain-customer-order-logistic") 物流信息
          template(slot='table-empty' )
            .list-content-empty
              img.empty-img(:src='`${$assetsBaseUrl}/common/home/empty-table.png`')
              .fill-txt 暂无数据，您可以进行新建
            el-button(
              type='primary'
              :loading='getCacheLoading'
              @click='clickCreateOrder'
            ) 新建订单
        Pagination(:pagination="tableState.pagination")
    Modal(:visible="modalApis.visible" :title="modalApis.title" ref='modelDialogRef' @cancleHandle="modalApis.cancleHandle")
</template>
<script>
import { ref, reactive, toRefs, onMounted, watch } from '@vue/composition-api'
import { MessageBox } from 'element-ui'
import Router from '@/router'
import { humpToLine } from '@/utils/util'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'
import TopTotalInfo from './components/topTotalInfo'
import Card from '@/components/Card'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import Modal from './components/modal'
import useModal from 'hooks/useModal'
import store from '@/store'
import useOrderCache from './useOrderCache'

export default {
  components: {
    TopTotalInfo,
    Card,
    Form,
    Table,
    Pagination,
    Modal,
  },
  setup(props, {root}) {
    const formRef = ref()
    const { dealer: { getOrderList } } = ajaxStore
    const {state: storeState} = store
    const { customerTenants } = store?.state?.userInfo ?? {}
    const { isInit } = root.$route.query || {}
    const modelDialogRef = ref('')
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    const modalApis = useModal('请选择厂家')
    // table & page
    const tableState = useTable({
      request: getOrderList,
      isInit
    })
    // 查询
    const searchFormHandle = () => formState.submitHandle().then(() => {
      const { formData: { timeList, orderSn, projectName, ...others } } = formState
      let params = {}
      if (timeList && timeList.length) {
        timeList[1] && (params.endCreatedTime = timeList[1] + ' 23:59:59')
        timeList[0] && (params.startCreatedTime = timeList[0] + ' 00:00:00')
      }
      orderSn && (params.orderSn = orderSn)
      projectName && (params.projectName = projectName)
      params = { ...params, ...others }
      tableState.searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 排序
    const sortChange = ({ prop, order }) => {
      if (order) {
        if (order === 'ascending') {
          tableState.searchInfo.descs = undefined
          tableState.searchInfo.ascs = [humpToLine(prop)]
        } else {
          tableState.searchInfo.descs = [humpToLine(prop)]
          tableState.searchInfo.ascs = undefined
        }
      } else {
        tableState.searchInfo.descs = undefined
        tableState.searchInfo.ascs = undefined
      }
      tableState.searchHandle({ ...tableState.searchInfo})
    }

    const clickToDetail = (row) => {
      Router.push({
        name: 'dealerOrderDetail',
        query: {
          id: row.id,
        }
      })
    }
    onMounted(() => {
      if (storeState.curIdentify && JSON.stringify(storeState.curFactory) !== '{}') {
        modelDialogRef.value.sureHandle(storeState.curFactory.tenantId)
        return
      }
      if (!isInit) {
        modalApis.openHandle()
      } else {
        modelDialogRef.value.sureHandle(customerTenants[0].tenantId)
      }
    })

    // 订单缓存
    const { getOrderCache, delOrderCache } = useOrderCache()

    const routerToCreateOrder = (useCache = '0') => Router.push({ name: 'dealerOrderCreate', query: { useCache } })

    const getCacheLoading = ref(false)
    const clickCreateOrder = async () => {
      getCacheLoading.value = true
      const orderCache = await getOrderCache()
      getCacheLoading.value = false
      if (orderCache) {
        MessageBox.confirm('检测到您有一笔未提交成功的订单，是否恢复并继续编辑此订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          routerToCreateOrder('1')
        }).catch(async () => {
          await delOrderCache()
          routerToCreateOrder()
        })
      } else {
        routerToCreateOrder()
      }
    }

    const clickToLogisticsDetail = async (row) => {
      Router.push({
        name: 'dealerOrderLogistics',
        query: {
          id: row.id,
          deliveryStatus: row.deliveryStatus
        }
      })
    }
    watch(
      () => store.state.curFactory,
      val => {
        tableState.searchHandle()
      }
    )

    // state
    const state = reactive({
      formState,
      tableState,
      modalApis
    })

    return {
      getCacheLoading,
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      sortChange,
      clickToDetail,
      clickCreateOrder,
      clickToLogisticsDetail,
      isInit,
      modelDialogRef
    }
  }
}
</script>
<style lang="stylus">
.u-btn + .u-btn
  margin-left 5px
.creat-order-btn
  margin-bottom 10px
.list-content-empty
  color #9AA6B8
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 15px 0
  text-align center
  .empty-img
    height 118px
  .fill-txt
    margin-top 20px
    line-height 20px
</style>
