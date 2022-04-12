// 本页面用于客户价格编辑、查看，实际还包含创建功能，但因客户价格列表页为全量客户，所以不适合有创建功能，未来需要创建页可直接使用，只要添加路由到此，路由名称为customerPriceCreate即可。

<template lang="pug">
.page-main
  top-nav(:collapseItems='collapseItems' @changeTopNav='changeTopNav' :currentKey='currentKey')
  .page-layout-approval-content
    Collapse(
      :columns='collapseItems'
      :defaultActiveName='defaultActiveCollapse'
    )
      template(slot='customerInfo')
        Form(
          labelPosition='left'
          :isShadow='false'
          :formData='formState.formData'
          :formConfig='formState.formConfig'
        )
      template(slot='priceInfo')
        div(v-if='showTableBtns' style='margin-bottom: 20px;')
          el-button(type='primary' @click='tableEditState.addRow') 添加新行
          el-button(@click='tableState.delSelectedRows("__id")') 删除
        Table.p-table(
          :checkbox='showTableCheckbox'
          :index='true'
          :loading='tableState.loading'
          :dataSource='tableState.dataSource'
          :columns='tableColumns'
          @selectionHandle='tableState.selectionChange'
          @cellChangeHandle='tableEditState.cellChangeHandle'
        )
          template(slot="mainPicPath" slot-scope="{ row }")
            el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
              div(slot='error')
                img(:src='`${$assetsBaseUrl}/common/alt.png`')
    .p-submit-wrap(v-if='showSubmitBtns')
      el-button(
        type="primary"
        @click="submitState.submitHandle"
        :loading="submitState.loading"
        weblogs-anchor="supplyChain-factory-price-cuntomer-edit-submit"
      ) 提交
      el-button(@click="submitState.backHandle" weblogs-anchor="supplyChain-factory-price-cuntomer-edit-return") 返回
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import Collapse from '@/components/qjd/collapse'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import Table from '@/components/qjd/table/index'
import useTable from 'hooks/useTable'
import useSubmit from './useSubmit'
import useTableEdit from './useTableEdit'
import { collapseItems, defaultActiveCollapse, formData, getFormConfig, getTableColumns, getRouteConfig } from './config'
import ajaxStore from '@/apis'
import { toPrefixUrl } from '@/utils/util'
import TopNav from '../../Components/TopNav'

export default {
  components: {
    Collapse,
    Form,
    Table,
    TopNav
  },
  setup(props, { root }) {
    const routeType = getRouteConfig(root.$route.name)
    const { customerId, customerName } = root.$route.query
    const showSubmitBtns = ['create', 'edit'].indexOf(routeType) > -1
    const showTableBtns = showSubmitBtns
    const showTableCheckbox = showSubmitBtns
    const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')
    // 表单 变更config中的客户名称下拉项
    const getCustomerNameOptions = async (val) => {
      const res = await ajaxStore.factory.getCustomerPriceList({ customerName: val })
      if (res.data && res.data.code === '0') {
        formState.setConfig('customerId', 'options', res.data.data.pagedRecords.map(item => {
          return { value: item.id, label: item.customerName }
        }))
      } else {
        formState.setConfig('customerId', 'options', [])
      }
    }

    // 表单
    const formState = useForm({
      formRef: 'formRef',
      formData,
      formConfig: getFormConfig(routeType, {
        getOptions: getCustomerNameOptions,
        defaultOptions: [
          {label: customerName, value: customerId}
        ]
      }),
    })
    if (['edit', 'detail'].indexOf(routeType) > -1) {
      formState.setFormItem('customerId', customerId)
    }

    // 表格
    const tableColumns = getTableColumns(routeType)
    const tableState = useTable({
      columns: tableColumns,
      isPage: false,
      isInit: true,
      checkbox: true,
      editDataSource: true,
    })

    // 自定义的edit功能集
    const tableEditState = useTableEdit({
      routeType,
      customerId,
      tableState
    })

    // 提交 submitState: {loading: boolean, submitHandle: Function}
    const submitState = useSubmit({
      root,
      formData: formState.formData,
      tableData: tableState.dataSource,
    })

    const state = reactive({
      formState,
      tableState,
      tableEditState,
      submitState,
    })

    const currentKey = ref(`${collapseItems[0].key}`)
    const changeTopNav = (val) => {
      currentKey.value = val
    }

    return {
      showSubmitBtns,
      showTableBtns,
      showTableCheckbox,
      routeType,
      downloadUrl,
      defaultActiveCollapse,
      collapseItems,
      tableColumns,
      ...toRefs(state),
      changeTopNav,
      currentKey
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-submit-wrap
  padding-top 20px
  text-align center
.p-table
  max-height 900px
  overflow auto
.p-table-img
  width 60px
  height 60px
  img
   width 100%
</style>
