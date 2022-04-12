<template lang="pug">
.p-home-risk-total
  Card(title='风险概览' paddingRight='20px')
    template(v-slot:headRight)
      SearchSonTenant(@change='changeTenant')
    .u-home-card-main(v-loading='riskLoading')
      .risk-card-left
        .num-box
          .box-title
            span 昨日新增舆情信息（条）
            el-tooltip(effect="dark" content="昨日经销商新增的舆情数据总和" placement="top")
              i.el-icon-warning
          Pie.box-round(:degree='90' :num='riskInfo.appendSentimentCount')
        .num-box
          .box-title
            span 昨日新增舆情经销商（家）
            el-tooltip(effect="dark" content="昨日产生舆情的经销商总和" placement="top")
              i.el-icon-warning
          Pie.box-round(:degree='120' :num='riskInfo.appendDealerCount')
      .risk-card-right
        .risk-title
          .risk-title-text
            span 舆情预警
            el-tooltip(effect="dark" content="经销商最新产生的十条舆情" placement="top")
              i.el-icon-warning
          .risk-title-more(@click='goMore')
            span.txt 查看更多
            i.el-icon-arrow-right
        .risk-content
          .table-area(v-loading="loading")
            .list-title
              .action-time 发生时间
              .compony-name 公司名称
              .case-reason 分类
              .right-btn
            .list-content
              el-scrollbar.risk-scroller(style="height: 100%;")
                .risk-item(v-for='item in opinionsList' :key='item.detailUrl')
                  .action-time {{item.judgeDate}}
                  .compony-name {{item.dealerName}}
                  .case-reason
                    .reason-btn {{item.type}}
                  .right-btn(@click='toRiskDetail(item)')
                    i.el-icon-arrow-right
                .empty(v-if='opinionsList && opinionsList.length === 0')
                  img.empty-img(:src='`${$assetsBaseUrl}/factoryService/home/empty-table.png`')
                  .fill-txt 暂无信息
</template>
<script>
import ajaxStore from '@/apis'
import Card from '@/components/Card'
import SearchSonTenant from '@/components/SearchSonTenant'
import Pie from './pie'
export default {
  data () {
    return {
      loading: true,
      opinionsList: [],
      riskLoading: false,
      riskInfo: {}
    }
  },
  methods: {
    // 选择子公司后触发
    changeTenant(tenants) {
      tenants && (tenants = tenants.join(','))
      this.getRiskInfo(tenants)
    },
    async getRiskInfo(tenants) {
      const data = {}
      tenants && (data.tenantIds = tenants)
      this.loading = true
      const res = await ajaxStore.factoryService.home.getRiskTotalInfo(data)
      if (res && res.data && res.data.code === '0') {
        this.riskInfo = res.data.data
        this.opinionsList = res.data.data.opinions
      }
      this.loading = false
    },
    toRiskDetail(item) {
      window.open(item.detailUrl)
    },
    goMore() {
      this.$router.push({ name: 'riskRadar' })
    },
  },
  mounted () {
    this.getRiskInfo()
  },
  components: {
    Card,
    SearchSonTenant,
    Pie,
  }
}
</script>

<style lang="stylus">
.p-home-risk-total
  color #494949
  font-size 12px
  margin-top 10px
  .u-home-card-main
    display flex
    .risk-card-left
      .num-box
        box-sizing content-box
        width 172px
        height 152px
        padding-top 20px
        background-color #F8F9FA
        text-align center
        position relative
        .el-icon-warning
          color #a3b2c2
        .box-round
          margin 16px auto 0
      .num-box:nth-child(2n)
        margin-top 10px
    .risk-card-right
      flex 1 0 auto
      margin-left 10px
      border 1px solid #EAEBEE
      display flex
      flex-direction column
      .risk-title
        padding 0 20px
        border-bottom 1px solid #EAEBEE
        display flex
        justify-content space-between
        .risk-title-text
          font-size 14px
          line-height 14px
          height 14px
          margin 14px 0 12px
          .el-icon-warning
            color #a3b2c2
            margin-left 6px
        .risk-title-more
          cursor pointer
          color #9AA6B8
          height 15px
          line-height 15px
          font-size 12px
          padding 14px 0 24px
          .txt
            margin-right 2px
        .risk-title-more:hover
          color #494949
      .risk-content
        padding 20px 8px 0 20px
        flex 1 0 auto
        .table-area
          height 100%
          display flex
          flex-direction column
          .list-title
            background-color #F2F2F6
            color #494949
            padding 15px
            display flex
            .action-time
              width 60px
              flex 1 0 auto
            .compony-name
              width 90px
              flex 1 0 auto
            .case-reason
              width 50px
              flex 1 0 auto
              text-align center
            .right-btn
              width 25px
              flex 1 0 auto
          .list-content
            height 245px
            // .risk-scroller
            //   .el-scrollbar__thumb
            //     background-color #8DA8D6
            .risk-item
              display flex
              padding 0 15px
              font-size 12px
              line-height 12px
              .action-time
                width 60px
                flex 1 0 auto
                padding 15px 0
              .compony-name
                width 90px
                flex 1 0 auto
                padding 15px 0
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
              .case-reason
                width 50px
                flex 1 0 auto
                padding 12px 0 10px
                text-align center
                .reason-btn
                  display inline-block
                  padding 1px 10px 0
                  background-color #E29A27
                  color #FFF
                  text-align center
                  height 18px
                  line-height 18px
                  border-radius 2px
              .right-btn
                cursor pointer
                padding 15px 10px
                width 25px
                flex 1 0 auto
                text-align right
            .risk-item:nth-child(2n)
              background-color #E8ECF7
            .empty
              color #9AA6B8
              display flex
              flex-direction column
              justify-content center
              align-items center
              padding 15px 0
              text-align center
              height 242px
              .empty-img
                height 118px
              .fill-txt
                margin-top 20px

</style>
