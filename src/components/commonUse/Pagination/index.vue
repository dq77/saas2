<template lang="pug">
  .pagination-wrap
    //- el-pagination(
    //-   :total='pagination.total'
    //-   :page-size='pagination.pageSize'
    //-   :current-page='pagination.current'
    //-   layout='total, prev, pager, next, jumper'
    //-   @current-change='pagination.onChange'
    //- )
    el-pagination(
      :total='total'
      :page-size.sync='limit'
      :current-page.sync='currentPage'
      layout='total, prev, pager, next, jumper'
      @current-change='handleCurrentChange'
    )
</template>

<script>
export default {
  props: {
    // pagination: {
    //   type: Object,
    //   default: () => ({
    //     total: 0,
    //     pageSize: 10,
    //     current: 1,
    //     onChange: () => {}
    //   })
    // },
    total: {
      default: 0,
      type: Number
    },
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('cpagination', {pageNo: val, pageSize: this.limit})
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNo
      },
      set(val) {
        this.$emit('update:pageNo', val)
      }
    },
    limit: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrap
  margin-top 20px
  padding-top 8px
  padding-right 20px
  height 50px
  text-align right
  border-top 1px solid #F2F2F6
</style>
