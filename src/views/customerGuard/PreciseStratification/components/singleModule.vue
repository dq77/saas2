<template lang='pug'>
.module
  .module-template(v-for='(item, index) in config')
    .module-title(v-if='item.title') {{ item.title }}
    Module(:data='item')
</template>

<script>
import Empty from '@/components/qjd/empty'
import Module from './module'
export default {
  props: {
    config: Array
  },
  components: {
    Module,
    Empty
  },
  setup (props) {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
.module-template
  margin-bottom 20px
.module-template:last-child
  margin-bottom 0
.module-title
  margin-bottom 10px
  font-size 12px
  font-weight bold
  color #494949
.module-table-label
  height 50px
  padding 0 10px
  line-height 50px
  font-weight bold
  color #494949
  background #f2f2f6
  border-bottom 1px solid #ebeef5
</style>
