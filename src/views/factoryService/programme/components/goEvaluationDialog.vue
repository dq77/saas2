<template lang="pug">
el-dialog(
  width='357px'
  :center='true'
  :before-close='hideDialog'
  :visible.sync='isVisible')
  .p-dialog-title 请您选择评估模式
  .p-dialog-btns
    el-button.p-btn(type='primary' @click='goPage("evaluationMan", {hasContractFile: 1, type: "1", projectId: $route.query.projectId})') 有项目合同
    el-button.p-btn.p-btn-plain(type='primary' @click='goPage("evaluationMan", {hasContractFile: 0, type: "1", projectId: $route.query.projectId})' plain) 无项目合同
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    const goPage = (name, query) => {
      root.$router.push({
        name,
        query
      })
    }

    const hideDialog = () => {
      emit('close')
    }
    return {
      goPage,
      hideDialog
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-dialog-title
  font-size 14px
  color #494949
  margin 47px 0
  text-align center
.p-dialog-btns
  display flex
  width 100px
  margin 0 auto 50px auto
  flex-wrap wrap
  justify-content center
  .p-btn
    margin 0 0 10px 0
    padding 0 67px
  .p-btn-plain
    background #E8ECF7
    color #3C5DA4
    border none
</style>
