<template lang="pug">
  .title {{ title }}
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="stylus" scoped>
.title
  padding-top 20px
  font-size: 14px;
  font-weight: 500;
  color: #494949;
  line-height: 20px;
</style>
