<template lang="pug">
.p-company-base
  .p-company-name {{baseInfo.companyName}}
  img.p-logo(:src='baseInfo.logo' v-if='baseInfo.logo')
  .p-tags-main
    .p-tags-item(v-for='item in baseInfo.tags' v-if='item') {{item}}
  .p-detail-main
    .p-detail-flex
      .p-detail-item 统一社会信用代码：{{baseInfo.creditCode}}
      .p-detail-item 网址：{{baseInfo.websiteList}}
    .p-detail-flex
      .p-detail-item 电话：{{baseInfo.creditCode}}
      .p-detail-item 邮箱：{{baseInfo.email}}
    .p-detail-flex
      .p-detail-item 注册地址：{{baseInfo.regLocation}}
    .p-detail-flex
      .p-detail-item(v-html='baseInfo.desc')
</template>
<script>
import ajaxStore from '@/apis'
export default {
  props: {
    companyName: {
      type: String
    },
  },
  data() {
    return {
      baseInfo: {
        companyName: '',
        tags: [],
        logo: '',
        creditCode: '',
        websiteList: '',
        phoneNumber: '',
        email: '',
        regLocation: '',
        desc: ''
      }
    }
  },
  methods: {
    async getCompanyBase() {
      const res = await ajaxStore.factoryService.realEstate.getCreditCompanyBase({
        companyName: this.companyName
      })
      if (res.data && res.data.code === '0') {
        this.baseInfo = res.data.data
        this.$emit('getBaseInfo', this.baseInfo)
      }
    }
  },
  mounted() {
    this.getCompanyBase()
  },
}
</script>
<style lang="stylus" scoped>
.p-company-base
  position relative
  margin-bottom 30px
  .p-logo
    width 75px
    height 75px
    position absolute
    left 0
    top 0
    border 1px solid #F1F1F1
  .p-company-name
    margin-left 90px
    font-size 18px
    color #494949
  .p-tags-main
    display flex
    flex-wrap wrap
    margin 10px 0 0 90px
    min-height 25px
    .p-tags-item
      background #E8ECF7
      color #3C5DA4
      margin 0 10px 10px 0
      padding 3px 10px
  .p-detail-main
    background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/related-bg.png') no-repeat
    background-size cover
    margin 30px 0 0 0
    color #ffffff
    font-size 16px
    padding 30px 40px
    .p-detail-flex
      display flex
      margin-bottom 20px
      .p-detail-item
        width 100%
        position relative
        padding-left 20px
      .p-detail-item:before
        content ''
        position absolute
        top 4px
        left 0
        width 3px
        height 14px
        background-color #25BECD
        border-radius 2px
</style>
