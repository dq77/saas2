<template lang="pug">
.rule
  .rule_top
    .rule_title 设置：
    .rule_top_check
      el-checkbox(style="margin-bottom: 10px;" v-model="check1" @change="val => onChange(val, 'CUSTOMER_LEVEL_RULE_FLAG')") 启用客户等级策略
      el-checkbox(style="margin-bottom: 10px;" v-model="check2" @change="val => onChange(val, 'BUSINESS_TYPE_RULE_FLAG')")  启用业务类型策略
  .rule_bottom(v-show="isShow")
    .rule_content
      .rule_radio
        .rule_title 策略优先级设定：
        .rule_top_check
          el-radio(style="margin-bottom: 10px;"  v-model="radioVl" label="CUSTOMER" ) 客户等级策略优先
          el-radio(style="margin-bottom: 10px;"  v-model="radioVl" label="BUSINESS_TYPE")  业务类型策略优先
      .rule_info  当客户等级策略和业务类型策略同时生效时需要指定系统校验优先级，并且后续业务的发生会采纳优先策略的还款周期和首付款比例作为赊销依据
</template>
<script>
import { computed, ref, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default {
  setup() {
    const check1 = ref(false)
    const check2 = ref(false)
    const radioVl = ref('CUSTOMER')
    // ajax
    const { credit: { getCreditTypes, createOrUpdateDefault } } = ajaxStore
    // 客户控制策略
    useAsync({
      request: getCreditTypes,
      params: { configKey: 'CUSTOMER_LEVEL_RULE_FLAG' },
      successCallBack: ({ code, data }) => {
        if (code === '0' && data) check1.value = data?.configValue === 'ENABLED'
      }
    })
    // 业务类型策略
    useAsync({
      request: getCreditTypes,
      params: { configKey: 'BUSINESS_TYPE_RULE_FLAG' },
      successCallBack: ({ code, data }) => {
        if (code === '0' && data) check2.value = data?.configValue === 'ENABLED'
      }
    })
    // 策略优先级设定
    useAsync({
      request: getCreditTypes,
      params: { configKey: 'CREDIT_RULE_PRIORITY_FIRST' },
      successCallBack: ({ data }) => {
        radioVl.value = data?.configValue ?? 'CUSTOMER'
      }
    })
    // 设置规则触发策略信息
    const { doResult: setHandle } = useAsync({ request: createOrUpdateDefault, init: false })
    // watch-radio
    watch(
      radioVl,
      (val) => setHandle({ configKey: 'CREDIT_RULE_PRIORITY_FIRST', configValue: val })
    )
    // radio是否显示
    const isShow = computed(() => check1.value && check2.value)
    // checkbox
    const onChange = (val, configKey) => {
      const configValue = val ? 'ENABLED' : 'DISABLED'
      setHandle({ configKey, configValue })
    }

    return {
      check1,
      check2,
      radioVl,
      isShow,
      onChange
    }
  },
}
</script>
<style lang="stylus" scoped>
.rule
  padding-top 20px
  padding-left 36px
  .rule_top
    display flex
  .rule_title
    margin-right 10px
  .rule_top_check
    display flex
    flex-direction column
  .rule_bottom
    padding-left 44px
    .rule_content
      width 400px
      height 143px
      background #F8F9FA
      border-radius 4px
      box-sizing border-box
      padding 18px 20px
      .rule_radio
        display flex
      .rule_info
        color #F56C6C
</style>
