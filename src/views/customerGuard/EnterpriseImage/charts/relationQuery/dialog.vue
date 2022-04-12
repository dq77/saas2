<template lang="pug">
el-dialog(title='添加企业' :visible.sync='addEnterpriseVisible' width='350px')
  .dialog-body
    el-form(@submit.native.prevent)
      el-form-item(label='企业名称（模糊搜索）')
          el-input(v-model='dialog.enterprise' @keyup.enter.native='search' type='text' clearable)
          el-button.dialog-button(type='primary' :loading='dialogLoading' @click='search') 搜索
      el-form-item(label='请选择匹配的企业')
        .dialog-match-box(@click='checkCompany' v-loading='dialogLoading')
          .dialog-match-row(v-for='(item, key) in companys' :class='dialog.matchCompany === item.companyName ? "activeMatch" : ""' :key='key' :data-name='item.companyName') {{item.companyName}}
          .dialog-no-data(v-if='companys.length === 0') 暂无数据
  span.dialog-footer(slot='footer')
    el-button(@click='addEnterpriseVisible=false') 取 消
    el-button(type='primary' @click='submit') 确 定
</template>

<script>
import { EventBus } from './config'
import ajaxStore from '@/apis'
export default {
  props: {
    companyName: {
      type: String,
    }
  },
  data () {
    return {
      addEnterpriseVisible: false,
      dialogLoading: false,
      dialog: {
        id: '',
        matchCompany: '',
        enterprise: ''
      },
      companys: [],
      relationData: {}
    }
  },
  methods: {
    async search() {
      if (!this.dialog.enterprise) return
      this.dialogLoading = true
      const res = await ajaxStore.factoryService.realEstate.queryCompany({ name: this.dialog.enterprise })
      if (res.data && res.data.code === '0') {
        this.companys = res.data.data
      }
      this.dialogLoading = false
    },
    checkCompany(e) {
      if (e.target.getAttribute('data-name')) {
        this.dialog.matchCompany = e.target.getAttribute('data-name')
      }
    },
    queryCompany(id) {
      this.addEnterpriseVisible = true
      this.dialog.matchCompany = ''
      this.dialog.enterprise = ''
      this.dialog.id = id
      this.companys = []
    },
    submit() {
      this.addEnterpriseVisible = false
      if (!this.dialog.matchCompany) return
      console.log(this.dialog.matchCompany)
      EventBus.$emit('matchCompanyEvent', this.dialog.matchCompany)
    }
  },
  mounted() {
    EventBus.$on('queryCompanyEvent', (id) => { this.queryCompany(id) })
  }
}
</script>

<style lang="stylus" scoped>
>>>.el-dialog__body
  padding-top 0
  padding-bottom 0
>>>.el-dialog__footer
  text-align center
.dialog-body
  .el-input
    width 210px
  .dialog-button
    float right
    width 95px
  .dialog-match-box
    height 242px
    border 1px solid #dcdfe6
    margin-top 35px
    box-sizing border-box
    overflow auto
    .dialog-no-data
      text-align center
      margin-top 100px
    .dialog-match-row
      padding 0 10px
      line-height 30px
      cursor pointer
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
    .dialog-match-row:hover
      background #dcdfe6
    .activeMatch
      color #409eff
</style>
