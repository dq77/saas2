<template lang="pug">
.info_content
  Card(
    v-for="(item, index) in cardConfigs"
    :key="index"
    :title="item.title"
    :money="dataSource[item.key]"
    :unit="item.unit"
  )
</template>
<script lang='ts'>
import Card from '@/views/receiveAdmin/components/card/index.vue'
import { cardConfigs } from './config'

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Card
  },
  setup() {
    return {
      cardConfigs
    }
  }
}
</script>
<style lang="stylus" scoped>
.info_content
  background #fff
  padding 20px 10px
  display: flex
  margin-bottom: 10px
</style>
