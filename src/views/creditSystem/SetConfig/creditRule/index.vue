<template lang="pug">
.page-main
  .page-content
    Config(:setNextData="configApis.setNextData")
    .content_box
      Tabs(
        :currentIndex="currentApis.currentIndex"
        @selectHandle="currentApis.selectHandle"
      )
      //- 配置营销策略
      div(v-if="currentApis.currentIndex === 1")
        //- 提示
        .notice_box
          CustomInfo(:width="400" :placement="'left'")
            span(style="margin-left: 10px;" slot="content") 提示
            span 根据企业内部的业务营销策略配置不同的营销产品规则；不同的营销产品规则可以区别还款周期和首付款比例
        Product(:setPolicys="setPolicys")
      //- 启用营销策略
      div(v-if="currentApis.currentIndex === 2" )
        Header(:title="'客户等级策略控制'")
        Customer(:policys="policys")
        Header(:title="'业务类型策略控制'")
        Business(:policys="policys")
        Header(:title="'策略触发机制'")
        Rule
    Next(:nextKey="configApis.currentKey" v-if="configApis.isShow" @nextHandle="nextHandle")
</template>
<script>
import { reactive, toRefs, ref, watch } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import Tabs from './tab'
import useCurrent from './useCurrent.js'
import Config from '../components/config'
import Product from './product'
import Customer from './customer'
import Business from './business'
import Rule from './rule'
import Next from '../components/next'
import CustomInfo from '../components/customInfo'
import useConfig from '../components/useConfig'

export default {
  components: {
    Tabs,
    Config,
    Product,
    Customer,
    Header,
    Business,
    Rule,
    Next,
    CustomInfo
  },
  setup(props) {
    const currentApis = useCurrent()
    // 配置 & 下一步权限
    const configApis = useConfig({})
    // 步骤key
    const nextKey = ref('ruleConfig')
    // 存储策略枚举
    const policys = ref([])
    // 设置策略枚举
    const setPolicys = value => { policys.value = value }
    // 下一步
    const nextHandle = key => {
      if (key === 'ruleConfig') {
        currentApis.selectHandle(2)
        nextKey.value = 'risk'
      }
    }
    // watch
    watch(
      currentApis.currentIndex,
      value => configApis.setNextData('', value === 2 ? 'credit_system_rule_setting' : 'ruleConfig')
    )
    // state
    const state = reactive({ currentApis, configApis })

    return {
      policys,
      nextKey,
      setPolicys,
      nextHandle,
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
.notice_box
  display flex
  justify-content: flex-end
  padding-top: 20px
</style>
