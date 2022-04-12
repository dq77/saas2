<template lang="pug">
//- 新增出、入库 - 表单
.content-form
  Form(
    ref="formRef"
    :formData="formState.formData"
    :formConfig="formState.formConfig"
    :formRules="formState.formRules"
    :inline="false"
    labelPosition="right"
    labelWidth="100px"
  )
    template(slot="name")
      span.tip
        i.el-icon-warning-outline
        span 订货大师可支持根据客户、产品维度配置限时折扣活动。
    template(slot="isPurchaseRestricted")
      div(style="margin-top: 10px;" v-if="formState.formData.isPurchaseRestricted === 'Y'")
        el-input-number(
          placeholder="请输入数量"
          type="number"
          v-model="formState.formData.restrictedQuantity"
          style="width: 100px;"
          :min="0"
          :controls="false"
        )
        span(style="margin-left: 10px;") 件，
        el-select(
          v-model="formState.formData.overRestrictedStrategy"
          style="width: 220px;margin-left: 10px;"
        )
          el-option(
            v-for="child in options"
            :key="child.value"
            :label="child.label"
            :value="child.value"
          )
    template(slot="isAllCustomerQualified")
      div(style="margin-top: 10px;" v-if="formState.formData.isAllCustomerQualified === 'N'")
        el-button(@click="viewCheck") 请选择客户
        span(style="margin-left: 10px;") 已选择 {{ formState.formData.qualifiedCustomerIdList && formState.formData.qualifiedCustomerIdList.length || 0 }} 个客户
        fragment( v-show="formState.formData.qualifiedCustomerIdList && formState.formData.qualifiedCustomerIdList.length > 0")
          span ，
          el-button(type="text" @click="viewCheck") 查看
    Drawer(
      ref="drawerRef"
      :checkbox="true"
      :visible="visible"
      @sureHandle="sureHandle"
      @closeHandle="() => (visible = false)"
    )
</template>

<script lang="ts">
import { ref, reactive, toRefs, Ref, nextTick } from '@vue/composition-api'
import Form from '@/components/qjd/form/index.vue'
import Drawer from '../../components/drawer/index.vue'
import useForm from 'hooks/useForm'
import { formConfig, formData, formRules, options } from './config'
export default {
  components: {
    Form,
    Drawer
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  setup(props, { root }) {
    // ref
    const visible = ref<Boolean>(false)
    // form
    const formRef = ref<Ref>()
    // drawer
    const drawerRef = ref<Ref>()
    // formState
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })
    // methods
    // 填充数据
    const initEditInfo = (data): void => {
      if (props.type) {
        props.type === 'edit' && formState.setFormItem('name', data.name)
        props.type === 'edit' && formState.setFormItem('activityTime', [data.startTime, data.endTime])
        formState.setFormItem('isPurchaseRestricted', data.isPurchaseRestricted)
        formState.setFormItem('restrictedQuantity', data.restrictedQuantity)
        formState.setFormItem('restrictedStatus', data.restrictedStatus)
        formState.setFormItem('overRestrictedStrategy', data.overRestrictedStrategy)
        formState.setFormItem('isAllCustomerQualified', data.isAllCustomerQualified)
        formState.setFormItem('qualifiedCustomerIdList', data.customerSimpleDetaiList)
      }
    }
    // methods
    const sureHandle = (list: Array<any>): void => {
      formState.setFormItem('qualifiedCustomerIdList', list)
      visible.value = false
    }
    const viewCheck = (): void => {
      visible.value = true
      if (props.type) handleNextTick()
    }
    const handleNextTick = async () => {
      await nextTick();
      // 利用定义的componentRef获取dom结构
      (drawerRef.value as any).initCustomer((formState.formData as any).qualifiedCustomerIdList)
    }
    // state
    const state = reactive({
      formState,
      customerList: []
    })
    return {
      visible,
      formRef,
      formConfig,
      options,
      formRules,
      sureHandle,
      viewCheck,
      initEditInfo,
      drawerRef,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="stylus" scoped>
.content-form
  width 465px
  .tip
    position absolute
    margin-left 10px
    color #909399
    width 100%
    i
      margin-right 10px
  >>>.el-col:nth-child(3), >>>.el-col:nth-child(4)
    label
      line-height 15px
  >>>.el-radio-group
    display: flex;
    flex-direction: column;
    label+label
      margin-top 10px
</style>
