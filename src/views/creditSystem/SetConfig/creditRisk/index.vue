<template lang="pug">
.page-main
  .page-content
    Config(:setNextData="configApis.setNextData")
    .content_box
      Header(:title="'请配置风险防范'")
      BusinessConfig
      Next(:nextKey="configApis.currentKey" v-if="configApis.isShow")
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Config from '../components/config'
import Next from '../components/next'
import Header from '@/components/qjd/header'
import BusinessConfig from './businessConfig'
import useConfig from '../components/useConfig'

export default {
  components: {
    Config,
    Next,
    Header,
    BusinessConfig
  },
  setup() {
    // 配置 & 下一步权限
    const configApis = useConfig({ menuTag: 'credit_system_risk_setting' })
    // state
    const state = reactive({ configApis })

    return {
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.page-content
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
.content_box
  background #fff
  padding 0 20px 80px 20px
  flex: 1
</style>
