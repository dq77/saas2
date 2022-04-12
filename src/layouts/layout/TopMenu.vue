<!-- author liqi -->
<template lang="pug">
  .top-menu
    template(v-for='item in menuList')
      span.u-first-item(v-if='item.hasPermission' :key='item.label' :class='{"u-active": item.isActive}')
        router-link.u-first-label(
          :to='{name: item.routerName }'
          v-if='item.routerName'
        )
          span(:weblogs-anchor="`common-${item.tag}`") {{ item.label }}
          span.u-count(v-if='item.totalCount > 0') {{ item.totalCount }}
        span.u-submenu(v-if='item.children && item.children.length>0')
          span.u-first-label {{ item.label }}
            span.u-count(v-if='item.totalCount > 0') {{ item.totalCount }}
          .u-submenu-list
            .u-second-item(
              v-for='item2 in item.children'
              :key='item2.label'
              :class='{"u-active": item2.isActive}'
              :weblogs-anchor="`common-${item2.tag}`"
            )
              router-link.u-second-label(
                :to='{name: item2.routerName}'
                v-if='item2.hasPermission'
              ) {{ item2.label }}
</template>

<script>
import store from '@/store'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      menuList: null
    }
  },
  methods: {
    // 检查某个菜单项是否有权限，改变hasPermission字段
    checkPermission(menuItem) {
      if (menuItem.children) {
        let count = 0
        menuItem.children.forEach(item => {
          if (this.checkPermission(item)) count++
        })
        if (count > 0) {
          menuItem.hasPermission = true
          return true
        }
      } else if (this.$store.state.permissions[menuItem.permissionCode]) {
        menuItem.hasPermission = true
        return true
      }
    },
    // 刷新这个菜单的active状态
    refreshStatus(route) {
      const menuList = this.menuList
      menuList && menuList.forEach(item => {
        if (item.children && item.children.length > 0) {
          let childActive = false
          item.children.forEach(item2 => {
            if (item2.menuTag === route.meta.menuTag) {
              item2.isActive = true
              childActive = true
            } else {
              item2.isActive = false
            }
          })
          item.isActive = childActive
        } else {
          if (item.menuTag === route.meta.menuTag) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        }
      })
    },
    async getBackLogList() {
      try {
        const res = await this.ajaxStore.process.getBackLogList({ pageNo: '1', pageSize: 10 })
        return res.data.data.totalCount
      } catch (error) {
        console.warn(`error: ${error}`)
      }
    }
  },
  async mounted() {
    this.dataSource.forEach(async item => {
      this.checkPermission(item)
      if (item.label === '我的任务' && item.hasPermission) {
        const totalCount = await this.getBackLogList()
        item.totalCount = totalCount
      }
      if (item.label === '批量中心' && item.hasPermission) {
        try {
          const { importTotal } = await store.dispatch('getHasDownNumber')
          item.totalCount = importTotal ?? 0
        } catch (error) {
          console.error(`error: ${error}`)
        }
      }
    })
    this.menuList = this.dataSource
    this.refreshStatus(this.$route)
  },
  watch: {
    $route(to) {
      this.refreshStatus(to)
    },
    '$store.state.common.taskNum'(val) {
      this.dataSource.forEach(async item => {
        if (item.label === '批量中心' && item.hasPermission) {
          item.totalCount = val ?? 0
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-menu
  position relative
  .u-first-item
    position relative
    margin-left 32px
    &:hover, &.u-active
      .u-first-label
        color rgba(59, 104, 240, 1)
        cursor pointer
        &:after
          display block
  .u-first-label
    font-size 12px
    color #494949
    &:after
      display none
      content ''
      position absolute
      width 100%
      height 4px
      left 0
      top 32px
      background rgba(59, 104, 240, 1)
    .u-count
      position absolute
      top -6px
      width 16px
      height 16px
      background #f7564e
      border-radius 16px
      color #fff
      font-size 12px
      text-align center
      line-height 16px
  .u-submenu
    position relative
    &:hover
      .u-first-label
        color rgba(59, 104, 240, 1)
      .u-submenu-list
        display block
  .u-submenu-list
    display none
    position absolute
    top 48px
    left -36px
    padding 7px 0
    width 120px
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
      top -38px
    &:after
      content ''
      position absolute
      width 8px
      height 8px
      border-left 1px solid #EAEBEE
      border-top 1px solid #EAEBEE
      transform rotate(45deg)
      left 50%
      margin-left -4px
      top -5px
      background #FFF
  .u-second-item
    &:hover, &.u-active
      .u-second-label
        color #fff
        background rgba(59, 104, 240, 1)
  .u-second-label
    display block
    color #494949
    line-height 32px
    cursor pointer
    text-indent 20px
</style>
