<template lang="pug">
.credit_kinds
  .credit_check_box
    .credit_kind_title 选择授信类型：
    el-checkbox-group(
      v-model="kinds"
      @change="onChange"
    )
      el-checkbox(
        v-for="kind in kindsOptions"
        :key="kind.value"
        :label="kind.value"
      ) {{ kind.label }}
  .credit_kinds_info
    i.icon.iconfont.iconfengxian1(style="font-size: 14px; margin-right: 4px; position: relative; top: -1px")
    span 请根据企业实际支持的授信类型作选择(勾选后立即生效)。
</template>
<script>
import { ref } from '@vue/composition-api'
import { kindsOptions } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default {
  setup() {
    const kinds = ref([])
    // ajax
    const { credit: { getCreditTypes, setCreditTypes } } = ajaxStore
    // 获取授信类型配置
    useAsync({
      request: getCreditTypes,
      params: { configKey: 'credit_type' },
      successCallBack: ({ code, data }) => { kinds.value = code === '0' ? (data?.configValue ? data?.configValue?.split(',') || [] : []) : [] }
    })
    // 设置授信类型
    const { doResult } = useAsync({ request: setCreditTypes, init: false })
    // 选择授信类型
    const onChange = val => doResult({ configValue: val ? val?.join(',') : '' })

    return {
      kinds,
      kindsOptions,
      onChange
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
