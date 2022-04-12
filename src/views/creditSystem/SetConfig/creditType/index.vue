<template lang="pug">
.page-main
  .page-content
    Config(:setNextData="configApis.setNextData")
    .content_box
      Header(:title="'请配置授信类型'")
        template(slot="header")
          CustomInfo
            div
              p 请根据业务的实际情况配置可用于企业客户申请的授信类型。
              p · 项目授信主旨基于项目向厂家申请的授信。
              p · 经销商授信主旨客户向厂家申请的年度授信。
              p · 临时授信主旨客户在紧急情况下因额度不足而临时向厂家申请的授信。
              p · 直签授信一般应用于厂家大客户，此类授信大客户可以将授信额度再次授予给下游的项目关系客户。
      //- 选择授信
      CreditKinds
      Next(:nextKey="configApis.currentKey" v-if="configApis.isShow")
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Config from '../components/config'
import Next from '../components/next'
import Header from '@/components/qjd/header'
import CreditKinds from './creditKinds'
import CustomInfo from '../components/customInfo'
import useConfig from '../components/useConfig'

export default {
  components: {
    Config,
    Next,
    Header,
    CreditKinds,
    CustomInfo
  },
  setup() {
    // 配置 & 下一步权限
    const configApis = useConfig({ menuTag: 'credit_system_type_setting' })
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
  padding 0 20px
  flex: 1
</style>
