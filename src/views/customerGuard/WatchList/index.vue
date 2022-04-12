<template lang="pug">
.page-main
  .rm-list
    Form.rm-form(
      ref="formRef"
      :formData="formData",
      :formConfig="formConfig"
    )
      .global-search-btn
        el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
        el-button.search-button(@click="resetFormHandle") 重置
    .rml-content
      .rml-button
        el-button(type='primary' @click='clickAdd' weblogs-anchor='customerGuard-risk-import') 添加关注企业
        el-button(type='primary' @click='clickBatchAdd' weblogs-anchor='customerGuard-risk-batchImport') 批量添加关注企业
        el-button.rml-button__task(icon='el-icon-tickets' @click='clickTaskList') 任务列表
      Table(:dataSource="dataSource || []", :columns="lCollectionColumns", :loading="loading")
        template(slot='news' slot-scope='{row, index}')
          el-button(type='text' @click='clickConfiguration(row)' weblogs-anchor='customerGuard-risk-config') {{ row.shortName ? '修改' : '配置' }}
        template(slot='operate' slot-scope='{row, index}')
          el-button(type='text' @click='unFollow(row.companyName)' weblogs-anchor='customerGuard-risk-unFollow') 取消关注
    Pagination.rm-pagination(:pagination="pagination")
    DialogAddCompany(ref='addCompany' @refreshList="resetFormHandle")
    DialogBatchAddCompany(ref='batchAddCompany' @refreshList="resetFormHandle")
    DialogTaskList(ref='task' @refreshList="resetFormHandle")
    DialogAddNews(ref='addNews' :selected='selectedObject' @refreshList="resetFormHandle")
</template>
<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
// import useLoading from 'hooks/useLoading'
import useFollow from '@/views/customerGuard/hooks/useFollow'
import ajaxStore from '@/apis'
import { lFormData, lGetFormConfig, lCollectionColumns } from './config'
import { companyType } from '@/views/customerGuard/EnterpriseSearchList/config'
import DialogAddCompany from './dialogAddCompany'
import DialogAddNews from './dialogAddNews'
import DialogBatchAddCompany from './dialogBatchAddCompany'
import DialogTaskList from './dialogTaskList'

export default {
  components: {
    Form,
    Table,
    Pagination,
    DialogAddCompany,
    DialogAddNews,
    DialogBatchAddCompany,
    DialogTaskList
  },
  setup() {
    // refs
    const formRef = ref()
    const addCompany = ref()
    const addNews = ref()
    const batchAddCompany = ref()
    const task = ref()
    // state
    const state = reactive({
      companyType,
      hasFollow: [],
      selectedObject: {}
    })
    // api
    const { getCountryList } = ajaxStore.common
    const { getFollowListPage } = ajaxStore.risk
    // hooks
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      setConfig
    } = useForm({
      formRef,
      formData: lFormData,
      formConfig: lGetFormConfig
    })
    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({
      request: getFollowListPage
    })
    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const data = JSON.parse(JSON.stringify(formData.value))
        if (data.address && data.address.length > 0) {
          data.provinceName = data.address[0]
        }
        const { address, ...params } = data
        searchHandle(params)
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    /** --- 关注 start --- */
    const {
      checkHasFollowed,
      followCompanys,
      unFollowCompany
    } = useFollow()

    // 检查单个公司是否已关注
    const check = async (companyName) => {
      return await checkHasFollowed({
        companyName,
        cache: true
      })
    }
    // 关注操作
    const follow = async (companyName) => {
      await followCompanys([{companyName}])
    }
    // 取消关注操作
    const unFollow = async (companyName) => {
      await unFollowCompany(companyName)
      resetFormHandle()
    }
    /** --- 关注 end --- */
    /** --- 其他 start --- */
    // 任务列表
    const clickTaskList = () => {
      task.value.visible = true
    }
    // 添加关注企业
    const clickAdd = () => {
      addCompany.value.dialogAdd.visible = true
    }
    // 批量添加关注企业
    const clickBatchAdd = () => {
      batchAddCompany.value.visible = true
    }
    // 配置
    const clickConfiguration = (row) => {
      addNews.value.visible = true
      state.selectedObject = row
    }
    /** --- 其他 end --- */
    /** --- ajax start --- */
    // 查询省市区
    useAsync({
      isLoading: false,
      request: getCountryList,
      successCallBack: ({ data }) => {
        data && data.length && setConfig('address', 'options', JSON.parse(data))
      }
    })
    /** --- ajax end --- */

    return {
      formRef,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
      lCollectionColumns,
      // 关注 取消关注
      check,
      follow,
      unFollow,
      ...toRefs(state),
      // 其他
      clickAdd,
      clickBatchAdd,
      clickConfiguration,
      clickTaskList,
      // refs
      addCompany,
      addNews,
      batchAddCompany,
      task
    }
  }
}
</script>

<style lang="stylus" scoped>
.rm-form
  padding 20px 20px 2px
  margin-bottom 10px
  background #fff
  border-radius 4px
.rml-content
  padding 20px
  background #fff
  border-radius 4px
.rm-pagination
  margin-top 0
  background #fff
.rml-button
  margin-bottom 20px
  &__task
    float right
    &--number
      color #4A71F0
      margin-right 5px

/deep/ .el-table th.el-table__cell
  background-color #F2F2F6
  color #494949
  font-weight 600
/deep/ .el-form
  border-radius 4px
</style>
