<template lang="pug">
  .deliver-info
    .order-section(v-if='result')
      .order-section_item
        span.title 退货单号：
        span.value {{result.reverseOrderSn}}
      .order-section_item
        span.title 退货申请时间：
        span.value {{result.createdTime}}
      .order-section_item
        span.title 退货状态：
        span.value {{result && reverseOrderStatus[result.status]}}
      .order-section_item
        span.title 订单号：
        span.value {{result.orderSn}}
      .order-section_item
        span.title 客户：
        span.value {{result.customerName}}
      .order-section_item
        span.title 项目：
        span.value {{result.projectName}}
      .order-section_item
        span.title 备注：
        span.value {{result.description}}
      .order-section_item(v-if='result.warehouseName')
        span.title 退货仓库：
        span.value {{result.warehouseName}}
    .deliver-section
      Form(ref='formRef' :formData='formData' :formConfig='formConfig' :isShadow='false' labelPosition='right' labelWidth='120px')
</template>

<script>
import Form from '@/components/qjd/form'
import { ref } from '@vue/composition-api'
import { reverseOrderStatus } from '../const'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default {
  components: {
    Form
  },
  props: {
    queryStatus: {
      type: String,
      default: ''
    },
    queryId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup(props, {emit}) {
    const {type, queryId} = props
    const { factory: { getReverseDetail } } = ajaxStore
    const formRef = ref()
    const {
      formData,
      formConfig,
      loopFormConfig,
      loopFormData,
      setFormItem,
    } = useForm({
      formRef,
      formData: { fee: undefined },
      formConfig: [{ type: 'inputNumber', key: 'fee', label: '退货费用', precision: 2, step: 0.1, min: 0, span: 6}],
    })
    const { result } = useAsync({ // 获取发货信息详情
      request: getReverseDetail,
      init: true,
      params: {
        reverseOrderId: queryId,
      },
      successCallBack: ({ data }) => {
        handerDetailForm(data)
        emit('changeQueryStatus', data.status)
      },
    })
    const handerDetailForm = (data) => {
      loopFormConfig((item) => {
        setFormItem(item.key, data[item.key])
        // if (item.key === 'fee' && !data[item.key]) {
        //   setFormItem(item.key, undefined)
        // } else {
        //   setFormItem(item.key, data[item.key])
        // }
        item.disabled = !!type
      })
    }
    return {
      formData,
      formConfig,
      loopFormConfig,
      loopFormData,
      result,
      handerDetailForm,
      reverseOrderStatus,
      formRef,
    }
  },
}
</script>

<style lang="stylus" scoped>
.order-section
  background-color #F4F9FD
  border-radius 4px
  display flex
  margin-bottom 20px
  padding 20px
  flex-wrap wrap
  &_item
    width 50%
    line-height 32px
    &:nth-child(2n+1)
      border-right 1px #CDD0D4 dashed
    .title
      width 120px
      text-align right
      display inline-block
      margin-right 10px
      color #738A9E
>>>.el-input--small .el-input__inner
  height 31px
</style>
