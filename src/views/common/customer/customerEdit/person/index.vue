<template lang="pug">
Card(noTitle v-loading='detailState && detailState.loading')
  Form(
    ref='formRef'
    labelPosition='right'
    labelWidth='120px'
    :formData='formState.formData'
    :formConfig='formState.formConfig'
    :formRules='formState.formRules'
    @checkboxGroupChange='formEditState.checkboxGroupChange'
  )
    template(slot='loginFlagLabel')
      span 客户登录账号开通
      el-tooltip(placement='top')
        div(slot='content')
          | 输入联系手机号后可开通客户登录账号<br>账号开通后无法再修改当前客户登录账号
        i.el-icon-info
  .p-btns
    el-button(
      type='primary'
      :loading='bottomBtnsState.saveLoading'
      @click='bottomBtnsState.clickSave'
    ) 保存
    el-button(
      plain
      @click='bottomBtnsState.clickBack'
    ) 返回
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useFormEdit from './useFormEdit'
import useBottomBtns from './../useBottomBtns'
import {getFormData, formConfig, formRules} from './config'
import useDetail from './useDetail'
import useFormStatus from './useFormStatus'

export default {
  components: {
    Form,
    Card,
  },
  setup(props, { root }) {
    const routeName = root.$route.name
    const { customerId } = root.$route?.query ?? {}
    const formRef = ref()

    const formState = useForm({
      formRef,
      formData: getFormData(),
      formConfig,
      formRules,
    })

    const formStatusState = useFormStatus({
      routeName,
      formState
    })

    const formEditState = useFormEdit({
      routeName,
      formState,
      formStatusState,
    })


    const bottomBtnsState = useBottomBtns({
      routeName,
      customerId,
      formState
    })

    const state = reactive({
      formState,
      formEditState,
      bottomBtnsState,
      detailState: null
    })

    if (routeName === 'customerEdit') {
      state.detailState = useDetail({
        customerId,
        routeName,
        formState,
        formStatusState,
      })
    } else {
      formStatusState.initCreate()
    }

    return {
      formRef,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-btns
  text-align center
</style>
