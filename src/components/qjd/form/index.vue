<template lang="pug">
el-form(
  ref="formRef"
  :class="[ 'form-box', labelPosition === 'top' ? 'form-box-label-top' : '' ]"
  :model="formData"
  :label-position="labelPosition"
  :label-width="labelWidth"
  :rules="formRules"
)
  el-row(
    :gutter='20'
    :class="inline ? '' : 'form-column'"
  )
    el-col(
      :span="inline ? item.span ? item.span : 6 : 24"
      v-for="item in formConfig"
      :key="item.key"
      :style="`height: ${ inline ? colHeight : '' }px`"
    )
      //- 使用v-show仍会被校验，此处改用v-if
      el-form-item(
        v-if="!item.isHidden"
        style="width: 100%;"
        :label="item.label"
        :label-width="item.labelWidth"
        :prop="item.key"
        :rules="item.rules"
        :error="item.info ? item.info : null"
        :class='[labelPosition==="top" ? "form-item-column" : labelPosition==="right" ? "form-item-inline form-item-right" : labelPosition==="left" ? "form-item-inline form-item-left" : "", item.infoType ? `${item.infoType}-form-item_info` : ""]'
      )
        //- text
        span(v-if="item.type === 'text'" ) {{ formData[item.key] }}
        //- input
        el-input(
          :style="`width: ${item.width ? item.width : '100%'};`"
          v-if="item.type === 'input'"
          v-model.trim="formData[item.key]"
          :placeholder="item.placeholder ? item.placeholder: `请输入${item.label}`"
          :disabled="item.disabled ? item.disabled : false"
          :type="item.kind ? item.kind : 'text'"
          :class=" item.kind === 'number' ? 'global-input-number' : '' "
          @change="val => inputChange(val, item.key, item)"
          :maxlength="item.maxlength ? item.maxlength : null"
          :clearable='item.clearable ? item.clearable : false'
          :rows='item.rows || 2'
          show-word-limit
        )
          //- input后置内容
          template(slot="append")
            slot(:name="item.inputAppend")
        //- inputNumber
        el-input-number(
          :style="`width: ${item.width ? item.width : '100%'};`"
          :class="item.unit ? 'input_number_unit' : ''"
          v-if="item.type === 'inputNumber'"
          v-model="formData[item.key]"
          :disabled="item.disabled ? item.disabled : false"
          :controls-position="item.controlsPosition ? item.controlsPosition : 'right'"
          :min="Object.prototype.toString.call(item.min) === '[object Number]' ? item.min : -Infinity"
          :max="Object.prototype.toString.call(item.max) === '[object Number]' ? item.max : Infinity"
          :precision="item.precision ? item.precision : null"
          :step="item.step ? item.step : 1"
          :controls="!item.nocontrols"
          @change="val => inputNumberChange(val, item.key, item)"
        )
        //- cascader
        el-cascader(
          :style="`width: ${item.width ? item.width : '100%'};`"
          v-if="item.type === 'cascader'"
          v-model="formData[item.key]"
          :options="item.options"
          :props="item.props"
          :disabled="item.disabled ? item.disabled : false"
          :placeholder="item.placeholder ? item.placeholder: `请选择${item.label}`"
          :clearable='item.clearable ? item.clearable : false'
          :filterable='item.filterable ? item.filterable : false'
          @change='val => selectChange(val, item.key, item)'
        )
        //- select
        el-select(
          :style="`width: ${item.width ? item.width : '100%'};`"
          v-if="item.type === 'select'"
          v-model="formData[item.key]"
          :value-key='item.valueKey ? item.valueKey : ""'
          :multiple='item.multiple ? item.multiple : false'
          :filterable="item.filterable ? item.filterable : false"
          :remote='item.remote ? item.remote : false'
          :loading="item.loading ? item.loading : false"
          :disabled="item.disabled ? item.disabled : false"
          :placeholder="item.placeholder ? item.placeholder: `请选择${item.label}`"
          :clearable='item.clearable ? item.clearable : false'
          :remote-method="item.remoteMethod ? (query) => item.remoteMethod(query, item.key, item) : null"
          :collapse-tags="item.collapseTags ? true : false"
          :allow-create='item.allowCreate ? true : false'
          @change="val => selectChange(val, item.key, item)"
          @focus='val => selectFocus(val, item.key, item)'
          :maxlength='item.maxlength ? item.maxlength : 1000 '
        )
          //- group
          template(v-if="item.group")
            el-option-group(
              v-for="(group, index) in item.options"
              :key="index"
              :label="item.otherKeys ? group[item.otherKeys.label] : group.label"
            )
              el-option(
                v-for="(child, i) in group.options"
                :key="i"
                :label="item.otherKeys ? child[item.otherKeys.label] : child.label"
                :value="item.otherKeys ? child[item.otherKeys.value] : child.value"
              )
          //- default
          template(v-else)
            el-option(
              v-for="(child, index) in item.options"
              :key="index"
              :label="item.otherKeys ? child[item.otherKeys.label] : child.label"
              :value="item.otherKeys ? child[item.otherKeys.value] : child.value"
            )
        //- datePicker
        el-date-picker(
          :style="`width: ${item.width ? item.width : '100%'};`"
          v-if='item.type==="datePicker"'
          v-model='formData[item.key]'
          :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
          :format="item.format ? item.format : 'yyyy-MM-dd'"
          :type='item.kind ? item.kind : "date"'
          :disabled='item.disabled ? item.disabled : false'
          :start-placeholder='item.kind==="daterange" || item.kind==="datetimerange" ? "开始日期" : ""'
          :end-placeholder='item.kind==="daterange" || item.kind==="datetimerange" ? "结束日期" : ""'
          :placeholder='item.placeholder ? item.placeholder : `请输入${item.label}`'
          :clearable='item.clearable ? item.clearable : false'
          :picker-options="item.pickerOptions ? item.pickerOptions : {}"
          :range-separator="item.rangeSeparator ? item.rangeSeparator : '-'"
          @change="val => datePickerChange(val, item.key, item)"
        )
        //- 含长期的时间起始
        template(v-if='item.type==="longDatePicker"')
          el-row()
            el-col(:span='9')
              el-date-picker(
                :style="`width: ${item.width ? item.width : '100%'};`"
                v-model='formData[item.key][item.longStart]'
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                type='date'
                :disabled='item.disabled ? item.disabled : false'
                :placeholder='item.placeholder ? item.placeholder : `请输入开始时间`'
                :clearable='item.clearable ? item.clearable : false'
                :picker-options="item.pickerOptions ? item.pickerOptions : {}"
                @change="val => longDatePickerChange(val, item.key, item.longStart, item)"
              )
            el-col.text-center(:span='2') 至
            el-col(:span='9')
              el-date-picker(
                :style="`width: ${item.width ? item.width : '100%'};`"
                v-model='formData[item.key][item.longEnd]'
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                type='date'
                :disabled='(item.disabled ? item.disabled : false) || (formData[item.key][item.islong])'
                :placeholder='item.placeholder ? item.placeholder : `请输入结束时间`'
                :clearable='item.clearable ? item.clearable : false'
                :picker-options="item.pickerOptions ? item.pickerOptions : {}"
                @change="val => longDatePickerChange(val, item.key, item.longEnd, item)"
              )
            el-col.text-right(:span='4')
              el-checkbox(v-model='formData[item.key][item.isLong]'  @change='val => longDatePickerChange(val, item.key, item.isLong, item)') 长期
        //- switch
        el-switch(
          v-if="item.type === 'switch'"
          v-model="formData[item.key]"
          :active-color="item.activeColor ? item.activeColor : '#3c5da4'"
          :inactive-color="item.inactiveColor ? item.inactiveColor : '#C0CCDA'"
          :active-value="item.activeValue || item.activeValue === 0 ? item.activeValue : true"
          :inactive-value="item.inactiveValue || item.inactiveValue === 0 ? item.inactiveValue : false"
        )
        //- el-checkbox-group
        el-checkbox-group(
          v-if="item.type === 'checkboxGroup'"
          v-model="formData[item.key]"
          @change="val => checkboxGroupChange(val, item.key, item)"
        )
          el-checkbox(
            v-for="(child, index) in item.options"
            :key="index"
            :label="child.value"
          ) {{ child.label }}
        //- radio
        el-radio-group(
          v-if="item.type === 'radio'"
          v-model="formData[item.key]"
          @change="val => radioChange(val, item.key, item)"
          :disabled="item.disabled ? item.disabled : false"
        )
          el-radio(
            v-for="(child, index) in item.options"
            :key="index"
            :label="child.value"
          ) {{ child.label }}
        //- slot
        slot(:name="item.slotName" :data="formData" :config='item')
        //- input-number-单位
        Unit(:unit="item.unit" :left="item.unitLeft" v-if="item.unit && item.type === 'inputNumber'")
        template(slot="label")
          slot(:name="item.labelKey")
    slot

    //- 搜索、重置按钮，默认隐藏。type为search时显示
    .table-search-con(v-if="type === 'search'" :class="formConfig.length % 4 === 0 ? 'table-search-con2' : ''")
      el-button.search-button(type="primary" @click="searchFormHandle" :loading="searchBtnLoading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
</template>
<script>
/**
 * 场景：适用于所有表单类提交包括查询，配合hooks/useForm使用，目前组件仅有开发遇到的场景，缺啥补啥，根据实际场景扩展form组件
 * @param type form使用场景，为search时表示用在表格搜索，默认空
 * @param formData form数据，例： { demo: '' }
 * @param formConfig form配置，和formData一一对应，例： [{ type: 'input', key: 'demo', label: '我是demo' }]
 * @param formRules  form验证规则，与element保持一致，例如{ demo: [ { required: true, message: '请输入demo', trigger: 'change' } ] }
 * @param inline 是否为inline表单
 * @param labelPosition label位置
 * @param labelWidth label宽度，通常inline模式需定义
 * @param isShadow 偏业务的配置，是否有阴影等
 * @param customStyle 自定义插槽的样式
 * @param searchBtnLoading search时按钮的loading
 * @param colHeight inline为true时el-col默认高度
 */

/** formConfig 通用配置，至于各type类型的组件配置参考element，可自行扩展配置
 * @param width 宽度
 * @param type 类型，现有input/inputNumber/select等
 * @param v-model 绑定对应的formData-key
 */

import { ref } from '@vue/composition-api'
// inputNumber单位组件
import Unit from './unit'

export default {
  components: {
    Unit
  },
  props: {
    type: String,
    formData: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Array,
      default: () => ([])
    },
    formRules: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: 'top'
    },
    labelWidth: String,
    isShadow: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    searchBtnLoading: {
      type: Boolean,
      default: false
    },
    colHeight: {
      type: Number,
      default: 80
    }
  },
  setup(props, { emit, slots }) {
    const formRef = ref()
    // 提交，触发校验
    const submitHandle = () => new Promise(resolve => {
      if (!formRef.value) {
        console.warn('form ref is null')
        resolve(false)
        return
      }
      formRef.value.validate(valid => resolve(valid))
    })
    // 校验表单部分字段
    const validateField = (val) => {
      if (!formRef.value) return console.warn('form ref is null')
      formRef.value.validateField(val)
    }
    // 重置表单
    const resetHandle = () => {
      if (!formRef.value) return console.warn('form ref is null')
      formRef.value.resetFields()
    }
    // 清空校验
    const clearValidate = (val) => {
      if (!formRef.value) return console.warn('form ref is null')
      formRef.value.clearValidate(val)
    }
    // 获取form-ref
    const getFormRef = () => {
      if (!formRef.value) {
        console.warn('form ref is null')
        return null
      }
      return formRef.value
    }
    // input-change
    const inputChange = (value, key, item) => emit('inputChange', { value, key, item })
    // inputNumber-change
    const inputNumberChange = (value, key, item) => emit('inputNumberChange', { value, key, item })
    // select-change
    const selectChange = (value, key, item) => emit('selectChange', { value, key, item })
    // select-focus
    const selectFocus = (value, key, item) => emit('selectFocus', { value, key, item })
    // datePicker-change
    const datePickerChange = (value, key, item) => emit('datePickerChange', { value, key, item })
    // 含长期类型的时间插件
    const longDatePickerChange = (value, key, type, item) => emit('longDatePickerChange', { value, key, type, item })
    // cascaderChange
    const cascaderChange = (value, key, item) => emit('cascaderChange', { value, key, item })
    // checkbox-group-change
    const checkboxGroupChange = (value, key, item) => emit('checkboxGroupChange', { value, key, item })
    // radio-change
    const radioChange = (value, key, item) => emit('radioChange', { value, key, item })

    // 搜索、重置
    const searchFormHandle = () => emit('searchFormHandle')
    const resetFormHandle = () => emit('resetFormHandle')

    return {
      formRef,
      slots,
      submitHandle,
      validateField,
      resetHandle,
      clearValidate,
      getFormRef,
      inputChange,
      inputNumberChange,
      selectChange,
      selectFocus,
      datePickerChange,
      longDatePickerChange,
      cascaderChange,
      checkboxGroupChange,
      radioChange,
      // 搜索、重置操作
      searchFormHandle,
      resetFormHandle
    }
  }
}
</script>
<style lang="stylus" scoped>
.form-box
  width: 100%;
  >>>.el-form-item__content
    margin-left 0 !important
.form-box-label-top
  >>>.el-form-item--small
      .el-form-item__label
        line-height 20px
.form-column
  display flex
  flex-direction column
.form-sumbit
  float right
  padding-top 31px
  margin-right 10px
.form-item-column
  display flex
  flex-direction column
.form-item-inline
  display flex
  >>>.el-form-item__content
    flex 1
    width 0
// 自定义error信息相关css
.info-form-item_info
  >>>.el-form-item__error
    color #67C23A
  >>>&.is-error
    .el-form-item__content
      .el-select
        .el-input__inner
          border-color #67C23A
.error-form-item_info
  >>>.el-form-item__error
    color #F56C6C
  >>>&.is-error
    .el-form-item__content
      .el-select
        .el-input__inner
          border-color #F56C6C
    width 0
.input_number_unit
  >>>.el-input
    input
      padding-right 55px
</style>
