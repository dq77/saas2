<template lang="pug">
.p-home-message-total
  .card
    .title
      .left-txt 我的消息
      .right-area(@click='goMore') 查看更多
    .message-content
      .list-content
        el-scrollbar(v-loading="loading" ref='messagescrollbar' style="height: 100%;")
          router-link.message-item(
            v-for='item in list'
            :key='item.processInstanceId'
            :to='{ name: "messageList" }'
          )
            .date
              .month {{ item.gmtCreated.slice(5, 7) }} /
              .day {{ item.gmtCreated.slice(8, 10) }}
            .content
              .event-title 【{{ item.messageType | messageTypeFilter}}】{{ item.messageTitle }}
              .event-detail {{ delTag(item.messageDetail) }}
          .empty(v-if='list.length === 0')
            img.empty-img(:src='`${$assetsBaseUrl}/common/home/empty-table.png`')
            .fill-txt 暂无信息
</template>
<script>
import Card from '@/components/Card'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      list: []
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    goMore() {
      this.$router.push({ name: 'messageList' })
    },
    async geTableList() {
      this.loading = true
      const params = {pageNo: 1, pageSize: 10, messageStatus: 'SUCCESS', messageTo: this.userInfo.saasMemberId, messageShow: 3}
      const res = await this.getMessageList(params)
      if (res && res.code === '0') {
        this.list = res.data.pagedRecords
        this.$nextTick(() => {
          this.$refs.messagescrollbar && this.$refs.messagescrollbar.update()
        })
      }
      this.loading = false
    },
    delTag(val) {
      const exp = /<[^>]+>/g
      return val.replace(exp, '')
    },
    ...mapActions('message', ['getMessageList']),
  },
  mounted () {
    if (this.userInfo?.saasMemberId) {
      this.geTableList()
    }
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
          res = '系统通知'
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
  },
  components: {
    Card,
  }
}
</script>

<style lang="stylus">
.p-home-message-total
  margin-top 20px
  .right-area
    margin 20px
    font-size 12px
    line-height 16px
    cursor pointer
    color #3B68F0
  .message-content
    padding 0 5px 20px 20px
    .list-content
      height 230px
      margin-top 10px
      .el-scrollbar__thumb
        // background-color #FFF
      .message-item
        display flex
        color #494949
        font-size 12px
        margin-bottom 22px
        .date .day
          font-size 22px
          margin-top 6px
        .content
          flex 1 0 auto
        .event-title
          font-weight bold
          line-height 14px
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          margin 0 0 8px 6px
        .event-detail
          color #848484
          width 256px
          margin-left 10px
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          overflow hidden
          line-height 17px
        &:hover
          color #3B68F0
      .empty
        color #9AA6B8
        display flex
        flex-direction column
        justify-content center
        align-items center
        padding 15px 0
        text-align center
        height 230px
        .empty-img
          height 118px
        .fill-txt
          margin-top 20px
</style>
