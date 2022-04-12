<template lang='pug'>
.my-service-page(v-loading='loading')
  .card
    .card-title
      .card-title--left
        span.card-title_text 我的服务
    .card-content.card-nowrap
      el-scrollbar(style='width: 100%;')
        .service-list
          .service-item(v-for='item in serviceList')
            .block(@click='toPage(item, "page")')
              .title(:class='item.name') {{ item.title }}
              .info {{ item.desc }}
              .status {{ item.state === 0 ? '未开通' : item.state === 1 ? '开通中' : '已开通' }}
              .close(v-if='item.state !== 2' @click.stop='toPage(item, "intr")')
                .close-title
                  i.icon.iconfont.iconzanweikaitong
                  span {{ item.state === 0 ? '暂未开通' : '开通中' }}
                .ins-btn 服务介绍
  el-dialog(
    width='327px'
    top='32vh'
    title='厂家服务平台'
    :visible.sync='dialogShow'
  ) 该服务基于厂家与仟金顶业务深入合作，如需了解或开通，敬请联系400-6121-666。
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import useJumpApp from '@/hooks/common/useJumpApp'
import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import Router from '@/router'
import store from '@/store'
export default {
  props: {
  },
  setup(props, context) {
    const serviceList = ref([
      { key: '7', state: 0, moduleId: 7, title: '风险专家', name: 'riskWorkbench', desc: '主动式风险决策建议输出引擎', defaultRedirect: true, intr: 'riskExpertsIntr' },
      { key: '4', state: 0, moduleId: 4, title: '客户卫士', name: 'customerGuard', desc: '客户多维画像、综合价值评估、动态跟踪风险变化', defaultRedirect: true, intr: 'customerGuardIntr' },
      { key: '3', state: 0, moduleId: 3, title: '订货大师', name: 'supplyChain', desc: '代替人工对接，连接上下游的订单协同系统', intr: 'orderMasterIntr' },
      { key: '2', state: 0, moduleId: 2, title: '赊销管家', name: 'creditSystem', desc: '全链路线上管理企业赊销流程，更智能更高效', defaultRedirect: true, intr: 'creditManagerIntr' },
      { key: '5', state: 0, moduleId: 5, title: '应收管家', name: 'receiveAdmin', desc: '应收账款全链路过程管控，提升管理效率，把控经营风险', defaultRedirect: true, intr: 'receiveAdminIntr' },
      { key: '0', state: 0, moduleId: 0, title: '厂家服务平台', name: 'factoryService', desc: '全面了解经销商业务/风险概况，及时掌握与仟金顶业务的进展', defaultRedirect: true },
    ])
    const { jumpHandle } = useJumpApp()
    const openInfo = ref({})
    const dialogShow = ref(false)
    const loading = ref(true)
    const toPage = (item, type) => {
      if (type === 'page') {
        if (item.permission) {
          jumpHandle(item)
        } else {
          Message.error('当前账户暂无权限')
        }
      } else {
        if (item.title === '厂家服务平台') {
          dialogShow.value = true
        } else {
          Router.push({ name: item.intr, query: { openstate: item.state} })
        }
      }
    }
    const getOpenInfo = async () => {
      loading.value = true
      const res1 = await ajaxStore.common.home.getTenantModuleList()
      if (res1.data && res1.data.code === '0' && res1.data.data) {
        res1.data.data.map(item => {
          const serveItem = serviceList.value.find(serve => {
            return serve.moduleId === item.moduleId
          }) ?? {}
          serveItem.state = 2
        })
      }
      setPermission()
      const res2 = await ajaxStore.common.home.getApplicationRequest({ companyName: store.state.userInfo.company })
      if (res2.data && res2.data.code === '0' && res2.data.data) {
        res2.data.data.map(item => {
          const serveItem = serviceList.value.find(serve => {
            return (serve.moduleId === item.moduleId) && (item.status === 0)
          }) ?? {}
          serveItem.state = 1
        })
      }
      loading.value = false
    }
    const setPermission = () => {
      if (store.state.appPermissions) {
        serviceList.value.map(item => {
          if (store.state.appPermissions[item.key]) {
            item.permission = true
          }
        })
      }
    }

    onMounted(() => {
      if (store.state.userInfo.userType !== 2) {
        // 只有租户才去查
        getOpenInfo()
      } else {
        // 客户写死就行
        const serveItem = serviceList.value.find(serve => {
          return serve.moduleId === 3
        })
        serveItem.state = 2
        serveItem.permission = true
        loading.value = false
      }
    })
    return {
      serviceList,
      openInfo,
      dialogShow,
      loading,
      toPage,
    }
  },
}
</script>

<style lang='stylus'>
.my-service-page
  .service-list
    padding 0 20px 20px
    display flex
    width max-content
    .service-item
      margin-left 20px
      padding-top 10px
      width 210px
      transition all 0.2s
      padding-bottom 0
      &:first-child
        margin-left 0
      .block
        position relative
        cursor pointer
        height 202px
        display flex
        flex-direction column
        border 1px solid #F2F2F6
        border-radius 4px
        .close
          display none
          font-size 12px
          line-height 16px
          justify-content center
          flex-direction column
          align-items center
          color #FFF
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color rgba(#3B68F0, 0.4)
          border-radius 4px
          span
            margin-left 4px
          .ins-btn
            cursor pointer
            background-color #fff
            color #3B68F0
            text-align center
            width 87px
            line-height 32px
            margin-top 10px
            border-radius: 4px;
        .title
          height 70px
          position relative
          font-size 16px
          line-height 18px
          padding 22px 0 0 20px
          background-size 100% auto
          &.riskWorkbench
            background-image url('//cdn.qjdchina.com/static-online/saas/common/home/risk-experts.jpg')
          &.customerGuard
            background-image url('//cdn.qjdchina.com/static-online/saas/common/home/customer-guard.jpg')
          &.supplyChain
            background-image url('//cdn.qjdchina.com/static-online/saas/common/home/order-master.jpg')
          &.creditSystem
            background-image url('//cdn.qjdchina.com/static-online/saas/common/home/credit-sales-manager.jpg')
          &.receiveAdmin
            background-image url('//cdn.qjdchina.com/static-online/saas/common/home/receive.jpg')
          &.factoryService
            background-image url('//cdn.qjdchina.com/static-online/saas/common/home/service-platform.jpg')
          &:after
            position absolute
            top 50px
            left 20px
            content ''
            width 16px
            height 1px
            background-color #494949
        .info
          padding 15px 18px 0
          color #848484
          font-size 12px
          line-height 16px
          flex 1 0 auto
        .status
          height 36px
          padding-left 20px
      &:hover
        padding-top 0
        padding-bottom 10px
        .close
          display flex
</style>
