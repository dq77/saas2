<template lang="pug">
.p-border
  #scoreChart
  .notice 特别提醒：该建议仅供您参考使用
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { defaultGuageOption, noneGuageOption, redGuageOption } from './config'
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
              setDataSource([
                {
                  value: Math.round(value.modelScore),
                  name: '当前分数',
                }
              ])
              setOption(defaultGuageOption)
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
.p-border
  margin-right 10px
  padding-top 20px
  margin-left -5%
  width 100%
  height 100%
  overflow hidden
  position relative
#scoreChart
  width 110%
  height 110%
.notice
  width 100%
  font-size 12px
  color #A9AFB8
  line-height 17px
  text-align center
  position absolute
  bottom 20px
  left 5%
</style>
