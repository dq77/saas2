<template lang="pug">
el-scrollbar(style="height: 100%;")
  .menu
    .menu-group(v-for='(menuGroup, index) in menuList' :key="index")
      .menu-row(
        v-for='(menuRow, index) in menuGroup.subMenu'
        :key="index"
        :class='{"is-open": menuRow.isOpen, "is-active": currentActive === menuRow.menuTag}'
      )
        .menu-row_title(
          v-if="!menuRow.isHidden"
          :weblogs-anchor="`common-menu-${menuRow.menuTag}`"
          @click='clickRowTitleParent(menuRow, menuList)'
        )
          span.menu-row_title-label.menu-row_title-label-noIcon {{ menuRow.name }}
          template(v-if='menuRow.subMenu && menuRow.subMenu.length>0')
            span.menu-row_title-angle.menu-row_title-angle--up
            span.menu-row_title-angle.menu-row_title-angle--down
        .menu-cols(:style='{height: menuRow.colsHeight + "px"}')
          .menu-col(
            :id="menuCol.menuTag"
            v-for='(menuCol, index) in menuRow.subMenu'
            :key="index"
            :class='{"is-active": currentActive === menuCol.menuTag, "has-child": menuCol.subMenu && menuCol.subMenu.length }'
          )
            template(v-if="menuCol.subMenu && menuCol.subMenu.length")
              .menu-row_title_child(
                @click='clickRowTitle(menuCol, menuGroup.subMenu)'
                :weblogs-anchor="`common-menu-${menuCol.menuTag}`"
              )
                span.menu-row_title-label.menu-row_title-label-noIcon {{ menuCol.name }}
                template(v-if='menuCol.subMenu && menuCol.subMenu.length>0')
                  span.menu-row_title-angle.menu-row_title-angle--up
                  span.menu-row_title-angle.menu-row_title-angle--down
              .menu-cols(:style='{height: menuCol.colsHeight + "px"}')
                .menu-col(
                  :id="menuChild.menuTag"
                  v-for='(menuChild, index) in menuCol.subMenu'
                  :key="index"
                  :class='{"is-active": currentActive === menuChild.menuTag}'
                  @click='clickColTitle(menuChild)'
                )
                  .menu_text_box
                    span(style="margin-left: 40px") {{ menuChild.name }}
            .menu_text_box(
              v-else
              @click='clickColTitle(menuCol, menuRow.subMenu)'
              :weblogs-anchor="`common-menu-${menuCol.menuTag}`"
            )
              span.menu_text {{ menuCol.name }}
</template>

<script>
import { menuRoutes } from '@/router'
import store from '@/store'
import { deepCopy } from '@/utils/qjd'
import { supplyMenu } from '@/consts/app'

// const defaultRowHeight = 40
const defaultColHeight = 40

export default {
  props: {
    // 只保持一个子菜单展开
    uniqueOpened: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      menuList: null,
      delayeringData: {},
      currentActive: null,
      isChild: false
    }
  },
  methods: {
    // 计算row级菜单下的一组col的总体高度
    caclColsHeight(row, isSpread) {
      if (isSpread) {
        return (row.subMenu.length || 0) * defaultColHeight
      } else {
        return 0
      }
    },
    // 判断当前选中是否为子级
    getIsChild(data) {
      if (!data) return this.isChild
      data.subMenu && data.subMenu.forEach(item => {
        if (item.menuTag === this.currentActive) this.isChild = true
        if (item.subMenu) this.getIsChild(item)
      })
    },
    clickRowTitleParent(menuRow, parents) {
      this.isChild = false
      // 计算高度变化，调整open状态
      const menuList = this.menuList
      menuList && menuList.forEach(group => {
        group.subMenu && group.subMenu.forEach(row => {
          if (row.menuTag === menuRow.menuTag) {
            if (menuRow.isOpen) {
              menuRow.isOpen = false
              menuRow.colsHeight = 0
              if (menuRow.subMenu && menuRow.subMenu.length > 0) {
                menuRow.subMenu.forEach(item => {
                  item.isOpen = false
                  item.colsHeight = 0
                })
              }
            } else {
              menuRow.isOpen = true
              this.getIsChild(menuRow)
              this.refreshStatus(this.menuList, this.isChild ? this.currentActive : menuRow.menuTag)
            }
          } else {
            if (this.uniqueOpened) {
              row.subMenu && row.subMenu.forEach(item => {
                item.colsHeight = 0
                item.isOpen = false
              })
              row.colsHeight = 0
              row.isOpen = false
            }
          }
        })
      })
      // 判断是否跳转，只有此时会active
      if (menuRow.menuTag && (!menuRow.subMenu || menuRow.subMenu.length <= 0)) {
        menuRow.isActive = !menuRow.isActive
        this.selectMenuItem(menuRow.menuTag)
      }
    },
    clickRowTitle(menuRow, parents) {
      // 计算高度变化，调整open状态
      parents && parents.forEach(group => {
        group.subMenu && group.subMenu.forEach(row => {
          if (row.menuTag === menuRow.menuTag) {
            if (menuRow.isOpen) {
              menuRow.isOpen = false
              menuRow.colsHeight = this.caclColsHeight(menuRow)
              let data = this.delayeringData[menuRow.menuTag]
              while (data.parent && data.parent.colsHeight) {
                data = data.parent
              }
              const num = data.subMenu.length * defaultColHeight
              data.colsHeight = num
            } else {
              menuRow.isOpen = true
              if (menuRow.subMenu && menuRow.subMenu.length > 0) {
                let data = this.delayeringData[menuRow.menuTag]
                while (data.parent && data.parent.colsHeight) {
                  data = data.parent
                }
                const num = data.subMenu.length * defaultColHeight
                data.colsHeight = num + this.caclColsHeight(menuRow, true)
                menuRow.colsHeight = this.caclColsHeight(menuRow, true)
              }
            }
          } else {
            if (this.uniqueOpened) {
              row.colsHeight = this.caclColsHeight(menuRow)
              row.isOpen = false
            }
          }
        })
      })
      // 判断是否跳转，只有此时会active
      if (menuRow.menuTag && (!menuRow.subMenu || menuRow.subMenu.length <= 0)) {
        menuRow.isActive = !menuRow.isActive
        this.selectMenuItem(menuRow.menuTag)
      }
    },
    clickColTitle(menuCol, rows) {
      this.refreshStatus(this.menuList, menuCol.menuTag)
      rows && rows.map(item => {
        if (item.subMenu && item.subMenu.length) {
          item.isOpen = false
          item.colsHeight = 0
        }
      })
      if (menuCol.menuTag) {
        this.selectMenuItem(menuCol.menuTag)
      }
    },
    selectMenuItem (menuTag) {
      this.currentActive = menuTag
      if (menuRoutes[menuTag]) {
        if (menuRoutes[menuTag].name === 'qjy') { // 仟金眼
          this.$router.push({ name: menuRoutes[menuTag].name })
          window.open(`https://${document.location.hostname}/partner/risk/credit/site`)
        } else {
          this.$router.push({ name: menuRoutes[menuTag].name })
        }
      } else {
        this.$router.push({ name: 404 })
      }
    },
    // 获取当前选中数据所有父级集合
    getParents(menuTag) {
      const arr = []
      let data = this.delayeringData[menuTag] || {}
      while (data.parent && data.parent.children) {
        arr.push(data.menuTag)
        data.parent.isOpen = true
        data = data.parent
      }
      return arr
    },
    // 根据路由更新菜单active状态, 刚加载时可选择初始化row.open与row.colsHeight
    refreshStatus(menuList, menuTag) {
      const arr = this.getParents(menuTag)
      let currentEl
      const listMap = (data = menuList, current = null) => {
        currentEl = current
        data.map(item => {
          if (arr.indexOf(item.menuTag) > -1) {
            item.isOpen = true
            item.colsHeight = (item.subMenu ? item.subMenu.length : 0) * defaultColHeight
            if (!currentEl) currentEl = item
            else if (currentEl) currentEl.colsHeight += item.colsHeight
          } else {
            item.colsHeight = 0
            item.isOpen = false
          }
          if (item.subMenu) listMap(item.subMenu, currentEl)
        })
      }
      listMap()
    },
    // 数据赋值 & 扁平化处理
    setMenuList(data) {
      // delayeringData 将数据处理为链表形式
      data.subMenu && data.subMenu.forEach(group => {
        this.delayeringData[group.menuTag] = group
        this.delayeringData[group.menuTag].parent = data
        this.delayeringData[group.menuTag].children = group.subMenu
        if (group.subMenu && group.subMenu.length) {
          group.colsHeight = this.caclColsHeight(group)
          group.isOpen = false
        }
        group.subMenu && group.subMenu.forEach(row => {
          this.delayeringData[row.menuTag] = row
          this.delayeringData[row.menuTag].parent = group
          this.delayeringData[row.menuTag].children = row.subMenu || []
          row.isOpen = row.isOpen || false
          row.isActive = row.isActive || false
          row.subMenu && row.subMenu.forEach(col => {
            col.isActive = col.isActive || false
          })
          if (row.subMenu && row.subMenu.length) this.setMenuList(row)
        })
      })
    },
    async init() {
      let menuList = []
      this.menuList = []
      setTimeout(() => {
        const { state: { menuData, currentApp, userInfo, curIdentify } } = store
        const { userType } = userInfo ?? {}
        if (currentApp === '3' && (userType === 2 || curIdentify === '2')) {
          // 订货大师客户版菜单
          menuList = supplyMenu
        } else {
          menuList = menuData?.[currentApp] ? deepCopy(menuData?.[currentApp]) : []
        }
        this.setMenuList({ subMenu: menuList })
        this.currentActive = this.$route.meta.menuTag
        this.refreshStatus(menuList, this.$route.meta.menuTag, true)
        this.menuList = menuList
      }, 10)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    $route(to, from) {
      this.currentActive = this.$route.meta.menuTag
      this.refreshStatus(this.menuList, to.meta.menuTag)
    },
    '$store.state.currentApp'() {
      this.init()
    },
    '$store.state.refresh'() {
      this.init()
    }
  },
}
</script>

<style lang="stylus" scoped>
.menu
  padding-top 7px
  color rgba(73, 73, 73, 1)
  box-sizing border-box
  &-row
    &.is-active
      .menu-row_title
        background rgba(242, 242, 246, 1)
        color rgba(59, 104, 240, 1)
      .menu-row_title-icon
        &--default
          display none
        &--active
          display inline-block
      .menu-cols
        background-color #1F3157
    &.is-active.is-open
      .menu-row_title-angle
        &--up
          display inline-block
          margin-right 10px
        &--down
          display none
          margin-right 10px
    &_title
      position relative
      height 40px
      line-height 40px
      cursor pointer
      box-sizing border-box
      &-icon
        display inline-block
        margin 0 7px 0 0px
        width 17px
        height 17px
        vertical-align middle
        background-size 100%
        &--active
          display none
      &-label
        display inline-block
        vertical-align middle
        margin-left 20px
      &-angle
        float right
        margin-top 14px
        width 12px
        height 12px
        background-size 100%
        &--up
          background-image url('//cdn.qjdchina.com/static-online/saas/common/angleUp.png')
          margin-right 10px
          display none
        &--down
          background-image url('//cdn.qjdchina.com/static-online/saas/common/angleDown.png')
          margin-right 10px
  &-cols
    transition height 300ms
    height 0
    overflow hidden
  &-col
    height 40px
    line-height 40px
    cursor pointer
    &.has-child
      height auto
  .menu_text
    margin-left 30px
  .menu-row_title_child
    padding-left 10px
    &:hover
      color rgba(59, 104, 240, 1)
  .is-active
    .menu_text_box
      background rgba(242, 242, 246, 1)
      color rgba(59, 104, 240, 1)
  .menu-row_title
    &:hover
      color rgba(59, 104, 240, 1)
  .menu_text_box
    &:hover
      color rgba(59, 104, 240, 1)
</style>
