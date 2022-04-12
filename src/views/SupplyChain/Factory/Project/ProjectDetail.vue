<template lang="pug">
.page-main
  .header
    .header_content
      .header_line
      span 项目详情
      .header_record(@click="recordHandle") 查看操作记录
  ProjectDetail
  //- Record
  Record(
    :visible="recordApis.visible"
    :title="recordApis.title"
    :detail="recordApis.detail"
    @cancleHandle="recordApis.cancleHandle()"
  )
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import ProjectDetail from '@/components/qjd/bsComs/common/projectDetail/index.vue'
// 操作记录
import Record from './record/index.vue'
import useModal from 'hooks/useModal'

export default {
  components: {
    ProjectDetail,
    Record
  },
  setup(props, { root: { $route: { query: { id } } } }) {
    // 操作记录
    const recordApis = useModal('操作记录')
    // 查看操作记录
    const recordHandle = () => {
      recordApis.setDetail({ id })
      recordApis.openHandle()
    }
    // state
    const state = reactive({ recordApis })

    return {
      recordHandle,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  background: #fff
  padding 20px 0 0px 20px
  .header_content
    border-bottom: 1px solid #ebeef5
    padding-bottom: 8px
    display: flex
    font-size: 14px;
    font-family: PingFangTC-Medium, PingFangTC;
    font-weight: 500;
    color: #494949;
    align-items: center
    .header_line
      width: 2px;
      height: 14px;
      background: #3B68F0;
      margin-right: 8px
    .header_record
      margin-left: 30px
      font-size: 12px;
      font-family: PingFangTC-Regular, PingFangTC;
      font-weight: 400;
      color: #3B68F0;
      cursor pointer
</style>
