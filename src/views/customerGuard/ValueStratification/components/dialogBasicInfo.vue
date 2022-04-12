<template lang="pug">
el-dialog(
  width='327px'
  :show-close='true'
  title='添加企业价值等级查询'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
  :before-close='beforeClose'
)
  .p-empty-tips.p-text-right 提交实控人信息进行精准查询
  el-form.p-dialog-form(
    label-width='100px'
    ref='dialogAddStep3Form'
    :rules='rules'
    :model='form'
    v-loading='loading'
  )
    .p-form-item
      el-form-item(prop='realControllerName')
        .p-form-label 实控人姓名
        el-input(ref='realControllerName' type='text' placeholder='请输入实控人姓名' v-model='form.realControllerName' maxlength='10')
      el-form-item(prop='realControllerId')
        .p-form-label 实控人身份证号
        el-input(ref='realControllerId' type='text' placeholder='请输入实控人身份证号' v-model='form.realControllerId' maxlength='18')
      el-form-item(prop='realControllerMobile')
        .p-form-label 实控人手机号
        el-input(ref='realControllerMobile' type='text' placeholder='请输入实控人手机号' v-model='form.realControllerMobile' maxlength='11')
  span(slot='footer')
    el-button(
      @click='visible=false'
      size='small'
      weblogs-anchor='customerGuard-worth-import-cancel'
    ) 取消
    el-button(type='primary' :loading='sureLoading' @click='submit' size='small' weblogs-anchor='customerGuard-worth-import-confirm') 确定
</template>

<script>
import ajaxStore from '@/apis'
import { vPhone, vIdcardNumber } from '@/utils/validateRules'
import { EventBus } from '../../event-bus'

export default {
  data() {
    const vPersonInfo = async (rule, value, callback) => {
      const { field } = rule
      const { realControllerName, realControllerId, realControllerMobile } = this.$refs
      if (realControllerName.value || realControllerId.value || realControllerMobile.value) {
        switch (field) {
          case 'realControllerName':
            if (!value) {
              callback(new Error('请输入实控人姓名'))
            }
            break
          case 'realControllerId':
            vIdcardNumber(rule, value, callback)
            break
          case 'realControllerMobile':
            vPhone(rule, value, callback)
            break
        }
      }
      callback()
    }
    return {
      visible: false,
      sureLoading: false,
      loading: false,
      rules: {
        realControllerName: [
          { validator: vPersonInfo, trigger: ['blur'] },
        ],
        realControllerId: [
          { validator: vPersonInfo, trigger: ['blur'] },
        ],
        realControllerMobile: [
          { validator: vPersonInfo, trigger: ['blur'] },
        ],
      },
      form: {
        realControllerName: '',
        realControllerId: '',
        realControllerMobile: ''
      },
      selectItem: null,
      type: 'add'
    }
  },
  created() {
    EventBus.$on('initBasicInfo', (val) => { this.initData(val) })
  },
  methods: {
    initData(data) {
      const { selectItem, type, visible } = data
      this.selectItem = selectItem
      this.type = type
      this.visible = visible
      type === 'edit' && (this.form = selectItem)
    },
    submit() {
      this.type === 'edit' ? this.editCompany() : this.addCompany()
    },
    async editCompany() {
      this.$refs.dialogAddStep3Form.validate(async valid => {
        if (valid) {
          const data = {...this.form}
          data.corpName = this.selectItem.name
          data.regCode = this.selectItem.creditCode
          this.sureLoading = true
          const res = await ajaxStore.risk.editCompanySincerity({
            id: data.id,
            params: {
              realControllerId: data.realControllerId,
              realControllerMobile: data.realControllerMobile,
              realControllerName: data.realControllerName
            }
          })
          this.sureLoading = false
          if (res.data && res.data.code === '0') {
            this.$message.success('获取成功')
            this.visible = false
            EventBus.$emit('tableInit', { type: 'edit', selectItem: this.selectItem })
          }
        }
      })
    },
    async addCompany() {
      this.$refs.dialogAddStep3Form.validate(async valid => {
        if (valid) {
          const data = {...this.form}
          data.corpName = this.selectItem.name
          data.regCode = this.selectItem.creditCode
          this.sureLoading = true
          const res = await ajaxStore.risk.addCompanySincerity(data)
          this.sureLoading = false
          if (res.data && res.data.code === '0') {
            this.$message.success('添加成功')
            EventBus.$emit('tableInit', { type: 'add', selectItem: this.selectItem })
            this.visible = false
          }
        }
      })
    },
    beforeClose() {
      this.selectItem = null
      this.visible = false
      if (!this.$refs.dialogAddStep3Form) return
      this.$refs.dialogAddStep3Form.resetFields()
      this.$refs.dialogAddStep3Form.clearValidate()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './dialog.styl'
</style>
