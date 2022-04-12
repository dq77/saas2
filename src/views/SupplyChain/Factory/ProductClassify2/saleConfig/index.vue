<template lang="pug">
  div
    Card.list-page_table-wrapper(noTitle noWrap)
      .list-page_head-buttons
        el-button(type="primary", @click="addHanlde") 添加销售组织
      .list-page_table
        List(:loading="loading", :dataSource="dataSource", @changeHandle="changeHandle", @deleteHandle="deleteHandle")
      .list-page_pagination
        el-pagination(
          background,
          :total="totalCount",
          :page-size="pageSize",
          :current-page="currentPage",
          @current-change="changePage",
          layout="prev, pager, next, total, jumper"
        )
    Modal(:dialogVisible="dialogVisible", @closeHandle="() => dialogVisible = false", @updateHandle="updateHandle", :type="type", :detail="detail")
</template>
<script>
import Card from '@/components/Card'
import List from './list'
import Modal from './modal'

export default {
  components: {
    Card,
    List,
    Modal
  },
  data() {
    return {
      dataSource: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      type: 'add',
      detail: {}
    }
  },
  created() {
    this.updateHandle()
  },
  methods: {
    addHanlde() {
      this.type = 'add'
      this.detail = {}
      this.dialogVisible = true
    },
    changeHandle(row, type) {
      this.type = type
      this.detail = row
      this.dialogVisible = true
    },
    deleteHandle(row, type) {
      this.type = type
      this.detail = row
      this.dialogVisible = true
    },
    changePage(page) {
      this.currentPage = page
      this._getList({ pageNo: page, pageSize: this.pageSize })
    },
    updateHandle() {
      this._getList({ pageNo: this.currentPage, pageSize: this.pageSize })
    },
    _getList(params) {
      this.loading = true
      const { ajaxStore: { saleConfig: { getSaleList } } } = this
      getSaleList(params).then((res = {}) => {
        const { data: { code, data } } = res
        const { pageNo, totalCount, pagedRecords } = data || {}
        if (code === '0') {
          this.dataSource = pagedRecords
          this.currentPage = pageNo
          this.totalCount = totalCount
        }
        this.loading = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.sale-content
  display flex
  flex-direction column
  background #fff
  padding 20px 0
  align-items center
.p-pagination
  margin-top 20px
  padding-top 8px
  padding-right 20px
  height 50px
  text-align right
  border-top 1px solid #F2F2F6
</style>
