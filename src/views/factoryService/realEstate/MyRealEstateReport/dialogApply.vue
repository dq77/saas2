<template lang="pug">
el-dialog(
  title='客户研究报告申请'
  :visible.sync='dialogApply.show'
  :before-close='handleClose'
)
  el-form(
    ref='form'
    label-width='150px'
    :model='dialogApply.form'
    :rules='dialogApply.rules'
  )
    el-form-item(label='选择企业名称：' prop='companyName' )
      el-select.p-input(placeholder='请选择企业名称' v-model='dialogApply.form.companyName' clearable filterable)
        el-option(v-for='item in dialogApply.companyList' :key='item' :label='item' :value='item')
  template(slot='footer')
    el-button(type='default' @click='handleClose' weblogs-anchor='factory-customerEvaluation-report-apply-cancel') 取消
    el-button(type='primary' :loading='dialogApply.loadingSubmit' @click='clickDialogApplySubmit' weblogs-anchor='factory-customerEvaluation-report-apply-confirm') 提交
</template>

<script>
import ajaxStore from '@/apis'
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      source: '',
      dialogApply: {
        show: false,
        loadingSubmit: false,
        form: {
          companyName: ''
        },
        rules: {
          companyName: [
            { required: true, message: '请选择企业名称', trigger: 'change' }
          ]
        },
        companyList: []
      },
      followCompanyList: []
    }
  },
  methods: {
    handleClose() {
      this.dialogApply.show = false
      this.$emit('close')
    },
    async getCompanyList() {
      const res = await this.ajaxStore.factoryService.realEstate.getCompanyList()
      if (res.data && res.data.code === '0') {
        this.dialogApply.companyList = res.data.data || []
      }
    },
    clickDialogApplySubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.dialogApply.loadingSubmit = true
          const data = this.dialogApply.form
          data.source = this.source
          const res = await this.ajaxStore.factoryService.realEstate.applyReport(data)
          this.dialogApply.loadingSubmit = false
          if (res.data && res.data.code === '0') {
            this.$message.success('申请成功')
            this.handleClose()
            this.$refs.form.resetFields()
            setTimeout(() => {
              this.$emit('comfirm')
            }, 100)
          }
        }
      })
    },
    async getFollowCompnayList() {
      const res = await ajaxStore.factoryService.realEstate.getFollowCompanyList()
      if (res.data && res.data.code === '0') {
        const followCompanyList = []
        res.data.data.map((item) => {
          followCompanyList.push(item.companyName)
        })
        this.followCompanyList = followCompanyList
      }
    },
  },
  async mounted() {
    await this.getFollowCompnayList()
    this.getCompanyList()
    // 0-开发商评估， 1-风险专家
    this.source = this.$route.query.mode ? '1' : '0'
  },
  watch: {
    dialogShow(val) {
      this.dialogApply.show = val
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-input
  width 280px
</style>
