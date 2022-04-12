<template lang="pug">
.news-public-list
  Form.news-public-list-form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    style="padding:20px"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  .news-public-list-table
    Table(
      :dataSource="dataSource",
      :columns="newsColumns",
      :loading="loading"
    )
      template(slot="title" slot-scope='{row}')
        el-button(
          type="text"
          @click="openNews(row)"
          :class="getIsRead(row.readMemberIds) ? 'isReadY' : ''"
        ) {{row.title}}
    Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { newsformData, newsformConfig, newsColumns } from '../config'
import store from '@/store'

export default {
  props: {
    name: String,
  },
  components: {
    Form,
    Table,
    Pagination
  },
  setup(props, { root }) {
    const {riskExperts: {newsRemind: { getReriskopiniondistribution, readEvent }}} = ajaxStore
    const formRef = ref()
    const { state: { userInfo } } = store
    const { saasMemberId } = userInfo ?? {}
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      submitHandle,
    } = useForm({
      formRef,
      formData: newsformData,
      formConfig: newsformConfig
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getReriskopiniondistribution, defaultParams: {corporationName: props.name}, })
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
        searchHandle({...params, ...timeParams})
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }

    const { doResult} = useAsync({
      request: readEvent,
      init: false,
      successCallBack: ({ code, data }) => {
        code === '0' && searchFormHandle()
      },
    })
    // 跳转新闻页
    const openNews = async (row) => {
      !getIsRead(row.readMemberIds) && await doResult({ids: [row.id]})
      row.url && await window.open(row.url)
    }
    // 判断已读未读
    const getIsRead = (memberIds) => {
      // 未读
      const memberIdsArray = memberIds.slice(1, memberIds.length - 1).split(',')
      return memberIdsArray.some(id => id === saasMemberId)
    }

    return {
      formRef,
      formData,
      formConfig,
      newsColumns,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
      openNews,
      getIsRead,
    }
  },
}
</script>
<style lang="stylus" scoped>
.news-public-list-form
  background #fff
.news-public-list-table
  margin-top 10px
  padding 20px
  background #fff
.isReadY
  color #A9AFB8
</style>
