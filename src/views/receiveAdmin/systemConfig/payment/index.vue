<template lang='pug'>
.payment
  Header(title='支付方式配置' :left='20')
  ConfigPages(
    :title='title'
    :formData='formData'
    :formConfig='formConfig'
    :formRules='formRules'
    :dictCategoryCode='PAYMENT'
  )
</template>

<script>
import Header from '@/components/qjd/header'
import ConfigPages from '../components/configPages'
import { title, formData, formConfig, formRules } from './config'
import { PAYMENT } from '../config'

export default {
  components: {
    Header,
    ConfigPages
  },
  setup (props) {
    return {
      title,
      formData,
      formConfig,
      formRules,
      PAYMENT
    }
  }
}
</script>

<style lang='stylus' scoped>
.payment
  background #fff
.payment-content
  padding 16px 20px 0
</style>
