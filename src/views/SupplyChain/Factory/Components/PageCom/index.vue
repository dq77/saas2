<template lang="pug">
  //- 搜索、表格、分页公共组件
  div
    //- 提示语
    PromptInfo(v-if='titleInfo' :title='titleInfo')

    //- 提示语后的slot
    template(v-if='$slots.afterTitle')
      slot(name='afterTitle')

    //- search
    Card(style='margin-bottom: 10px;' useFor='search')
      Form(
        ref="formRef"
        type="search"
        :formData="formData",
        :formConfig="formConfig"
        :searchBtnLoading="loading"
        @searchFormHandle="searchFormHandle"
        @resetFormHandle="resetFormHandle"
      )

    //- 表格
    Card
      //- 表格按钮
      .p-table-header-btns
        slot(name='tableBtns')
      //- 表格
      .page-main_table
        Table(
          :index='true'
          :dataSource="dataSource"
          :columns="tableColumns"
          :loading="loading"
          @buttonHandle="buttonHandle"
          @sortChange="sortChange"
        )
          template(slot="extendData" slot-scope="{ row }" )
            template(v-if='row.extendData && row.extendData.length')
              div(v-for='(item, index) in row.extendData' :key="item.id")
                div {{item.name}}：{{item.valueName || '- -'}}
            div(v-else) - -
      Pagination(:pagination="pagination" class='page-main_pagination')
</template>

<script>
// 全局组件
import Card from '@/components/Card'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import PromptInfo from '../PromptInfo.vue'
// use
import useGetList from './use/getList'

export default {
  components: {
    Card,
    Form,
    Table,
    Pagination,
    PromptInfo,
  },
  props: {
    // 表单字段，必传
    formDatas: {
      type: Object,
      default: () => {},
      required: true
    },
    // 表单配置项，必传
    formConfigs: {
      type: Array,
      default: () => [],
      required: true
    },
    // 表格列，必传
    tableColumns: {
      type: Array,
      default: () => [],
      required: true
    },
    // 列表接口，必传
    listApi: {
      type: Function,
      default: () => {},
      required: true
    },
    // 头部提示语
    titleInfo: {
      type: String,
      default: ''
    }
  },
  setup(props, { root, emit }) {
    // 从useGetList拿到需要用到的数据和方法
    const {
      formRef,
      formData,
      formConfig,
      setConfig,
      loading,
      dataSource,
      pagination,
      searchFormHandle,
      resetFormHandle,
      resetTableHandle,
      sortChange,
      buttonHandle,
      doResult,
    } = useGetList(props, root, emit)

    return {
      formRef,
      formData,
      formConfig,
      loading,
      dataSource,
      pagination,
      searchFormHandle,
      resetFormHandle,
      resetTableHandle,
      sortChange,
      buttonHandle,
      doResult,
      setConfig,
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-main_pagination
  background-color #fff
  margin-top 0px
.page-main_table
  background-color #fff
.p-table-header-btns
  margin-bottom 20px
</style>
