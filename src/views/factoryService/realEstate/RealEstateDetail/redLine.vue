<template lang="pug">
Card(title='三条红线标准' v-loading='loading || historyLoading')
  template(slot='afterTitle')
    .p-result-main(v-if='result')
      span.p-result-icon(:style='{background: result.color}') {{result.name}}
    .p-tips 注：该报告数据取自于三方网站，不含引导意味，仅供参考
  template(slot='headRight')
    .p-tab-btns
      .p-tab-item(:class='!isHistory ? "p-tab-current" : ""' @click='changeType(false)') 当前
      .p-tab-item(:class='isHistory ? "p-tab-current" : ""' @click='changeType(true)' v-if='historyData && historyData.cashFlowsCoverageRatio && historyData.cashFlowsCoverageRatio.value') 历史
  .p-module-content
    RedBlueBar(:config='threeRedLineConfig' :data='historyData' v-if='isHistory')
    RedBlueBar(:config='threeRedLineConfig' :data='threeRedLineData' v-else)
</template>

<script>
import { watch, reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import useRedLine from '../hooks/useRedLine'
import RedBlueBar from '../components/redBlueBar'
import { resultEnums, threeRedLineConfig } from './config'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    }
  },

  components: { Card, RedBlueBar },

  setup(props, { root }) {
    const state = reactive({
      result: null,
      isHistory: false
    })
    const { loading, doResult, threeRedLineData } = useRedLine({
      threeRedLineConfig
    })
    const { loading: historyLoading, doResult: historyDoResult, threeRedLineData: historyData } = useRedLine({
      threeRedLineConfig
    })

    const changeType = (isHistory) => {
      state.isHistory = isHistory
      if (isHistory) {
        historyDoResult({
          companyName: props.companyName,
          isHistory: '1'
        })
      } else {
        doResult({
          companyName: props.companyName
        })
      }
    }

    const validResult = (data) => {
      let count = 0
      const params = [
        'netDebtRatio',
        'ebtratioaftereliminatedepositreceived',
        'cashFlowsCoverageRatio'
      ]
      params.map((item) => {
        if (data[item].text === '暂无数据') {
          state.result = {
            name: '暂无数据',
          }
        }
        if (data[item].result) {
          count = count + 1
        }
      })
      if (state.result?.name === '暂无数据') return
      state.result = resultEnums[count]
    }

    watch(
      () => props.companyName,
      (value) => {
        doResult({
          companyName: value
        })
        historyDoResult({
          companyName: value,
          isHistory: '1'
        })
      }
    )

    watch(
      () => threeRedLineData.value,
      (value) => {
        validResult(value)
      }
    )

    return {
      loading,
      threeRedLineData,
      threeRedLineConfig,
      historyLoading,
      historyData,
      changeType,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-tips
  text-indent 0
  color #738A9E
  line-height 50px
  font-size 12px
.p-result-main
  height 40px
  margin-right 10px
  .p-result-icon
    color #ffffff
    background #E05E62
    padding 2px
    border-radius 2px
    font-size 12px
    margin 12px 0 0 10px
    min-width 30px
    height 22px
    line-height 20px
    display block
.p-tab-btns
  display flex
  line-height 18px
  margin 10px 13px 0 0
  .p-tab-item
    padding 5px 10px
    color #494949
    border 1px solid #EAEBEE
    border-left none
    font-size 12px
    cursor pointer
    width 46px
    display block
  .p-tab-item:last-child
    border-top-left-radius 0
    border-bottom-left-radius 0
    border-top-right-radius 4px
    border-bottom-right-radius 4px
  .p-tab-item:first-child
    border-left 1px solid #EAEBEE
    border-top-left-radius 4px
    border-bottom-left-radius 4px
  .p-tab-item.p-tab-current
    color #3B68F0
</style>
