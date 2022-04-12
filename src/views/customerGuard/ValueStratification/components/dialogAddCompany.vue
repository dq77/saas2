<template lang="pug">
el-dialog(
  width='327px'
  :show-close='true'
  title='添加企业价值等级查询'
  :visible.sync='visible'
  custom-class='el-dialog-new'
  :close-on-click-modal='false'
)
  el-form.p-dialog-form(
    label-width='100px'
    ref='dialogAddForm'
    :rules='rules'
    :model='form'
  )
    .p-form-item
      el-form-item(prop='corpName')
        .p-form-label 企业名称
        el-input.p-dialog-search-input(ref='corpName' type='text' placeholder='请输入企业名称' v-model='form.corpName' @keyup.enter.native='searchQCC' maxlength='20')
        el-button.p-search(type='primary' @click='searchQCC' :loading='searchQCCLoading' weblogs-anchor='customerGuard-worth-import-search') 查询
    template(v-if='companyList')
      template(v-if='companyList.length')
        .p-form-tips 请选择匹配的企业
        .p-form-companyList
          div(v-for='(item, key) in companyList' :key='item.id')
            .p-radio(:class='!item.creditCode ? "p-form-disabled" : ""' )
              .p-form-companyList-item(:class='item.creditCode === selectItem.creditCode ? "p-form-selected" : ""' @click='selectCompany(item)')
                .p-form-company-name {{item.name}}
                  span(v-if='item.regStatus') （{{item.regStatus}}）
                i.el-icon-success(v-if='item.creditCode === selectItem.creditCode')
      .p-empty-tips(v-else) 没有匹配的企业
  span(slot='footer')
    el-button(@click='visible=false' size='small') 取消
    el-button(type='primary' :disabled='!selectItem' :loading='sureLoading' @click='checkHasData' size='small' weblogs-anchor='customerGuard-worth-import-next') 下一步
</template>

<script>
import { EventBus } from '../../event-bus'
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      // 弹框 导入企业
      visible: false,
      sureLoading: false,
      searchQCCLoading: false,
      rules: {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: ['change', 'blur'] },
        ]
      },
      form: {
        corpName: ''
      },
      selectItem: '',
      companyList: ''
    }
  },
  created() {
    EventBus.$on('initAddCompany', (val) => { this.initData(val) })
  },
  methods: {
    initData(visible) {
      this.visible = visible
      this.form.corpName = ''
      this.selectItem = ''
      this.companyList = ''
      this.$refs.dialogAddForm && this.$refs.dialogAddForm.resetFields()
    },
    // 企查查
    async searchQCC() {
      this.$refs.dialogAddForm.validate(async valid => {
        if (valid) {
          this.searchQCCLoading = true
          const res = await ajaxStore.common.getCompanyNameListByTYC({name: this.form.corpName})
          this.searchQCCLoading = false
          if (res.data && res.data.code === '0') {
            this.selectItem = ''
            this.companyList = res.data.data || []
          }
        }
      })
    },
    async checkHasData() {
      this.sureLoading = true
      const res = await ajaxStore.risk.checkCompanyInfoByRegNo({regNo: this.selectItem.creditCode})
      this.sureLoading = false
      if (res.data && res.data.code === '0') {
        if (res.data.data) {
          this.selectItem.id = res.data.data.id
          EventBus.$emit('initQuotaInfo', true)
          this.visible = false
        } else {
          this.visible = false
          EventBus.$emit('initBasicInfo', { visible: true, selectItem: this.selectItem, type: 'add' })
        }
      }
    },
    selectCompany(item) {
      if (item.creditCode) {
        this.selectItem = item
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './dialog.styl'
</style>
