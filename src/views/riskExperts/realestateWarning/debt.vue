<template lang="pug">
.page-main
  Week()
  .p-header
    ListTabs(
      page='warningBond'
      :tabConfig='realestateWarningTabs'
    )
  Relestatelist(page="debt" v-if='permissions["PTN:RISKEXPERTS:DEVELOPERWARNING:BOND"]')
</template>
<script>
import Relestatelist from './relestatelist'
import ListTabs from '../customerRiskAdmin/listTabs'
import Week from './week'
import { realestateWarningTabs } from './config'
import store from '@/store'

export default {
  components: {
    ListTabs,
    Week,
    Relestatelist
  },
  setup(props, { root }) {
    const { state: { permissions } } = store
    return {
      permissions,
      realestateWarningTabs,
    }
  },
}
</script>
