<template lang='pug'>
.service-guide-page(v-if='!(isAlright1 && isAlright2)' v-loading='loading')
  .card
    .title
      .left-txt 服务引导
      .right-area
        .item(v-if='!isAlright1' :class='{"active": activeTab === 1}' @click='changeTab(1)') 赊销管家
        .item(v-if='!isAlright2' :class='{"active": activeTab === 2}' @click='changeTab(2)') 订货大师
    .guide-list(v-if='activeTab === 1 && !isAlright1')
      div(v-for='(item, index) in guideList1Dom' :class='{"guide-item": item.name, "between": !item.name}')
        .already-img(v-if='item.state')
          img(:src="`${$assetsBaseUrl}/common/home/already.png`")
        .num(v-else) {{ index/2 + 1 }}
        .guide-title {{ item.name }}
        .already-state(v-if='item.state') 已完成
        .notready-state(v-else-if='index === 0' @click='toPage(item, 1)') 立即前往
        .notready-state(v-else-if='index > 1 && guideList1Dom[index-2].state' @click='toPage(item, 1)') 立即前往
        .already-state(v-else) 未完成
        .icon-area(v-if='!item.name')
          .mid-icon
    .guide-list(v-if='activeTab === 2 && !isAlright2')
      div(v-for='(item, index) in guideList2Dom' :class='{"guide-item": item.name, "between": !item.name}')
        .already-img(v-if='item.state')
          img(:src="`${$assetsBaseUrl}/common/home/already.png`")
        .num(v-else) {{ index/2 + 1 }}
        .guide-title {{ item.name }}
        .already-state(v-if='item.state') 已完成
        .notready-state(v-else-if='index === 0' @click='toPage(item, 2)') 立即前往
        .notready-state(v-else-if='index > 1 && guideList2Dom[index-2].state' @click='toPage(item, 2)') 立即前往
        .already-state(v-else) 未完成
        .icon-area(v-if='!item.name')
          .mid-icon
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Router from '@/router'
import store from '@/store'
export default {
  props: {
  },
  setup(props, context) {
    const { state } = store
    const loading = ref(true)
    const activeTab = ref(1)
    const isAlright1 = ref(false) // 是否全部完成引导
    const isAlright2 = ref(false) // 是否全部完成引导
    const guideList1 = ref([
      { name: '授信设置', state: false, permission: 'PTN:SUPPLIER:CREDIT', desc: 'CREDIT_SET', page: 'setConfig'},
      { name: '发起授信', state: false, permission: 'PTN:SUPPLIER:SAASCREDIT_LAUNCH:MANAGE', desc: 'CREDIT_APPLY', page: 'QuotaAdd'},
      { name: '授信列表', state: false, permission: 'PTN:SUPPLIER:SAASCREDIT_AMOUNT:MANAGE', desc: 'CREDIT_ACCOUNT', page: 'quota'},
      { name: '用信列表', state: false, permission: 'PTN:SUPPLIER:SAASCREDIT_USE:MANAGE', desc: 'CREDIT_ORDER', page: 'useCredit'},
      { name: '还款操作', state: false, permission: 'PTN:SUPPLIER:SAASCREDIT_REFUND_OPERATE:MANAGE', desc: 'CREDIT_DELIVERY', page: 'creditOperate'}
    ])
    const guideList2 = ref([
      { name: '添加客户', state: false, permission: 'PTN:SUPPLIER:MEMBER:CREATE', code: 'customer_management', page: 'customerCreate', query: {type: 'create'}},
      { name: '添加项目', state: false, permission: 'PTN:SUPPLIER:CHAIN_PROJECT:MANAGE', code: 'project_management', page: 'projectManage'},
      { name: '添加产品属性', state: false, permission: 'PTN:SUPPLIER:CHAIN_PRODUCT:ATTRIBUTE', code: 'attribute_management', page: 'ProductAttribute'},
      { name: '添加产品分类', state: false, permission: 'PTN:SUPPLIER:CHAIN_PRODUCT:CLASSIFY', code: 'classified_management', page: 'ProductClassify'},
      { name: '添加产品', state: false, permission: 'PTN:SUPPLIER:CHAIN_PRODUCT:MANAGE', code: 'product_management', page: 'productManage'},
      { name: '配置项目价格', state: false, permission: 'PTN:SUPPLIER:CHAIN_PROJECT:PRICE', code: 'project_price', page: 'projectPriceList'},
      { name: '配置客户价格', state: false, permission: 'PTN:SUPPLIER:CHAIN_CUSTOMER:PRICE', code: 'customer_price', page: 'customerPriceList'},
      { name: '配置价格策略', state: false, permission: 'PTN:SUPPLIER:CHAIN_PRICE:STRATEGY', code: 'price_strategy', page: 'PriceStrategy'},
    ])
    const guideList1Dom = ref([]) // 展示用
    const guideList2Dom = ref([]) // 展示用
    const getGuideList = async () => {
      const res1 = await ajaxStore.credit.getGuideList()
      if (res1.data && res1.data.code === '0') {
        const list = res1.data.data
        guideList1.value.map(guide => {
          const resItem = list.find(item => {
            return item.operationModule === guide.desc
          })
          guide.state = !!resItem
        })
        guideList1Dom.value = formatList(guideList1.value)
        isAlright1.value = !guideList1Dom.value.find(item => { return item.state === false })
        if (isAlright1.value) {
          activeTab.value = 2
        }
      }
      const res2 = await ajaxStore.common.home.getIsGuideLineStep()
      if (res2.data && res2.data.code === '0') {
        const list = res2.data.data
        guideList2.value.map(guide => {
          const resItem = list.find(item => {
            return item.code === guide.code
          })
          guide.state = resItem ? resItem.flag : false
        })
        guideList2Dom.value = formatList(guideList2.value)
        isAlright2.value = !guideList2Dom.value.find(item => { return item.state === false })
        if (isAlright2.value) {
          activeTab.value = 0
        }
      }
      loading.value = false
    }
    const formatList = (list) => {
      // 展示用 处理一下
      const midList = list.filter(item => {
        return state.permissions[item.permission]
      })
      const newList = []
      for (let i = 0; i < midList.length; i++) {
        newList.push(midList[i])
        newList.push({})
      }
      newList.pop()
      return newList
    }
    const changeTab = (tab) => {
      if (activeTab.value !== tab) {
        activeTab.value = tab
      }
    }
    const toPage = (item, num) => {
      if (num === 1) {
        ajaxStore.credit.createGuide({ operationModule: item.desc })
      }
      Router.push({ name: item.page, query: { ...item.query } })
    }
    onMounted(() => {
      getGuideList()
    })
    return {
      loading,
      activeTab,
      changeTab,
      toPage,
      guideList1Dom,
      guideList2Dom,
      isAlright1,
      isAlright2,
    }
  },
}
</script>

<style lang='stylus'>
.service-guide-page
  margin-bottom 20px
  .right-area
    color #3B68F0
    font-size 12px
    margin 20px
    display flex
    .item
      color #494949
      margin-left 15px
      cursor pointer
      &.active
        color #3B68F0
  .guide-list
    padding 10px 50px 30px
    display flex
    height 132px
    .guide-item
      text-align center
      width 52px
      .already-img
        width 40px
        height 40px
        margin 0 auto
        img
          width 40px
      .num
        width 40px
        height 40px
        border 2px solid #547BF1
        margin 0 auto
        border-radius 20px
        font-size 20px
        color #547BF1
        line-height 38px
      .guide-title
        margin 10px 0
        width 100px
        margin-left -25px
      .already-state
        color #CBCBCD
      .notready-state
        color #547BF1
        cursor pointer
    .between
      flex 1 0 auto
      height 3px
      background-color #E8ECF7
      margin-top 18px
      .icon-area
        width 14px
        background-color #fff
        height 14px
        margin -2px auto
        .mid-icon
          width 0
          height 0
          border-left 4px solid #E8ECF7
          border-top 4px solid transparent
          border-bottom 4px solid transparent
          margin 0 auto
      .already-img, .num, .guide-title, .already-state, .notready-state
        display none
</style>
