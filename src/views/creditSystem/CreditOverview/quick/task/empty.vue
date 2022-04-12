<template lang="pug">
.empty_box
  img.empty_icon(:src="`${$assetsBaseUrl}/creditSystem/overview/taskEmpty.png`")
  span 当前暂无任务
  img.empty_ig1(:src="`${$assetsBaseUrl}/creditSystem/overview/ig1.png`")
  img.empty_ig2(:src="`${$assetsBaseUrl}/creditSystem/overview/ig2.png`")
</template>
<style lang="stylus" scoped>
.empty_box
  width 100%
  height 100%
  position relative
  display: flex
  align-items: center
  justify-content: center
  color: rgba(169, 175, 184, 1)
  .empty_icon
    width: 15px
    position relative
    top -1px
  .empty_ig1
    position: absolute
    left: 15px
    bottom 26px
    height: 33px
  .empty_ig2
    position: absolute
    right: 0
    bottom 0
    height: 100%
</style>
