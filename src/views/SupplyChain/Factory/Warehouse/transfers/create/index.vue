<template lang="pug">
.page-main
  Collapse(
    :columns='colColumns'
    :defaultActiveName='defaultActiveName'
  )
    //- 调拨信息
    template(slot='info')
      Form(
        ref="formRef"
        style="width: 50%;"
        :formData="formApis.formData",
        :formConfig="formApis.formConfig"
        :formRules="formApis.formRules"
        :inline="false"
        :labelPosition="'right'"
        :labelWidth="'80px'"
        @selectChange="currentAPis.selectChange"
      )
    //- 调拨产品
    template(slot="product")
      Product(ref="productRef" :formApis="formApis")
</template>
<script lang="ts">
import { reactive, ref, toRefs } from '@vue/composition-api'
import Collapse from '@/components/qjd/collapse/index.vue'
import Form from '@/components/qjd/form/index.vue'
import useForm from 'hooks/useForm'
import Product from './product/index.vue'
import useCurrent from './useCurrent'
import {
  colColumns,
  defaultActiveName,
  formConfig,
  formData,
  formRules
} from './config'

export default {
  components: {
    Collapse,
    Form,
    Product
  },
  setup() {
    // ref
    const formRef = ref()
    const productRef = ref()
    // form
    const formApis = useForm({ formRef, formData, formConfig, formRules })
    // useCurrent
    const currentAPis = useCurrent({ formApis, productRef })
    // state
    const state = reactive({ formApis, currentAPis })

    return {
      formRef,
      productRef,
      colColumns,
      defaultActiveName,
      ...toRefs(state)
    }
  }
}
</script>
