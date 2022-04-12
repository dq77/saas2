<template lang="pug">
ul.list
  el-scrollbar.scroll-bar
    li(
      v-for="(item, index) in appLists"
      :key="index"
      :weblogs-anchor="`common-menu-${item.name}`"
      @click="() => jumpHandle(item)"
    )
      div.li_box(
        v-if="(item.all || (state.userInfo.userType === 2 && item.keep) || (state.userInfo.userType !== 2 && isUserType(item.userTypes) && hasApp(item.key))) && (item.module === 'all' || !state.asyncModules || !state.asyncModules.length || state.asyncModules.indexOf(item.module) > -1)"
        :class="currentName === item.name || (item.otherNames && item.otherNames.indexOf(currentName)) > -1 ? 'currentApp' : ''"
      )
        i.iconfont.menuIcon(:class="item.icon")
        .meun_text {{ item.title }}
  .open_li(v-if="(state.userInfo && state.userInfo.userType !== 2 && isOpenPlat) && (!state.asyncModules || !state.asyncModules.length || state.asyncModules.indexOf(openPLat.module) > -1)")
    li.li_box(
      :weblogs-anchor="`common-menu-${openPLat.name}`"
      @click='() => jumpHandle(openPLat)'
      :class="currentName === openPLat.name || (openPLat.otherNames && openPLat.otherNames.indexOf(currentName)) > -1 ? 'currentApp' : ''"
    )
      i.iconfont.menuIcon(:class="openPLat.icon")
      .meun_text {{ openPLat.title }}
</template>
<script>
import { appLists, openPLat } from '@/consts/app'
import store from '@/store'
import { computed } from '@vue/composition-api'
import useJumpApp from '@/hooks/common/useJumpApp'

export default {
  props: {
    currentName: String
  },
  setup(props) {
    // store
    const { state } = store
    // 跳转各应用逻辑
    const { jumpHandle } = useJumpApp()
    // 用户类型判断
    const isUserType = userTypes => state.userInfo && userTypes.indexOf(state.userInfo.userType) > -1
    // 应用是否有权限
    const hasApp = key => state.appPermissions && state.appPermissions[key]
    // 开放平台是否有权限
    const isOpenPlat = computed(() => {
      try {
        const data = state.appPermissions?.[1]
        if (!data) return false
        const isHas = data?.find(item => item.menuTag === 'open_platform')
        return !!isHas
      } catch (error) {
        console.error(`error: ${error}`)
      }
    })

    return {
      state,
      appLists,
      openPLat,
      jumpHandle,
      isUserType,
      hasApp,
      isOpenPlat
    }
  },
}
</script>
<style lang="stylus" scoped>
.list
  height 100%
  position relative
  padding-top 20px
  min-height 508px
  .scroll-bar
    height calc(100% - 120px)
  .li_box
    width 100%
    height 68px
    display flex
    flex-direction column
    align-items center
    justify-content center
    color #fff
    font-size 14px
    cursor pointer
    .menuIcon
      font-size 22px
    .meun_text
      width: 70px
      text-align: center
    &:hover
      .meun_text
        color rgba(59, 104, 240, 1)
  .open_li
    width 100%
    height 120px
    position absolute
    bottom 0
    left 0
    background #000
    display flex
    align-items center
    justify-content center
  .currentApp
    background rgba(59, 104, 240, 1)
    &:hover
      .meun_text
        color #fff
</style>
