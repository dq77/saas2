<template lang="pug">
  el-dialog(width='422px'
    class='create-order-send-msg'
    :title="headTitle"
    :visible.sync='isVisible' :before-close='handleClose')
    .check-identity-main
      el-radio.check-item(v-for='(item, index) in donorList' :key='index' v-model="radio" :label="(index + 1)" @change='checkHandler(item, index + 1)')
        .check-item-info(v-if='item.relationType === 0 || item.authorizerType === 1') {{item.name}}（{{item.relationType === 0 && item.authorizerType === 1 ? '法人/授权人' : item.relationType === 0 ? '法人' : '授权人'}}）
    .p-btns-main.align-right
      el-button(@click='handleClose' size="medium" plain) 取消
      el-button(@click='toComfirm()' size="medium" type='primary' :disabled="!radio") 确定
</template>
<script>
import { mapState } from 'vuex'
// import { toWordHide } from '@/utils/util'
export default {
  props: {
    headTitle: {
      type: String,
      default: '请选择企业实名认证经办人'
    },
    signShow: {
      type: Boolean,
      default: false,
    },
    donorList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      radio: null,
      currentSigner: {},
      isVisible: this.signShow,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    checkHandler(currentSigner, index) {
      this.radio = index
      this.currentSigner = currentSigner
    },
    handleClose() {
      this.currentSigner = {}
      this.radio = null
      this.isVisible = false
      this.$emit('close')
    },
    toComfirm() {
      this.$emit('choseSigner', this.currentSigner)
    },
  },
  watch: {
    signShow(val) {
      this.isVisible = val
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
.p-btns-main
  text-align center
.align-right
  text-align right
</style>
