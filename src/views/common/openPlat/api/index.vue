<template lang="pug">
.page-main
  .openplat-box
    el-button(type="primary", style="margin-bottom: 20px;", @click="addHandle") 新增应用
    List(:dataSource="dataSource", :loading="loading", @deleteHandle="deleteHandle", @checkHandle="checkHandle", @seeHandle="seeHandle")
    .p-pagination
      el-pagination(
        :total="totalCount",
        :page-size="pageSize",
        :current-page="currentPage",
        @current-change="changePage",
        layout="prev, pager, next, total, jumper"
      )
  Modal(:dialogVisible="dialogVisible", @cancleHandle="cancleHandle", :type="type", :detail="detail", @updateHandle="updateHandle")
</template>
<script>
import ajaxStore from '@/apis'
import List from './list'
import Modal from './modal'

export default {
  components: {
    List,
    Modal
  },
  data() {
    return {
      dataSource: [],
      loading: false,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      type: '',
      detail: {}
    }
  },
  created() {
    this.updateHandle()
  },
  methods: {
    addHandle() {
      this.type = 'add'
      this.dialogVisible = true
      this.detail = {}
    },
    deleteHandle(row) {
      this.type = 'delete'
      this.dialogVisible = true
      this.detail = row
    },
    seeHandle(row) {
      this.type = 'see'
      this.dialogVisible = true
      this.detail = row
    },
    cancleHandle() {
      this.dialogVisible = false
    },
    changePage(page) {
      this._getList({ pageNo: page, pageSize: this.pageSize })
      this.$router.push({
        name: this.$route.name,
        query: { pageNo: page }
      })
    },
    checkHandle(row) {
      const { appId, appName, status } = row
      const { checkApp } = ajaxStore.common.openPlat
      checkApp({ appId, appName, status: status === 1 ? 0 : 1 }).then((res = {}) => {
        const { data: { code } } = res
        if (code === '0') {
          this.$message.success(`${status === 1 ? '禁用' : '启用'}成功`)
          this.updateHandle()
        }
      })
    },
    updateHandle() {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      this.currentPage = Number(query.pageNo) || 1
      this._getList({ pageNo: this.currentPage, pageSize: this.pageSize })
    },
    _getList(params) {
      this.loading = true
      const { getAppList } = ajaxStore.common.openPlat
      getAppList(params).then((res = {}) => {
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
.openplat-box
  background #fff
  padding 20px
.p-pagination
  display flex
  align-items center
  justify-content center
  padding-top 20px
</style>
