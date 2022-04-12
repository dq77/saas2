<template lang="pug">
//- 新增出、入库 - 表单
.w50
  Form(
    ref='formRef'
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'100px'"
    :formConfig='formState.formConfig'
    :formData='formState.formData'
    :formRules='formState.formRules'
  )
    template(slot="warehouseId")
      el-button.set(
        @click="setHandle"
        type="text"
      ) 去设置
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import { formConfig, formData, formRules, outFormConfig, outFormRules, outFormData } from './config'
import ajaxStore from '@/apis'
import { toDateStr } from '@/utils/util'

export default {
  components: {
    Form,
  },
  setup(props, { root }) {
    // 入库inAdd，出库outAdd
    const { $route: { name }, $router } = root

    // form ref
    const formRef = ref({})
    const { factory: { wmwarehouseinfoList } } = ajaxStore

    // formState
    const formState = useForm({
      formRef,
      formConfig: name === 'inAdd' ? formConfig : outFormConfig,
      formData: name === 'inAdd' ? formData : outFormData,
      formRules: name === 'inAdd' ? formRules : outFormRules,
    })
    const state = reactive({
      formState,
    })

    // 默认填充当前时间
    state.formState.setFormItem('businessDatetime', toDateStr(new Date(), 'yyyy-MM-dd hh:mm:ss'))

    // 仓库列表接口
    useAsync({
      isLoading: false,
      request: wmwarehouseinfoList,
      successCallBack: ({ data }) => {
        if (data?.length) {
          const { setConfig } = state.formState
          setConfig && setConfig('warehouseId', 'options', data)
        }
      }
    })
    // 去设置
    const setHandle = () => $router.push({ name: 'setBase', query: { id: 'warehouseConfig' } })

    return {
      formRef,
      setHandle,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="stylus" scoped>
.w50
  width 50%
.set
  position: absolute
  right: -50px
</style>
