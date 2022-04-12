<template lang="pug">
el-drawer(
  v-if="visible"
  :title="title"
  :visible="visible"
  :direction="'rtl'"
  :before-close="cancleHandle"
)
  el-scrollbar(style="width: 100%; height: 100%; padding-bottom: 80px;")
    Project(
      :isPage="false"
      :projectSource="3"
      @cancleHandle="cancleHandle"
      @sureHandle="sureHandle"
    )
    //- ProjectDetail(
    //-   :isPage="false"
    //-   @cancleHandle="cancleHandle"
    //- )
</template>
<script>
import Project from '@/components/qjd/bsComs/common/project/index.vue'
// import ProjectDetail from '@/components/qjd/bsComs/common/projectDetail/index.vue'

export default {
  components: {
    Project,
    // ProjectDetail
  },
  props: {
    title: String,
    visible: Boolean,
    detail: Object
  },
  setup(props, { emit }) {
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // 确定
    const sureHandle = data => {
      emit('sureHandle', data)
      emit('cancleHandle')
    }

    return {
      cancleHandle,
      sureHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
/deep/.el-drawer
  width: 1000px !important
/deep/ #el-drawer__title
  font-size 14px
</style>
