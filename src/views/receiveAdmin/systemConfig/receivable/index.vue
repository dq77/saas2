<template lang='pug'>
.receivable
  Header(title='应收款项配置' :left='20')
  ConfigPages(
    :title='title'
    :formData='formData'
    :formConfig='formConfig'
    :formRules='formRules'
    :dictCategoryCode='ACCOUNTS'
  )
</template>

<script>
import Header from '@/components/qjd/header'
import ConfigPages from '../components/configPages'
import { title, formData, formConfig, formRules } from './config'
import { ACCOUNTS } from '../config'

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
      ACCOUNTS
    }
  }
}
</script>

<style lang='stylus' scoped>
.receivable
  background #fff
.receivable-content
  padding 16px 20px 0
</style>
