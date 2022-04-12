<template lang="pug">
.p-header
    .p-header-title(v-if='pageType === "projectInfo"') 项目信息页
    .p-header-title(v-if='pageType === "assessmentDetail"') 评估详情

</template>

<script>
import usePageType from '../hooks/usePageType'
export default {
  setup(props, { root, emit }) {
    const { pageType } = usePageType(root)
    return {
      pageType
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-header-title
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/project-detail-top.png') right bottom no-repeat
  background-size cover
  height 50px
  line-height 50px
  color #fff
  font-size 18px
  padding-left 20px
  margin-bottom 15px
.p-detail-flex
  display flex
  margin-bottom 30px
</style>
