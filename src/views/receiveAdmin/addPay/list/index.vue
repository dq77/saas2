<template lang="pug">
el-scrollbar(style="width: 100%;")
  .list_warper
    .list_box(v-if="dataSource && dataSource.length")
      .list_item(
        v-for="(item, index) in dataSource"
        :key="index"
        @click="() => detailHandle(item)"
      )
        .list_info(
          v-for="(config, index) in configs"
          :key="index"
        )
          .list_info_label {{ config.label }}
          .list_info_value(
            :style="`color: ${config.color}`"
          ) {{ config.render ? config.render(item[config.key]) : item[config.key] }}
    div(style="padding-top: 100px" v-else)
      Empty
</template>
<script>
import { configs } from './config'
import Empty from '@/components/qjd/empty'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    Empty
  },
  setup(props, { root: { $router } }) {
    const detailHandle = item => $router.push({ name: 'PayDetail', query: { id: item?.id } })

    return {
      configs,
      detailHandle
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
