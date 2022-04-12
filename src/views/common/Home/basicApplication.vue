<template lang='pug'>
.basic-application-page
  .card
    .title
      .left-txt 基础应用
    .app-list
      .app-item(v-if='permissionList["PTN:SUPPLIER:CUSTOMER:MANAGE"]' @click='toPage("customerList")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/customer-management.png`")
        .txt 客户管理
      .app-item(v-if='permissionList["PTN:SUPPLIER:USER:MANAGE"]' @click='toPage("accountList")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/account-management.png`")
        .txt 账号管理
      .app-item(
        v-if='permissionList["PTN:SUPPLIER:ROLE"]' @click='toPage("roleManageList")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/authority-management.png`")
        .txt 权限管理
      .app-item(v-if='permissionList["PTN:SUPPLIER:DEPARTMENT"]' @click='toPage("organManageList")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/organizational-management.png`")
        .txt 组织架构管理
      .app-item(v-if='permissionList["PTN:DATA:EXPORT:CENTER"]' @click='toPage("exportList")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/export-center.png`")
        .txt 批量中心
      .app-item(v-if='permissionList["PTN:SUPPLIER:FLOW_UPLOAD:MANAGE"]' @click='toPage("developer")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/developer-mode.png`")
        .txt 开发者模式
      .app-item(v-if='permissionList["PTN:SUPPLIER:THIRD_APPLICATION:MANAGE"]' @click='toPage("OpenPlatApi")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/third-application.png`")
        .txt 三方应用
      .app-item(v-if='permissionList["PTN:SUPPLIER:OPEN:PLATFORM:PROCESS:CONFIG"]' @click='toPage("processConfigHome")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/configuration-center.png`")
        .txt 流程配置
      .app-item(v-if='permissionList["PTN:SUPPLIER:CHAIN_SET_BASE"]' @click='toPage("setBase")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/configuration-base.png`")
        .txt 基础设置
      .app-item(v-if='permissionList["PTN:SUPPLIER:SYSTEM_LOG:MANAGE"]' @click='toPage("OpenPlatLog")')
        .img
          img(:src="`${$assetsBaseUrl}/common/home/log-management.png`")
        .txt 系统日志管理
</template>

<script>
import Router from '@/router'
import { ref, onMounted } from '@vue/composition-api'
import store from '@/store'
export default {
  props: {
  },
  setup(props, context) {
    const permissionList = ref({})
    const toPage = (name) => {
      Router.push({ name })
    }
    onMounted(() => {
      permissionList.value = store.state.permissions
    })
    return {
      permissionList,
      toPage,
    }
  },
}
</script>

<style lang='stylus'>
.basic-application-page
  margin-top 20px
  .app-list
    display flex
    flex-wrap wrap
    padding 4px 0 26px
    .app-item
      cursor pointer
      width 128px
      width 14.28%
      text-align center
      padding 15px 0
      .img img
        width 46px
        margin-bottom 14px
      &:hover
        color #547bf1
</style>
