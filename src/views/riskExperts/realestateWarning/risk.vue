<template lang="pug">
.page-main
  Week()
  .p-header
    ListTabs(
      page='warningDigest'
      :tabConfig='realestateWarningTabs'
    )
    Relestatelist(page="risk" v-if='permissions["PTN:RISKEXPERTS:DEVELOPERWARNING:DIGEST"]')
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
    Relestatelist
  },
  setup(props, { root }) {
    // store
    const { state: { permissions } } = store
    if (!permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:DIGEST'] && !permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:BOND'] && !permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:NOTICE'] && !permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:BLACKLIST']) {
      root.$message.error('您还未开通此项服务，请联系售前商务')
    }
    return {
      permissions,
      realestateWarningTabs,
    }
  },
}
</script>
