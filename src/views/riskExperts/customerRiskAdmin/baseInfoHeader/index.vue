<template lang="pug">
.base-info
  Form(
    ref="formRef"
    style="padding-right: 10px"
    :formData="baseInfo",
    :formConfig="baseInfoformConfig"
    :labelPosition="'right'"
  )
</template>
<script>
import Form from '@/components/qjd/form'
import {
  baseInfoformConfig,
} from '../config'

export default {
  props: {
    baseInfo: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    Form,
  },
  setup(props, { root }) {
    return {
      baseInfoformConfig,
    }
  },
}
</script>
<style lang="stylus" scoped>
.base-info
  background: #fff
  padding 40px 20px 0 20px
</style>
