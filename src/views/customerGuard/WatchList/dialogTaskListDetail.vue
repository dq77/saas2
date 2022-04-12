<template lang="pug">
//- 查询任务列表
el-dialog.rm-taskDetail(
  width='509px'
  :show-close='true'
  title='任务列表'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
  :before-close='beforeClose'
)
  .rmtd-list(v-loading='loading')
    .rmtd-list__err 本次添加关注企业异常详情
      i.el-icon-upload2.rmtd-list__err--export(@click='exportCurrent') 导出
    el-table(
      :data='list'
    )
      el-table-column(prop='companyName' label='企业名称' min-width='150')
      el-table-column(prop='errorReason' label='错误原因')
  span(slot='footer')
    el-button(@click='beforeClose' size='small') 关闭
</template>

<script>
import ajaxStore from '@/apis'
import { reactive, toRefs, ref, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default {
  props: ['id'],
  emits: ['refreshList'],
  setup(props, { emit }) {
    // state
    const visible = ref(false)
    const state = reactive({
      list: [],
      pageNo: 1,
      pageSize: 1000,
      ascs: 'id'
    })
    // api
    const { getFollowListImportDetails } = ajaxStore.risk
    /** --- methods start --- */
    const beforeClose = () => {
      visible.value = false
      state.pageNo = 1
      state.pageSize = 1000
      state.list = []
    }
    const exportCurrent = () => {
      const lists = state.list || []
      if (lists.length) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/utils/excel/Export2Excel')
          const tHeader = ['企业名称', '错误原因']
          const filterVal = ['companyName', 'errorReason']
          const list = lists
          const data = formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '本次添加关注企业异常详情')
        })
      } else {
        Message.warning('暂无列表，无法导出数据。')
      }
    }
    const formatJson = (filterVal, jsonData) => {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
    /** --- methods end --- */
    /** --- ajax start --- */
    // 获取详情信息
    const { loading, doResult: getTaskDetail } = useAsync({
      init: false,
      isLoading: true,
      request: getFollowListImportDetails,
      successCallBack: ({ data }) => {
        state.list = data.pagedRecords && data.pagedRecords.filter((item) => {
          return item.errorReason
        })
      }
    })

    watch(visible, newVal => {
      if (newVal) {
        getTaskDetail({
          batchImportId: props.id,
          pageNo: state.pageNo,
          pageSize: state.pageSize,
          ascs: 'id'
        })
      }
    })
    /** --- ajax end --- */
    return {
      ...toRefs(state),
      visible,
      loading,
      beforeClose,
      exportCurrent
    }
  }
}
</script>

<style lang="stylus" scoped>
.rmtd-list
  min-height 100px
  max-height 200px
  overflow auto
  &__err
    font-size 12px
    color #494949
    &--export
      margin 0 0 10px 10px
      color #4A71F0
      cursor pointer
  &--blue
    color #4A71F0
  &--red
    color #FD5652

/deep/ .el-table__body-wrapper
  border-bottom 0
</style>
