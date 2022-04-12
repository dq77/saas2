<template lang="pug">
.page-main.p-sincerity-list
  DataSummary(:refresh='summaryRefresh')
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @initSearchParams='initSearchParams'
    @privateSearchParams='privateSearchParams'
  )
    template(slot='line')
      span _
    template(slot='headerTop' slot-scope='{row}')
      el-button.p-mission-btn(icon='el-icon-tickets' @click='clickTaskList') 任务列表
        span.u-header-num ({{taskCount || 0}})
    template(slot='modelScore' slot-scope='{row}')
      span(v-if='row.gradeInfo.status !== 6') {{ Math.round(row.modelScore) || '0' }}
      span(v-else) -
      el-popover(
        v-if='row.gradeInfo.status === 6'
        placement='top-start'
        content='模型更新后，原来的等级无法进行展示，请重新跑模型以获取新的模型结果。'
        trigger='hover'
      )
        i.el-icon-warning.u-warning-icon(slot='reference')
    template(slot='creditStatus' slot-scope='{row}')
      | {{row.creditStatus ? qjdCreditStatus[row.creditStatus] : '-'}}
    template(slot='qjdStatus' slot-scope='{row}')
      | {{row.qjdStatus ? qjdStatus[row.qjdStatus] : '未注册'}}
    template(slot='modelResultTime' slot-scope='{row}')
      span {{renderModelItem(row, 'modelResultTime')}}
    template(slot='creditLine' slot-scope='{row}')
      template(v-if='isNumber(row.creditLine)')
        .sort-cell
          span ¥ {{row.creditLine | toAmountStr(2, true)}}
          el-popover(
            placement='top-start'
            content='合作风险较大，额度已禁用'
            trigger='hover'
            v-if='row.inBlacklist'
          )
            i.el-icon-warning.u-warning-icon(slot='reference')
      span.sort-cell(v-else) -
    template(slot='operate' slot-scope='{row}')
      .u-operate-button
        .u-operate-btn(
          weblogs-anchor='factory-layered-detail'
          type='text'
          @click='checkDetail(row)'
        ) 查看
        .u-operate-btn.p-no-margin(
          weblogs-anchor='factory-layered-changInfo'
          type='text'
          @click='getAdviceQuota(row)'
        ) {{row.realControllerId ? '修改信息' : '补充信息'}}
  //- 添加诚信查询step-1
  el-dialog(
    width='327px'
    :show-close='true'
    title='添加诚信查询'
    :visible.sync='dialogAdd.visible'
    custom-class='el-dialog-new'
    :close-on-click-modal='false'
  )
    el-form(
      label-width='100px'
      ref='dialogAddForm'
      :rules='dialogAdd.rules'
      :model='dialogAdd.form'
    ).p-dialog-form
      .p-form-item
        el-form-item(prop='corpName')
          .p-form-label 经销商名称
          el-input.p-dialog-search-input(ref='corpName' type='text' placeholder='请输入经销商名称' v-model='dialogAdd.form.corpName' @keyup.enter.native='searchQCC' maxlength='20')
          el-button.p-search(type='primary' @click='searchQCC' :loading='dialogAdd.searchQCCLoading') 查询
      template(v-if='dialogAdd.companyList')
        template(v-if='dialogAdd.companyList.length')
          .p-form-tips 请选择匹配的经销商
          .p-form-companyList
            template(v-for='(item, key) in dialogAdd.companyList')
              .p-radio(:class='!item.creditCode ? "p-form-disabled" : ""' )
                .p-form-companyList-item(:class='item.creditCode === dialogAdd.selectItem.creditCode ? "p-form-selected" : ""' @click='selectCompany(item)')
                  .p-form-company-name {{item.name}}
                    span(v-if='item.regStatus') （{{item.regStatus}}）
                  i.el-icon-success(v-if='item.creditCode === dialogAdd.selectItem.creditCode')
        .p-empty-tips(v-else) 没有匹配的经销商
    span(slot='footer')
      el-button(
        weblogs-anchor='factory-layered-importCustomer-cancel'
        size='small'
        @click='dialogAdd.visible=false'
      ) 取消
      el-button(type='primary'
        weblogs-anchor='factory-layered-importCustomer-sure'
        size='small'
        :disabled='!dialogAdd.selectItem'
        :loading='dialogAdd.sureLoading'
        @click='checkHasData'
      ) 确认
  //- 添加诚信查询step-2
  el-dialog(
    width='327px'
    :show-close='true'
    title='添加诚信查询'
    custom-class='el-dialog-new'
    :visible.sync='dialogAddStep2.visible'
    :close-on-click-modal='false'
  )
    .p-empty-tips 该经销商已存在，请直接查看该经销商诚信等级额度信息
    span(slot='footer')
      el-button(type='primary' @click='checkDetail(dialogAdd.selectItem)' size='small') 立即查看
  //- 添加诚信查询step-3
  el-dialog(
    width='327px'
    :show-close='true'
    :title='`添加诚信查询`'
    custom-class='el-dialog-new'
    :visible.sync='dialogAddStep3.visible'
    :close-on-click-modal='false'
  )
    .p-empty-tips.p-text-right 提交实控人信息进行精准查询
    el-form(
      label-width='100px'
      ref='dialogAddStep3Form'
      :rules='dialogAddStep3.rules'
      :model='dialogAddStep3.form'
      v-loading='dialogAddStep3.loading'
    ).p-dialog-form
      .p-form-item
        el-form-item(prop='realControllerName')
          .p-form-label 实控人姓名
          el-input(ref='realControllerName' type='text' placeholder='请输入实控人姓名' v-model='dialogAddStep3.form.realControllerName' maxlength='10')
        el-form-item(prop='realControllerId')
          .p-form-label 实控人身份证号
          el-input(ref='realControllerId' type='text' placeholder='请输入实控人身份证号' v-model='dialogAddStep3.form.realControllerId' maxlength='18')
        el-form-item(prop='realControllerMobile')
          .p-form-label 实控人手机号
          el-input(ref='realControllerMobile' type='text' placeholder='请输入实控人手机号' v-model='dialogAddStep3.form.realControllerMobile' maxlength='11')
    span(slot='footer')
      el-button(@click='dialogAddStep3.visible=false' size='small') 取消
      el-button(type='primary' :loading='dialogAddStep3.sureLoading' @click='submit' size='small') 确定
  //- 批量获取额度弹窗
  el-dialog(
    width='509px'
    :show-close='true'
    title='批量添加诚信查询'
    custom-class='el-dialog-new'
    :visible.sync='dialogBatch.visible'
    :close-on-click-modal='false'
  )
    .p-empty-tips 请按标准模板上传本次新增被查询经销商，上传Excel后系统将校验并生成额度建议，生成时间大约需要10分钟
    .u-upload-file
      el-upload(
        ref='upload'
        :action='toPrefixUrl("/partner/pcompany/excel/import")'
        :before-upload='handleBefroeUpload'
        :on-remove='handleRemove'
        :on-change='handleChange'
        :on-success='handleSuccess'
        :file-list='dialogBatch.fileList'
        accept='.xls,.xlsx,.csv'
        :limit='1'
        :multiple='false'
        :auto-upload='false')
          el-button(plain type='primary') 选择文件
      i.el-icon-download.u-download-text(@click='dowloadTemplate') 下载模板
    span(slot='footer')
      el-button(
        weblogs-anchor='factory-layered-batchImportCustomer-cancel'
        size='small'
        @click='dialogBatch.visible=false'
      ) 取消
      el-button(
        weblogs-anchor='factory-layered-batchImportCustomer-sure'
        type='primary'
        size='small'
        :loading='dialogBatch.sureLoading'
        :disabled='dialogBatch.disabled'
        @click='batchAdd'
      ) 上传
  //- 查询任务列表
  el-dialog(
    width='509px'
    :show-close='true'
    title='查询任务列表'
    custom-class='el-dialog-new'
    :visible.sync='dialogList.visible'
    :close-on-click-modal='false'
  )
    .u-dialog-list(@scroll='handleScroll' v-loading='dialogExcel.downloading')
      template(v-if='dialogList.taskList.length')
        template(v-for='(item, index) in dialogList.taskList')
          .u-dialog-list-item(v-if='item.type !== 2')
            span {{item.gmtCreated | toDateStr('yyyy-MM-dd hh:mm:ss')}}
            span {{item.creatorMobile}}
            span {{jobStatus[item.jobStatus]}}
            span.u-check(type='text' v-if='item.jobStatus === 0' @click='getImportDetail(item.id)') 查看
            span(v-else)
              i.el-icon-loading.u-text-color
      template(v-else-if='!dialogList.loading')
        .p-empty-tips 暂无任务
      .u-loading-bottom(v-if='dialogList.loading')
        i.el-icon-loading.u-text-color
    span(slot='footer')
      el-button(@click='dialogList.visible=false' size='small') 关闭
  //- 查询任务详情列表
  el-dialog(
    width='509px'
    :show-close='true'
    title='批量添加诚信查询'
    custom-class='el-dialog-new'
    :visible.sync='dialogImportDetail.visible'
    :close-on-click-modal='false'
  )
    .u-dialog-list(v-loading='dialogImportDetail.loading')
      .u-dialog-import-detail-summary 批量列表已上传成功，其中成功获取额度经销商数：
        span.u-color-blue {{dialogImportDetail.summary.successTotal || 0}}
        span 个，获取额度失败经销商数：
        span.u-color-red {{dialogImportDetail.summary.failTotal || 0}}
        span 个
      .u-dialog-import-detail-export 本次异常经销商详情
        i.el-icon-upload2.u-export(@click='downloadFile') 导出
      el-table(
        :data='dialogImportDetail.list'
      )
        el-table-column(prop='corpName' label='经销商名称' min-width='150')
        el-table-column(prop='errorReason' label='错误原因')
    span(slot='footer')
      el-button(@click='dialogImportDetail.visible=false' size='small') 关闭
</template>

<script>
import ListPage from '@/components/ListPage'
import { qjdStatus, qjdCreditStatus, jobStatus } from '@/utils/enums'
import { toDateStr, toPrefixUrl, renderModelItem, filterGradeInfo, isNumber} from '@/utils/util'
import { vPhone, vIdcardNumber } from '@/utils/validateRules'
import ajaxStore from '@/apis'
import DataSummary from './dataSummary'

// import _ from 'lodash'
export default {
  components: { ListPage, DataSummary },
  data () {
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
      summaryRefresh: false,
      qjdStatus,
      qjdCreditStatus,
      jobStatus,
      taskCount: 0,
      dialogExcel: {
        pageNo: 1,
        pageSize: 10,
        downloading: false,
        batchImportId: ''
      },
      dialogList: {
        visible: false,
        loading: false,
        taskList: [],
        pageNo: 1,
        pageSize: 10,
        isEnd: false
      },
      dialogBatch: {
        visible: false,
        disabled: true,
        fileList: []
      },
      dialogAdd: {
        visible: false,
        sureLoading: false,
        searchQCCLoading: false,
        rules: {
          corpName: [
            { required: true, message: '请输入经销商名称', trigger: ['change', 'blur'] },
          ]
        },
        form: {
          corpName: ''
        },
        selectItem: '',
        companyList: '',
      },
      dialogAddStep2: {
        visible: false
      },
      dialogAddStep3: {
        visible: false,
        sureLoading: false,
        loading: false,
        type: 'add',
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
      },
      dialogImportDetail: {
        visible: false,
        loading: false,
        list: [],
        summary: {},
        batchImportId: ''
      },
      ids: []
    }
  },
  computed: {
    listPageConfig () {
      const config = {
        headButtonGroup: [
          {
            type: 'text',
            text: '导入经销商',
            method: this.clickAdd,
            weblogs: 'factory-layered-importCustomer'
          },
          {
            type: 'text',
            text: '批量导入经销商',
            method: this.clickBatch,
            weblogs: 'factory-layered-batchImportCustomer'
          }
        ],
        searchParams: [
          [
            {
              type: 'remote',
              formItemName_text: 'corpName',
              formItemName_id: 'id',
              placeholder: '请输入经销商',
              label: '经销商名称',
              formItemNameInAPI: 'corpName', // 接口数据对比和取值
              formItemIdInAPI: 'id', // 接口数据对比和取值
              remoteMethod: ajaxStore.factoryService.layered.getCompanyListInFactory,
              remoteParamName: 'name',
              col: 6
            },
            {
              type: 'text',
              formItemName: 'startScore',
              placeholder: '最低分',
              label: '价值分数',
              col: 3
            },
            {
              type: 'slot',
              slotName: 'line',
              col: 0.5
            },
            {
              type: 'text',
              formItemName: 'endScore',
              placeholder: '最高分',
              label: '',
              col: 3
            },
            {
              type: 'select',
              formItemName: 'qjdStatus',
              enum: qjdStatus,
              label: '认证状态',
              placeholder: '请选择认证状态',
              col: 5,
            },
            {
              type: 'select',
              formItemName: 'qjdCreditStatus',
              enum: qjdCreditStatus,
              label: '额度状态',
              placeholder: '请选择额度状态',
              col: 6,
            },
          ]
        ],
        tableHeader: [
          { name: '经销商名称', property: 'corpName', minWidth: '150'},
          {
            name: '红线触发项数',
            property: 'redCount',
            minWidth: '100',
            sortable: 'custom',
            formatter(value) {
              return value || '0'
            },
          },
          { name: '价值分数', property: 'modelScore', tdSlotName: 'modelScore', minWidth: '100', sortable: 'custom', formatter: (value) => { return Math.round(value) || '0' } },
          { name: '最终批复额度', property: 'creditLine', tdSlotName: 'creditLine', sortable: 'custom', align: 'right', minWidth: '150'},
          { name: '当前额度状态', property: 'creditStatus', tdSlotName: 'creditStatus', align: 'right' },
          { name: '仟金顶认证状态', property: 'qjdStatus', tdSlotName: 'qjdStatus', minWidth: '100', align: 'right' },
          { name: '操作', property: 'operate', tdSlotName: 'operate' },
        ],
        getTableList: {
          type: 'custom',
          fn: this.getSincerityList
        }
      }
      // 移除配置助手入口，代码保留
      // if (this.$store.state.permissions['PTN:ASIA:SUPPLIER:HIERARCHICAL_QUOTA_SETTING:VIEW']) {
      //   config.headButtonGroup.push({
      //     type: 'text',
      //     text: '配置助手',
      //     method: this.clickGrade
      //   })
      // }
      return config
    }
  },
  methods: {
    toPrefixUrl,
    toDateStr,
    renderModelItem,
    isNumber,
    // 查看导出历史文件
    checkFile(filekey) {
      window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${filekey}`))
    },
    initSearchParams(params) {
      let { descs, ascs } = this.$route.query
      descs = !descs && !ascs ? 'id' : descs
      params.descs = descs
      params.ascs = ascs
    },
    async getSincerityList(parmas) {
      const res = await ajaxStore.factoryService.layered.getSincerityList(parmas)
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        this.ids = []
        data.pagedRecords.map((item, key) => {
          data.pagedRecords[key].gradeInfo = filterGradeInfo(item)
          if ([0, 1].includes(data.pagedRecords[key].gradeInfo.status)) {
            this.ids.push(data.pagedRecords[key].id)
          }
        })
        setTimeout(() => {
          this.checkCompanyModelResult()
        }, 5000)
        return {
          tableList: data.pagedRecords,
          currentPage: data.pageNo,
          totalCount: data.totalCount
        }
      }
    },
    getAdviceQuota(item) {
      this.getCompanyInfoById(item.id)
      this.dialogAddStep3.type = 'edit'
      this.dialogAddStep3.visible = true
    },
    dowloadTemplate() {
      window.open('https://cdn.qjdchina.com/public/fuwu/%E6%89%B9%E9%87%8F%E6%B7%BB%E5%8A%A0%E8%AF%9A%E4%BF%A1%E6%9F%A5%E8%AF%A2%E6%A8%A1%E6%9D%BF.xlsx')
    },
    sortObj(obj) {
      const arr = []
      for (const i in obj) {
        arr.push([obj[i], i])
      };
      arr.reverse()
      const len = arr.length
      const newObj = {}
      for (let i = 0; i < len; i++) {
        newObj[arr[i][1]] = arr[i][0]
      }
      return newObj
    },
    privateSearchParams(params) {
      if (!params.descs && !params.ascs) {
        params.descs = 'id'
      }
    },
    checkDetail(item) {
      this.$router.push({ name: 'sincerityDetail', query: { id: item.id, companyId: item.cifCompanyId } })
    },
    async checkHasData() {
      this.dialogAdd.sureLoading = true
      const res = await ajaxStore.factoryService.layered.checkCompanyInfoByRegNo({regNo: this.dialogAdd.selectItem.creditCode})
      this.dialogAdd.sureLoading = false
      if (res.data && res.data.code === '0') {
        if (res.data.data) {
          this.dialogAdd.selectItem.id = res.data.data.id
          this.dialogAdd.visible = false
          this.dialogAddStep2.visible = true
        } else {
          this.dialogAdd.visible = false
          this.dialogAddStep3.type = 'add'
          this.dialogAddStep3.visible = true
        }
      }
    },
    async checkCompanyModelResult() {
      if (this.ids.length) {
        const res = await ajaxStore.factoryService.layered.checkCompanyModelResult({ids: this.ids})
        if (res.data && res.data.code === '0') {
          const list = res.data.data
          this.$refs.listPage.tableList.map((item, i) => {
            list.map((item2, j) => {
              if (item.id === item2.id) {
                this.$refs.listPage.tableList[i] = Object.assign(this.$refs.listPage.tableList[i], item2)
                this.$refs.listPage.tableList[i].gradeInfo = filterGradeInfo(this.$refs.listPage.tableList[i])
                this.ids.map((idsItem, index) => {
                  if (idsItem === item2.id) {
                    this.ids.splice(index, 1)
                  }
                })
              }
            })
          })
          if (this.ids.length) {
            setTimeout(() => {
              this.checkCompanyModelResult()
            }, 5000)
          } else {
            this.summaryRefresh = !this.summaryRefresh
          }
        }
      }
    },
    async getCompanyInfoById(id) {
      this.dialogAddStep3.loading = true
      const res = await ajaxStore.factoryService.layered.checkCompanyInfoById({id})
      this.dialogAddStep3.loading = false
      if (res.data && res.data.code === '0') {
        this.dialogAdd.selectItem = res.data.data
        this.dialogAddStep3.form = res.data.data
      }
    },
    selectCompany(item) {
      if (item.creditCode) {
        this.dialogAdd.selectItem = item
      }
    },
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
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 50) {
        this.$message.error('上传文件不能超过50MB')
        return false
      }
    },
    handleChange(file, files) {
      this.dialogBatch.disabled = !files.length
    },
    handleRemove(file, files) {
      this.dialogBatch.fileList = files
      this.handleChange(file, files)
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleBefroeUpload(file) {
      if (file.size / 1024 / 1024 > 50) {
        this.$message.error('上传文件不能超过50MB')
        return false
      }
    },
    exportCurrent (lists) {
      if (lists.length) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/utils/excel/Export2Excel')
          const tHeader = ['经销商名称', '实控人姓名', '实控人手机号', '实控人身份证号码', '本任务诚信等级', '错误原因']
          const filterVal = ['corpName', 'realControllerName', 'realControllerMobile', 'realControllerId', 'errorReason']
          const list = lists
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '厂家批量导入经销商')
          this.dialogExcel.downloading = false
        })
      } else {
        this.alertTip('暂无列表，无法导出数据。')
      }
    },
    handleSuccess(response, file, fileList) {
      this.dialogBatch.disabled = false
      if (response.data) {
        this.dialogBatch.visible = false
        this.$refs.listPage.resetSearchForm()
        this.$refs.listPage.getTableList()
        this.getTaskCount()
        // this.clickTaskList()
        this.$message.success('上传成功')
      } else {
        this.dialogBatch.visible = false
        if (response.code === 'E9999') {
          this.$message.error(response.detail)
        } else {
          this.$message.error(response.message)
        }
      }
    },
    async downloadFile() {
      if (!this.dialogExcel.downloading) {
        const {pageNo, pageSize, batchImportId} = this.dialogExcel
        this.dialogExcel.downloading = true
        const res = await ajaxStore.factoryService.layered.getTaskDetailList({
          batchImportId,
          pageNo,
          pageSize,
          ascs: 'id'
        })
        if (res.data && res.data.code === '0') {
          if (res.data.data.totalCount > pageSize) {
            this.dialogExcel.downloading = false
            this.dialogExcel.pageSize = res.data.data.totalCount
            this.downloadFile(batchImportId)
          } else {
            this.dialogExcel.pageSize = 10
            res.data.data.pagedRecords.map((item, index) => {
              res.data.data.pagedRecords[index].modelResultTime = this.renderModelItem(res.data.data.pagedRecords[index], 'modelResultTime')
            })
            this.exportCurrent(res.data.data.pagedRecords)
          }
        } else {
          this.dialogExcel.downloading = false
        }
      }
    },
    clickTaskList() {
      this.dialogList.visible = true
      this.dialogList.pageNo = 1
      this.dialogList.taskList = []
      this.dialogList.isEnd = false
      this.getTaskCount()
      this.getTaskList()
    },
    clickBatch() {
      this.dialogBatch.visible = true
      this.dialogBatch.disabled = true
      this.dialogBatch.fileList = []
    },
    clickGrade() {
      this.$router.push('gradeAndQuota')
    },
    batchAdd() {
      this.dialogBatch.disabled = true
      this.$refs.upload.submit()
    },
    handleScroll(e) {
      if ((parseInt(e.target.clientHeight) + parseInt(e.target.scrollTop)) === parseInt(e.target.scrollHeight)) {
        if (!this.dialogList.isEnd) {
          this.getTaskList(true)
        }
      }
    },
    getImportDetail(id) {
      this.dialogList.visible = false
      this.dialogImportDetail.list = []
      this.dialogImportDetail.summary = {}
      this.dialogImportDetail.visible = true
      this.dialogExcel.batchImportId = id
      this.getTaskSummary(id)
      this.getTaskDetail(id)
    },
    async getTaskDetail() {
      const {batchImportId} = this.dialogExcel
      this.dialogImportDetail.loading = true
      const res = await ajaxStore.factoryService.layered.getTaskDetailList({
        batchImportId,
        pageNo: 1,
        pageSize: 1000,
        ascs: 'id'
      })
      if (res.data && res.data.code === '0') {
        this.dialogImportDetail.list = res.data.data.pagedRecords.filter((item) => {
          return item.errorReason
        })
      }
      this.dialogImportDetail.loading = false
    },
    async getTaskSummary(batchImportId) {
      const res = await ajaxStore.factoryService.layered.getStatisticsDetailList({
        batchImportId
      })
      if (res.data && res.data.code === '0') {
        this.dialogImportDetail.summary = res.data.data
      }
    },
    async getTaskList(isNext) {
      if (!this.dialogList.loading) {
        if (isNext) {
          this.dialogList.pageNo = this.dialogList.pageNo + 1
        }
        const {pageNo, pageSize} = this.dialogList
        this.dialogList.loading = true
        const res = await ajaxStore.factoryService.layered.getTaskList({
          pageNo,
          pageSize
        })
        if (res.data && res.data.code === '0') {
          if (res.data.data.pagedRecords.length) {
            if (pageNo === 1) {
              this.dialogList.taskList = res.data.data.pagedRecords
            } else {
              this.dialogList.taskList = this.dialogList.taskList.concat(res.data.data.pagedRecords)
            }
            if (res.data.data.totalPages === pageNo) {
              this.dialogList.isEnd = true
            }
          } else {
            this.dialogList.taskList = []
            this.dialogList.pageNo = 1
          }
        }
        this.dialogList.loading = false
      }
    },
    clickTrigger() {
      if (!this.dialogBatch.disabled) { this.$refs.input.click() }
    },
    changeFiles(e) {
      const files = e.target.files
      // 判断是否有文件改变
      if (!files || files.length === 0) return
      this.uploadFiles(files)
      this.$refs.input.value = null
    },
    clickAdd() {
      this.dialogAdd.visible = true
      // this.dialogAddStep3.visible = true
      this.dialogAdd.companyList = ''
      this.dialogAdd.selectItem = ''
      this.$refs.dialogAddForm && this.$refs.dialogAddForm.resetFields()
      this.$refs.dialogAddStep3Form && this.$refs.dialogAddStep3Form.resetFields()
    },
    submit() {
      this.dialogAddStep3.type === 'edit' ? this.editCompany() : this.addCompany()
    },
    async editCompany() {
      this.$refs.dialogAddStep3Form.validate(async valid => {
        if (valid) {
          const data = {...this.dialogAddStep3.form}
          data.corpName = this.dialogAdd.selectItem.name
          data.regCode = this.dialogAdd.selectItem.creditCode
          this.dialogAddStep3.sureLoading = true
          const res = await ajaxStore.factoryService.layered.editCompanySincerity({
            id: data.id,
            params: {
              realControllerId: data.realControllerId,
              realControllerMobile: data.realControllerMobile,
              realControllerName: data.realControllerName
            }
          })
          this.dialogAddStep3.sureLoading = false
          if (res.data && res.data.code === '0') {
            this.$message.success('获取成功')
            this.dialogAddStep3.visible = false
            await this.$refs.listPage.getTableList()
          }
        }
      })
    },
    async addCompany() {
      this.$refs.dialogAddStep3Form.validate(async valid => {
        if (valid) {
          const data = {...this.dialogAddStep3.form}
          data.corpName = this.dialogAdd.selectItem.name
          data.regCode = this.dialogAdd.selectItem.creditCode
          this.dialogAddStep3.sureLoading = true
          const res = await ajaxStore.factoryService.layered.addCompanySincerity(data)
          this.dialogAddStep3.sureLoading = false
          if (res.data && res.data.code === '0') {
            this.$message.success('添加成功')
            this.dialogAddStep3.visible = false
            this.$refs.listPage.resetSearchForm()
            await this.$refs.listPage.getTableList()
            // 添加完成后，在列表高亮显示添加的数据
            if (!this.$refs.listPage.loading) {
              const rows = document.getElementsByClassName('el-table__row')
              for (let i = 0; i < rows.length; i++) {
                if (rows[i].innerHTML.indexOf(this.dialogAdd.selectItem.name) > -1) {
                  rows[i].className = rows[i].className + ' u-current-add'
                }
              }
            }
          }
        }
      })
    },
    async getTaskCount() {
      const res = await ajaxStore.factoryService.layered.getTaskCount()
      if (res.data && res.data.code === '0') {
        this.taskCount = res.data.data
      }
    }
  },
  mounted() {
    this.getTaskCount()
  },
  watch: {
    $route (newRoute) {
      const rows = document.getElementsByClassName('el-table__row')
      for (let i = 0; i < rows.length; i++) {
        rows[i].className = 'el-table__row'
      }
    }
  }
}
</script>
<style lang="stylus">
.p-sincerity-list
  .u-current-add
    background #f0f9eb
</style>

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
.p-text-right
  justify-content right
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
    margin-right 10px
.p-no-margin
  margin 0
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
.u-operate-btn
  color #409EFF
  cursor pointer
  font-weight bold
.u-operate-btn:hover
  color #409EFF
</style>
