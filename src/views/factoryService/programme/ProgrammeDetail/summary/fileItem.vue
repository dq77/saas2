<template lang="pug">
.p-summary-line
  span {{label}}：
  span.p-file-btn(@click='checkFiles' v-if='fileList.length') 查看更多附件
  span(v-else) -
  el-dialog(
    width='700px'
    :center='true'
    :visible.sync='visible')
    FileMain(:fileList='fileList')
</template>
<script>
import FileMain from './fileMain'
import { ref } from '@vue/composition-api'
export default {
  props: {
    label: {
      type: String
    },
    fileList: {
      type: Array,
      default: () => ([])
    }
  },
  components: { FileMain },
  setup(props) {
    const visible = ref(false)
    const checkFiles = () => {
      visible.value = true
    }
    return {
      visible,
      checkFiles,
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-summary-line
  font-size 14px
  color #494949
  border-bottom 1px solid #F3F4F8
  line-height 45px
.p-file-btn
  color #3C5CA4
  cursor pointer
</style>
