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
        :inline="false"
        :labelPosition="'right'"
        :labelWidth="'80px'"
      )
    //- 盘点产品
    template(slot='product')
      Product(
        :id="id"
        :warehouseId="warehouseId"
        :formApis="formApis"
      )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Collapse from '@/components/qjd/collapse/index.vue'
import Form from '@/components/qjd/form/index.vue'
import useForm from 'hooks/useForm'
import Product from './product/index.vue'
import {
  colColumns,
  defaultActiveName,
  formConfig,
  formData
} from './config'

export default {
  components: {
    Collapse,
    Form,
    Product
  },
  setup(props, { root: { $route: { query: { warehouseName, warehouseId, id } } } }) {
    // ref
    const formRef = ref()
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // 设置仓库名
    formApis.setFormItem('warehouseName', warehouseName)
    // state
    const state = reactive({ formApis })

    return {
      id,
      warehouseId,
      formRef,
      colColumns,
      defaultActiveName,
      ...toRefs(state)
    }
  }
}
</script>
