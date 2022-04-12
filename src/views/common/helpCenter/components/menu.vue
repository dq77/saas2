<template lang="pug">
.help_menu
  el-scrollbar(style="widht: 100%; height: 100%;")
    ul.help_menu_list
      li(
        v-for="(item, index) in (dataSource || [])"
        :key="index"
      )
        .help_menu_title {{ item && item.title ? item.title : '' }}
        fragment(v-if="item.children && item.children.length")
          .help_menu_wraper(
            :style="`background: ${activeId === child.id ? '#F8F9FA' : ''}`"
            v-for="(child, i) in item.children"
            :key="i"
          )
            .help_menu_slect(v-show="activeId === child.id")
            a.help_menu_link(
              :href="child && child.id ? `#${child.id}` : ''"
              :style="`color: ${activeId === child.id ? '#3B68F0' : ''}`"
            ) {{ child && child.title ? child.title : '' }}
</template>
<script>

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    activeId: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  setup() {
  },
}
</script>
<style lang="stylus" scoped>
.help_menu
  height calc(100vh - 184px)
  width 214px
  box-sizing border-box
  margin-left 10px
  background #fff
  .help_menu_list
    width 100%
    box-sizing border-box
    padding 20px 0px 20px
    .help_menu_title
      height 20px
      font-size 14px
      font-weight 600
      color #494949
      line-height 20px
      margin 0 20px 10px
    .help_menu_wraper
      position relative
      width 100%
      box-sizing border-box
      padding 6px
      display flex
      align-items center
      .help_menu_slect
        position absolute
        left 0
        top 0
        height 100%
        width 2px
        background #3B68F0
      .help_menu_link
        display block
        font-size 12px
        font-weight 500
        color #9AA6B8
        margin-left 25px
        line-height 18px
    .help_menu_wraper:last-child
      margin-bottom 10px
</style>
