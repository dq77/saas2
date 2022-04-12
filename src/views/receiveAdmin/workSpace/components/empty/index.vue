<template lang="pug">
.empty
  img.img(:src='`${$assetsBaseUrl}/receiveAdmin/workSpace/empty.png`')
  .text 暂无数据
</template>
<style lang="stylus" scoped>
.empty
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content center
  color #909399
  .img
    width 200px
    height 122px
</style>
