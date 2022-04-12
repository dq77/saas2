<template lang="pug">
.page-main
  .p-header
    ListTabs(
      page='journalism'
      :tabConfig='newsRemindTabs'
    )
  .news-list(v-if='permissions["PTN:RISKEXPERTS:PUBLICOPINION:JOURNALISM"]')
    Form.news-list__form(
      ref="formRef"
      :formData="formData",
      :formConfig="formConfig"
      style="padding:20px"
    )
      .global-search-btn
        el-button.search-button(type="primary", @click="searchFormHandle") 搜索
        el-button.search-button(@click="resetFormHandle") 重置
    .news-list__table
      .news-list__button
        el-button(
          @click="readLists('N')"
          :class="isRead ? '' : 'current'"
          v-weblogs.click='"舆情订阅信息-tab：新闻舆情-未读/已读"'
        ) 未读
        el-button(
          @click="readLists('Y')"
          :class="isRead ? 'current' : ''"
          v-weblogs.click='"舆情订阅信息-tab：新闻舆情-未读/已读"'
        ) 已读
        el-button(
          type="text"
          @click="read"
          :disabled="tableApis.currentSelects.length === 0"
          v-if="!isRead"
          v-weblogs.click='"舆情订阅信息-tab：新闻舆情-一键已读"'
        ) 一键已读
      Table(
        ref="tableRef"
        :columns="newsColumns"
        :dataSource="tableApis.dataSource"
        :loading="tableApis.loading"
        checkbox
        @selectionHandle='tableApis.selectionChange'
      )
        template(slot="title" slot-scope='{row}')
          el-button(
            type="text"
            @click="openNews(row.url, row.id)"
            :class="isRead ? 'isReadY' : ''"
          ) {{row.title}}
      Pagination(:pagination="tableApis.pagination")
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import ListTabs from '../customerRiskAdmin/listTabs'
import { newsformData, newsformConfig, newsColumns, newsRemindTabs } from './config'
import { Message } from 'element-ui'
import { weblogsDom } from '@/utils/qjd/weblogs'
import store from '@/store'

export default {
  components: {
    Form,
    Table,
    Pagination,
    ListTabs
  },
  setup(props, { root }) {
    const {riskExperts: {newsRemind: { getReriskopiniondistribution, readEvent, getDropDownList }}} = ajaxStore
    const formRef = ref()
    const tableRef = ref()
    const isRead = ref(false)
    const state = reactive({
      isRead,
      tableApis: {},
    })
    const { state: { permissions } } = store
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      setConfig,
      submitHandle,
    } = useForm({
      formRef,
      formData: newsformData,
      formConfig: newsformConfig(query => _getDropDownList({corporationName: query})),
    })

    // table & page
    state.tableApis = useTable({
      request: getReriskopiniondistribution,
      defaultParams: {isRead: state.isRead ? 'Y' : 'N'},
      checkbox: true,
    })

    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const searchData = formData.value || {}
        const { time } = searchData
        const params = {...searchData}
        const timeParams = {}
        if (time) {
          timeParams.queryStartDate = time[0]
          timeParams.queryEndDate = time[1]
          delete params.time
        }
        if (isRead.value) {
          params.isRead = 'Y'
        } else {
          params.isRead = 'N'
        }
        for (const i in params) {
          if (!params[i]) {
            delete params[i]
          }
        }
        weblogsDom('舆情订阅信息-tab：新闻舆情-条件搜索（每个搜索项是否录入）、搜索按钮', params)
        state.tableApis.searchHandle({...params, ...timeParams})
      })
    }
    // 重置
    const resetFormHandle = () => {
      state.isRead = false
      resetHandle()
      state.tableApis.resetHandle()
      tableRef.value && tableRef.value.clearSelection()
    }
    // 已读未读切换
    const readLists = (read) => {
      if (read === 'N') {
        state.isRead = false
      } else {
        state.isRead = true
      }
      searchFormHandle()
    }
    // 一键已读-仅当前页
    const read = () => {
      if (state.tableApis.currentSelects.length > 0) {
        const ids = state.tableApis.currentSelects.map(item => { return item.id })
        doResult({ids: ids})
      } else {
        Message.error('暂无可读消息')
      }
    }
    const { doResult} = useAsync({
      request: readEvent,
      init: false,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          Message.success('一键已读成功')
          searchFormHandle()
          tableRef.value && tableRef.value.clearSelection()
        }
      },
    })
    // 获取下拉列表
    const { doResult: _getDropDownList } = useAsync({
      request: getDropDownList,
      init: false,
      successCallBack: ({ code, data }) => {
        const options = []
        if (code === '0' && data && data.length > 0) {
          data.forEach(content => {
            options.push({content})
          })
        }
        setConfig('corporationName', 'options', options)
      },
    })

    // 跳转新闻页
    const openNews = async (url, id) => {
      await doResult({ids: [id]})
      window.open(url)
    }

    return {
      permissions,
      formRef,
      tableRef,
      formData,
      formConfig,
      newsColumns,
      newsRemindTabs,
      searchFormHandle,
      resetFormHandle,
      openNews,
      readLists,
      read,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.news-list
  &__form
    background #fff
  &__table
    margin-top 10px
    padding 20px
    background #fff
  &__button
    margin-bottom 10px
    .current
      color #fff
      background-color #3b68f0
      border-color #3b68f0
.isReadY
  color #A9AFB8
</style>
