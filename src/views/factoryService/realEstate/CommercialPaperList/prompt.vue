<template lang='pug'>
  .prompt
    span 仅显示30条
    el-tooltip(content="查询更多，请尝试使用更精准的关键词搜索。" placement="top-end" effect="light")
      i.el-tooltip.el-icon-info
</template>

<script>
</script>

<style lang='stylus' scoped>
.prompt
  margin-bottom 15px
  text-align right
</style>
