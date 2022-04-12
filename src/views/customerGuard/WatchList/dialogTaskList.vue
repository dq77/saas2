<template lang="pug">
//- 查询任务列表
div
  el-dialog.rm-task(
    width='509px'
    :show-close='true'
    title='查询任务列表'
    custom-class='el-dialog-new'
    :visible.sync='visible'
    :close-on-click-modal='false'
    :before-close='beforeClose'
  )
    .rmt-list(@scroll='handleScroll')
      template(v-if='taskList.length')
        .rmt-list__item(v-for='(item, index) in taskList')
          span {{item.insDatetime | toDateStr('yyyy-MM-dd hh:mm:ss')}}
          span {{item.creatorMobile}}
          span 上传文件生成完成
          span.rmt-list__item--check(type='text' @click='getImportDetail(item.id)') 查看
          //- span(v-else)
          //-   i.el-icon-loading.rmt-list--icon
      .rmt-list__tips(v-else-if='!loading') 暂无任务
      .rmt-list__loading
        i.el-icon-loading.rmt-list--icon(v-if='loading')
    span(slot='footer')
      el-button(@click='beforeClose' size='small') 关闭
  DialogTaskListDetail(ref='taskListDetail' :id='id')
</template>

<script>
import ajaxStore from '@/apis'
import { reactive, toRefs, ref, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import DialogTaskListDetail from './dialogTaskListDetail'

export default {
  components: {
    DialogTaskListDetail
  },
  emits: ['refreshList'],
  setup(props, { emit }) {
    // refs
    const upload = ref()
    const taskListDetail = ref()
    // state
    const visible = ref(false)
    const state = reactive({
      taskList: [],
      isEnd: false,
      pageNo: 1,
      pageSize: 10,
      id: ''
    })
    // api
    const { getFollowListImport } = ajaxStore.risk
    /** --- methods start --- */
    const beforeClose = () => {
      visible.value = false
      state.taskList = []
      state.isEnd = false
      state.pageNo = 1
      state.pageSize = 10
    }
    const getImportDetail = (id) => {
      taskListDetail.value.visible = true
      state.id = id
      beforeClose()
    }
    const handleScroll = (e) => {
      if ((parseInt(e.target.clientHeight) + parseInt(e.target.scrollTop)) === parseInt(e.target.scrollHeight)) {
        if (!state.isEnd) {
          getList(true)
        }
      }
    }
    /** --- methods end --- */
    /** --- ajax start --- */
    const { loading, doResult } = useAsync({
      init: false,
      isLoading: true,
      request: getFollowListImport,
      successCallBack: ({ data }) => {
        if (data.pagedRecords.length) {
          if (state.pageNo === 1) {
            state.taskList = data.pagedRecords
          } else {
            state.taskList = state.taskList.concat(data.pagedRecords)
          }
          const totalPages = Math.ceil(data.totalCount / state.pageSize)
          if (totalPages === state.pageNo) {
            state.isEnd = true
          }
        } else {
          state.taskList = []
          state.pageNo = 1
        }
      }
    })
    const getList = (isNext) => {
      if (!loading.value) {
        if (isNext) {
          state.pageNo = state.pageNo + 1
        }
        doResult({ pageNo: state.pageNo, pageSize: state.pageSize })
      }
    }

    watch(visible, newVal => { newVal && getList() })
    /** --- ajax end --- */
    return {
      ...toRefs(state),
      upload,
      taskListDetail,
      visible,
      loading,
      beforeClose,
      getImportDetail,
      handleScroll
    }
  }
}
</script>

<style lang="stylus" scoped>
.rmt-list
  min-height 100px
  max-height 200px
  overflow auto
  &__item
    font-size 12px
    color #494949
    display flex
    margin-bottom 10px
    span
      margin-right 10px
    &--check
      color #4A71F0
      cursor pointer
  &__loading
    text-align center
  &__tips
    text-align center
  &--icon
    color #4A71F0
</style>
