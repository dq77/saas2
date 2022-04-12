<template lang="pug">
el-dialog.p-dialog-circle(
  custom-class='el-dialog-new'
  width='500px'
  :title='title'
  :visible='visible'
  @close='clickClose'
)
  Form(
    ref='formRef'
    :inline='false'
    :formData='formState.formData'
    :formConfig='formState.formConfig'
    :formRules='formState.formRules'
  )
  div(slot='footer')
    el-button(plain @click='clickClose' :loading='loading') 取消
    el-button(type='primary' @click='clickSure' :loading='loading') 确定
</template>

<script>
import { defineComponent, ref, toRefs, reactive, watch } from '@vue/composition-api'
import { Message } from 'element-ui'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import useArea from '@/hooks/common/useArea'
import ajaxStore from '@/apis'
import { formData, formConfig, formRules } from './config'

export default defineComponent({
  components: {
    Form
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'create', // create新建、edit编辑
    },
    editData: { // 编辑时的默认数据
      type: Object,
      default: () => ({})
    }
  },
  setup(props, root) {
    // useArea
    const { doResult: getArea, flatCitys } = useArea()
    const title = ref('')
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })

    const state = reactive({
      formState
    })

    // 地址下拉框
    getArea().then(res => {
      const { code, data } = res ?? {}
      code === '0' && formState.setConfig('address', 'options', data ?? [])
    })

    // 创建
    const { doResult: createWarehouse, loading: createLoading } = useAsync({
      request: ajaxStore.factory.setBase.createWarehouse,
      init: false
    })
    // 更新
    const { doResult: updateWarehouse, loading: updateLoading } = useAsync({
      request: ajaxStore.factory.setBase.updateWarehouse,
      init: false
    })

    const clickClose = () => root.emit('close')
    const clickSure = async () => {
      const vRes = await formRef.value.submitHandle()
      if (vRes) {
        const { address, ...others } = formState.formData
        // 传参地址code处理
        let params = {}
        if (address) {
          params = {
            provinceCode: address[0],
            cityCode: address[1],
            province: flatCitys.value?.[address[0]]?.name,
            city: flatCitys.value?.[address[1]]?.name,
          }
          address[2] && (params.regionCode = address[2])
          address[2] && (params.region = flatCitys.value?.[address[2]]?.name)
        }

        const data = { ...params, ...others }
        if (props.accountType === '0') data.type = props.accountType
        if (props.mode === 'create') { // 新建时
          const res = await createWarehouse(data)
          if (res?.code === '0') {
            Message.success('新增仓库成功')
            root.emit('success')
          }
        } else { // 编辑时
          data.id = props.editData.id
          const res = await updateWarehouse(data)
          if (res?.code === '0') {
            Message.success('编辑仓库成功')
            root.emit('success')
          }
        }
      }
    }

    const initBeforeShowWhenCreate = async () => {
      title.value = '新建仓库'
    }

    const initBeforeShowWhenEdit = async () => {
      title.value = '编辑仓库'
      // 编辑时回填信息
      formState.loopFormData((formData, key) => {
        formData[key] = props.editData[key] || null
      })
      console.log(props.editData)
      console.log(formData)
    }

    watch(
      () => props.visible,
      (v) => {
        if (v === true) {
          formState.resetFormData()
          // 新建时的弹框与编辑时不同
          props.mode === 'create' ? initBeforeShowWhenCreate() : initBeforeShowWhenEdit()
        }
      }
    )
    return {
      formRef,
      title,
      loading: createLoading || updateLoading,
      ...toRefs(state),
      clickClose,
      clickSure,
    }
  },
})
</script>

<style lang='stylus' scoped>
.p-tip
  color #2867F9
  font-size: 12px
.p-dialog-circle
  >>>.el-dialog__body
    padding-bottom 12px
</style>
