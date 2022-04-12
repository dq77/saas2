<template lang="pug">
  .page-main
    TabsInCard(:tabs='tabs' :defaultTab='defaultTab' @change='changeTab')
      template(v-slot:judicialLitigation)
        JudicialLitigation
      template(v-slot:executee)
        Executee
      template(v-slot:breakPromise)
        BreakPromise
      template(v-slot:heightLimit)
        HeightLimit
      template(v-slot:abnormalOperation)
        AbnormalOperation
      template(v-slot:chattelMortgage)
        ChattelMortgage
      template(v-slot:administrativeSanction)
        AdministrativeSanction
</template>

<script>
import TabsInCard from '@/components/TabsInCard'
import JudicialLitigation from './judicialLitigation'
import Executee from './executee'
import BreakPromise from './breakPromise'
import HeightLimit from './heightLimit'
import AbnormalOperation from './abnormalOperation'
import ChattelMortgage from './chattelMortgage'
import AdministrativeSanction from './administrativeSanction'
export default {
  components: {
    TabsInCard,
    JudicialLitigation,
    Executee,
    BreakPromise,
    HeightLimit,
    AbnormalOperation,
    ChattelMortgage,
    AdministrativeSanction
  },
  data() {
    return {
      defaultTab: 'judicialLitigation'
    }
  },
  computed: {
    tabs() {
      return [
        {
          name: 'judicialLitigation',
          label: '司法诉讼'
        },
        {
          name: 'executee',
          label: '被执行人'
        },
        {
          name: 'breakPromise',
          label: '失信'
        },
        {
          name: 'heightLimit',
          label: '限制高消费'
        },
        {
          name: 'abnormalOperation',
          label: '经营异常'
        },
        {
          name: 'chattelMortgage',
          label: '动产抵押'
        },
        {
          name: 'administrativeSanction',
          label: '行政处罚'
        },
      ]
    }
  },
  methods: {
    changeTab(tabName) {
      this.$router.push({name: this.$route.name, query: {tab: tabName}})
    }
  },
  mounted() {
    if (this.$route.query.tab) {
      this.defaultTab = this.$route.query.tab
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
