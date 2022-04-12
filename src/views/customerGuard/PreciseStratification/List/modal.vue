<template lang="pug">
Modal(
  :title="title"
  :width="'330px'"
  :visible="visible"
  :cancleTxt="btnList.cancleTxt"
  :sureTxt="btnList.sureTxt"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    v-if='status === 1'
    ref="formRef"
    :inline="false"
    :formData="formState.formData",
    :formConfig="formState.formConfig"
    :formRules="formState.formRules"
    :labelWidth="'60px'"
    @selectChange="selectChange"
  )
  SuccessTip(v-else)
</template>
<script>
import { reactive, ref, toRefs, computed } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import SuccessTip from './successTip'
import useForm from 'hooks/useForm'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { addFormData, getAddFormConfig, addFormRules } from './config'

export default {
  components: {
    Modal,
    Form,
    SuccessTip,
  },
  props: {
    title: String,
    visible: Boolean,
  },
  setup(props, { root, emit }) {
    // ajax
    const {
      customer: { precise: { addCompany } },
      common: { getCompanyNameListByTYC }
    } = ajaxStore
    // state
    const state = reactive({
      status: 1,
      companyBasicCode: '',
      btnList: {},
      formState: {},
      searchState: {},
      submitState: {},
    })
    state.btnList = computed(() => {
      return {
        cancleTxt: state.status === 1 ? '取消' : '暂不评估',
        sureTxt: state.status === 1 ? '确定' : '立即开始',
      }
    })
    // 查询经销商名称下拉列表
    state.searchState = useAsync({
      init: false,
      isLoading: false,
      request: getCompanyNameListByTYC,
      preCallback: () => state.formState.setConfig('name', 'loading', true),
      errorCallBack: () => state.formState.setConfig('name', 'loading', true),
      successCallBack: ({ data }) => {
        data && data.length && state.formState.setConfig('name', 'options', data)
        state.formState.setConfig('name', 'loading', false)
      }
    })
    // ref
    const formRef = ref()
    // form
    state.formState = useForm({
      formRef,
      formData: addFormData,
      formConfig: getAddFormConfig(query => state.searchState.doResult({ name: query })),
      formRules: addFormRules
    })
    // 成功回调
    const _successCallBack = ({ code, data }) => {
      if (code === '0') {
        state.status = 2
        state.companyBasicCode = data
        state.cancleTxt = '暂不评估'
        state.sureTxt = '立即开始'
        emit('successHandle')
      }
    }
    // 选择公司补全信息
    const selectChange = ({ value, key }) => {
      if (key === 'name') {
        if (!state.searchState.result) return
        const current = state.searchState.result.find(item => item.name === value) || {}
        state.formState.setFormItem('creditCode', current.creditCode)
        state.formState.setFormItem('legalPersonName', current.legalPersonName)
      }
    }
    // 提交
    state.submitState = useAsync({
      init: false,
      request: addCompany,
      successCallBack: _successCallBack,
    })
    // 取消
    const cancleHandle = () => {
      emit('cancleHandle')
      setTimeout(() => {
        state.status = 1
      }, 500)
    }
    // 确定
    const sureHandle = () => {
      if (state.status === 1) {
        state.formState.submitHandle(form => {
          state.submitState.doResult({
            companyName: state.formState.formData.name,
            creditCode: state.formState.formData.creditCode,
            legalPersonName: state.formState.formData.legalPersonName,
          })
        })
      } else {
        root.$router.push({name: 'preciseStratificationEdit', query: {companyBasicCode: state.companyBasicCode}})
      }
    }

    return {
      formRef,
      selectChange,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.pay-detail
  padding 10px 0
.upload_title
  width 70px
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-all
</style>
