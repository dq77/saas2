<template lang="pug">
.page-main
  Week()
  .p-header
    ListTabs(
      page='blacklist'
      :tabConfig='realestateWarningTabs'
    )
  Relestatelist(page="black" v-if='permissions["PTN:RISKEXPERTS:DEVELOPERWARNING:BLACKLIST"]')
</template>
<script>
import ListTabs from '../customerRiskAdmin/listTabs'
import Week from './week'
import Relestatelist from './relestatelist'
import { realestateWarningTabs } from './config'
import store from '@/store'

export default {
  components: {
    ListTabs,
    Week,
    Relestatelist,
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
