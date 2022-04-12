<template lang="pug">
.p-list-search-main
  el-input.p-input(type='text' v-model='keyWords' placeholder='请输入公司全称/简称/关键字')
  el-button.p-btn(type="primary" icon="el-icon-search" size='large' @click='doSearch') 查一下
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  setup(props, { root, emit }) {
    const state = reactive({
      keyWords: ''
    })

    const doSearch = () => {
      if (state.keyWords) {
        emit('doSearch', {
          name: state.keyWords,
          pageNo: 1,
          pageSize: 20,
        })
      } else {
        root.$message.error('请输入公司全称/简称/关键字')
      }
    }

    state.keyWords = root.$route.query.companyName

    if (state.keyWords) {
      doSearch()
    }

    return {
      doSearch,
      ...toRefs(state)
    }
  }
}
</script>
<style lang='stylus'>
.p-list-search-main
  .el-input--small
    .el-input__inner
      height 48px
      line-height 48px
      border-radius 4px 0 0 4px
  .el-button--small
    height 48px
    line-height 48px
    font-size 14px
  .el-button
    border-radius 0 4px 4px 0
</style>
<style lang="stylus" scoped>
.p-list-search-main
  display flex
  width 80%
  margin 0 auto
</style>
