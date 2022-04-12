<template lang="pug">
  Modal(
    :title='title'
    :visible="visible"
    @cancleHandle="cancleHandle"
    @sureHandle="sureHandle"
    :width="'440px'"
  )
    div.p-warning(v-if='showDeleteTips')
      i.el-icon-warning
      span 是否删除{{detail.item.name}}类目？
    Form(
      v-else
      ref="formRef"
      :inline="false"
      :labelPosition="'right'"
      :labelWidth="'80px'"
      :isShadow="false"
      :formData="formState.formData",
      :formConfig="formState.formConfig"
      :formRules="formState.formRules"
    )
</template>

<script>
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import {mFormData, mFormConfig, mFormRules} from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit }) {
    // topCategory
    const { factory: { getCategoryDetail, addCategory, delCategory, editCategory } } = ajaxStore
    const formRef = ref()
    const formState = useForm({
      formRef,
      formData: mFormData,
      formConfig: mFormConfig,
      formRules: mFormRules
    })
    const state = reactive({
      formState,
      showDeleteTips: false,
      type: ''
    })
    // 取消
    const cancleHandle = () => {
      // formState.resetFormData()
      // formState.resetHandle()
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      console.log(state.formState.formData, 'surHandle')
      console.log(props.detail, 'detail')
      state.type === 'add' && _addCategory({
        name: state.formState.formData.name,
        parentId: state.formState.formData.parentId
      })
      state.type === 'edit' && _editCategory({
        id: props.detail.item.id,
        name: state.formState.formData.name
      })
      state.type === 'remove' && _delCategory({
        id: props.detail.item.id,
      })
    }
    const successCallBack = ({code}) => {
      if (code === '0') {
        cancleHandle()
        Message.success('操作修改成功')
        emit('successHandle')
      }
    }
    const {doResult: _getCategoryDetail} = useAsync({
      request: getCategoryDetail,
      init: false,
    })
    const {doResult: _addCategory} = useAsync({
      request: addCategory,
      init: false,
      successCallBack
    })
    const {doResult: _editCategory} = useAsync({
      request: editCategory,
      init: false,
      successCallBack
    })
    const {doResult: _delCategory} = useAsync({
      request: delCategory,
      init: false,
      successCallBack
    })
    // const {doResult: _topCategory} = useAsync({
    //   request: topCategory,
    //   init: false,
    // })
    // 回显
    watch(
      () => props.visible,
      () => {
        const { detail } = props
        // console.log(detail, 'itemDetail')
        const {item, type} = detail || {}
        formState.resetHandle()
        if (type === 'add') {
          formState.setFormItem('parentName', item.name ?? '-')
          formState.setFormItem('parentId', item.id)
          formState.setFormItem('name', undefined)
          formState.clearValidate()
        }
        if (type === 'edit') {
          _getCategoryDetail({id: item.parentId}).then(res => {
            const data = res.data
            // console.log(data, 'days')
            formState.setFormItem('name', item.name)
            formState.setFormItem('parentName', data?.name ?? '-')
            formState.setFormItem('parentId', data?.id ?? 0)
          })
        }
        if (type === 'delete') {}
      }
    )
    watch(
      () => props.detail,
      val => {
        state.showDeleteTips = false
        state.type = val.type
        val.type === 'remove' && (state.showDeleteTips = true)
      }
    )
    return {
      ...toRefs(state),
      sureHandle,
      cancleHandle,
    }
  },
}
</script>
