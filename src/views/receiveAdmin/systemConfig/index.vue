<template lang='pug'>
.page-main.system-config
  TabsInCard(:tabs='tabs' :defaultTab='defaultTab')
    template(v-slot:receivable)
      Receivable
    template(v-slot:payment)
      Payment
    template(v-slot:status)
      Status
    template(v-slot:plan)
      Plan
</template>

<script>
import TabsInCard from '@/components/TabsInCard'
import Receivable from './receivable'
import Payment from './payment'
import Status from './status'
import Plan from './plan'
import { ref } from '@vue/composition-api'
import { tabs } from './config'
// 操作指引
import useGuide from '@/hooks/receiveAdmin/useGuide'

export default {
  components: {
    TabsInCard,
    Receivable,
    Payment,
    Status,
    Plan
  },
  setup (props, { root: { $route: { query: { isGuide } } } }) {
    const defaultTab = ref('receivable')
    // 操作指引
    const { addHandle } = useGuide()
    isGuide && addHandle({ businessType: 'receivable_system_configuration' })

    return {
      defaultTab,
      tabs
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
