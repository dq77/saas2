<template lang="pug">
.page-main
  Card.p-block-card(:loading='dataLoading' :noTitle='true')
    .p-block-list(v-if='contractInfo')
      .p-block
        .u-left
          .u-label 剩余合同数
          .u-number {{contractInfo.remainderNum || 0}}
        .u-right
      .p-block
        .u-left
          .u-label 已用合同数
          .u-number {{contractInfo.usedNum || 0}}
        .u-right
      .p-block
        .u-left
          .u-label 签署成功合同数
          .u-number {{contractInfo.successNum || 0}}
        .u-right
      .p-block
        .u-left
          .u-label 套餐总合同数
          .u-number {{contractInfo.totalNum || 0}}
        .u-right
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @privateSearchParams='privateSearchParams'
  )
    template(slot='indateDate' slot-scope='{row}')
      template(v-if='row.indateStart')
        | {{row.indateStart | toDateStr('yyyy-MM-dd')}} - {{row.indateEnd || '长期'}}
      template(v-else) - -
    template(slot='operate' slot-scope='{row}')
      el-button(
        weblogs-anchor='factory-smartContract-detail'
        type='text'
        style='color:#4A71F0'
        @click='clickDetail(row)'
      ) 查看
      el-button(
        weblogs-anchor='factory-smartContract-invalid'
        @click='clickFrozen(row)'
        type='text'
        v-if='(row.status !== "0") && permissions["PTN:SUPPLIER:CONTRACT:MANAGE:UPDATE"]'
      ) 失效
      el-button(weblogs-anchor='factory-smartContract-transpond' type='text' @click='clickSend(row)') 转发
      el-button(weblogs-anchor='factory-smartContract-apply' type='text' @click='clickApply(row)') 应用
  //- 转发
  el-dialog(
    width='280px'
    title='扫码签署后，将合同转发给对应签署人'
    :visible.sync='dialogSend'
  )
    div(id='qrcode' ref='qrcode')
    template(slot='title')
      .center 扫码签署后
      .center 将合同转发给对应签署人
  //- 创建合同
  el-dialog(
    width='550px'
    :show-close='true'
    title='创建合同'
    :visible.sync='dialogAdd.visible'
  )
    el-form(
      label-width='110px'
      ref='dialogAddForm'
      :rules='dialogAdd.rules'
      :model='dialogAdd.form'
    )
      el-form-item(label='合同编号' prop='id' required)
        el-input(v-model='dialogAdd.form.id' maxlength='50')
      el-form-item(label='合同名称' prop='name' required)
        el-input(v-model='dialogAdd.form.name' maxlength='20')
      el-form-item(label='合同有效期' prop='validDate')
        el-date-picker(
          value-format='yyyy-MM-dd'
          clearable
          type='date'
          placeholder='请选择开始时间'
          v-model='dialogAdd.form.startDate'
          style='width:160px')
        span &nbsp;&nbsp; 至 &nbsp;
        el-date-picker(
          value-format='yyyy-MM-dd'
          clearable type='date'
          placeholder='请选择结束时间'
          v-model='dialogAdd.form.endDate'
          style='width:160px')
        el-checkbox(style='margin-left:10px' v-model='dialogAdd.form.isLong' true-label='Y' false-label='N' @change='() => $refs.dialogAddForm.validate()') 长期
      el-form-item(label='合同文件上传' prop='fileKey')
        el-upload(
          name='file'
          :action='uploadUrl'
          :file-list='uploadFiles'
          :multiple='false'
          :limit='1'
          accept='application/pdf'
          :before-upload='beforeUpload'
          :on-success='uploadSuccessHandler'
          :on-error='uploadErrorHandler'
          :on-progress='uploadProgressHandler'
          :on-remove='uploadRemoveHandler'
          :on-exceed='uploadExceedHandler'
          :on-preview='uploadPreviewHandler'
        )
          el-button.u-btn-normal(plain round :loading='loadingUpload') 点击上传
          .u-upload-text(slot='tip') 仅支持如下格式的文件：pdf
    span(slot='footer')
      el-button(@click='dialogAdd.visible=false' weblogs-anchor='factory-smartContract-cancel') 取消
      el-button(type='primary' :loading='dialogAdd.sureLoading' @click='clickCreateSubAccount' weblogs-anchor='factory-smartContract-cancel') 下一步
  //- 失效
  el-dialog(
    width='400px'
    title='合同失效提示'
    :visible.sync='dialogFrozen.visible'
  )
    div 您是否将此合同编号：{{dialogFrozen.form.code}}合同进行失效，失效后该合同无法进行电子签署，且无法再恢复有效状态。已经签署成功的合同不影响正常出证。
    span(slot='footer')
      el-button(@click='dialogFrozen.visible=false') 取消
      el-button(type='primary' :loading='dialogFrozen.sureLoading' @click='clickSureFrozen') 确认
  el-dialog(title='应用' :visible.sync='dialogVisible')
    Form(ref='formRef' :formConfig='formConfig' :formData='formData' :rules='rules' :labelPosition='"right"' :inline='false')
      el-button(type='plain' @click='dialogVisible = false') 取消
      el-button(type='primary'  @click='submitDialog') 提交
</template>

<script>
import QRCode from 'qrcodejs2'
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import ListPage from '@/components/ListPage'
import Card from '@/components/Card'
import { baseUrl } from '@/utils/config'
import { contractStatus, toMobileUrl } from '@/utils/enums'
import { toPrefixUrl, toDateStr } from '@/utils/util'
import Form from '@/components/Form'
import ajaxStore from '@/apis'

export default {
  components: { ListPage, Card, Form },
  data () {
    const vValidDate = (rule, value, callback) => {
      if (!this.dialogAdd.form.startDate) {
        callback(new Error('请选择开始日期'))
      } else if (!this.dialogAdd.form.endDate && this.dialogAdd.form.isLong === 'N') {
        callback(new Error('请选择结束日期'))
      } else if (this.dialogAdd.form.startDate >= this.dialogAdd.form.endDate && this.dialogAdd.form.isLong === 'N') {
        callback(new Error('结束日期必须大于开始日期'))
      } else {
        callback()
      }
    }
    return {
      contractSimpleStatus: {
        0: '失效',
        3: '待签约',
        5: '签署中',
        6: '签署成功',

      },
      currentName: '',
      dataLoading: false,
      qrcodeObj: undefined,
      contractInfo: {
        leftAmount: 10,
        contractInfo: 100,
        usedAmount: 22,
        totalAmount: 500
      },
      dialogAdd: {
        visible: false,
        sureLoading: false,
        rules: {
          id: [
            { required: true, message: '请输入合同编号', trigger: ['change', 'blur'] },
          ],
          name: [
            { required: true, message: '请输入合同名称', trigger: ['change', 'blur'] },
          ],
          validDate: [{ required: true, validator: vValidDate, trigger: 'blur' }],
          fileKey: [
            { required: true, message: '请上传合同文件', trigger: ['change', 'blur'] },
          ],
        },
        form: {
          id: '',
          name: '',
          startDate: '',
          endDate: '',
          fileKey: '',
          isLong: 'N',
        }
      },
      dialogSend: false,
      loadingUpload: false,
      uploadFiles: [],
      dialogFrozen: {
        visible: false,
        sureLoading: false,
        form: {}
      },
      dialogVisible: false,
      formConfig: [
        {label: '应用类型', type: 'input', key: 'relType', disabled: true},
        {
          label: '项目编号',
          type: 'select',
          remote: true,
          key: 'relCode',
          handleChange: (val, item) => {
            const {options} = item || []
            options.forEach(elem => {
              if (elem.value === val) {
                this.formData.relName = elem.name
              }
            })
          },
          remoteMethod: (query) => {
            if (query !== '') {
              // this.loading = true
              setTimeout(() => {
                // this.loading = false
                this.getProjectCodeList(query)
              }, 200)
            } else {
              this.formConfig[1].options = []
            }
          },
          options: []
        },
        {label: '项目名称', type: 'input', key: 'relName', disabled: true},
      ],
      formData: {
        relType: '项目',
        relCode: '',
        relName: '',
      },
      rules: {
        relCode: [
          { required: true, message: '请输入选择项目编码', trigger: 'change' }
        ],
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'permissions']),
    uploadUrl: () => `${baseUrl}/saas-contract/contract/file/upload`,
    previewUrl: () => `${baseUrl}/proof/file/rawFile?fileKey=`,
    listPageConfig () {
      const getContractList = ajaxStore.factoryService.smartContract.getContractList
      const headFeault = [
        {
          type: 'text',
          text: '新增合同',
          method: this.clickCreate,
          weblogs: 'factory-smartContract-create'
        }
      ]
      const headButtonGroup = this.permissions['PTN:SUPPLIER:CONTRACT:MANAGE:CREATE'] ? headFeault : []
      return {
        headButtonGroup: headButtonGroup,
        searchParams: [
          [
            {
              type: 'text',
              formItemName: 'outerContractCode',
              label: '合同编号',
              placeholder: '请输入合同编号',
              col: 6,
            },
            {
              type: 'text',
              formItemName: 'name',
              label: '合同名称',
              placeholder: '请输入合同名称',
              col: 6,
            },
            {
              type: 'select',
              formItemName: 'status',
              enum: this.contractSimpleStatus,
              label: '签署状态',
              placeholder: '请选择合同状态',
              col: 6,
            },
            {
              type: 'daterange',
              label: '创建日期',
              formItemName_start: 'createDateStart',
              formItemName_end: 'createDateEnd',
              placeholder_start: '起始日期',
              placeholder_end: '结束日期',
              col: 6
            }
          ]
        ],
        tableHeader: [
          { name: '合同名称', property: 'name'},
          { name: '合同编号', property: 'outerContractCode' },
          { name: '合同有效期', property: 'indateDate', tdSlotName: 'indateDate', width: '200px'},
          { name: '签署状态', property: 'status', formatter: (v) => contractStatus[v] },
          { name: '签署时间', property: 'signSuccessDate', formatter: (v) => v ? toDateStr(v, 'yyyy-MM-dd') : '-' },
          { name: '合同创建时间', property: 'createdTime', formatter: (v) => v ? toDateStr(v, 'yyyy-MM-dd') : '-'},
          { name: '操作', property: 'operate', tdSlotName: 'operate', width: '220px' },
        ],
        getTableList: {
          type: 'component',
          fn: getContractList
        }
      }
    },
  },
  methods: {
    toPrefixUrl,
    qrcode (url) {
      if (this.qrcodeObj) {
        this.qrcodeObj.clear() // clear the code.
        this.qrcodeObj.makeCode(url)
      } else {
        this.qrcodeObj = new QRCode('qrcode', {
          width: 200, // 设置宽度，单位像素
          height: 200, // 设置高度，单位像素
          text: url // 设置二维码内容或跳转地址
        })
      }
    },
    clickDetail(rowData) {
      window.open(`/saas-contract/contract/file/downLoadx?&code=&type=&watermark=&signType=&fileShowType=&showType=2&fileKey=${rowData.key}`)
    },
    updata(key, options = []) {
      const item = this.formConfig.find(item => item.key === key)
      if (!item) return
      item.options = options
    },
    async clickSend(rowData) { // 转发
      const hostname = toMobileUrl[location.hostname] || 'test-project-saas-mobile.qjdidc.com'
      this.dialogSend = true
      this.$nextTick(() => {
        this.qrcode(hostname + 'agreement/SignPersonList?processId=' + rowData.processId + '&tenantId=' + this.userInfo.corporationId)
      })
    },
    async getDetail() {
      const tenantId = (this.userInfo.tenants && this.userInfo.tenants.length > 0) ? this.userInfo.tenants[0].tenantId : ''
      const res = await this.ajaxStore.factoryService.smartContract.getContractAmountDetail({tenantId})
      if (res.data && res.data.code === '0') {
        this.contractInfo = res.data.data
      }
    },
    async getProjectCodeList(query) {
      const res = await this.$http.supplyChain.getProjectList({projectSn: query, pageNo: 1, pageSize: 10})
      // debugger
      if (res.data && res.data.code === '0') {
        const options = res.data.data.pagedRecords.map(item => {
          return {
            label: item.projectSn,
            value: item.projectSn,
            name: item.name
          }
        })
        this.updata('relCode', options)
      }
    },
    clickApply(row) {
      this.dialogVisible = true
      this.formData.code = row.code
      this.formData.id = row.id
      this.formData.relName = row.relName
      this.formData.relCode = row.relCode
    },
    submitDialog() {
      this.$refs.formRef.$refs.formRef.validate(async valid => {
        if (valid) {
          const params = {
            relType: '1',
            relCode: this.formData.relCode,
            relName: this.formData.relName,
            code: this.formData.code,
            id: this.formData.id
          }
          const res = await this.ajaxStore.factoryService.smartContract.getContractUpdate(params)
          if (res.data && res.data.code === '0') {
            this.$refs.listPage.getTableList()
            this.dialogVisible = false
          }
        }
      })
    },
    clickCreate() {
      this.dialogAdd.visible = true
      this.$nextTick(() => {
        this.$refs.dialogAddForm.resetFields()
        this.dialogAdd.form.startDate = ''
        this.dialogAdd.form.endDate = ''
        this.uploadFiles = []
      })
    },
    clickCreateSubAccount() {
      this.$refs.dialogAddForm.validate(async valid => {
        if (valid) {
          this.dialogAdd.sureLoading = true
          const isRepeat = await this.checkRepeatId(this.dialogAdd.form.id)
          this.dialogAdd.sureLoading = false
          if (isRepeat) return this.$message.warning('该合同编号已被使用!')
          const data = {...this.dialogAdd.form}
          if (this.dialogAdd.form.isLong === 'Y') {
            data.endDate = ''
            delete data.isLong
          }
          this.dialogAdd.visible = false
          // const { href } = this.$router.resolve({
          //   name: 'contractAdd',
          //   query: data
          // })
          // window.open(href, '_blank')
          this.$router.push({
            name: this.currentName,
            query: data
          })
        }
      })
    },
    async checkRepeatId(id) {
      const res = await this.ajaxStore.factoryService.smartContract.getContractList({
        keyFlag: '1',
        pageNo: '1',
        pageSize: 10,
        processFlag: '1',
        tenantId: this.userInfo.tenants[0].tenantId,
        exactQueryOuterContractCode: id
      })
      if (res.data && res.data.code === '0' && res.data.data && res.data.data.pagedRecords.length > 0) return true
      return false
    },
    clickFrozen(rowData) {
      this.dialogFrozen.visible = true
      this.dialogFrozen.form = {
        code: rowData.code,
        status: rowData.status
      }
    },
    async clickSureFrozen() { // 失效
      const data = {...this.dialogFrozen.form, status: 0}
      this.dialogFrozen.sureLoading = true
      const res = await this.ajaxStore.factoryService.smartContract.getContractUpdate(data)
      this.dialogFrozen.sureLoading = false
      if (res.data && res.data.code === '0') {
        this.$message.success('失效成功')
        this.dialogFrozen.visible = false
        this.$refs.listPage.getTableList()
      }
    },
    async getAccountInfo(id) {
      const res = await this.ajaxStore.account.getAccountInfo({ id })
      if (res.data && res.data.code === '0') {
        return res.data.data
      } else {
        return false
      }
    },
    // 上传组件相关事件
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传文件不能超过10MB')
        return false
      }
    },
    uploadSuccessHandler(res, file, fileList) {
      if (res && res.code === '0') {
        this.dialogAdd.form.fileKey = res.data.fileKey
        this.dialogAdd.form.fileName = res.data.fileName
        this.uploadFiles = [{ name: file.name, url: this.previewUrl + res.data.fileKey }]
        // this.$refs.pageForm.validateField('fileKey')
        // if (res.data.fileKey) this.getFileSrc(res.data.fileKey)
      } else {
        this.uploadFiles = []
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: res.message ? res.message.replace(/\n/g, '<br>') : '上传失败'
        })
      }
      this.loadingUpload = false
    },
    uploadErrorHandler() {
      this.$message.error('上传失败')
      this.loadingUpload = false
    },
    uploadProgressHandler() {
      this.loadingUpload = true
    },
    uploadRemoveHandler() {
      this.dialogAdd.form.fileKey = ''
      this.uploadFiles = []
      this.elementList = []
      this.loadingUpload = false
    },
    uploadExceedHandler() {
      this.$message.warning('超出上传数量，请删除后再上传')
    },
    uploadPreviewHandler(file) {
      window.open(`${file.url}`)
    },
    privateSearchParams(params) {
      params.processFlag = '1'
      params.keyFlag = '1'
      params.tenantId = (this.userInfo.tenants && this.userInfo.tenants[0].tenantId) || ''
      return params
    },
    moduleNav(menuTag, page, text) {
      let result = false
      if (menuTag === 'offline') {
        Message.warning('该功能正在研发中，敬请期待')
      } else {
        if (JSON.stringify(this.permissions).indexOf(menuTag) > -1) {
          if (page) {
            this.$router.push({
              name: page
            })
          }
          result = true
        } else {
          if (page) {
            Message.error('您没有该功能权限，请联系管理员添加')
          }
        }
      }
      return result
    },
  },
  mounted() {
    this.getDetail()
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.formRef.$refs.formRef.clearValidate()
        }, 0)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    const { matched } = to
    const name = matched?.[1]?.name
    next(vm => {
      vm.currentName = name === 'factoryService' ? 'factorycontractAdd' : name === 'supplyChain' ? 'contractAdd' : ''
    })
  }
}
</script>

<style lang="stylus" scoped>
.p-block-card
  margin-bottom 10px
.p-block-list
  display flex
.p-block
  display flex
  flex 1
  padding 20px 30px 20px 20px
  margin-right 8px
  background-color #F8F9FA
  &:last-child
    margin-right 0
  .u-left
    flex 1
  .u-right
    width 80px
    height 60px
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/smartContract/block-icon-1.png) no-repeat
    background-size 100%
  &:nth-child(2) .u-right
    background-image url(//cdn.qjdchina.com/static-online/saas/factoryService/smartContract/block-icon-2.png)
  &:nth-child(3) .u-right
    background-image url(//cdn.qjdchina.com/static-online/saas/factoryService/smartContract/block-icon-3.png)
  &:nth-child(4) .u-right
    background-image url(//cdn.qjdchina.com/static-online/saas/factoryService/smartContract/block-icon-4.png)
  .u-label
    font-size 12px
    color #494949
  .u-number
    margin-top 15px
    font-size 20px
    color #494949
    font-weight bold
.u-pie-main
  display relative
.p-summary-item-1
  width 24%
.p-summary-item-2
  width 25%
.p-summary-item-3
  width 25%
.p-summary-item-4
  width 26%
.p-gap
  margin 0 10px
.p-upload-tip
  font-size 12px
  color #606266
  margin-left 10px
.summary-amount
  text-align center
  margin-top 10px
.u-icon-disable
  opacity 0.5
#qrcode
  display flex
  justify-content center
  margin-top -20px
.center
  text-align center
</style>
