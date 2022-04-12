<!--
 * @Date: 2021-07-20 15:52:25
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-02 16:54:15
-->
<template lang="pug">
.time-range-picker
  el-select.range-type-select(v-model="timeRange" @change='changeRange')
    el-option(label="累计" :value="1")
    el-option(label="按年" :value="2")
    el-option(label="按月" :value="3")
  .choose-card.total(v-if='timeRange === 1')
    el-date-picker(disabled placeholder='选择时间' :clearable='false')
  .choose-card.year(v-if='timeRange === 2')
    el-date-picker(v-model="yearValue" type="year" @change='changeTime' :editable='false' :picker-options="pickerOptions" value-format='yyyy' :clearable='false')
  .choose-card.month(v-if='timeRange === 3')
    el-date-picker(v-model="monthValue" type="month" @change='changeTime' :editable='false' :picker-options="pickerOptions" value-format='yyyy-MM' :clearable='false')
</template>
<script>
// import ajaxStore from '@/apis'
import { onMounted, reactive, ref } from '@vue/composition-api'

export default {
  props: {
    range: {
      type: Number,
      defaultValue: 1
    }
  },
  components: {
  },
  setup(props, context) {
    const timeRange = ref(props.range || 1)
    const yearValue = ref(`${new Date().getFullYear()}`)
    const monthValue = ref(`${new Date().getFullYear()}-${new Date().getMonth()}`)
    const pickerOptions = { disabledDate(time) { return time.getTime() > Date.now() } }
    const chooseVal = reactive({
      type: timeRange,
      year: yearValue,
      month: monthValue
    })
    // const loading = ref(true)
    // const totalInfo = reactive({
    //   data: 2
    // })
    // const getTotalInfo = async () => {
    // const { supplyChain: { getOrderBasicInfo } } = ajaxStore
    //   loading.value = true
    //   const res = await getOrderBasicInfo({ id: '54' })
    //   loading.value = false
    //   if (res.data && res.data.code === '0') {
    //     totalInfo.data = res.data.code
    //   }
    // }
    const changeTime = () => {
      context.emit('change', chooseVal)
    }
    const changeRange = () => {
      context.emit('change', chooseVal)
    }
    onMounted(() => {
      // getTotalInfo()
    })

    return {
      pickerOptions,
      timeRange,
      yearValue,
      monthValue,
      changeTime,
      changeRange,
      // loading,
      // totalInfo
    }
  },
}
</script>
<style lang="stylus">
.time-range-picker
  text-indent 0
  display flex
  .range-type-select
    width 74px
  .choose-card
    margin-left 10px
    width 90px
    .el-input, .el-input__inner
      width 90px
      padding-right 0
</style>
