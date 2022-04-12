<template lang="pug">
.history-sales
  .history-sales-item(
      v-for='(item, key) in shipmentHistory'
      :key='key'
    )
      el-form.history-sales-item__form(
        ref='shipmentHistoryFormRef'
        :model='shipmentHistory[key]'
      )
        el-form-item(
          prop='year'
          label='年份'
          :rules='shipmentHistoryFormConfig[0].rules'
        )
          el-select(
            v-model='shipmentHistory[key].year'
            @change='change'
          )
            el-option(
              v-for='(option, index) in shipmentHistoryFormConfig[0].options'
              :key='index'
              :label='option.label'
              :value='option.value'
            )
        el-form-item.history-sales-item__input(
          prop='shipment'
          label='出货金额'
          :rules='shipmentHistoryFormConfig[1].rules'
        )
          el-input(
            v-model='shipmentHistory[key].shipment'
            @change='change'
            placeholder="请输入出货金额"
          )
            template(slot="append")
              span 万元
      .history-sales-item-btn-group
        .history-sales-item__button(@click='addLine(key)' v-if='key < shipmentHistoryFormConfig[0].options.length - 1 && key === shipmentHistory.length -1') +
        .history-sales-item__button.delete(@click='deleteLine(key)' v-if='shipmentHistory.length !== 1') -

</template>

<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import { shipmentHistoryFormConfig, shipmentHistoryDefault } from './config'
import { deepCopy } from '@/utils/qjd'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const shipmentHistoryFormRef = ref(null)
    const state = reactive({
      shipmentHistory: [deepCopy(shipmentHistoryDefault)]
    })

    const change = (value) => {
      emit('change', state.shipmentHistory)
    }

    // 添加行
    const addLine = () => {
      state.shipmentHistory.push(deepCopy(shipmentHistoryDefault))
      change()
    }
    // 删除行
    const deleteLine = (index) => {
      state.shipmentHistory.splice(index, 1)
      change()
    }

    const valid = async () => {
      return new Promise((resolve, reject) => {
        let valid = true
        for (const i in shipmentHistoryFormRef.value) {
          shipmentHistoryFormRef.value[i].validate((result) => {
            if (!result) {
              valid = false
            }
          })
          if (parseFloat(i) === shipmentHistoryFormRef.value.length - 1) {
            resolve(valid)
          }
        }
      })
    }

    watch(
      () => props.dataSource,
      (value) => {
        if (value.length) {
          state.shipmentHistory = value
        }
      }
    )

    return {
      shipmentHistoryFormRef,
      shipmentHistoryFormConfig,
      addLine,
      deleteLine,
      change,
      valid,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.history-sales-item
    display flex
    align-items center
    &__form
      width 500px
      margin-right 30px
      display flex
      /deep/.el-form-item__label
        display none
    &__input
      width 300px
      margin-left 20px
    &__button
      width 16px
      height 16px
      border-radius 50%
      border 1px solid #848484
      color #848484
      font-size 18px
      text-align center
      line-height 16px
      cursor pointer
      margin-top -18px
      margin-right 10px
    &__button.delete
      font-size 28px
      line-height 10px
  .history-sales-item-btn-group
    display flex
    justify-content flex-start
</style>
