<template lang="pug">
  el-dialog(width='422px'
    :center='isResultSuccess'
    :title="`${resultObj[resultType]}实名认证${isResultSuccess ? '成功' : '失败'}`"
    :visible.sync='isVisible' :before-close='handleClose')
    .result-success(v-if='isResultSuccess')
      img.success-icon(:src='`${$assetsBaseUrl}/common/icon_uploaded.svg`')
      .success-tip 已为您办理数字证书和电子印章备份
    .result-default(v-else)
      .default-tip {{resultReson}}
    .p-btns-main(v-if='isResultSuccess')
      el-button(@click='handleClose' size="medium" plain) 我知道了
    .p-btns-main.align-right(v-else)
      el-button(@click='handleClose' size="medium" plain) 取消
      el-button(@click='toComfirm()' size="medium" type='primary') 再次认证
</template>
<script>
import { mapState } from 'vuex'
// import { toWordHide } from '@/utils/util'
export default {
  props: {
    resultShow: {
      type: Boolean,
      default: false,
    },
    resultType: {
      type: String,
      default: '1'
    },
    isResultSuccess: {
      type: Boolean,
      default: true,
    },
    resultReson: {
      type: String,
      default: '失败'
    },
  },
  data() {
    return {
      resultObj: {
        1: '企业',
        legalInfo: '企业法人',
        donor: '自然人',
        guarantee: '企业担保人',
      },
      headTitle: '',
      isVisible: this.resultShow,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    handleClose() {
      this.currentSigner = {}
      this.radio = null
      this.isVisible = false
      this.$emit('close')
    },
    toComfirm() {
      this.$emit('restart')
    },
  },
  watch: {
    resultShow(val) {
      this.isVisible = val
    },
    resultType(val) {
      // this.headTitle = this.resultObj[val] + '实名认证' + (this.isResultSuccess ? '成功' : '失败')
    }
  }
}
</script>
<style>
.el-radio.is-bordered+.el-radio.is-bordered {
  margin-left: 0
}
</style>
<style lang="stylus" scoped>
.result-success
  text-align center
  padding-bottom 20px
  .success-icon
    width 40px
    height 40px
    text-align center
  .success-tip
    padding-top 15px
    font-size 14px
    color #43406C
    text-align center
.p-btns-main
  text-align center
.align-right
  text-align right
</style>
