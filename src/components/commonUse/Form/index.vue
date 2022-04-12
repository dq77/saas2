<template lang="pug">
  .form-wrap
    el-form(ref='formRef' :model='formData' :label-position='labelPosition' :rules="rules")
      el-row(:gutter='20' :class='inline ? "form-inline" : "form-column"')
        el-col(v-for='item in formConfig' :span='inline ? item.span ? item.span : 6 : 24' :key='item.key' )
          template(v-if='item.type==="dynamicInput"' name='dynamicInput' )
            el-form-item(
              v-for='(dyItem, index) in formData[item.key]'
              :label='index===0 ? item.label : "\u2002"'
              :key='dyItem.key'
              :prop='`${item.key}.${index}.value`'
              class='dynamicInputStyle'
              :class='labelPosition==="top" ? "form-item-column" : "form-item-inline"'
            )
              el-input(v-model='dyItem.value' :placeholder='dyItem.placeholder ? dyItem.placeholder : `请输入${item.label}`' :clearable='dyItem.clearable ? dyItem.clearable : true')
              .form-item-oprate
                el-button(v-if='index === formData[item.key].length - 1' type='primary' class='form-item-oprate_btn form-item-oprate_add' icon='el-icon-plus' @click='addDymicInput')
                el-button(v-else type='primary' class='form-item-oprate_btn form-item-oprate_del' icon='el-icon-minus' @click='removeDymicInput(dyItem)')
          el-form-item(v-else :label='item.label' :prop='item.key' style='width: 100%;' :class='labelPosition === "top" ? "form-item-column" : "form-item-inline"')
            el-input(
              class="el-form-item-child"
              v-if='item.type==="input"'
              v-model='formData[item.key]'
              :type='item.kind ? item.kind : "text"'
              :disabled='item.disabled ? item.disabled : false'
              :placeholder='item.placeholder ? item.placeholder : `请输入${item.label}`'
              :clearable='item.clearable ? item.clearable : true'
            )
            el-date-picker(
              style='width:100%'
              class="el-form-item-child"
              v-if='item.type==="datePicker"'
              v-model='formData[item.key]'
              :type='item.kind ? item.kind : "data"'
              :disabled='item.disabled ? item.disabled : false'
              :start-placeholder='item.kind==="daterange" ? "开始日期" : ""'
              :end-placeholder='item.kind==="daterange" ? "结束日期" : ""'
              :placeholder='item.placeholder ? item.placeholder : `请输入${item.label}`'
              :clearable='item.clearable ? item.clearable : true'
              :value-format='item.format ? item.format : "yyyy-MM-dd"'
            )
            el-select(
              style='width:100%'
              class="el-form-item-child"
              v-if='item.type==="select"'
              v-model='formData[item.key]'
              :filterable='item.filterable ? item.filterable : true'
              :remote='item.remote ? true : false'
              :remote-method='(query) => item.remoteMethod(query, item)'
              :disabled='item.disabled ? item.disabled : false'
              :placeholder='item.placeholder ? item.placeholder : `请选择${item.label}`'
              :clearable='item.clearable ? item.clearable : true'
              @change='item.handleChange ? (val) => item.handleChange(val, item) : ""'
              :loading='item.loading ? item.loading : false'
            )
              el-option(
                v-for='(option, index) in item.options'
                :key='index'
                :label='item.optionObj ? option[item.optionObj.label] : option.label'
                :value='item.optionObj ? option[item.optionObj.value] : option.value'
              )
        div(:class='inline ? "form-sumbit" : "form-sumbit-center"')
          slot
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Array,
      default: () => ([])
    },
    inline: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: 'top'
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    addDymicInput() {
      this.$emit('addDymicInput')
    },
    removeDymicInput(dyItem) {
      this.$emit('removeDymicInput', dyItem)
    },
    _updateOption(key, options = []) {
      const item = this.formConfig.find(item => item.key === key)
      if (!item) return
      item.options = options
    },
  }
}
</script>

<style lang="stylus" scoped>
.form-wrap
  >>>.el-form-item--small
      .el-form-item__label
        line-height 20px
        min-width 80px
.form-column
  display flex
  flex-direction column
.dynamicInputStyle
  >>>.el-form-item__content
    display flex
.form-item-inline
  display flex
  >>>.el-form-item__content
    flex 1
.form-item-column
  display flex
  flex-direction column
.form-sumbit
  float right
  padding-top 31px
  margin-right 10px
.form-sumbit-center
  text-align center
.form-item-oprate
  &_btn
    width 20px
    height 20px
    padding 0 4px
    margin-top 6px
    margin-left 20px
  &_add
    background-color #25BECD
    border #25BECD
  &_del
    background-color #FF3E00
    border #FF3E00
</style>
