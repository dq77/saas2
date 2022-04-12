<template lang="pug">
el-dialog(
  custom-class='el-dialog-new'
  :title="title"
  :visible.sync="visible"
  :width="width"
  :before-close="cancleHandle"
  :top="top"
)
  slot
  fragment(v-if="footer")
    .custom_modal_footer(v-if="footer === 'default'")
      el-button(
        v-if="showClose"
        @click="cancleHandle"
      ) {{ cancleTxt }}
      el-button(
        v-if="showSure"
        type="primary"
        @click="sureHandle"
        :loading="loading"
        :disabled="disabled"
      ) {{ sureTxt }}
    slot(name="footer", v-if="footer === 'custom'")
</template>
<script>
export default {
  props: {
    title: String,
    visible: Boolean,
    width: {
      type: String,
      default: '500px'
    },
    top: {
      type: String,
      required: false,
      default: '15vh'
    },
    footer: {
      type: String,
      default: 'default'
    },
    sureTxt: {
      type: String,
      default: '保存'
    },
    cancleTxt: {
      type: String,
      default: '取消'
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true
    },
    showSure: {
      type: Boolean,
      required: false,
      default: true
    },
    loading: Boolean,
    disabled: Boolean
  },
  setup(props, { emit }) {
    const cancleHandle = () => emit('cancleHandle')

    const sureHandle = () => emit('sureHandle')

    return {
      cancleHandle,
      sureHandle
    }
  },
}
</script>
