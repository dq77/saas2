<template lang="pug">
.p-main
  .p-standard-item(v-for='item in config')
    .p-standard-title(v-if='item.name')
      .u-tip
        span(style={'margin-right': '5px'}) {{item.name}}
        el-tooltip(effect='light' placement='top-start' :content='item.tip')
          i.el-icon-info
    .p-standard-bar(:title='item.name ? `${item.name}: ${data[item.configName].text}` : ""')
      .p-standard-line-left(:class='data[item.configName].isDefaultColor ? (item.isHit ?"p-red" : "p-blue") : (item.isHit ?"p-blue" : "p-red")')(:style='`width:${data[item.configName].left}%`')
      .p-standard-line-right(:class='data[item.configName].isDefaultColor ? (item.isHit ?"p-red" : "p-blue") : (item.isHit ?"p-blue" : "p-red")')(:style='`width:${data[item.configName].right}%`')
    .p-standard-center(:class='item.name ? "" : "p-no-name-center"')
    .p-standard-tips(:class='item.name ? "" : "p-no-name"' :style='`left: ${data[item.configName].textPosition}%;font-size: ${data[item.configName].text === "暂无数据" ? "12px" : "14px"}`') {{data[item.configName].text}}
    .p-standard-label
      .p-label-left(:class='item.isHit ? "p-red" : "p-blue"') {{item.leftText}}
      .p-label-center {{item.centerText}}
      .p-label-right(:class='item.isHit ? "p-blue" : "p-red"') {{item.rightText}}
</template>

<script>
export default {
  props: {
    config: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    },
  }
}
</script>

<style lang="stylus" scoped>
.p-standard-item
  margin-bottom 20px
  position relative
.p-standard-item:last-child
  margin-bottom 0
.p-standard-title
  margin-bottom 10px
.p-standard-bar
  background #DEE8F6
  width 100%
  height 16px
  position relative
  display flex
  border-radius 10px
  overflow hidden
.p-standard-center
  width 2px
  height 24px
  background #3C5DA4
  position absolute
  left 49.7%
  top 23px
.p-standard-center.p-no-name-center
  top -4px
.p-standard-line-left
  background #3C5DA4
  height 16px
  width 50%
  position absolute
  left 0
  top 0px
.p-standard-line-right
  background #3C5DA4
  height 16px
  width 9%
  position absolute
  left 50%
  top 0px
.p-standard-bar
  .p-red
    background #E05E62
  .p-blue
    background #3C5DA4
.p-standard-tips
  color #ffffff
  font-size 14px
  position absolute
  left 90%
  top 26px
.p-no-name
  top -1px
.p-standard-label
  color #494949
  display flex
  justify-content space-between
  margin-top 15px
  width 100%
  .p-blue
    color #3C5DA4
  .p-red
    color #E05E62
  .p-label-left
    width 100px
  .p-label-right
    width 100px
    text-align right
</style>
