<template lang="pug">
.p-process-detail(:class='["3", "4"].includes(projectInfo.status) ? "" : "p-process-ing"')
  .p-process-card(v-if='projectInfo.status === "3"')
    .p-card-title 评估意见
    .p-card-content
      el-scrollbar.p-comment-content(v-if='projectInfo.resultRemark') {{projectInfo.resultRemark}}
      .p-comment-content(v-else) 无
  .p-process-card(v-if='projectInfo.status === "4"')
    .p-card-title 驳回原因
    .p-card-content
      el-scrollbar.p-comment-content(v-if='projectInfo.comment') {{projectInfo.comment}}
      .p-comment-content(v-else) 无
  .p-process-card
    .p-card-title 附件下载
    .p-card-content
      .p-file-list
        .p-file-item
          .p-file-label 流程附件：
          .p-file-name(@click='showFileList' v-if='!["4"].includes(projectInfo.status) && projectInfo.processFiles && projectInfo.processFiles.length') 查看更多附件
          .p-file-none(v-else) 无
  el-dialog(
    width='700px'
    :center='true'
    :visible.sync='visible')
    FileMain(:fileList='projectInfo.processFiles')
</template>

<script>
import FileMain from '../summary/fileMain'
import { toRefs, reactive, inject } from '@vue/composition-api'
export default {
  components: {
    FileMain
  },
  setup(props) {
    const state = reactive({
      visible: false,
    })
    const projectInfo = inject('projectInfo')

    const showFileList = () => {
      state.visible = true
    }

    return {
      projectInfo,
      showFileList,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-process-detail
  width 49%
  .p-process-card
    margin-bottom 16px
    .p-card-title
      background #728BC2
      color #ffffff
      font-size 18px
      padding 10px
    .p-card-content
      padding 13px
      background #ffffff
      color #494949
      font-size 14px
      .p-file-list
        display flex
        .p-file-item
          display flex
          margin-right 40px
          width 49%
          .p-file-label
            width 70px
          .p-file-name
            color #3C5CA4
            cursor pointer
            width 150px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .p-file-item:last-child
          margin-right 0
    .p-comment-content
      line-height 25px
      height 100px
      overflow hidden
  .p-process-card:last-child
    margin-bottom 0
.p-process-ing
  display none
</style>
