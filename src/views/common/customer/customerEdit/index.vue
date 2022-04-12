<template lang="pug">
.page-main
  TabsInCard(
    :defaultTab='activeTab'
    :tabs='tabsConfig'
  )
    template(v-slot:company)
      Company
    template(v-slot:person)
      Person
</template>

<script>
import { ref } from '@vue/composition-api'
import TabsInCard from '@/components/TabsInCard'
import { getTabsConfig } from './config'
import Company from './company'
import Person from './person'

export default {
  components: {
    TabsInCard,
    Company,
    Person,
  },
  setup(props, { root }) {
    const routeName = root.$route.name
    const { customerType } = root.$route?.query ?? {}
    let tabsConfig = getTabsConfig()

    // 编辑页调整tab项
    if (routeName === 'customerEdit') {
      if (String(customerType) === '0') {
        tabsConfig = [tabsConfig[0]]
      } else {
        tabsConfig = [tabsConfig[1]]
      }
    }

    const activeTab = ref(tabsConfig[0].name)

    return {
      tabsConfig,
      activeTab,
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
