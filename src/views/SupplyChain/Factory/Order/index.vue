<template lang="pug">
  .page-main
    .order-list-content
      PromptInfo(title='在订单管理菜单页面中，您可以查看全部订单的明细数据，并且您可以对客户的订单进行审核等操作。点击页面中的“新建订单”按钮，可以帮助您的客户进行代客下单。')
      TopTotalInfo
      Card(noTitle useFor='search' style='margin-bottom: 10px;')
        Form(
          ref="formRef"
          :formData="formState.formData",
          :formConfig="formState.formConfig"
        )
          .global-search-btn
            el-button.search-button(
              type="primary"
              @click="searchFormHandle"
              :loading="tableState.loading"
              weblogs-anchor='supplyChain-factory-order-search'
            ) 搜索
            el-button.search-button(@click="resetFormHandle" weblogs-anchor='supplyChain-factory-order-reset') 重置
      Card(noTitle)
        el-button.creat-order-btn(
          type='primary'
          weblogs-anchor='supplyChain-factory-order-create'
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
              el-button.u-btn(type='text' @click='clickToDetail({row, name: "orderDetail"})') 查看
              el-button.u-btn(v-if='row.isEdit' type='text' @click='clickToDetail({row, name: "orderEdit", editFlag: "edit"})') 编辑
              el-button.u-btn(v-if='!row.extId && row.status === 0' type='text' @click='auditAudit(row)') 同步订单
              el-button.u-btn(v-if='row.status === 0' type='text' @click='clickToDetail({row, name: "orderAudit"})') 审核订单
              el-button.u-btn(v-if='row.deliveryStatus' type='text' @click='clickToLogisticsDetail(row)') 物流信息
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
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import Router from '@/router'
import { ref, reactive, toRefs, onMounted } from '@vue/composition-api'
import { humpToLine } from '@/utils/util'
import ajaxStore from '@/apis'
import Card from '@/components/Card'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { columns, getFormConfig, cFormData } from './config'
import TopTotalInfo from './components/topTotalInfo'
import PromptInfo from '../Components/PromptInfo.vue'
import useOrderCache from './useOrderCache'

export default {
  components: {
    TopTotalInfo,
    Card,
    Form,
    Table,
    Pagination,
    PromptInfo
  },
  setup(props, {root}) {
    onMounted(() => {
      const { $route: { params } } = root
      if (JSON.stringify(params) !== '{}') {
        formState.setFormItem('status', params.status)
        tableState.searchHandle({...params})
      } else {
        tableState.searchHandle()
      }
    })
    const formRef = ref()
    const { factory: { getOrderList } } = ajaxStore

    // 搜索功能中的客户名称的模糊查询
    const getCustomerOptions = (query, key, config) => {
      useAsync({
        request: ajaxStore.factory.getCustomerList,
        params: { customerName: query},
        successCallBack: (res) => {
          if (res?.code === '0') {
            config.options = res?.data ?? []
          }
        }
      })
    }

    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: getFormConfig({ getCustomerOptions })
    })
    // table & page
    const tableState = useTable({
      request: getOrderList,
      isInit: false,
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
    // 操作类按钮
    const auditAudit = async (row) => {
      const { factory: { auditAudit } } = ajaxStore
      const res = await auditAudit({ id: row.id })
      if (res.data && res.data.code === '0') {
        Message.success(res.data.message)
      } else {
        Message.error(res.data.message)
      }
    }

    const clickToDetail = ({row, name, editFlag}) => {
      Router.push({
        name,
        query: {
          id: row.id,
          processInstanceId: row.processInstanceId,
          editFlag: editFlag,
          orderStatus: String(row.status),
        }
      })
    }

    const routerToCreateOrder = (useCache = '0') => Router.push({ name: 'orderCreate', query: { editFlag: 'add', useCache } })

    // 订单缓存
    const { getOrderCache, delOrderCache } = useOrderCache()

    // 点击创建订单
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
        name: 'orderLogistics',
        query: {
          id: row.id,
          deliveryStatus: row.deliveryStatus
        }
      })
    }
    // state
    const state = reactive({
      formState,
      tableState
    })

    return {
      formRef,
      columns,
      getCacheLoading,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      sortChange,
      auditAudit,
      clickToDetail,
      clickCreateOrder,
      clickToLogisticsDetail
    }
  }
}
</script>
<style lang="stylus">
.u-btn
  margin-right 5px
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
