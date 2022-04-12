<template lang="pug">
.history_box(v-loading="currentAPis.loading")
  .header
    span 历史收款情况
    div
      el-select(
        v-model="currentAPis.kind"
        style="width: 100px; margin-right: 10px;"
        @change="currentAPis.selectChange"
      )
        el-option(
          v-for="(item, index) in kindOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        )
      el-date-picker(
        v-if="currentAPis.dateConfigs[currentAPis.kind].type"
        v-model="currentAPis.date"
        :value-format="currentAPis.dateConfigs[currentAPis.kind].valueFormat"
        :type="currentAPis.type"
        placeholder="请选择"
        @change="currentAPis.dateChange"
      )
  .content
    #history_charts
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useCurrent from './useCurrent'
import { getOptions, kindOptions } from './config'

export default {
  setup() {
    // chart
    const chartApis: any = useCharts({
      option: getOptions([], []),
      id: 'history_charts',
      isInit: false
    } as any)
    // useCurrent
    const currentAPis = useCurrent({ chartApis })
    // state
    const state = reactive({ currentAPis, chartApis })

    return {
      kindOptions,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.history_box
  background #fff
  margin-bottom 10px
  padding 20px
.header
  display flex
  justify-content: space-between;
  margin-bottom 10px
.content
  width: 100%
  height: 400px
  #history_charts
    height 100%
    width: 100%
</style>

