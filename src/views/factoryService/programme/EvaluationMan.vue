<template lang="pug">
.page-main
  .p-header-title 人工项目评估
  .p-form-main(v-if='ready' v-loading='loading')
    el-form(
        label-width='100px'
        ref='form'
        :rules='rules'
        :model='form'
        labelPosition='left'
      )
      el-row(:gutter='24')
        el-col(:span='12')
          el-form-item(label='项目名称' prop='name')
            el-input(v-model='form.name' maxlength='50' placeholder='请输入项目名称')
        el-col(:span='12')
          el-form-item(label='项目类型' prop='projectType')
            el-select(
              placeholder='请选择项目类型'
              v-model='form.projectType'
            ).p-select-item
              el-option(
                 v-for='(val,index) in projectType'
                :key='index'
                :label='val'
                :value='index'
              )
      el-row(:gutter='24')
        el-col(:span='12')
          el-form-item(label='项目地址' prop='selectedOptions')
            search-area(@change='changeArea' :initValue='form.selectedOptions')
      el-row(:gutter='24')
        el-col(:span='12')
          el-form-item(label='' prop='address')
            el-input(v-model='form.address' maxlength='20' placeholder='请输入详细地址')
      el-row(:gutter='24')
        el-col(:span='12')
          el-form-item(label='建筑工程商名称' prop='realEstateCompany')
            el-autocomplete.p-input(
              v-model='form.realEstateCompany'
              :maxlength='20'
              placeholder='请输入建筑工程商名称'
              :fetch-suggestions="querySearchRealEstateCompany"
              @select='setRealEstateCompany'
            )
        el-col(:span='12')
          el-form-item(label='项目公司' prop='projectCompany')
            el-autocomplete.p-input(
              v-model='form.projectCompany'
              :maxlength='20'
              placeholder='请输入项目公司'
              :fetch-suggestions="querySearchRelatedCompany"
            )
            // el-input(v-model='form.projectCompany' maxlength='20' placeholder='请输入项目公司')
      el-row(:gutter='24')
        el-col(:span='12')
          el-form-item(label='股东性质' prop='shareholderType')
            el-select(
              placeholder='请选择股东性质'
              v-model='form.shareholderType'
            ).p-select-item
              el-option(
                 v-for='(val,index) in shareholderType'
                :key='index'
                :label='val'
                :value='index'
              )
        el-col(:span='12')
          el-form-item(label='项目方类型' prop='projectPartyType')
            el-select(
              placeholder='请选择项目方类型'
              v-model='form.projectPartyType'
            ).p-select-item
              el-option(
                 v-for='(val,index) in projectPartyType'
                :key='index'
                :label='val'
                :value='index'
              )
      el-row(:gutter='24' v-if='hasContractFile')
        el-col(:span='24')
          el-form-item(label='上传合同文件' prop='contractFiles')
            template(v-if='handleContractFiles' )
              UploadFile(:multiple='true' @change='handleContractFiles' suffix='jpg|jpeg|png|pdf|rar|zip|doc|docx' :initFileList='form.contractFiles')
              .u-tip 可上传格式为rar、zip、doc、docx、jpg、jpeg、png、pdf
      // el-row(:gutter='24' v-else)
      //   el-col(:span='24')
      //     el-form-item(label='项目合同信息')
      //       .u-tip
      //         i.el-icon-info
      //         | 提示：为保证评估结果的准确性，请上传项目真实合同
      //       .p-contract-info
      //         el-row(:gutter='24')
      //           el-col(:span='8')
      //             el-form-item(label='预算' prop='budget')
      //               el-input(v-model='form.budget' maxlength='20' placeholder='请输入')
      //           el-col(:span='8')
      //             el-form-item(label='面积' prop='area')
      //               el-input(v-model='form.area' maxlength='20' placeholder='请输入')
      //           el-col(:span='8')
      //             el-form-item(label='承接方式' prop='undertakeMode')
      //               el-input(v-model='form.undertakeMode' maxlength='20' placeholder='请输入')
      //         el-row(:gutter='24')
      //           el-col(:span='8')
      //             el-form-item(label='结款方式' prop='paymentMethod')
      //               el-input(v-model='form.paymentMethod' maxlength='20' placeholder='请输入')
      //           el-col(:span='8')
      //             el-form-item(label='回款周期' prop='paymentCycle')
      //               el-input(v-model='form.paymentCycle' maxlength='20' placeholder='请输入')
      //         el-row.p-radio-main(:gutter='24')
      //           el-col(:span='24')
      //             el-form-item(label='是否有预付款' prop='isTherePrepayment' label-width='255px' required)
      //               el-radio-group(v-model='form.isTherePrepayment')
      //                 el-radio(:label='1') 是
      //                 el-radio(:label='0') 否
      //           el-col(:span='24')
      //             el-form-item(label='是否有房抵款' prop='isThereHouseMortgage' label-width='255px' required)
      //               el-radio-group(v-model='form.isThereHouseMortgage')
      //                 el-radio(:label='1') 是
      //                 el-radio(:label='0') 否
      //           el-col(:span='24')
      //             el-form-item(label='是否有商业汇票、保理付款' prop='isThereCommercialDraft' label-width='255px' required)
      //               el-radio-group(v-model='form.isThereCommercialDraft')
      //                 el-radio(:label='1') 是
      //                 el-radio(:label='0') 否
      //           el-col(:span='24')
      //             el-form-item(label='项目验收前是否可支付到合同金额的70%' prop='isItPossiblePaySevenPercent' label-width='255px' required)
      //               el-radio-group(v-model='form.isItPossiblePaySevenPercent')
      //                 el-radio(:label='1') 是
      //                 el-radio(:label='0') 否
      //           el-col(:span='24')
      //             el-form-item(label='是否有有效应收账款' prop='isThereEffectiveAccountsReceivable' label-width='255px' required)
      //               el-radio-group(v-model='form.isThereEffectiveAccountsReceivable')
      //                 el-radio(:label='1') 是
      //                 el-radio(:label='0') 否
      el-row(:gutter='24')
        el-col(:span='24')
          el-form-item(label='上传招标文件' prop='biddingDocuments')
            el-radio-group(v-model='form.hasBiddingDocuments' @change='biddingDocumentsIsRequired')
              el-radio(:label='1') 是
              el-radio(:label='0') 否
            template(v-if='form.hasBiddingDocuments' )
              UploadFile(:multiple='true' @change='handleBiddingDocuments' suffix='jpg|jpeg|png|pdf|rar|zip|doc|docx' :initFileList='form.biddingDocuments')
              .u-tip 可上传格式为rar、zip、doc、docx、jpg、jpeg、png、pdf
            .u-tip(v-else)
              i.el-icon-info
              | 提示：缺少招标文件将影响评估结果
        el-col(:span='24')
          el-form-item(label='上传投标文件' prop='tenderDocuments')
            el-radio-group(v-model='form.hasTenderDocuments' @change='tenderDocumentsIsRequired')
              el-radio(:label='1') 是
              el-radio(:label='0') 否
            template(v-if='form.hasTenderDocuments' )
              UploadFile(:multiple='true' @change='handleTenderDocuments' suffix='jpg|jpeg|png|pdf|rar|zip|doc|docx' v-if='form.hasTenderDocuments' :initFileList='form.tenderDocuments')
              .u-tip 可上传格式为rar、zip、doc、docx、jpg、jpeg、png、pdf
            .u-tip(v-else)
              i.el-icon-info
              | 提示：缺少投标文件将影响评估结果
        el-col(:span='24')
          el-form-item(label='备注' prop='resultRemark')
            el-input(type='textarea' v-model='form.projectRemark' maxlength='200' placeholder='请输入备注' :rows='3')
    .p-btns-main
      el-button.p-btn.p-btn-plain.p-btn-operation(type='primary' @click='submit("0")' weblogs-anchor='factory-customerEvaluation-eval-initiate-save') 保存为草稿
      el-button.p-btn.p-btn-operation(type='primary' plain @click='goBack()' weblogs-anchor='factory-customerEvaluation-eval-initiate-cancel') 取消
      el-button.p-btn.p-btn-operation(type='primary' @click='submit("1")' weblogs-anchor='factory-customerEvaluation-eval-initiate-submit') 提交
</template>
<script>
import ajaxStore from '@/apis'
import { toPrefixUrl } from '@/utils/util'
import SearchArea from '@/components/SearchArea'
import UploadFile from '@/components/UploadFile'
import { getRegionTextArr } from '@/utils/regionHandleByAjax'
import { shareholderType, projectPartyType, projectType } from '@/utils/enums'
import { vFile } from '@/utils/validateRules'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  components: { SearchArea, UploadFile },
  data() {
    return {
      loading: false,
      ready: false,
      hasContractFile: false,
      companyList: [],
      relatedCompanyList: [],
      AreaData: [],
      shareholderType,
      projectPartyType,
      projectType,
      form: {
        type: '2',
        name: '',
        projectCompany: '',
        realEstateCompany: '',
        selectedOptions: [],
        shareholderType: '',
        address: '',
        projectPartyType: '',
        projectType: '',
        budget: '',
        area: '',
        undertakeMode: '',
        paymentMethod: '',
        paymentCycle: '',
        isTherePrepayment: 0,
        isThereHouseMortgage: 0,
        isThereCommercialDraft: 0,
        isItPossiblePaySevenPercent: 0,
        isThereEffectiveAccountsReceivable: 0,
        biddingDocuments: [],
        tenderDocuments: [],
        contractFiles: [],
        hasBiddingDocuments: 1,
        hasTenderDocuments: 1,
        projectId: '',
        fileType: '',
        projectRemark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: ['change', 'blur'] },
        ],
        projectCompany: [
          { required: true, message: '请输入项目公司', trigger: ['change', 'blur'] },
        ],
        realEstateCompany: [
          { required: true, message: '请输入建筑工程商名称', trigger: ['change', 'blur'] },
        ],
        selectedOptions: [
          { required: true, message: '请输入项目地址', trigger: ['change', 'blur'] },
        ],
        shareholderType: [
          { required: true, message: '请选择股东性质', trigger: ['change', 'blur'] },
        ],
        address: [
          { required: true, message: '请输入项目地址', trigger: ['change', 'blur'] },
        ],
        projectPartyType: [
          { required: true, message: '请选择项目方类型', trigger: ['change', 'blur'] },
        ],
        projectType: [
          { required: true, message: '请选择项目方类型', trigger: ['change', 'blur'] },
        ],
        budget: [
          { required: true, message: '请输入预算', trigger: ['change', 'blur'] },
        ],
        area: [
          { required: true, message: '请输入面积', trigger: ['change', 'blur'] },
        ],
        undertakeMode: [
          { required: true, message: '请输入承接方式', trigger: ['change', 'blur'] },
        ],
        paymentMethod: [
          { required: true, message: '请输入结款方式', trigger: ['change', 'blur'] },
        ],
        paymentCycle: [
          { required: true, message: '请输入回款周期', trigger: ['change', 'blur'] },
        ]
      }
    }
  },
  computed: {
  },
  methods: {
    validIsRequired() {
      if (this.hasContractFile) {
        const contractFileds = ['budget', 'area', 'undertakeMode', 'paymentMethod', 'paymentCycle']
        contractFileds.map((item) => {
          this.rules[item] = []
        })
        this.rules.contractFiles = this.fileRequire()
      }
      this.biddingDocumentsIsRequired(this.form.hasBiddingDocuments)
      this.tenderDocumentsIsRequired(this.form.hasTenderDocuments)
    },
    validateFile (rule, value, callback) {
      if (!value.length) {
        callback(new Error('请选择要上传的文件'))
      } else {
        callback()
      }
    },
    fileRequire() {
      return { required: true, validator: vFile, trigger: ['change', 'blur'] }
    },
    biddingDocumentsIsRequired(val) {
      if (val) {
        this.rules.biddingDocuments = this.fileRequire()
      } else {
        this.rules.biddingDocuments = []
      }
      this.$refs.form && this.$refs.form.clearValidate('biddingDocuments')
    },
    tenderDocumentsIsRequired(val) {
      if (val) {
        this.rules.tenderDocuments = this.fileRequire()
      } else {
        this.rules.tenderDocuments = []
      }
      this.$refs.form && this.$refs.form.clearValidate('tenderDocuments')
    },
    handleContractFiles(fileList) {
      this.handleFileList('contractFiles', fileList)
      this.$refs.form.validateField('contractFiles')
      weblogsDom('项目评估-发起项目评估页-上传投标文件')
    },
    handleBiddingDocuments(fileList) {
      this.handleFileList('biddingDocuments', fileList)
      this.$refs.form.validateField('biddingDocuments')
      weblogsDom('项目评估-发起项目评估页-上传招标文件')
    },
    handleTenderDocuments(fileList) {
      this.handleFileList('tenderDocuments', fileList)
      this.$refs.form.validateField('tenderDocuments')
      weblogsDom('项目评估-发起项目评估页-上传投标文件')
    },
    handleFileList(type, fileList) {
      let fileType
      switch (type) {
        case 'biddingDocuments':
          fileType = 1
          break
        case 'tenderDocuments':
          fileType = 2
          break
        case 'contractFiles':
          fileType = 3
          break
      }
      const files = []
      fileList.map((item) => {
        files.push({
          buzType: '1', // 1-项目 2\3\4待定
          name: item.name,
          type: fileType,
          fileKey: item.fileKey || item.response.data,
          url: item.fileKey ? this.getFileUrl(item.fileKey) : this.getFileUrl(item.response.data)
        })
      })
      this.form[type] = files
    },
    changeArea(value) {
      const areaStr = getRegionTextArr(value[0], value[1], value[2]).split(' ')
      this.form.selectedOptions = value
      this.form.provinceCode = value[0]
      this.form.cityCode = value[1]
      this.form.areaCode = value[2]
      this.form.provinceName = areaStr[0]
      this.form.cityName = areaStr[1]
      this.form.areaName = areaStr[2]
    },
    async getCompanyList() {
      const res = await ajaxStore.factoryService.realEstate.getCompanyList()
      if (res.data && res.data.code === '0') {
        this.companyList = res.data.data || []
      }
    },
    setRealEstateCompany(obj) {
      this.form.realEstateCompany = obj.value
      this.getRelatedCompanyList()
    },
    querySearchRealEstateCompany(queryString, cb) {
      const companyList = this.companyList
      const results = queryString ? companyList.filter(this.createFilter(queryString)) : companyList
      // 调用 callback 返回建议列表的数据
      const filterCompanyList = []
      results.map((item) => {
        filterCompanyList.push({
          value: item
        })
      })
      cb(filterCompanyList)
    },
    querySearchRelatedCompany(queryString, cb) {
      const relatedCompanyList = this.relatedCompanyList
      const results = queryString ? relatedCompanyList.filter(this.createFilter(queryString)) : relatedCompanyList
      // 调用 callback 返回建议列表的数据
      const filterCompanyList = []
      results.map((item) => {
        filterCompanyList.push({
          value: item
        })
      })
      cb(filterCompanyList)
    },
    createFilter(queryString) {
      return (companyList) => {
        return (companyList.indexOf(queryString) === 0)
      }
    },
    async getRelatedCompanyList() {
      const res = await ajaxStore.factoryService.programme.getRelatedCompanyList({
        companyName: this.form.realEstateCompany
      })
      if (res.data && res.data.code === '0') {
        this.relatedCompanyList = res.data.data
      }
    },
    async formSubmit(status) {
      const data = this.form
      data.status = status
      if (!data.hasTenderDocuments) data.tenderDocuments = []
      if (!data.hasBiddingDocuments) data.biddingDocuments = []
      data.attachments = data.contractFiles.concat(data.tenderDocuments).concat(data.biddingDocuments)
      data.fileType = this.hasContractFile ? '1' : '2'
      if (this.$route.query.id && this.$route.query.type === 'edit') {
        this.loading = true
        const res = await ajaxStore.factoryService.programme.projectEdit(data)
        this.loading = false
        if (res.data && res.data.code === '0') {
          this.$message.success('提交成功')
          this.$router.push({
            name: 'programmeEvaluationMan'
          })
        }
      } else {
        this.loading = true
        const res = await ajaxStore.factoryService.programme.projectSave(data)
        this.loading = false
        if (res.data && res.data.code === '0') {
          this.$message.success('提交成功')
          this.$router.push({
            name: 'programmeEvaluationMan'
          })
        }
      }
    },
    goBack() {
      this.$router.back()
    },
    submit(status) {
      if (status === '0') {
        this.$refs.form.validateField('name', (msg) => {
          if (!msg) {
            this.formSubmit(status)
          }
        })
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formSubmit(status)
          }
        })
      }
    },
    getFileUrl(fileKey) {
      return toPrefixUrl(`/partner/common/file/download?fileKey=${fileKey}`)
    },
    async getProjectDetail() {
      this.loading = true
      const res = await ajaxStore.factoryService.programme.getProjectDetail({
        id: this.$route.query.id
      })
      this.loading = false
      if (res.data && res.data.code === '0') {
        const radios = ['isItPossiblePaySevenPercent', 'isThereCommercialDraft', 'isThereEffectiveAccountsReceivable', 'isThereHouseMortgage', 'isTherePrepayment']
        const { provinceCode, cityCode, areaCode, attachments } = res.data.data
        radios.map((item) => {
          res.data.data[item] = parseInt(res.data.data[item])
        })
        res.data.data.selectedOptions = [provinceCode, cityCode, areaCode]
        attachments.map((item, key) => {
          attachments[key].url = this.getFileUrl(item.fileKey)
        })
        res.data.data.contractFiles = attachments.filter((item) => { return item.type === '3' })
        res.data.data.tenderDocuments = attachments.filter((item) => { return item.type === '2' })
        res.data.data.biddingDocuments = attachments.filter((item) => { return item.type === '1' })
        res.data.data.hasBiddingDocuments = res.data.data.biddingDocuments.length ? 1 : 0
        res.data.data.hasTenderDocuments = res.data.data.tenderDocuments.length ? 1 : 0
        this.hasContractFile = res.data.data.fileType === '1'
        setTimeout(() => {
          this.form = res.data.data

          this.validIsRequired()
          this.ready = true
        }, 0)
      }
    },
    async getProjectById() {
      const res = await ajaxStore.factoryService.programme.getProjectById({
        id: this.$route.query.projectId
      })
      if (res.data && res.data.code === '0') {
        this.form.name = res.data.data.pname
        this.form.realEstateCompany = res.data.data.entName
        this.form.projectCompany = res.data.data.pcompany
        this.form.projectId = res.data.data.id
        this.ready = true
        this.setRealEstateCompany({value: res.data.data.entName})
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getProjectDetail()
      // this.ready = true
    } else {
      const { hasContractFile } = this.$route.query
      this.hasContractFile = !!parseInt(hasContractFile)
      this.validIsRequired()
      if (this.$route.query.type) {
        this.form.type = this.$route.query.type
        this.getProjectById()
      } else {
        this.ready = true
      }
    }
    this.getCompanyList()
  }
}
</script>
<style lang="stylus">
.p-contract-info
  .el-form-item__label
    background #fff
    border-radius 2px
    padding-right 10px
    padding 0 10px 0 20px
  .el-input__inner
    border none
    margin-left 2px
    border-radius 2px
  .p-radio-main
    .el-radio-group
      margin-left 25px
</style>
<style lang="stylus" scoped>
.p-header-title
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/project-detail-top.png') right bottom no-repeat
  background-size cover
  height 50px
  line-height 50px
  color #fff
  font-size 18px
  padding-left 20px
.p-form-main
  background #ffffff
  padding 40px
  box-shadow 4px 6px 8px 0px #EEF1FC
.p-select-item
  width 100%
.p-contract-info
  background #F3F4F8
  padding 32px 18px
.p-btns-main
  text-align center
  margin 50px 0
  .p-btn-plain
    background #E5E7EF
    color #263862
    border none
.p-input
  width 100%
.p-btn-operation
  width 90px
</style>
