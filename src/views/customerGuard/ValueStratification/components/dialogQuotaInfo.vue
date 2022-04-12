<template lang="pug">
el-dialog(
  width='327px'
  :show-close='true'
  title='添加企业价值等级查询'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
)
  .p-empty-tips 该企业已存在，请直接查看该企业诚信等级额度信息
  span(slot='footer')
    el-button(type='primary' @click='() => visible = false' size='small') 关闭
</template>

<script>
import { EventBus } from '../../event-bus'
export default {
  data() {
    return {
      visible: false
    }
  },
  created() {
    EventBus.$on('initQuotaInfo', (val) => { this.initData(val) })
  },
  methods: {
    initData(val) {
      this.visible = val
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './dialog.styl'
</style>
