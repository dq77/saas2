<template lang="pug">
.p-form
  .p-board-form(:class='dialogShow ? "fade-enter-active" : "fade-leave-active"' :style='animationEnd ? {display: "none"} : {}')
    .p-form-title
      span 编辑节点
      .el-icon-close.p-close(@click='close')
    .p-form-content(v-if='nFormData')
      Form(
        ref="formRef"
        :formData="nFormData",
        :formConfig="formConfig"
        :formRules="formRules"
        @selectChange='selectChange'
        @inputChange='inputChange'
      )
        template(slot='fixedFlow' slot-scope='{ row }')
          label.el-form-item__label 审批人
          .p-tips 此节点审批人为动态配置：根据实际业务所属的组织架构部门进行审批。
        template(slot="nodePass" slot-scope="{ row }")
          .p-node-title
            i.iconfont.iconjiediantongguo.p-icon-green
            span 节点通过后
            .p-node-tips 节点通过后，默认将进入下一个审批节点，若需要额外添加操作可在下方进行添加。
        template(slot='nodePassTips' slot-scope='{ row }')
          label.el-form-item__label 操作
          .p-tips 无可添加的操作
        template(slot="nodeNoPass" slot-scope="{ row }")
          .p-node-title
            i.iconfont.iconjiedianbohuihou.p-icon-red
            span 节点驳回后
        template(slot='nodeNoPassTips' slot-scope='{ row }')
          label.el-form-item__label 操作
          .p-tips 流程结束
      .p-bottom-btns
        el-button.p-btn-delete(type="info" plain @click='deleteNode' v-if='currentIndex') 删除
</template>

<script>
import { watch, reactive, toRefs, ref } from '@vue/composition-api'
import useTimeout from 'hooks/useTimeout'
import useForm from 'hooks/useForm'
import Form from '@/components/qjd/form'
import { cFormRules, getFormConfig, defaultNode } from './config'
import useAsync from 'hooks/useAsync'
import ajaxstore from '@/apis'
import useFlow from '@/views/common/processConfig/hooks/useFlow'
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => defaultNode
    },
    currentIndex: {
      type: Number
    }
  },
  components: { Form },
  setup(props, { emit, root }) {
    const state = reactive({
      animationEnd: true,
    })

    const {
      applicationCode,
      businessCode
    } = root.$route.query

    const { process: { getWorkflowConfigTaskEvent, getWorkflowConfigEndEvent, getMemberList, getRoleList } } = ajaxstore

    const { perTimeout } = useTimeout()
    const close = () => {
      emit('close', {})
    }

    const deleteNode = () => {
      root.$confirm('是否确认删除该节点？', '提示', {
        type: 'warning',
      }).then(() => {
        emit('deleteNode')
      }).catch(() => {})
    }

    const formRef = ref()

    const { doResult: doMemberListResult} = useAsync({
      request: getMemberList,
      init: false,
      successCallBack: ({data}) => {
        const options = data.map(item => {
          return {
            label: item.memberName,
            value: item.id,
          }
        })
        // setConfig('approver', 'otherKeys', { label: 'memberName', value: 'id' })
        setConfig('approver', 'options', options)
      }
    })

    const { doResult: doRoleListResult } = useAsync({
      request: getRoleList,
      init: false,
      callback: (res) => {
        const { data: { code, data } } = res
        if (code === '0') {
          return {
            data: data.pagedRecords
          }
        }
      },
      successCallBack: ({data}) => {
        const options = data.map(item => {
          return {
            label: item.roleName,
            value: item.roleCode,
          }
        })
        // setConfig('approver', 'otherKeys', { label: 'roleName', value: 'roleCode' })
        setConfig('approver', 'options', options)
      }
    })

    const selectChange = ({value, key, item}) => {
      emit('save', { key, value })
      switch (key) {
        case 'approverType':
          setFormItem('approver', [])
          emit('save', { key: 'approver', value: [] })
          if (value === 1) {
            doMemberListResult()
          } else if (value === 3) {
            doRoleListResult()
          }

          break
      }
    }

    const inputChange = ({value, key, item}) => {
      emit('save', { key, value })
    }

    // form
    const {
      formData: nFormData,
      formConfig,
      formRules,
      clearValidate,
      setConfig,
      setFormItem,
      setFormRule,
    } = useForm({
      formRef,
      formData: props.formData,
      formConfig: getFormConfig(),
      formRules: cFormRules
    })

    const formartData = (obj) => {
      const options = []
      for (const key in obj) {
        options.push({
          value: key,
          label: obj[key]
        })
      }
      return options
    }

    useAsync({
      request: getWorkflowConfigTaskEvent,
      params: {
        businessCode,
        applicationCode
      },
      callback: (res) => {
        const { data: { code, data } } = res
        if (code === '0') {
          return {
            data: formartData(data)
          }
        }
      },
      successCallBack: ({data}) => {
        if (!data.length) {
          setConfig('nodePassTips', 'isHidden', false)
          setConfig('operationPass', 'isHidden', true)
        } else {
          setConfig('operationPass', 'options', data)
          setFormRule('operationPass', 0, {
            required: true,
            message: '请选择操作',
            trigger: ['blur', 'change']
          })
        }
      }
    })

    useAsync({
      request: getWorkflowConfigEndEvent,
      params: {
        businessCode,
        applicationCode
      },
      callback: (res) => {
        const { data: { code, data } } = res
        if (code === '0') {
          return {
            data: formartData(data)
          }
        }
      },
      successCallBack: ({data}) => {
        if (!data.length) {
          setConfig('nodeNoPassTips', 'isHidden', false)
          setConfig('operationNoPass', 'isHidden', true)
        } else {
          setConfig('operationNoPass', 'options', data)
          setFormRule('operationNoPass', 0, {
            required: true,
            message: '请选择操作',
            trigger: ['blur', 'change']
          })
        }
      }
    })

    const { isFixedFlow } = useFlow()

    watch(
      () => props.dialogShow,
      (value) => {
        perTimeout(() => {
          state.animationEnd = !value
        }, 290)
        if (value) {
          if (props.formData.hasError) {
            formRef.value.$refs.formRef.validate((valid) => {
              console.log(valid)
            })
          } else {
            clearValidate()
          }
          if (props.formData.approverType === 1) {
            doMemberListResult()
          } else if (props.formData.approverType === 3) {
            doRoleListResult()
          }
          if (isFixedFlow(businessCode) && props.currentIndex === 0) {
            emit('save', { key: 'approverType', value: 2 })
            // eslint-disable-next-line no-template-curly-in-string
            emit('save', { key: 'approver', value: ['${memberIdArrStr}'] })
            setConfig('approverType', 'isHidden', true)
            setConfig('approver', 'isHidden', true)
            setConfig('fixedFlow', 'isHidden', false)
          }
        }
      }
    )

    watch(
      () => props.formData.hasError,
      (value) => {
        if (value && props.formData.active) {
          formRef.value.$refs.formRef.validate((valid) => {
            console.log(valid)
          })
        }
      }
    )

    watch(
      () => props.formData,
      (value) => {
        for (const key in value) {
          setFormItem(key, value[key])
        }
        setConfig('approver', 'options', [])
        if (value.approverType === 1) {
          doMemberListResult()
        } else if (value.approverType === 3) {
          doRoleListResult()
        }
      }
    )

    return {
      close,
      formRef,
      nFormData,
      formConfig,
      formRules,
      selectChange,
      inputChange,
      deleteNode,
      isFixedFlow,
      businessCode,
      ...toRefs(state)
    }
  }
}
</script>
<style lang='stylus'>
.p-board-form
  .form-box-shadow
    border none
    box-shadow none
  .form-box
    padding 20px 0
</style>
<style lang="stylus" scoped>
.p-form
  height 800px
.p-board-form
  width 25%
  min-width 300px
  padding 20px
  border-left 1px solid #EAEBEE
  position absolute
  right 0
  top 0
  height 100%
  .p-form-title
    color #494949
    display flex
    justify-content space-between
    font-weight bold
    .p-close
      font-size 14px
      cursor pointer
@keyframes rtl-drawer-in
  0%
    transform translate(100%, 0)
  100%
    transform translate(0, 0)
@keyframes rtl-drawer-out
  0%
    transform translate(0, 0)
  100%
    transform translate(100%, 0)
.fade-enter-active
  animation rtl-drawer-in .3s
.fade-leave-active
  animation rtl-drawer-out .3s
.p-bottom-btns
  display flex
.p-node-title
  border-top 1px solid #EAEBEE
  padding-top 20px
  font-weight bold
  color #494949
  span
    margin-left 10px
  i
    font-weight normal
.p-btn-delete
  width 100%
  background #ffffff
.p-btn-delete:hover
  background #FFE5E9
  border-color #FF0028
  color #FF0028
.p-icon-red
  color #FF3366
.p-icon-green
  color #88CCAB
.p-node-tips
  font-weight normal
  color #66788e
</style>
