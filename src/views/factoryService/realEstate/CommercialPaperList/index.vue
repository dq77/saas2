<template lang="pug">
.page-main
  ButtonTabs(:tabs='tabs' :tabActive='tabActive' @changeTab='changeTab')
    MainSearch
  .securities
    template(v-if='tabActive === "ticket"')
      Ticket(:companyName='companyName')
    template(v-if='tabActive === "issued"')
      Issued(:companyName='companyName')
    template(v-if='tabActive === "breach"')
      Breach(:companyName='companyName')
</template>

<script>
import ButtonTabs from '../components/buttonTabs'
import MainSearch from './mainSearch'
import Ticket from './ticket'
import Issued from './issued'
import Breach from './breach'
import { reactive, toRefs } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  components: { ButtonTabs, MainSearch, Ticket, Issued, Breach },
  setup() {
    const state = reactive({
      tabs: [
        {
          name: 'ticket',
          label: '商票查询'
        },
        {
          name: 'issued',
          label: '债券发行'
        },
        {
          name: 'breach',
          label: '债券违约'
        }
      ],
      tabActive: 'ticket',
      companyName: ''
    })
    const changeTab = (val) => {
      state.tabActive = val
    }
    const { initEvent } = useEventBus({
      event: busStore.searchTicket
    })
    initEvent((companyName) => {
      state.companyName = companyName
    })

    return {
      ...toRefs(state),
      changeTab
    }
  }
}
</script>

<style lang="stylus" scoped>
.securities
  margin-top 20px
</style>
