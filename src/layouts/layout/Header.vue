<template lang="pug">
  .header.flex
    span(
      v-if='!isUserType'
      style="cursor: pointer;"
      @click='showCustomerAccountDialog'
    ) 我的账户
    top-menu(v-if='hasGotPermission && isUserType' :dataSource="menuListConfig")
    .shu_division(v-if="hasGotPermission && isUserType")
    router-link.message-ring(:to='{name: "messageList" }' v-if="hasGotPermission && isUserType")
      el-badge(:value="messageNum" :hidden='!messageNum' :max="99" class="item" weblogs-anchor="common-message-center")
        i.icon.iconfont.iconlingdang
    top-menu(v-if='hasGotPermission && isUserType' :dataSource="myWorkList")
    i.u-user-logo
      .u-submenu-list
        .u-second-item.u-logout(@click='logout') 退出
</template>

<script>
import ajaxStore from '@/apis'
import TopMenu from '@/layouts/layout/TopMenu'
import { mapState } from 'vuex'
import { menuListConfig, myWorkList } from './config'

export default {
  components: {
    TopMenu
  },
  data () {
    return {
      crumbs: [],
      menuListConfig,
      myWorkList
    }
  },
  computed: {
    hasGotPermission() {
      return !!this.$store.state?.appPermissions?.[1]
    },
    isUserType() {
      return this?.userInfo?.userType !== 2
    },
    ...mapState('message', ['messageNum']),
    ...mapState(['userInfo', 'permissions']),
  },
  methods: {
    async logout () {
      const res = await ajaxStore.common.logout()
      const { $store: { state: { asyncModules } } } = this
      if (!res.data || res.data.code !== '0') return false
      this.$store.commit('resetState')
      this.$store.commit('user/resetState')
      this.$router.push({ name: 'login' })
      // 按需编译模块保存
      this.$store.commit('SET_ASYNCMODULES', asyncModules)
    },
    showCustomerAccountDialog() {
      this.$store.state.showCustomerAccountDialog = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  align-items center
  justify-content flex-end
  padding 0 30px
  height 59px
  background #fff
  .message-ring
    margin-left 26px
    cursor pointer
    color #000
    .ring
      width 16px
  .u-user-logo
    display inline-block
    margin-left 26px
    width 30px
    height 30px
    background url(//cdn.qjdchina.com/static-online/saas/common/user-logo.jpg) no-repeat
    background-size 100%
    position relative
    &:hover
      .u-submenu-list
        display block
    .u-submenu-list
      display none
      z-index 1
      font-size 12px
      font-style normal
      position absolute
      top 56px
      left -68px
      padding 7px 0
      width 118px
      background #FFFFFF
      box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.1)
      border 1px solid #EAEBEE
      z-index 3001
      &:before
        content ''
        position absolute
        height 50px
        width 100%
        left 0
        top -34px
      &:after
        content ''
        position absolute
        width 8px
        height 8px
        border-left 1px solid #EAEBEE
        border-top 1px solid #EAEBEE
        transform rotate(45deg)
        left 84%
        margin-left -4px
        top -5px
        background #FFF
      .u-second-item
        padding 7px 20px
        color #9AA6B8
        text-align center
        &:hover
          color #fff
          background rgba(59, 104, 240, 1)
  .u-logout
    color #494949
    font-size 12px
    cursor pointer
    &:hover
      color #3C5DA4
.shu_division
  width 1px
  height 14px
  background #E3E3E5
  margin-left 20px
</style>
