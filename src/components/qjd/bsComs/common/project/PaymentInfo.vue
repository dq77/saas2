<template lang="pug">
  //- span saasOrderStatus
  .payment-info
    el-table(:data="tableData" empty-text="暂无数据")
      el-table-column(:min-width="150")
        template(slot="header" slot-scope="{row}")
          span 付款节点
        template(slot-scope="{row}")
          el-select(v-model="row.paymentNode" style="width: 100%")
            el-option(v-for="(item, index) in paymentNodeList" :value="item.value" :label="item.label" :key="index")
      el-table-column(:min-width="150")
        template(slot="header" slot-scope="{row}")
          span 付款方式
        template(slot-scope="{row}")
          el-select(v-model="row.paymentType" style="width: 100%")
            el-option(v-for="(item, index) in paymentWayList" :value="item.value" :label="item.label" :key="index")
      el-table-column(:min-width="150")
        template(slot="header" slot-scope="{row}")
          span 预计付款时间
        template(slot-scope="{row}")
          el-date-picker.width-100(v-model="row.paymentDate" type="month" value-format="yyyy-MM" placeholder="请选择预计付款时间")
      el-table-column(width='180')
        template(slot="header" slot-scope="{row}")
          span 付款金额计算方式
        template(slot-scope="{row, $index}")
          el-radio-group(v-model="row.paymentComputeType" @change="(val) => clickPayCalculateType(val, $index)")
            el-radio(v-for='(item, index) in caculateWayList' :label="item.value" :key="index") {{item.label}}
      el-table-column(:min-width="150")
        template(slot="header" slot-scope="{row}")
          span 付款比例（%）
        template(slot-scope="{row, $index}")
            el-input(v-model.trim="row.paymentProportion" @blur='(val) => caculatePayAmountFunc(val, $index)' :disabled="row.paymentComputeType === 2" :placeholder="row.paymentComputeType===2?'自动生成付款比例':'请输入付款比例'")
      el-table-column(:min-width="150")
        template(slot="header" slot-scope="{row}")
          span 付款金额（元）
        template(slot-scope="{row, $index}")
            el-input(v-model.trim="row.paymentAmount" @blur='(val) => caculatePayRatioFunc(val, $index)' :disabled="row.paymentComputeType === 1" :placeholder="row.paymentComputeType===1?'自动生成付款金额':'请输入付款金额'")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row,$index}")
          span.delete-row(@click="deleteRow(row, $index)") 删除
    .table-add(@click="addRow")
      span 继续添加
</template>

<script>
import {paymentNodeList, paymentWayList, caculateWayList} from './const'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    surveyData: Object
  },
  setup(props, {emit}) {
    const {surveyData} = props
    const addRow = () => emit('addRow')
    const deleteRow = (row, index) => emit('deleteRow', {row, index})
    const caculatePayRatioFunc = (val, $index) => emit('caculatePayRatioFunc', {val, $index, surveyData})
    const caculatePayAmountFunc = (val, $index) => emit('caculatePayAmountFunc', {val, $index, surveyData})
    const clickPayCalculateType = (val, $index) => emit('clickPayCalculateType', {val, $index})
    return {
      paymentNodeList,
      paymentWayList,
      caculateWayList,
      clickPayCalculateType,
      caculatePayRatioFunc,
      caculatePayAmountFunc,
      addRow,
      deleteRow,
    }
  },
}
</script>

<style lang="stylus" scoped>
.table-add
  height 47px
  line-height 47px
  padding-left 20px
  color #3b68f0
  border: 1px solid #ebeef5
  border-top: 0 none
  cursor pointer
.delete-row
  color #3b68f0
  cursor: pointer
.u-red
  color #F25754
</style>
