<template lang="pug">
  .page-main
    .project-list-content
      TopTotalInfo
      Card(noTitle noWrap style='margin-bottom: 10px;')
        .form-area
          el-form(:model="form" label-position="top")
            .search-area
              .search-item
                el-form-item(label="项目名称")
                  el-input(v-model="form.name" placeholder="请输入项目名称")
              .search-item
                el-form-item(label="客户名称")
                  el-input(v-model="form.customerName" placeholder="请输入客户名称")
              .search-item
                el-form-item(label="项目金额区间")
                  .u-range-wrap
                    el-input.u-range-input(v-model='form.startContractAmount' type='number' placeholder='最低金额')
                    span.u-gx -
                    el-input.u-range-input(v-model='form.endContractAmount' type='number' placeholder='最高金额')
              .search-item
                el-form-item(label="状态")
                  el-select(v-model="form.status" placeholder="请选择状态")
                    el-option(label="启用" value="1")
                    el-option(label="禁用" value="0")
              .search-item.btn-list
                el-button(type='primary' :loading='loading' @click='querySearchForm') 搜索
                el-button(:loading='loading' @click='resetSearchForm') 重置
      Card(noTitle noWrap)
        .table-area
          el-button.creat-project-btn(@click='toCreateProject' type="primary" weblogs-anchor='supplyChain-factory-project-create') 新建项目
          el-button.creat-project-btn(@click='toBatchImport' type="primary" weblogs-anchor='supplyChain-factory-project-import') 批量导入
          el-table(:data="tableList" v-loading='loading' @sort-change='handleSortChange' ref='dataTable' stripe)
            el-table-column(prop="projectSn" label="项目编号")
            el-table-column(prop="extId" label="外部编号")
            el-table-column(prop="name" label="项目名称")
            el-table-column(prop="customerName" label="客户名称")
            el-table-column(prop="projectMemberDetailResponseList" label="跟进人")
              template(slot-scope='{row}')
                el-tooltip(placement='top' content='分配跟进人')
                  i.iconfont.iconfenpeiyewuyuan.p-icon-assign(
                    style="cursor: pointer;"
                    @click="() => fpHandle(row)"
                  )
                span(style="margin-left: 5px;") {{ row.projectMemberDetailResponseList && row.projectMemberDetailResponseList.length ? row.projectMemberDetailResponseList.map(item => item.memberName).join(',') : '' }}
            el-table-column(prop="projectSource" label="创建来源")
              template(slot-scope="{ row }")
                span {{ row.projectSource && sources[row.projectSource] ? sources[row.projectSource] : '' }}
            el-table-column(prop="createdTime" label="创建时间")
            el-table-column(prop="contractAmount" label="项目合同金额（万元）" width="170" sortable='custom')
              template(slot-scope='{row}')
                span {{row.contractAmount ? `¥${toAmountStr(row.contractAmount, 2, true)}`: '--'}}
            el-table-column(prop="projectCollectedAmount" label="当前已回款金额（万元）" width="180" sortable='custom')
              template(slot-scope='{row}')
                span {{row.projectCollectedAmount ? `¥${toAmountStr(row.projectCollectedAmount, 2, true)}`: '--'}}
            el-table-column(prop="status" label="状态")
              template(slot-scope='{row}')
                span {{ row.status === 1 ? '启用' : '禁用' }}
            el-table-column(prop="operate" label="操作")
              template(slot-scope='{row}')
                router-link.u-edit(:to='{name: "projectDetail", query: {id: row.id, projectSn: row.projectSn}}' weblogs-anchor='supplyChain-factory-project-detail') 查看
                router-link.u-edit(:to='{name: "projectEdit", query: {id: row.id, projectSn: row.projectSn}}' weblogs-anchor='supplyChain-factory-project-edit') 编辑
                span.u-edit(v-if='row.status === 0' @click='clickSwicth(row)' weblogs-anchor='supplyChain-factory-project-enable') 启用
                span.u-edit(v-if='row.status === 1' @click='clickSwicth(row)' weblogs-anchor='supplyChain-factory-project-disabled') 禁用
            template(slot='empty' )
              .list-content-empty
                img.empty-img(:src='`${$assetsBaseUrl}/common/home/empty-table.png`')
              el-button(type='primary' @click='toCreateProject' weblogs-anchor='supplyChain-factory-project-create') 新建项目
        el-pagination(:total='totalCount' :current-page.sync='pageNo' @current-change='changePage' layout='total, prev, pager, next, jumper')
    //- 分配跟进人
    Modal(
      :visible="modalApis.visible"
      :title="modalApis.title"
      :detail="modalApis.detail"
      @cancleHandle="modalApis.cancleHandle()"
      @successHandle="successHandle"
    )
</template>
<script>
import { onMounted, ref, reactive, toRefs } from '@vue/composition-api'
import { toAmountStr, humpToLine } from '@/utils/util'
import ajaxStore from '@/apis'
import TopTotalInfo from './Components/topTotalInfo'
import Card from '@/components/Card'
import { deepCopy } from '@/utils/qjd'
import Router from '@/router'
// 添加跟进人
import Modal from './modal/index.vue'
import useModal from 'hooks/useModal'

// const sources = {
//   1: '仟金顶',
//   2: '厂家',
//   3: '应收模块ARM导入'
// }
const sources = {
  1: '项目管理',
  2: '项目管理',
  3: '应收管家'
}

export default {
  components: {
    TopTotalInfo,
    Card,
    Modal
  },
  setup(props, context) {
    const dataTable = ref(null)
    const loading = ref(true)
    const tableList = ref([])
    const pageNo = ref(1)
    const totalCount = ref(0)
    // 分配跟进人
    const modalApis = useModal('分配跟进人')
    const form = reactive({
      name: '',
      customerName: '',
      startContractAmount: '',
      endContractAmount: '',
      status: ''
    })
    const params = ref({})
    // 获取表格信息
    const getTableList = async (params) => {
      try {
        params.PageSize = 10
        for (const key in params) {
          if (params[key] === '') { delete params[key] }
        }
        loading.value = true
        const { factory: { getProjectList } } = ajaxStore
        const res = await getProjectList(params)
        loading.value = false
        if (res.data && res.data.code === '0') {
          tableList.value = res.data.data.pagedRecords
          totalCount.value = res.data.data.totalCount
        }
      } catch (error) {
        loading.value = false
      }
    }
    const clickSwicth = async (row) => {
      const res = await ajaxStore.factory.changeProjectStatus({idList: [row.id], status: (row.status ? 0 : 1)})
      if (res.data && res.data.code === '0') {
        getTableList(params.value)
      }
    }

    const toCreateProject = () => { Router.push({ name: 'projectCreate' }) }
    const toBatchImport = () => { Router.push({ name: 'projectImport' }) }

    const querySearchForm = async () => {
      pageNo.value = 1
      params.value = deepCopy(form)
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    const resetSearchForm = async () => {
      dataTable.value.clearSort()
      for (const key in form) {
        if (form[key] !== '') {
          form[key] = ''
          params.value[key] = ''
        }
      }
      querySearchForm()
    }

    const handleSortChange = (e) => {
      if (e && e.order) {
        if (e.order === 'ascending') {
          form.ascs = humpToLine(e.prop)
          form.descs = undefined
        } else if (e.order === 'descending') {
          form.descs = humpToLine(e.prop)
          form.ascs = undefined
        }
      } else {
        form.descs = undefined
        form.ascs = undefined
      }
      querySearchForm()
    }

    const changePage = () => {
      getTableList({ pageNo: pageNo.value, ...params.value })
    }
    // 分配跟进人
    const fpHandle = row => {
      modalApis.setDetail(row)
      modalApis.openHandle()
    }

    onMounted(() => {
      getTableList({ pageNo: pageNo.value })
    })
    const successHandle = () => {
      getTableList({ pageNo: pageNo.value, ...params.value })
    }
    // state
    const state = reactive({ modalApis })

    return {
      pageNo,
      totalCount,
      loading,
      form,
      tableList,
      dataTable,
      toAmountStr,
      toCreateProject,
      toBatchImport,
      handleSortChange,
      clickSwicth,
      getTableList,
      successHandle,
      querySearchForm,
      resetSearchForm,
      changePage,
      fpHandle,
      sources,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus">
.project-list-content
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
        .el-select
          width 100%
        .u-range-wrap
          width 100%
          border: 1px solid #DCDFE6;
          border-radius: 4px;
          .u-range-input
            width 45%
            .el-input__inner
              border none
          .u-gx
            display inline-block
            width 10%
            text-align center
      .btn-list
        margin-left auto
        display flex
        justify-content flex-end
        align-items flex-end
        padding-bottom 18px
  .table-area
    padding 20px
    .creat-project-btn
      margin-bottom 10px
    .u-edit
      color #409eff
      cursor pointer
      margin-right 5px
      display inline-block
  .el-pagination
    text-align right
    padding 20px
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
