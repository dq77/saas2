<template lang='pug'>
.open-service-dialog-comp
  .process-block
    .tips 注：如需开通此服务，请联系仟金顶行业拓展部大客户经理或打
      span 400-6121-666。
    .start-btn(@click='showDialog' :class='{opening}') {{ opening ? '服务开通中' : '申请开通' }}
    img(:src="`${$assetsBaseUrl}/introduce/order-master-process.png`" width='910px')
  el-dialog.open-dialog(title="服务开通申请" :visible.sync="isShow" width="400px" :before-close="handleClose")
    el-form(ref="formRef" :model="form" :rules="rules" label-width="80px")
      el-form-item(label="企业名称" prop="companyName")
        el-input(v-model="form.companyName" disabled)
      el-form-item(label="联系人" prop="contactName")
        el-input(v-model="form.contactName")
      el-form-item(label="联系电话" prop="contactMobile")
        el-input(v-model="form.contactMobile")
    .form-btn
      el-button(@click='handleClose') 取消
      el-button.confirm-btn(@click='submit') 确定
</template>

<script>
import ajaxStore from '@/apis'
import store from '@/store'
import { ref, reactive } from '@vue/composition-api'
import { Message } from 'element-ui'
export default {
  props: {
    id: {
      type: String,
      value: '1'
    }
  },
  components: {
  },
  setup(props, context) {
    const isShow = ref(false)
    const openstate = context.root.$route.query.openstate
    const opening = ref(openstate === 1)
    const { state: { userInfo } } = store
    const form = reactive({
      companyName: userInfo.company,
      contactName: '',
      contactMobile: '',
    })
    const rules = ref({
      contactName: [
        { required: true, message: '请输入联系人名称', trigger: 'blur' }
      ],
      contactMobile: [
        { required: true, message: '请填写联系电话', trigger: 'blur' }
      ]
    })
    const formRef = ref(null)
    const showDialog = () => {
      if (opening.value) return false
      isShow.value = true
      context.emit('clickShowDialog', openstate)
    }
    const handleClose = () => {
      isShow.value = false
    }
    const submit = () => {
      const nameList = ['', '厂家服务平台', '应收管家', '赊销管家', '订货大师', '客户卫士', '开发商评估', '风险专家']
      formRef.value.validate(async valid => {
        if (valid) {
          const params = {
            ...form,
            moduleId: props.id,
            moduleName: nameList[props.id - 0],
          }
          const res = await ajaxStore.common.addTenantApplication(params)
          if (res.data && res.data.code === '0') {
            Message.success('申请成功')
            opening.value = true
            isShow.value = false
          }
        }
      })
    }
    return {
      form,
      formRef,
      isShow,
      opening,
      rules,
      showDialog,
      handleClose,
      submit
    }
  },
}
</script>

<style lang='stylus'>
.open-service-dialog-comp
  .process-block
    text-align center
    border 1px solid #EAEBEE
    padding 42px 0 50px
    margin 0 34px
    .tips
      color #A9AFB8
      span
        color #3B68F0
    .start-btn
      margin 20px auto 46px
      width 176px
      height 46px
      line-height 44px
      font-size 14px
      color #3B68F0
      border 1px solid #2867F8
      border-radius 4px
      cursor pointer
      &:hover
        background-color #3B68F0
        color #FFF
      &.opening
        background-color #fff
        color #2867F8
        opacity 0.5
        cursor default
  .open-dialog
    .el-input.is-disabled .el-input__inner
      background-color #fff
    .form-btn
      text-align right
      .confirm-btn
        color #fff
        background-color #3B68F0
        border 1px solid #3B68F0
</style>
