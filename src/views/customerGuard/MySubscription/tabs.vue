<template lang='pug'>
.subscription-tabs
  .p-tabs
    el-button.p-tab(@click='changePage("list")' :type='tabCurrent === "list" ? "primary" : ""') 订阅列表
    el-button.p-tab(@click='changePage("detail")' :type='tabCurrent === "detail" ? "primary" : ""') 查看报告
  Search(v-bind='$attrs' v-on="$listeners" v-if='tabCurrent !== "list"')
</template>

<script>
import Search from './search'

export default {
  props: ['tabCurrent'],
  emits: ['changeTab'],
  components: {
    Search
  },
  setup(props, { emit }) {
    /** methods start */
    const changePage = (name) => {
      emit('changeTab', name)
    }
    return {
      changePage
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-tabs
  .p-tab
    margin-right 15px
.subscription-tabs
  display flex
  justify-content space-between
  align-content center
  margin-bottom 20px
</style>
