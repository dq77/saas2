<template lang="pug">
.circle_box
  .circle_title {{ title }}
  .circle_content
    .circle_chart_box
      .circle_chart(:id="id")
      .circl_mark
        .circl_mark_money {{ percent2(dataSource.total) }}
        .circl_mark_title {{ title }}
    .circle_info_box
      .circle_info(
        v-for="(item, index) in infos"
        :key="index"
      )
        .circle_info_pre(:style="`background: ${item.color}`")
        .circle_info_label {{ item.label }}
        .circle_info_percet {{ dataSource[item.percet] }}%
        .circle_info_value {{ percent2(dataSource[item.key]) }}
</template>
<script>
import { defineComponent, watch } from '@vue/composition-api'
import useTimeout from 'hooks/useTimeout'
import useCharts from 'hooks/useCharts'
import { pieOption, infos } from './config'
import { percent2 } from '@/utils/qjd'

export default defineComponent({
  props: {
    title: String,
    id: String,
    dataSource: Object
  },
  setup(props) {
    // timeout
    const { perTimeout } = useTimeout()
    // chart
    const {
      setDataSource,
      setOption,
      chartInit,
      chartClear
    } = useCharts({
      option: pieOption,
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = ({ projectVal = 0, creditVal = 0, otherVal = 0 }) => {
      const dataSource = [
        {value: projectVal || 0, name: '项目应收'},
        {value: creditVal || 0, name: '赊销应收'},
        {value: otherVal || 0, name: '其他应收'}
      ]
      setDataSource(dataSource)
    }
    // watch
    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          // 存在charts实例调用，否则不调用
          setOption()
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      },
      {
        immediate: true
      }
    )

    return {
      percent2,
      infos
    }
  }
})
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
