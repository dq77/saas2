<!--
 * @Date: 2021-06-18 14:16:33
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-07-19 13:47:20
-->
<template lang="pug">
.message-list-page.page-main
  TabsInCard(:tabs='tabs' :defaultTab='messageStatus' @change='changeTab')
  Card(noTitle noWrap style='margin-bottom: 10px;')
    .search-area
      el-row
        el-col.col(:span='6')
          .search-label 类型
          .search-input
            el-select.width-100(v-model='formData.messageType')
              el-option(label='全部' value='')
              el-option(label='通知' value='3')
              el-option(label='待办' value='4')
              el-option(label='舆情' value='5')
              el-option(label='风险' value='6')
        el-col.col(:span='6')
          .search-label 标题
          .search-input
            el-input.width-100(v-model='formData.messageTitle' clearable placeholder='请输入标题')
        el-col.col(:span='6')
          .search-label 时间
          .search-input
            el-date-picker.width-100(v-model='formData.time' type='daterange' range-separator='-' start-placeholder='请选择开始日期' end-placeholder='请选择结束日期' value-format='yyyy-MM-dd HH:mm:ss' :default-time='["00:00:00", "23:59:59"]' unlink-panels)
      .button-area
        .btn-list
          el-button(:loading='loading' @click='querySearchForm' type='primary') 搜索
          el-button(:loading='loading' @click='resetSearchForm') 重置
  Card(noTitle noWrap)
    .table-area
      .table-top
        .select-block
          el-button(v-if='messageStatus === "SUCCESS"' :loading='loading' @click='itemReadClick' :disabled='!multipleSelection.length') 标记为已读
          el-button(v-if='messageStatus === "SUCCESS"' :loading='loading' @click='allReadClick') 全部标记为已读
        .subcribe-button
          el-button(:loading='loading' @click='subcribeClick') 订阅设置
      el-table.message-table(:data='tableData' @selection-change="handleSelectionChange" v-loading='loading' row-key='id' stripe ref='multipleTable')
        el-table-column(v-if='messageStatus === "SUCCESS"' type='selection' reserve-selection)
        el-table-column(label='类型' prop='messageType' min-width='40px')
          template(slot-scope='{row}')
            span {{ row.messageType | messageTypeFilter }}
        el-table-column(label='时间' prop='gmtCreated' min-width='80px')
        el-table-column(label='标题' prop='messageTitle' min-width='80px')
        el-table-column(label='摘要' min-width='140px')
          template(slot-scope='{row}')
            .messageContent {{ delTag(row.messageDetail) }}
        el-table-column(label='操作' min-width='60px')
          template(slot-scope='{row}')
            el-button(type='text' @click='toDetail(row)' weblogs-anchor='common-message-look') 查看
      .list-page_pagination
        el-pagination(:total='totalCount' :current-page.sync='currentPage' @current-change='getTableList' layout='total, prev, pager, next, jumper')
  el-dialog(
    title="消息详情"
    width='70%'
    custom-class='el-dialog-new'
    :visible.sync="detailModal"
  )
    table.detail-table
      tr.u-tr
        td.u-td.u-title 标题
        td.u-td(colspan='3') {{ detailItem.messageTitle }}
      tr.u-tr
        td.u-td.u-title 时间
        td.u-td {{ detailItem.gmtCreated }}
        td.u-td.u-title 类型
        td.u-td {{ detailItem.messageType | messageTypeFilter }}
      tr.u-tr
        td.u-td.u-title 内容
        td.u-td.u-content(colspan='3')
          .message-detail(v-html='detailItem.messageContent' v-if='!isTemplate')
          TableTemplate(v-else :code='detailItem.templateCode' :item='detailItem')
</template>
<script>
import TabsInCard from '@/components/TabsInCard'
import Card from '@/components/Card'
import TableTemplate from './template'
import { mapState, mapActions } from 'vuex'
import { status } from './config'

export default {
  components: {
    TabsInCard,
    Card,
    TableTemplate
  },
  data() {
    return {
      messageStatus: 'SUCCESS',
      tabs: [{ name: 'SUCCESS', label: '未读消息' }, { name: 'READ', label: '已读消息' }],
      loading: false,
      tableData: [],
      detailItem: {},
      totalCount: 0,
      currentPage: 1,
      multipleSelection: [],
      formData: {
        messageType: '',
        messageTitle: '',
        time: ''
      },
      detailModal: false,
      params: {},
      isTemplate: false,
      status
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    changeTab(tabName) {
      this.messageStatus = tabName
      this.querySearchForm()
    },
    // 搜索
    querySearchForm() {
      this.currentPage = 1
      this.params = { ...this.formData }
      this.getTableList()
    },
    subcribeClick() {
      this.$router.push({name: 'messageSubscribe'})
    },
    // 重置搜索项
    resetSearchForm() {
      Object.keys(this.formData).forEach(item => {
        this.formData[item] = ''
      })
      this.querySearchForm()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async itemReadClick() {
      const res = await this.markItems(this.multipleSelection)
      if (res.data && res.data.code === '0') {
        this.getTableList()
        this.$message.success('标记成功')
        this.$refs.multipleTable.clearSelection()
      }
    },
    async markItems(list) {
      let res = ''
      if (list.length === 1) {
        const messageId = list[0].id
        res = await this.ajaxStore.message.read({ messageId })
      } else {
        let messageId = '?'
        list.map(item => {
          messageId += `messageId=${item.id}&`
        })
        messageId = messageId.slice(0, -1)
        res = await this.ajaxStore.message.readMany(messageId)
      }
      return res
    },
    async allReadClick() {
      const confirm = await this.$confirm('将所有消息标记为已读吗？', '提示', { type: 'warning' }).catch(() => {})
      if (confirm) {
        const res = await this.ajaxStore.message.readAll({ companyName: this.userInfo.saasMemberId, messageShow: 3 })
        if (res.data && res.data.code === '0') {
          this.getTableList()
          this.$message.success('已全部标为已读')
        }
      }
    },
    async toDetail(row) {
      this.detailModal = true
      this.detailItem = row
      this.isTemplate = false
      if (Object.keys(this.status).includes(row.templateCode)) {
        this.isTemplate = true
        const templateValue = JSON.parse(row.messageContent)
        this.$set(this.detailItem, 'templateValue', templateValue)
      }
      if (row.messageStatus !== 'READ') {
        await this.markItems([row])
        this.getTableList()
      }
    },
    // 获取表格数据
    async getTableList() {
      const params = {
        pageNo: this.currentPage,
        pageSize: 10,
        messageTitle: this.params.messageTitle,
        startTime: this.params.time ? this.params.time[0] : '',
        endTime: this.params.time ? this.params.time[1] : '',
        messageType: this.params.messageType,
        messageStatus: this.messageStatus,
        messageShow: 3,
        messageTo: this.userInfo.saasMemberId
      }
      this.loading = true
      const res = await this.getMessageList(params)
      this.loading = false
      if (res.code === '0') {
        this.tableData = res.data.pagedRecords
        this.totalCount = res.data.totalCount
        this.currentPage = res.data.pageNo
      }
    },
    delTag(val) {
      const exp = /<[^>]+>/g
      return val.replace(exp, '')
    },
    ...mapActions('message', ['getMessageList']),
  },
  mounted() {
    this.querySearchForm()
  },
  watch: {
  },
  filters: {
    messageTypeFilter: function (value) {
      let res = ''
      switch (value) {
        case '1':
          res = '预警消息'
          break
        case '2':
          res = '流程提示'
          break
        case '3':
          res = '通知'
          break
        case '4':
          res = '待办'
          break
        case '5':
          res = '舆情'
          break
        case '6':
          res = '风险'
          break
        default:
          res = ''
      }
      return res
    }
  }
}
</script>
<style lang="stylus">
.message-list-page
  color #494949
  .search-area
    padding 20px 5px
    .col
      padding 0 15px
      .search-label
        margin-bottom 10px
    .button-area
      padding-right 20px
      padding-top 14px
      display flex
      justify-content flex-end
  .table-area
    padding 20px
    .table-top
      margin-bottom 20px
      display flex
      justify-content space-between
    .message-table
      width 100%
    .messageContent
      height 20px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      max-width 500px
  .detail-table
    color #494949
    width 100%
    border-top 1px solid #E8ECF2
    border-left 1px solid #E8ECF2
    .u-tr
      border-bottom 1px solid #E8ECF2
      .u-td
        padding 15px
        border-right 1px solid #E8ECF2
        &.u-title
          background-color #F8F9FA
          width 100px
        &.u-content
          .message-detail
            background-color #fff
            // 消息模板内容css
            .hide
              display none
            table
              margin-top 4px
              border-top 1px solid #E8ECF2
              border-left 1px solid #E8ECF2
              tr
                border-bottom 1px solid #E8ECF2
                td,th
                  padding 15px
                  border-right 1px solid #E8ECF2
    .p-daily-item
      margin-bottom 40px
      .p-item-title
        color #494949
        font-size 14px
        font-weight bold
        margin-bottom 5px
      .p-item-info
        color #A9AFB8
        margin-bottom 5px
        .p-item-source
          margin-right 5px
      .p-item-summary
        color #494949
        font-size 12px
        line-height 20px
</style>
