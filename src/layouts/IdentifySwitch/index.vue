<template lang="pug">
  .p-wrap
    //- 含客户身份
    template(v-if='state.curIdentify === "2"')
      div
        span {{ state.curFactory.customerType === 1 ? '个人客户：' : '企业客户：' }}
        span {{ state.curFactory.customerName }}
      .p-gap |
      el-dropdown(
        v-if='customerTenants.length > 1'
        @command="(command) => handleCommand(command, 'factorySwicth')"
      )
        span(class='el-dropdown-link') 已选厂家: {{state.curFactory.tenantName}}
          i(class='el-icon-caret-bottom el-icon--right')
        el-dropdown-menu(slot='dropdown')
          el-dropdown-item(v-for='(item, index) in customerTenants' :command='item' :key='index' :disabled='state.curFactory.tenantId===item.tenantId') {{item.tenantName}}
      span(v-if='customerTenants.length === 1') 已选厂家: {{state.curFactory.tenantName}}
    //- 含租户身份
    template(v-if='userType === "3"')
      .p-gap |
      el-dropdown(
        v-if='userType === 3'
        @command="(command) => handleCommand(command, 'identifySwicth')"
      )
        i(class='el-icon-s-check')
          span(class='el-dropdown-link') {{identifyData[state.curIdentify]}}
            i(class='el-icon-caret-bottom el-icon--right')
        el-dropdown-menu(slot='dropdown')
          el-dropdown-item(v-for='(item, index) in identifyData' :command='index' :key='index' :disabled='state.curIdentify===index') {{item}}
</template>

<script>
import store from '@/store'
import { identifyData } from './const.js'
import useRedirect from '@/hooks/supplyChain/useRedirect'

export default {
  setup(props, {root}) {
    const { state } = store
    const { userInfo: { customerTenants, tenants, userType } } = state
    const { redirectHandle } = useRedirect({ router: root.$router })
    const handleCommand = async (command, block) => {
      if (block === 'identifySwicth') {
        await store.dispatch('getCurIdentify', command)
        return redirectHandle(command)
      } else {
        await store.dispatch('getCurFactory', {
          tenantId: command.tenantId,
          applicationId: '1'
        })
        root.$router.push({name: 'dealerOrderManage', query: {isInit: true}})
      }
    }
    return {
      customerTenants,
      tenants,
      userType,
      identifyData,
      handleCommand,
      state
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-wrap
  display flex
  align-items center
.p-gap
  margin 0 10px

// .el-dropdown
//   font-size 12px
//   .el-dropdown-link
//     cursor: pointer;
</style>
