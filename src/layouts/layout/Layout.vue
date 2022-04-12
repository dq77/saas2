<template lang="pug">
div.app-layout
  DialogChangeAccount
  DialogRefreshPage
  .p-ie-tips(v-if='isIE') 请使用360极速模式、chrome、edge等高级浏览器
  template(v-else)
    .app-top
      .logo
        img(:src="`${$assetsBaseUrl}/common/logo.png`")
      Header
    .app-content
      .app-list
        AppMenu(:currentName="currentName")
      .app-menu(v-if="childAppNames.includes(currentName)")
        LeftMenu
      .app-pages
        el-scrollbar(ref='layoutScrollbarRef' id="content_view" style="height: 100%; width: 100%;")
          .scorll_box
            Crumbs
            router-view(:key='routeViewKey')
    //- .app-left
    //-   el-scrollbar.app-menu#menu_view
    //-     LeftMenu
    //-   //- 弱密码提示
    //-   simplePasswordDialog
</template>

<script>
import { watchEffect, ref, computed, onMounted } from '@vue/composition-api'
import simplePasswordDialog from '@/components/Login/simplePasswordDialog'
import DialogChangeAccount from '../dialogChangeAccount'
import DialogRefreshPage from '../dialogRefreshPage'
import LeftMenu from './LeftMenu'
import Header from './Header'
import Footer from './Footer'
import Crumbs from './Crumbs'
import AppMenu from './appMenu/index.vue'
import { childAppNames, appLists, openPLat } from '@/consts/app'
import store from '@/store'

export default {
  components: {
    simplePasswordDialog,
    DialogChangeAccount,
    DialogRefreshPage,
    LeftMenu,
    Header,
    Footer,
    Crumbs,
    AppMenu
  },
  setup(props, { root }) {
    const currentName = ref('home')
    const layoutScrollbarRef = ref()

    watchEffect(() => {
      const { $route: { matched } } = root
      const name = matched?.[1]?.name
      currentName.value = name
      // 订货大师特殊逻辑
      if (name === 'Identify') {
        store.commit('SET_CURRENTAPP', '3')
        return
      }
      // 开放平台
      if (name === 'openPlat') {
        store.commit('SET_CURRENTAPP', openPLat?.key)
        return
      }
      const current = appLists?.find(item => item.name === currentName.value) ?? ''
      store.commit('SET_CURRENTAPP', current?.key ?? '')
    })

    const isIE = computed(() => !!(!!window.ActiveXObject || 'ActiveXObject' in window))

    const routeViewKey = computed(() => root.$route.name + (new Date().getTime()))

    onMounted(() => {
      window.layoutScrollbar = layoutScrollbarRef.value
    })
    return {
      isIE,
      routeViewKey,
      currentName,
      childAppNames,
      layoutScrollbarRef,
    }
  },
}
</script>
<style lang="stylus" scoped>
.app-layout
  width 100%
  height 100%
  display flex
  flex-direction column
  overflow hidden
.app-top
  display flex
  justify-content space-between
  height 60px
  width 100%
  background #fff
  box-sizing border-box
  border-bottom 1px solid #EAEBEE
  .logo
    height 60px
    padding-left 20px
    display flex
    align-items center
    justify-content center
    img
      width 70px
.app-content
  flex 1
  display flex
  overflow hidden
  background #F3F4F8
  .app-list
    width 90px
    background rgba(66, 71, 84, 1)
  .app-menu
    width 114px
    background #fff
  .app-pages
    flex 1
    min-width 0
#content_view
  overflow: hidden
  /deep/.el-scrollbar__wrap
    overflow-x: hidden
  .scorll_box
    height: 100%
    display: flex
    flex-direction: column
</style>
