<template lang="pug">
.page-main
  .page-content
    Config
    .content_box
      Header(:title="'请配置审批材料'")
      MaterialCtrl
</template>
<script>
import Config from '../components/config'
import Header from '@/components/qjd/header'
import MaterialCtrl from './materialCtrl'

export default {
  components: {
    Config,
    Header,
    MaterialCtrl
  },
  setup() {

  },
}
</script>
<style lang="stylus" scoped>
.page-content
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
.content_box
  background #fff
  padding 0 20px 80px 20px
  flex: 1
</style>
