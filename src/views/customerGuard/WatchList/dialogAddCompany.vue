<template lang="pug">
//- 添加关注企业查询
el-dialog(
  width='327px'
  :show-close='true'
  title='添加关注企业查询'
  :visible.sync='dialogAdd.visible'
  custom-class='el-dialog-new'
  :close-on-click-modal='false'
  :before-close='beforeClose'
)
  el-form(
    label-width='100px'
    ref='dialogAddForm'
    :rules='dialogAdd.rules'
    :model='dialogAdd.form'
  ).p-dialog-form
    .p-form-item
      el-form-item(prop='corpName')
        .p-form-label 企业名称
        el-input.p-dialog-search-input(ref='corpName' type='text' placeholder='请输入企业名称' v-model='dialogAdd.form.corpName' @keyup.enter.native='searchQCC' maxlength='20')
        el-button.p-search(type='primary' @click='searchQCC' :loading='dialogAdd.searchQCCLoading') 查询
    template(v-if='dialogAdd.companyList')
      template(v-if='dialogAdd.companyList.length')
        .p-form-tips 请选择匹配的企业
        .p-form-companyList
          template(v-for='(item, key) in dialogAdd.companyList')
            .p-radio(:class='!item.creditCode ? "p-form-disabled" : ""' )
              .p-form-companyList-item(:class='item.creditCode === dialogAdd.selectItem.creditCode ? "p-form-selected" : ""' @click='selectCompany(item)')
                .p-form-company-name {{item.name}}
                  span(v-if='item.regStatus') （{{item.regStatus}}）
                i.el-icon-success(v-if='item.creditCode === dialogAdd.selectItem.creditCode')
      .p-empty-tips(v-else) 没有匹配的企业
  span(slot='footer')
    el-button(@click='beforeClose' size='small' weblogs-anchor='customerGuard-risk-import-cancel') 取消
    el-button(type='primary' :disabled='!dialogAdd.selectItem' :loading='dialogAdd.sureLoading' @click='checkHasData' size='small' weblogs-anchor='customerGuard-risk-import-confirm') 确定
</template>

<script>
// import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'

export default {
  data() {
    return {
      // 弹框 导入企业
      dialogAdd: {
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
        companyList: '',
      }
    }
  },
  methods: {
    selectCompany(item) {
      if (item.creditCode) {
        this.dialogAdd.selectItem = item
      }
    },
    // 企查查
    async searchQCC() {
      this.$refs.dialogAddForm.validate(async valid => {
        if (valid) {
          this.dialogAdd.searchQCCLoading = true
          const res = await ajaxStore.common.getCompanyNameListByTYC({name: this.dialogAdd.form.corpName})
          this.dialogAdd.searchQCCLoading = false
          if (res.data && res.data.code === '0') {
            this.dialogAdd.selectItem = ''
            if (res.data.data) {
              this.dialogAdd.companyList = res.data.data
            } else {
              this.dialogAdd.companyList = []
            }
          }
        }
      })
    },
    async checkHasData() {
      this.dialogAdd.sureLoading = true
      const res = await ajaxStore.risk.saveOne({ companyName: this.dialogAdd.selectItem.name })
      this.dialogAdd.sureLoading = false
      if (res.data && res.data.code === '0') {
        this.$emit('refreshList')
      }
      this.beforeClose()
    },
    beforeClose() {
      this.dialogAdd.visible = false
      this.dialogAdd.companyList = ''
      this.dialogAdd.selectItem = ''
      this.$refs.dialogAddForm && this.$refs.dialogAddForm.resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-mission-btn
  float right
  .u-header-num
    color #4A71F0
    margin-right 5px
.p-dialog-search-input
  width 74%
  margin-right 10px
.p-search
  width 22%
.p-form-label
  color #494949
.p-form-item
  margin-bottom 20px
.p-form-tips
  margin-bottom 10px
.p-form-companyList
  border 1px solid #F2F2F6
  border-radius 4px
  height 168px
  overflow-y scroll
.p-form-company-name
  width 225px
  font-size 12px
.p-form-companyList-item
  display flex
  justify-content space-between
  align-items center
  padding 5px 10px
  cursor pointer
.p-form-companyList-item:hover
  .p-form-company-name
    color #4A71F0
.p-form-selected
  background #DEE8F6
  color #4A71F0
.p-empty-tips
  display flex
  justify-content center
  align-items center
  color #9AA6B8
.u-input
  display none
.u-trigger-wrap
  display inline-block
  text-align center
  cursor pointer
.u-upload-file
  position relative
  margin-top 17px
.u-download-text
  color #4A71F0
  position absolute
  top 7px
  left 90px
  cursor pointer
.u-dialog-list
  min-height 100px
  max-height 200px
  overflow-y scroll
.u-dialog-list-item
  font-size 12px
  color #494949
  display flex
  margin-bottom 10px
  span
    margin-right 10px
  .u-text-color
    color #4A71F0
  .u-check
    color #4A71F0
    cursor pointer
.u-loading-bottom
  text-align center
.p-form-disabled:hover,
.p-form-disabled
  color #C1C1C1
  .p-form-company-name
    color #C1C1C1
.u-operate-button
  display flex
  justify-content space-between
  flex-wrap wrap
  button
    color #3B68F0
  .u-disabled-btn
    color #C0C4CC
.u-dialog-import-detail-export
  font-size 12px
  color #494949
  .u-export
    color #4A71F0
    cursor pointer
    margin-left 10px
    margin 0 0 10px 10px
.u-dialog-import-detail-summary
  color #9AA6B8
  margin 20px 0
  font-size 12px
.u-color-blue
  color #4A71F0
.u-color-red
  color #FD5652
.u-warning-icon
  color #F05A4A
  margin 0 -19px 0 7px
  font-size 14px
  position absolute
  top 50%
  margin-top -8px
  z-index 999

/deep/ .el-table th.el-table__cell
  background-color #F2F2F6
  color #494949
  font-weight 600
// /deep/ .el-button--small
//   min-width 76px
// /deep/ .el-button--text
//   min-width 0
</style>
