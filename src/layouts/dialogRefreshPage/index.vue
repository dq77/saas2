<template lang="pug">
el-dialog(
  width='328px'
  custom-class='dialog-refresh-page'
  :show-close='false'
  :visible='visible'
)
  img.p-icon(:src='`${$assetsBaseUrl}/common/icon-info.png`')
  .p-title 重要提示
  .p-content 当前页面数据已更新，请进行页面刷新
  .p-btns
    el-button(type='primary' size='medium' @click='refreshHandle') 刷新页面
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api'
import store from '@/store'

export default defineComponent({
  setup() {
    const visible = computed(() => store.state.showRefreshPageDialog)

    const refreshHandle = () => {
      window.location.reload()
    }
    return {
      visible,
      refreshHandle
    }
  },
})
</script>

<style lang="stylus" scoped>

.p-icon
  display block
  margin 0 auto
  width 30px
  height 26px
.p-title
  margin-top 11px
  line-height 20px
  font-size 14px
  color #494949
  text-align center
.p-content
  margin-top 20px
  line-height 17px
  font-size 12px
  color #494949
  text-align center
.p-btns
  margin-top 30px
  text-align center
</style>

<style lang="stylus">
.dialog-refresh-page
  .el-dialog__header
    display none
</style>
