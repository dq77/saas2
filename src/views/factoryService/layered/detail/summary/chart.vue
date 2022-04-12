<template lang="pug">
.p-border
  .p-title 企业价值分数
  .p-grade-main
    #scoreChart
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { defaultGuageOption, noneGuageOption, redGuageOption } from '../config'
import useTimeout from 'hooks/useTimeout'
import { filterGradeInfo } from '@/utils/util'
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const text = ref('')

    const { perTimeout } = useTimeout()

    // chart
    const {
      setDataSource,
      chartInit,
      chartClear,
      setOption
    } = useCharts({
      option: defaultGuageOption,
      id: 'scoreChart',
      isInit: false
    })

    watch(
      () => props.detail,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          setDataSource([
            {
              value: Math.round(value.modelScore),
              name: '当前分数',
            }
          ])
          if (value.gmtModified && value.modelScore === 0) {
            text.value = '触发红线'
            setOption(redGuageOption)
          } else if (value.modelScore) {
            const gradeInfo = filterGradeInfo(value)
            if (gradeInfo.status === 6) {
              text.value = '请更新分数'
              setOption(noneGuageOption(text.value))
            } else {
              text.value = value.modelScore
              setOption()
            }
          } else {
            // text.value = value.realControllerId ? '生成中' : '信息不足'
            text.value = '生成中'
            setOption(noneGuageOption(text.value))
          }
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )

    return {
      text
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.p-border
  margin-right 10px
  width 40%
  height 25vw
  overflow hidden
.p-grade-main
  width 32vw
  height 25vw
  position relative
  padding-top 2vw
  margin -1vw 0 0 -3vw
#scoreChart
  width 100%
  height 25vw
</style>
