<template lang="pug">
  el-dialog(width='80%'
    custom-class='el-dialog-new'
    :title="headTitle"
    :visible.sync='isVisible'
    :before-close='handleClose'
  )
    div(v-loading='loading')
      img.preview-img(:src='fileKey')
    div(slot='footer')
      el-button(@click='handleClose' plain) 取消
      el-button(@click='toComfirm()' type='primary') 签署
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    headTitle: {
      type: String,
      default: '电子确认函'
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    fileKey: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      isVisible: this.isShow,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    toComfirm() {
      this.$emit('confirmSign')
    },
  },
  watch: {
    isShow(val) {
      this.isVisible = val
    },
  }
}
</script>

<style lang="stylus" scoped>
.preview-img
  width 100%
.p-btns-main
  text-align center
.align-right
  text-align right
</style>
