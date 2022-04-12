<template lang="pug">
  el-dialog(width='450px'
    class='create-order-send-msg'
    custom-class='el-dialog-new'
    :title="headTitle"
    :visible.sync='isVisible'
    :before-close='handleClose'
  )
    .check-identity-main
      el-radio.check-item(
        v-for='(item, index) in personList'
        :key='index'
        v-model='radio'
        :label='(index + 1)'
        @change='checkHandler(item, index + 1)'
        :disabled='item.realNameStatus !== 2'
      )
        .check-item-info
          span {{item.name}}
          span {{item.personPhone | toWordHide('mobile')}}
          span {{item.relationType === 0 ? '（法定代表人）' : (item.authorizerType === 1 ? '（授权人）' : '')}}
          span.grey(v-if='item.realNameStatus !== 2') 注：实名认证尚未通过
    div(slot='footer')
      el-button(@click='handleClose' plain) 取消
      el-button(@click='toComfirm()' type='primary' :disabled="!isChecked") 确定
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    headTitle: {
      type: String,
      default: '请选择签署人'
    },
    signShow: {
      type: Boolean,
      default: false,
    },
    personList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      radio: null,
      current: {},
      checkMobile: '',
      isVisible: this.signShow,
      isChecked: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    checkHandler(current, index) {
      this.radio = index
      this.checkMobile = current.personPhone
      this.current = current
      if (this.checkMobile) {
        this.isChecked = true
      }
    },
    handleClose() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.current = {}
      this.checkMobile = ''
      this.radio = null
      this.isVisible = false
      this.isChecked = false
    },
    toComfirm() {
      this.$emit('choseSigner', this.current, this.radio === 0 ? '2' : '1')
    },
  },
  watch: {
    signShow(val) {
      this.isVisible = val
      if (!val) {
        this.reset()
      }
    },
  }
}
</script>
<style>
.el-radio.is-bordered+.el-radio.is-bordered {
  margin-left: 0
}
</style>
<style lang="stylus" scoped>
.check-identity-main
  padding 0px 20px
  display flex
  flex-flow column nowrap
  .check-item
    width 100%
    height 30px
    margin 0 0 10px 0
    display flex
    justify-content flex-start
    align-items center
    .check-item-info
      color #0F8EE9
      font-size 12px
      line-height 16px
      white-space initial
.p-btns-main
  text-align center
.align-right
  text-align right
.grey
  color #738A9E
  margin-left 10px
</style>
