<template lang="pug">
el-dialog(
  title='修改备注'
  custom-class='el-dialog-new'
  :visible='visible'
  :before-close='closeHandle'
)
  el-input(type='textarea' show-word-limit :row='6' v-model='value' maxlength='50')
  div(slot='footer')
    el-button(plain @click='closeHandle') 取消
    el-button(:loading='loading' type='primary' @click='submit') 确定
</template>

<script>
import ajaxStore from '@/apis'
export default {
  props: {
    params: {
      type: Object,
      defalut: () => {
        return {
          extraData: '',
          showId: ''
        }
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      loading: false
    }
  },
  methods: {
    closeHandle() {
      this.$emit('close')
    },
    async submit() {
      this.loading = true
      const res = await ajaxStore.factoryService.qjd.white.modifyRemark({
        showId: this.params.showId,
        extraData: this.value
      })
      this.loading = false
      if (res?.data?.code === '0') {
        this.$message.success('修改备注成功')
        this.$emit('modified')
        this.closeHandle()
      }
    }
  },
  watch: {
    'params.extraData'() {
      this.value = this.params.extraData
    }
  }
}
</script>
