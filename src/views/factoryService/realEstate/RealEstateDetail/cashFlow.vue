<template lang="pug">
Card(title='近三年经营活动产生的现金流净额是否连续为负（亿）' v-loading='loading')
  template(slot='headRight')
    .p-result(v-if='result') 结果：
      span.p-result-text(:class='result === "是" ? "p-red" : ""') {{result}}
  .p-table
    Table(
      :dataSource="financeData"
      :columns="columns"
    )

</template>

<script>
import Card from '@/components/Card'
import Table from '@/components/qjd/table/index'
import { currentYear } from './config'
import { reactive, toRefs, watch } from '@vue/composition-api'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Card,
    Table
  },
  setup(props) {
    const state = reactive({
      threeYears: [],
      columns: [],
      financeData: [],
      result: ''
    })
    const year = parseInt(currentYear)
    state.threeYears = [year - 2, year - 1, year]

    state.threeYears.map((item, key) => {
      state.columns.push({
        label: `${item}年`,
        key: `${item}`,
        align: 'right',
      })
    })

    // 连续为负，显示‘是’，除此之外，前一年为负，当前年为‘-’的则显示‘-’，否则，显示‘否’
    const validResult = (value) => {
      let result = JSON.stringify(value) !== '[{}]' ? '否' : '-'
      const results = []
      let currentValue
      for (const key in value[0]) {
        currentValue = value[0][key]
        if (currentValue === '-') {
          results.push(currentValue)
        } else {
          results.push(parseFloat(currentValue) < 0)
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (result !== '是') {
          if (results[i] === '-' && results[i - 1]) {
            result = '-'
          } else if (!results[i - 1]) {
            result = '否'
          } else if (results[i - 1] && results[i]) {
            result = '是'
          }
        }
      }
      state.result = result
    }

    watch(
      () => props.dataSource,
      (value) => {
        state.financeData.push({})
        state.threeYears.map((rankYear) => {
          for (const dataYear in value) {
            if (rankYear === parseInt(dataYear)) {
              state.financeData[0][`${rankYear}`] = value[dataYear].netcashOperate
            }
          }
        })
        validResult(state.financeData)
      }
    )

    return {
      ...toRefs(state)
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-table
  width 99.5%
.p-result
  margin-top 10px
  margin-right 25px
  text-indent 0
  cursor pointer
  color #494949
  line-height 50px
  font-size 12px
  border 1px solid #E0E0E0
  padding 4px 6px
  line-height 20px
  height 30px
  .p-result-text
    color #25BECD
  .p-red
    color #E05E62
</style>
