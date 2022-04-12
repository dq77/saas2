<template lang="pug">
.page-main
  .choose-company
    .choose-company__title {{modeData[mode]}}
    Form.choose-company__form(
      :class='searching ? "no-border" : ""'
      ref="formRef"
      :inline='true'
      :formData="formApis.formData",
      :formConfig="formApis.formConfig"
      :formRules='formApis.formRules'
    )
      template(slot='customerName')
        SearchBar(@select='setCompanyName' @loading='setStatus')
      .choose-company__line(v-if='mode === "fast"' :class='searching ? "no-border" : ""')
      el-button.choose-company__btn(type='primary' @click='submit' :loading='loading') 发起评估
</template>

<script>
import { modeData, formConfig, formData, formRules, fastRules, nextRoute } from './config'
import Form from '@/components/qjd/form'
import SearchBar from './searchBar'
import useForm from 'hooks/useForm'
import { reactive, ref, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  components: {
    Form,
    SearchBar
  },
  setup(props, { root }) {
    const { mode } = root.$route.query

    // ref
    const formRef = ref()
    // ajax
    const { riskExperts: { creditEvaluation: { accurateCreate } } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig: formConfig({mode}), formRules })
    if (mode === 'fast') {
      formApis.setFormRule('actualController', 0, fastRules)
      formApis.setConfig('actualController', 'isHidden', false)
    }
    const { loading, doResult } = useAsync({
      request: accurateCreate,
      init: false,
    })
    // 提交
    const submit = () => {
      let result = false
      formApis.submitHandle(() => {
        result = true
        if (mode === 'fast') {
          weblogsDom('赊销评估-快速评估-实控人输入页-点击发起评估')
        }
        if (mode === 'accurate') {
          formApis.setFormItem('evaluateMode', 'ACCURATE_MODE')
          doResult(formApis.formData).then((res) => {
            if (res.code === '0') {
              root.$router.push({
                name: 'evaluationSubmitSuccess',
                query: {
                  step: 'first'
                }
              })
            }
          })
        } else {
          root.$router.push({
            name: nextRoute[mode],
            params: {
              formData: formApis.formData,
            },
            query: {
              mode
            }
          })
        }
      })
      if (!result) {
        const { customerName, actualController } = formApis.formData
        if (!customerName) {
          root.$message.error('请输入公司全称/简称/关键字')
        } else if (mode === 'fast' && !actualController) {
          root.$message.error('请输入实控人姓名')
        }
      }
    }
    const setCompanyName = ({companyName, creditCode, legalPersonName}) => {
      formApis.setFormItem('customerName', companyName)
      formApis.setFormItem('uniformCreditCode', creditCode)
      formApis.setFormItem('corporateRepresentative', legalPersonName)
      state.searching = false
    }
    const goBack = () => {
      root.$router.go(-1)
    }
    const setStatus = (result) => {
      state.searching = result
    }
    // state
    const state = reactive({
      formApis,
      searching: false
    })

    return {
      setStatus,
      loading,
      formRef,
      modeData,
      mode,
      submit,
      setCompanyName,
      formRules,
      goBack,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.choose-company
  background url(//qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/choose-company-bg.png) center 300px no-repeat #ffffff
  background-size 60%
  padding 63px 20px 20px 20px
  min-height 90vh
  &__title
    color #494949
    font-size 30px
    text-align center
    margin-bottom 44px
  &__form
    width 80%
    margin 0 auto
    border 1px solid #dcdfe6
    height 48px
    overflow hidden
    border-radius 8px
    position relative
  &__form.no-border
    border-left 1px solid #ffffff
    border-right 1px solid #ffffff
  &__line
    height 30px
    border-left 1px solid #979797
    position absolute
    left 40.5%
    top 10px
  &__line.no-border
    display none
  &__btn
    position absolute
    right 0
    top 0
    height 46px
    width calc((1/6)*100% + 10px)
    border-top-left-radius 0
    border-bottom-left-radius 0
  /deep/.el-form-item__label
    display none
  /deep/.el-input__inner
    height 48px
    border none
    font-size 14px
  /deep/.el-form-item__error
    display none
</style>
