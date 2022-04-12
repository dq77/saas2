<template lang="pug">
.page-main
  .page-layout
    .page-hrader
      h1(style='font-size: 30px;') 欢迎使用订货大师
      div(style='color: #494949;margin-bottom: 30px') 请选择您的身份：您可以选择厂家端或客户端
    .page-content
      .content-block
        h3 厂家端
        .desc 以厂家身份管理客户，项目、订单及产品等
        img.image(:src='`${$assetsBaseUrl}/SupplyChain/logo_cjd.jpg`')
        el-button(type='primary' @click='() => toEnter("1")') 立即进入
      .content-block
        h3 客户端
        .desc 以客户身份进行采购，查询采购订单状态。
        img.image(:src='`${$assetsBaseUrl}/SupplyChain/logo_jxs.jpg`')
        el-button(type='primary' @click='() => toEnter("2")') 立即进入
  Modal(:visible="modalApis.visible" :title="modalApis.title" ref='modelDialogRef' @cancleHandle="modalApis.cancleHandle")
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import Modal from './modal'
import store from '@/store'
// import ajaxStore from '@/apis'
// import useAsync from 'hooks/useAsync'
import useModal from 'hooks/useModal'
import useJumpApp from '@/hooks/common/useJumpApp'

export default {
  components: {
    Modal
  },
  setup(props, {root}) {
    const { state: { userInfo: { customerTenants } } } = store
    // const { factory: { switchTenant } } = ajaxStore
    const modalApis = useModal('请选择厂家')
    const modelDialogRef = ref('')

    const { defaultJump } = useJumpApp()
    const toEnter = async (val) => {
      await store.dispatch('getCurIdentify', val)
      if (val === '2') {
        if (customerTenants.length > 1) {
          modalApis.openHandle()
        } else {
          modelDialogRef.value.sureHandle(customerTenants[0].tenantId)
        }
      }
      if (val === '1') {
        defaultJump('3')
      }
    }
    const state = reactive({
      modalApis,
      customerTenants,
      currFactory: '',
    })
    return {
      toEnter,
      modelDialogRef,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-layout
  background #fff
  text-align center
  padding 60px 0 204px
  .page-content
    display flex
    justify-content center
    .content-block
      width 210px
      height 320px
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05)
      border-radius: 4px
      border: 1px solid #F2F2F6
      margin-left 30px
      background #fff
      padding 10px 20px
      .desc
        font-weigh 400
        color #848484
        line-height 17px
        border-top #F2F2F6 1px solid
        padding-top 10px
      .image
        width 100%
</style>
