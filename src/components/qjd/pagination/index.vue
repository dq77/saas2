<template lang="pug">
.p-pagination
  el-pagination(
    :total="pagination.total"
    :page-size="pagination.pageSize"
    :current-page="pagination.current"
    @current-change="pagination.onChange"
    layout='prev, pager, next, total, jumper'
  )
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => ({
        total: 0,
        pageSize: 10,
        current: 1,
        onChange: () => {}
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-pagination
  margin-top 20px
  padding-top 8px
  padding-right 20px
  height 50px
  text-align right
  border-top 1px solid #F2F2F6
</style>
