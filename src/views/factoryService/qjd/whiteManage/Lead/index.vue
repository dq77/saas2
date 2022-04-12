<template lang="pug">
.page-main-search
  .white-content
    .white-buttons
      el-button(
        weblogs-anchor='factory-openPlatform-whitelist-import-btn'
        type="primary"
        @click="() => (dialogVisible = true)"
      ) 导入白名单
      el-button(
        weblogs-anchor='factory-openPlatform-whitelist-import-uploadConfirmation'
        type="primary"
        style="margin-left: 20px;"
        @click="() => (visible = true)"
      ) 上传确认函
    List(:dataSource="dataSource" @updateHandle="updateHandle" :loading="loading")
  .p-pagination
    el-pagination(
      :total="totalCount",
      :page-size="pageSize",
      :current-page="currentPage",
      @current-change="changePage",
      layout="prev, pager, next, total, jumper"
    )
  Upload(
    :dialogVisible="dialogVisible",
    :action="action",
    @closeHandle="() => (dialogVisible = false)"
    @successHandle="successHandle"
  )
  Drawer(:visible="visible", @closeHandle="() => (visible = false)", @updateHandle="updateHandle")
</template>
<script>
import ajaxStore from '@/apis'
import List from './list'
import Drawer from './drawer'
import Upload from './upLoad'

export default {
  data() {
    return {
      loading: false,
      dataSource: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      visible: false,
      dialogVisible: false,
      action: process.env.NODE_ENV === 'development' ? '/local/partner/white/excel/import' : '/partner/white/excel/import'
    }
  },
  components: {
    List,
    Drawer,
    Upload,
  },
  created() {
    this.updateHandle()
  },
  methods: {
    changePage(page) {
      this._getList({ pageNo: page, pageSize: this.pageSize })
      this.$router.push({
        name: this.$route.name,
        query: { pageNo: page }
      })
    },
    successHandle() {
      this._getList({ pageNo: this.currentPage, pageSize: this.pageSize })
    },
    updateHandle() {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      this.currentPage = Number(query.pageNo) || 1
      this._getList({ pageNo: this.currentPage, pageSize: this.pageSize })
    },
    _getList(params) {
      this.loading = true
      const { getWhiteList } = ajaxStore.factoryService.qjd.white
      getWhiteList(params).then((res = {}) => {
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
  },
}
</script>
<style lang="stylus" scoped>
.page-main-search
  background #fff
.white-buttons
  display flex
  margin-bottom 20px
.white-content
  background #fff
  padding 20px
  align-items center
.p-pagination
  margin-top 20px
  padding-top 8px
  padding-right 20px
  height 50px
  text-align right
  border-top 1px solid #F2F2F6
</style>
