<template lang="pug">
.page-main
  ModuleTabs(
    :tabs='moduleTabConfig',
    :defaultTab='activeModuleTab'
    @change='changeModule'
  )
  TabsInCard.p-mg(
    :tabs='functionTabs'
    :defaultTab='activeFunctionTab'
  )
    template(v-slot:accountType)
      TabAccountType
    template(v-slot:productSign)
      TabProductSign
    template(v-slot:warehouseConfig)
      TabWarehouseConfig
    template(v-slot:stockConfig)
      TabStockConfig
</template>

<script>
import { ref } from '@vue/composition-api'
import TabsInCard from '@/components/TabsInCard'
import ModuleTabs from './moduleTabs'
import TabAccountType from './tabAccountType/index'
import TabProductSign from './tabProductSign/index'
import TabWarehouseConfig from './tabWarehouseConfig/index'
import TabStockConfig from './tabStockConfig/index'
import { moduleTabConfig, defaultModuleTab } from './config'

export default {
  components: {
    TabsInCard,
    ModuleTabs,
    TabAccountType,
    TabProductSign,
    TabWarehouseConfig,
    TabStockConfig,
  },
  setup(props, { root }) {
    const { moduleTab: routerModuleTab, functionTab: routerFunctionTab } = root.$route.query
    const functionTabs = ref([])
    const activeModuleTab = ref(defaultModuleTab)
    const activeFunctionTab = ref('')

    // 模块tab变更
    const changeModule = (tabName) => {
      const moduleTab = moduleTabConfig.find(item => item.name === tabName)
      functionTabs.value = moduleTab.children
      activeFunctionTab.value = moduleTab.children[0].name
    }
    // 重置moudleTab和functionTab
    const resetModuleAndFunctionTab = (mTab, fTab) => {
      if (mTab) {
        const moduleTab = moduleTabConfig.find(item => item.name === routerModuleTab)
        functionTabs.value = moduleTab.children
        activeModuleTab.value = mTab
        if (fTab) {
          activeFunctionTab.value = fTab
        } else {
          activeFunctionTab.value = functionTabs.value[0].name
        }
      } else {
        activeModuleTab.value = moduleTabConfig[0].name
        activeFunctionTab.value = moduleTabConfig[0].children[0].name
        functionTabs.value = moduleTabConfig[0].children
      }
    }

    // 根据路由参数初始化tab
    resetModuleAndFunctionTab(routerModuleTab, routerFunctionTab)

    return {
      activeModuleTab,
      activeFunctionTab,
      moduleTabConfig,
      functionTabs,
      changeModule,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
</style>
