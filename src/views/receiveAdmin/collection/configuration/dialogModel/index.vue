<template lang="pug">
el-dialog(
  title='设置策略模型'
  width='1000px'
  custom-class='el-dialog-new'
  :visible='visible'
  @close='clickClose'
)
  Form(
    ref='formRef'
    labelWidth='105px'
    labelPosition='right'
    :inline='false'
    :formData='formState.formData'
    :formConfig='formState.formConfig'
    :formRules='formState.formRules'
    @selectFocus='selectFocus'
  )
    template(slot='strategys')
      .p-strategy-row(
        v-for='(strategy, index) in formState.formData.strategys'
        :key='strategy.strategyId'
      )
        //- 作用对象
        el-select(
          style='width: 200px; margin-right: 10px;'
          clearable
          placeholder='请选择作用对象'
          v-model='strategy.objectReferenceId'
          @change='v => strategyState.changeObjectReference(v, strategy)'
        )
          el-option(
            v-for='option in optionsState.objectReferenceOptions'
            :key='option.id'
            :value='option.id'
            :label='option.prefixText'
            :disabled='option.disabled'
          )
        //- 关系符号
        el-select(
          style='width: 90px; margin-right: 10px;'
          clearable
          placeholder='关系符号'
          v-model='strategy.compareWay'
        )
          el-option(
            v-for='option in optionsState.compareSymbolOptions'
            :key='option.value'
            :value='option.value'
            :label='option.label'
          )
        //- 数值
        el-input-number(
          style='width: 130px; margin-right: 10px;'
          clearable
          controls-position='right'
          :min='0'
          :precision='0'
          placeholder='整数'
          v-model='strategy.compareValue'
        )
        //- 结尾文案
        el-input(
          style='width: 330px; margin-right: 10px;'
          :disabled='true'
          v-model='strategy.suffixText'
        )
        el-button.p-btn-del(
          type='text'
          icon='el-icon-delete'
          v-show='formState.formData.strategys.length > 1'
          @click='strategyState.delStrategy(strategy, index)'
        ) 删除
      el-button(
        type='text'
        @click='strategyState.addStrategy'
        v-if='strategyState.showAddBtn'
      ) + 继续添加模型策略
  div(slot='footer')
    el-button(
      plain
      :loading='submitState.editLoading || submitState.createLoading'
      @click='clickClose'
    ) 取消
    el-button(
      type='primary'
      :loading='submitState.editLoading || submitState.createLoading'
      @click='clickSure'
    ) 确定
</template>

<script>
import { defineComponent, ref, reactive, toRefs, watch } from '@vue/composition-api'
import Form from '@/components/qjd/form/index'
import useForm from 'hooks/useForm'
import { formConfig, formData, formRules } from './config'
import useOptions from './useOptions'
import useStrategy from './useStrategy'
import useSubmit from './useSubmit'
import useDetail from './useDetail'

export default defineComponent({
  components: {
    Form
  },
  props: {
    mode: String, // create, edit
    visible: {
      type: Boolean,
      default: false
    },
    repayDayType: String, // 还款前、还款后
    urgeWay: String, // 系统、人工
    dimension: String, // 通用、时间
    phaseId: String,
    data: Object,
  },
  setup(props, { emit }) {
    const formRef = ref()
    // 表单
    const formState = useForm({
      formRef,
      formConfig,
      formData,
      formRules,
    })

    // 对select option的处理
    const optionsState = useOptions({
      repayDayType: props.repayDayType,
      urgeWay: props.urgeWay,
      formState,
    })
    // 对动态策略行的处理
    const strategyState = useStrategy({
      formState,
      optionsState,
    })
    // 提交处理
    const submitState = useSubmit({
      formState,
      strategyState,
    })

    const state = reactive({
      formState,
      optionsState,
      strategyState,
      submitState,
    })

    const selectFocus = ({ key }) => {
      if (key === 'receiver' && !formState.formData.receiver) {
        // focus时获取接收人optinos
        optionsState.getRoleOptions('')
      }
    }

    // 点击关闭
    const clickClose = () => emit('close')

    // 点击确定
    const clickSure = () => {
      if (props.mode === 'create') {
        submitState.createHandle(props, () => emit('success', 'create'))
      } else if (props.mode === 'edit') {
        submitState.editHandle(props, () => emit('success', 'edit'))
      }
    }

    // 如果为edit模式，则处理props.data，初始化formData
    watch(
      [() => props.mode, () => props.visible],
      ([mode, visible]) => {
        if (visible === true) {
          // 每次显示弹窗，初始化下拉项
          optionsState.init({
            repayDayType: props.repayDayType,
            urgeWay: props.urgeWay
          })
          if (mode === 'edit') {
            useDetail({
              urgeWay: props.urgeWay,
              formState,
              strategyState,
              propsData: props.data
            })
          } else {
            formState.resetFormData()
          }
        }
      }
    )

    // 切换系统催收或人工催收时，调整表单项的显示
    watch(
      () => props.urgeWay,
      (v) => {
        formState.setConfig('receiver', 'isHidden', v === 'SYSTEM')
        formState.setConfig('messageTemplateCode', 'isHidden', v === 'STAFF')
      }
    )

    return {
      formRef,
      ...toRefs(state),
      selectFocus,
      clickClose,
      clickSure,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-strategy-row
  margin-top 10px
  &:first-child
    margin-top 0
.p-btn-del
  color #f7564e
</style>
