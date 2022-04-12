<template lang='pug'>
.page-main
  TabsInCard(:tabs='tabs' :defaultTab='defaultTab')
    template(v-slot:detail)
      Detail
    template(v-slot:news)
      News
</template>

<script>
import TabsInCard from '@/components/TabsInCard'
import Detail from './detail'
import News from './news'
import { ref } from '@vue/composition-api'
import { tabs } from './config'

export default {
  props: {},
  components: {
    TabsInCard,
    Detail,
    News
  },
  setup() {
    const defaultTab = ref('detail')

    return {
      defaultTab,
      tabs
    }
  }
}
</script>

<style lang='stylus' scoped>
/deep/ .el-tabs__header
  border-radius 4px
</style>
