<template lang="pug">
div
  .page-layout-approval-title 审批节点
  .page-layout-approval-content
    el-collapse(v-model='collapseActive')
      template(v-if='historyNode.length > 0')
        el-collapse-item(v-for='(item, key) in historyNode', :name='key', :key='key', v-if='item')
          //- 折叠头
          template(slot='title', v-if='item && Object.keys(item).length > 0')
            .page-layout-approval-collapse-title
              //- 历史节点
              span {{ item.taskName }}
              i.iconfont.icon-fujian(v-if='item.fileIds')
              template(v-if='item.isPass === "R"')
                i.iconfont.icon-shenpibutongyi
                span.u-pass-text {{ rejectText }}
              template(v-else-if='item.isPass === "Y"')
                i.iconfont.icon-shenpitongyi
                span.u-pass-text {{ agreeText }}
              template(v-else)
                i.iconfont.icon-shenpibutongyi
                span.u-pass-text {{ disagreeText }}
              //- .u-right
              //-   i.iconfont.icon-shenpiren
              //-   span 审批人：{{ item.operator }}
              //-   i.iconfont.icon-shenpishijianrenwulishi
              //-   span 审批时间：{{ item.endTime }}

          //- 通过slot插入的多个表单
          el-row(:gutter='20' v-if='showSlotForm && showSlotNodes.includes(item.taskName)')
            slot(name='slotForm' :disabled='true')

          //- 折叠内容
          el-form(label-width='150px')
            template(v-if='isNeedDefault && !getHide(item.taskName)')
              //- el-form-item(label='审批意见：') {{ (item.pass || item.isPass) === "Y" ? "同意" : "不同意" }}
              el-form-item(label='审批人：') {{ item.operator }}
              el-form-item(label='审批时间：') {{ item.endTime | toDateStr('yyyy-MM-dd hh:mm:ss') }}
              el-form-item(label='备注：') {{ item.comment || '-' }}
            el-row(:gutter='20')
              el-col(v-for='(contentItem, contentKey) in getNodeOptions(item.taskName)', :key='contentKey', :span='contentItem.col || 24')
                slot(v-if ='contentItem.type === "slotWithoutLabel"' :name='contentItem.slotName' :disabled='true' :row='{ node: item, isCurrent: false }')
                el-form-item(:label='contentItem.label + "："', v-else-if='contentItem.show === undefined ? true : contentItem.show')
                  span(v-if='typeof contentItem.formatter === "function"') {{ contentItem.formatter(item[contentItem.formItemName], item) }}
                  slot(v-else-if='typeof $scopedSlots[contentItem.slotName] === "function"', :name='contentItem.slotName', :row='{ node: item, isCurrent: false }')
                  el-button(v-else-if='contentItem.type === "button"', plain, @click='contentItem.fn(item)', :disabled='contentItem.disabled') {{ contentItem.text }}
                  span(v-else-if='contentItem.type === "number"') {{ item[contentItem.formItemName] | toAmountStr(2) }}
                  span(v-else-if='contentItem.type === "radio"') {{ contentItem.enum[item[contentItem.formItemName]] }}
                  span(v-else-if='contentItem.type === "checkbox"') {{ handlerCheckbox(item[contentItem.formItemName], contentItem.enum) }}
                  span(v-else-if='contentItem.type === "file"')
                    template(v-if='item[contentItem.formItemName] && item[contentItem.formItemName].length > 0')
                      div(v-for='(fileItem, key) in item[contentItem.formItemName]', :key='key')
                        a(:href='toPrefixUrl(`/clms/boss/fileDownload/checkAttachment?key=${fileItem.downloadId || fileItem.key || fileItem.fileKey}`)', target='_blank') {{ fileItem.fileName || fileItem.name }}
                    template(v-else) 无
                  span(v-else) {{ item[contentItem.formItemName || contentItem.formItemName_text || contentItem.formItemName_start] }}
      //- 当前节点
      el-collapse-item(name='last', v-if='$route.name.indexOf("backLog")>=0 && currentNode && Object.keys(currentNode).length > 0')
        //- 折叠头
        template(slot='title')
          .page-layout-approval-collapse-title
            span {{ currentNode.taskName }}
            //- .u-right
            //-   span.u-node-tip(v-if='tipText') 提示：
            //-     span.color-danger {{ tipText }}
            //-   i.iconfont.icon-shenpiren
            //-   span 可审批人：{{ currentNode.candidate }}
            //-   template
            //-     i.iconfont.icon-shenpishijianrenwulishi
            //-     span 任务历时：
            //-     span.color-danger {{ lastTime }}

        //- 通过slot插入的多个表单
        el-row(:gutter='20' v-if='showSlotForm && showSlotNodes.includes(currentNode.taskName)')
          slot(name='slotForm')

        el-form(label-width='150px', style='padding-right: 100px' :rules='rules', :model='form', ref='form')
          el-form-item(label='可审批人：')
            span {{currentNode.candidate || '-'}}
          el-row(:gutter='20')
            el-col(v-for='(formItem, formKey) in getNodeOptions(currentNode.taskName)', :key='formKey', :span='formItem.col || 24')
              slot(v-if ='formItem.type === "slotWithoutLabel"' :name='formItem.slotName' :disabled='true' :row='{ node: currentNode, isCurrent: true, form }')
              el-form-item(v-else-if='formItem.show === undefined ? true : formItem.show', :label='formItem.label + "："', :prop='formItem.formItemName || formItem.formItemName_start || formItem.slotName' :required='formItem.required')
                el-input(
                  v-if='formItem.type === "input"',
                  v-model.trim='form[formItem.formItemName]',
                  type='text',
                  :maxlength='formItem.maxlength || 50',
                  clearable,
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @change='formItem.change',
                  @focus='formItem.focus',
                  @input='formItem.input',
                  @clear='formItem.clear'
                )
                el-input(
                  v-else-if='formItem.type === "textarea"',
                  v-model.trim='form[formItem.formItemName]',
                  type='textarea',
                  :rows='2',
                  :maxlength='formItem.maxlength || 500',
                  clearable,
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @change='formItem.change',
                  @focus='formItem.focus',
                  @input='formItem.input',
                  @clear='formItem.clear'
                )
                el-input-number.text-left(
                  v-else-if='formItem.type === "number"',
                  v-model='form[formItem.formItemName]',
                  controls-position='right',
                  :min='0.01',
                  :max='999999999999999.99',
                  :step='1',
                  :precision='2',
                  clearable,
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @change='formItem.change',
                  @focus='formItem.focus'
                )
                el-select(
                  v-else-if='formItem.type === "select"',
                  v-model='form[formItem.formItemName]',
                  :placeholder='"请选择" + formItem.label',
                  clearable,
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @visible-change='formItem.visibleChange',
                  @focus='formItem.focus',
                  @change='formItem.change',
                  @clear='formItem.clear'
                )
                  el-option(
                    v-for='(val,index) in formItem.enum'
                    :key='index'
                    :label='val'
                    :value='formItem.useValue ? val : index'
                  )
                el-select.width-100(
                  v-if='formItem.type === "remote"',
                  :placeholder='"请输入" + formItem.label',
                  filterable,
                  clearable,
                  remote,
                  v-model='form[formItem.formItemName_text]',
                  :remote-method='formItem.querySearch',
                  :loading='remoteContent[`loading${formItem.formItemName_text}`]',
                  :default-first-option='true',
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @focus='formItem.focus',
                  @input='formItem.input',
                  @clear='formItem.clear',
                  @change='formItem.handleChange'
                )
                  el-option(v-for='(remoteItem, remoteKey) in remoteContent[`remoteList${formItem.formItemName_text}`]', :key='remoteKey', :value='remoteItem[formItem.formItemNameInAPI]')
                el-cascader.width-100(
                  v-if='formItem.type === "customer"',
                  clearable,
                  change-on-select,
                  v-model='form[formItem.formItemName]',
                  :options='options',
                  @change='formItem.changeAreaAndManage'
                )
                el-radio-group(v-else-if='formItem.type === "radio"', v-model='form[formItem.formItemName]', :disabled='formItem.disabled', @change='formItem.change')
                  el-radio(v-for='(rItem, rKey) in formItem.enum', :key='rKey', :label='rKey') {{ rItem }}
                el-checkbox-group(v-else-if='formItem.type === "checkbox"', v-model='form[formItem.formItemName]', :disabled='formItem.disabled', @change='formItem.change')
                  el-checkbox(v-for='(cItem, cKey) in formItem.enum', :key='cKey', :label='cKey') {{ cItem }}
                el-date-picker(
                  v-else-if='formItem.type === "daterange"',
                  v-model='handleDates[formItem.formItemName_start]',
                  type='daterange',
                  @change='formItem.changeDate',
                  :picker-options='formItem.pickerOptions',
                  :start-placeholder='formItem.placeholder_start',
                  :end-placeholder='formItem.placeholder_end',
                  :default-time='["00:00:00", "23:59:59"]',
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @focus='formItem.focus'
                )
                el-date-picker(
                  v-else-if='formItem.type === "date"',
                  v-model='form[formItem.formItemName]',
                  :picker-options='formItem.pickerOptions',
                  :placeholder='"请选择" + formItem.label',
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @focus='formItem.focus',
                  @change='formItem.change'
                )
                el-date-picker(
                  v-else-if='formItem.type === "datetime"',
                  type='datetime',
                  v-model='form[formItem.formItemName]',
                  :picker-options='formItem.pickerOptions',
                  :placeholder='"请选择" + formItem.label',
                  :disabled='formItem.disabled',
                  @blur='formItem.blur',
                  @focus='formItem.focus',
                  @change='formItem.change'
                )
                el-upload.p-upload(
                  v-else-if='formItem.type === "file"',
                  :limit='10',
                  :action='toPrefixUrl("/fs/file/doUploadWithFile")',
                  :file-list='form[formItem.formItemName]',
                  :before-upload='beforeUpload',
                  :on-remove='formItem.clickRemoveFile',
                  :on-preview='clickPreviewFile',
                  :on-success='formItem.uploadSuccessHandler'
                )
                  el-button(plain, type='primary') 点击上传
                  .p-upload-tip(slot='tip') 仅支持如下格式的文件：docx，doc，pdf，png，jpeg，jpg，rar，7z，zip
                slot(v-else, :name='formItem.slotName', :row='{ node: currentNode, isCurrent: true, form }')
          el-form-item(v-if='isNeedDefault && !getHide(currentNode.taskName)', label='备注：', prop='comment', :required='form.isPass === "N"')
            el-input.p-comment(type='textarea', :rows='4', v-model.trim='form.comment')
  .p-btn-list(v-if='$route.name.indexOf("backLog")>=0')
    el-button(@click='submit("Y")', round, type='primary', :disabled='loading || subDisabled', :loading='loading') 同意
    el-button.warn-btn(@click='submit("N")', round, plain, :disabled='loading || subDisabled', :loading='loading') 驳回
    el-button(@click='$router.back()', round, plain, :disabled='loading', :loading='loading') 返回
  .p-btn-list(v-else)
    el-button(@click='$router.back()', type='primary', :disabled='loading', :loading='loading') 返回
</template>

<script>
import { toPrefixUrl } from '@/utils/util'
import ajaxStore from '@/apis'
import { mapState } from 'vuex'
export default {
  props: {
    processData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    config: {
      required: true,
      type: Object,
    },
    isNeedDefault: {
      type: Boolean,
      default: true,
    },
    isNeedDefaultUpload: {
      type: Boolean,
      default: true,
    },
    tipText: {
      type: String,
      default: '',
    },
    agreeText: {
      type: String,
      default: '同意',
    },
    disagreeText: {
      type: String,
      default: '不同意',
    },
    rejectText: {
      type: String,
      default: '驳回',
    },
    showReject: {
      type: Boolean,
      default: false,
    },
    // 是否要传其他资料
    ifNeedFormData: {
      type: Boolean,
      default: false,
    },
    submitFun: {
      type: Function,
      // default: function () {}
    },
    // 是否要显示传进来的slot的form表单
    showSlotForm: {
      type: Boolean,
      default: false,
    },
    // 需要展示slot的节点名称
    showSlotNodes: {
      type: String,
      default: '',
    },
    subDisabled: Boolean
  },
  data() {
    return {
      options: [],
      remoteContent: {},
      handleDates: {},
      collapseActive: ['last'],
      lastTime: '',
      timer: null,
      loading: false,
      rules: {},
      form: {},
      historyNode: '',
      currentNode: '',

      otherFormData: {},
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    toPrefixUrl,
    getNodeOptions(taskName) {
      const filterNode = this.config.processConfig.filter((e) => e.taskName === taskName)
      if (filterNode.length > 0) {
        return filterNode[0].options
      }
      return []
    },
    getHide(taskName) {
      const filterNode = this.config.processConfig.filter((e) => e.taskName === taskName)
      if (filterNode.length > 0) {
        return filterNode[0].isDefaultHide
      }
      return false
    },
    resetTime(s) {
      let t = ''
      if (s > -1) {
        const hour = Math.floor(s / 3600)
        const min = Math.floor(s / 60) % 60
        const sec = s % 60
        if (hour < 10) {
          t = '0' + hour
        } else {
          t = hour
        }
        t += '小时'

        if (min < 10) {
          t += '0'
        }
        t += min + '分钟'

        if (sec < 10) {
          t += '0'
        }
        t += sec + '秒'
        return t
      }
    },
    handlerCheckbox(vArr, enumObj) {
      return Array.from(vArr)
        .map((e) => enumObj[e])
        .join('、')
    },
    async getOptions() {
      // 获取客服经理数据
      if (this.options.length > 0) return
      this.options = await this.$store.dispatch('getAreaAndManager')
      if (this.remoteContent.showDepartment) {
        this.options = this.options.filter((item) => {
          return this.remoteContent.showDepartment.includes(item.label)
        })
      }
    },
    initCustomer(e) {
      this.$set(this.form, e.customer, '')
      this.remoteContent.showDepartment = e.showDepartment || ''
      this.getOptions()
      e.changeAreaAndManage = (v) => {
        let label
        let isMember = 0
        if (v && v[0]) {
          this.options.forEach((item, index) => {
            if (item.value === v[0]) {
              label = item.label
            }
          })
        }
        if (label && label.match(/南区|东区|北区|特区/g)) {
          isMember = 1
        }
        this.form[e.formItemName] = v
        this.form[e.customer] = v[v.length - 1]
        this.$set(this.form, 'isMember', isMember)
        e.change && e.change(v)
      }
    },
    initDaterange(e) {
      this.$set(this.form, e.formItemName_start, '')
      this.$set(this.form, e.formItemName_end, '')
      this.$set(this.handleDates, e.formItemName_start, '')
      e.placeholder_start = e.label.replace(/(.*)(日期?)$/, '$1开始$2')
      e.placeholder_end = e.label.replace(/(.*)(日期?)$/, '$1结束$2')
      e.changeDate = (v) => {
        const dates = v
        this.form[e.formItemName_start] = dates && dates.length > 0 ? dates[0] : ''
        this.form[e.formItemName_end] = dates && dates.length > 0 ? dates[1] : ''
        e.change && e.change(v)
      }
    },
    initRemote(e) {
      // 查询类型为远程接口时，初始化绑定值以及querySearch，handleChange方法
      this.$set(this.form, e.formItemName_text, '')
      this.$set(this.remoteContent, `loading${e.formItemName_text}`, false)
      this.$set(this.remoteContent, `remoteList${e.formItemName_text}`, [])
      e.querySearch = (v) => {
        if (v) {
          this[`loading${e.formItemName_text}`] = true
          e.remoteMethod({ [e.remoteParamName]: v }).then(({ data }) => {
            this.remoteContent[`loading${e.formItemName_text}`] = false
            this.remoteContent[`remoteList${e.formItemName_text}`] = data.data || []
          })
        } else {
          this.remoteContent[`remoteList${e.formItemName_text}`] = []
        }
      }
      if (!e.formItemName_id) return
      this.$set(this.form, e.formItemName_id, '')
      e.handleChange = (v) => {
        let info = []
        if (v) {
          info = this.remoteContent[`remoteList${e.formItemName_text}`].filter((item) => item[e.formItemNameInAPI] === v)
          this.form[e.formItemName_id] = info.length > 0 ? info[0][e.formItemIdInAPI] : ''
        } else {
          this.form[e.formItemName_id] = ''
        }
        e.change && e.change(v)
      }
    },
    initFile(e) {
      e.uploadSuccessHandler = (res, file) => {
        if (res && res.key) {
          this.form[e.formItemName].push({ name: res.fileName, key: res.key })
        } else {
          this.form[e.formItemName].splice(this.form.files.length - 1, 1)
          this.$message.error(res.message || '上传失败')
        }
      }
      e.clickRemoveFile = (file, files) => {
        this.form[e.formItemName] = files
      }
    },
    init() {
      // 设置默认打开显示的节点
      this.initCollapseList()
      if (!this.currentNode || Object.keys(this.currentNode).length === 0) return
      if (this.isNeedDefault) {
        const vComment = (rule, value, callback) => {
          if (this.form.isPass === 'N') {
            if (!value) return callback(new Error(this.disagreeText + '时必须填写审批意见'))
          }
          if (this.form.isPass === 'R') {
            if (!value) return callback(new Error(this.rejectText + '时必须填写审批意见'))
          }
          return callback()
        }
        this.form = { isPass: '', comment: '', files: [] }
        this.rules = {
          isPass: [{ required: true, message: '请选择是否同意', trigger: 'change' }],
          comment: [{ validator: vComment, trigger: 'change' }],
        }
      }
      // 设置当前节点定时器
      const currentTask = this.currentNode
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        const time = new Date() - new Date(currentTask.startTime)
        this.lastTime = this.resetTime(parseInt(time / 1000))
      }, 1000)
      // 当前节点赋值
      const currentForm = currentTask.form && JSON.parse(currentTask.form)
      const lastNode = this.config.processConfig.filter((p) => p.taskName === currentTask.taskName)[0]
      lastNode && lastNode.options &&
        lastNode.options.forEach((e) => {
          if (e.formItemName) {
            if (['file', 'checkBox', 'customer'].includes(e.type)) {
              this.$set(this.form, e.formItemName, currentForm[e.formItemName] || [])
            } else {
              this.$set(this.form, e.formItemName, (currentForm && currentForm[e.formItemName]) || '')
            }
          }
          // 特殊类型处理
          const specialTypes = ['customer', 'daterange', 'remote', 'file']
          if (specialTypes.includes(e.type)) {
            // 调用特殊类型处理函数 例：initCustomer
            this[`init${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}`](e)
          }
          // 设置校验规则
          if (e.required) {
            const message = e.type === 'file' ? '请上传' : ['input', 'number', 'remote', 'textarea', 'remote'].includes(e.type) ? '请输入' : '请选择'
            this.rules[e.formItemName || e.formItemName_start || e.formItemName_text || e.slotName] = [
              { validator: e.validator, required: true, message: `${e.validator ? '' : message + e.label}`, trigger: ['change', 'blur'] },
            ]
          }
        })
      this.form.taskId = this.$route.query.taskId
      this.form.memberId = this.userInfo.memberId
      const form = this.currentNode.form && JSON.parse(this.currentNode.form)
      // 防止memberId被覆盖
      const memberId = this.form.memberId
      Object.assign(this.form, form)
      this.form.memberId = memberId
    },
    // 切换同意、不同意单选框时 改变审批意见是否必填，并移除已有的校验提示
    agreeChange(v) {
      if (v === 'N' || v === 'R') {
        if (this.rules.comment.length === 1) {
          this.rules.comment.push({ required: true, message: '请填写审批意见', trigger: 'change' })
        }
      } else {
        if (this.rules.comment.length > 1) {
          this.rules.comment.splice(1, 1)
        }
      }
      this.$refs.form.validateField('comment')
    },
    submit(flag) {
      const { config } = this
      const { claimType } = config
      const isHaveclaimType = Object.prototype.hasOwnProperty.call(config, 'claimType')
      // hasOwnProperty
      if (flag !== 'N' && isHaveclaimType) {
        if (!claimType) {
          this.$emit('changeType', true)
          return
        } else {
          this.$emit('changeType', false)
        }
      }

      // 如果有父组件传过来的slot里的form表单，组合到this.form里
      if (this.showSlotForm && this.showSlotNodes.includes(this.currentNode.taskName)) {
        // 获取到父组件中slot的表单值
        const slotFormCom = this.$parent.$refs.formCom
        if (!slotFormCom.validate()) {
          return
        }
        this.form = {...this.form, ...slotFormCom.formData}
      }
      this.form.isPass = flag
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.submitFun && !(await this.submitFun())) {
            this.$message.error('表单信息请填写完整')
            return
          }
          if (this.ifNeedFormData) {
            // 拿到传进来的表单数据
            const otherFormData = this.$parent.$refs.payOnBehalfCom.formData
            this.form = { ...otherFormData, ...this.form }
            this.form.dataFlag = otherFormData.dataFlag
          }
          this.loading = true
          let res = ''
          // 临时解决方案
          const form = JSON.parse(JSON.stringify(this.form))
          const taskId = this.form.taskId
          delete form.taskId
          delete form.files
          delete form.memberId
          const param = {
            taskId: taskId,
            variables: {...form}
          }
          const currentLength = this.historyNode.length
          if (flag === 'Y') {
            // 当前操作人是否对当前流程进行过真实性认证，认证过才可以提交；
            if (this.config.submitFnc && this.config.submitFnc()) {
              this.loading = false
              return
            }
            try {
              res = await (this.config.processConfig[currentLength]?.submitProcessFn || this.config.submitProcessFn || ajaxStore.common.process.submitProcess)(param)
            } catch (error) {
              console.log('err', error)
            }
          } else {
            res = await (this.config.processConfig[currentLength]?.submitProcessFn || this.config.tempSaveFn || ajaxStore.common.process.submitProcess)(param)
          }
          if (res && res.data && res.data.code === '0') {
            this.$message.success('提交成功')
            this.$router.push({ name: 'backLog' })
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    beforeUpload(file) {
      const arr = file.name.split('.')
      if ('docx,doc,pdf,png,jpeg,jpg,rar,7z,zip'.indexOf(arr[arr.length - 1].toLowerCase()) < 0) {
        this.$message.error('仅支持如下格式的文件：docx,doc,pdf,png,jpeg,jpg,rar,7z,zip')
        return false
      }
      if (file.size / 1024 / 1024 > 50) {
        this.$message.error('上传文件不能超过50MB')
        return false
      }
    },
    uploadSuccessHandler(res, file) {
      if (res && res.key) {
        this.form.files.push({ name: res.fileName, key: res.key })
      } else {
        this.form.files.splice(this.form.files.length - 1, 1)
        this.$message.error(res.message || '上传失败')
      }
    },
    clickPreviewFile(file) {
      window.open(toPrefixUrl(`/clms/boss/fileDownload/checkAttachment?key=${file.key}`))
    },
    initCollapseList() {
      const collapseList = []
      this.config.processConfig.forEach((item, index) => {
        if (item.collapseOpen) collapseList.push(index)
      })
      collapseList.push('last')
      this.collapseActive = collapseList
    }
  },
  async mounted() {
    const res = await ajaxStore.common.process.getApprovalNodes({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
    if (res.data && res.data.code === '0' && res.data.data) {
      const data = res.data.data
      this.historyNode = data.historicTasks
      this.currentNode = data.currentTask
      this.$emit('currentNode', data.currentTask)
      if (this.historyNode.length > 0 || (this.currentNode && Object.keys(this.currentNode).length > 0)) {
        this.init()
      }

      this.historyNode.forEach((el, i) => {
        this.historyNode[i] = { ...JSON.parse(el.form), ...el }
      })
    }
  },
  watch: {
    'config.processConfig'(newVal) {
      this.init()
    },
    processData(newVal) {
      this.otherFormData = newVal
    },
  },
}
</script>

<style lang="stylus">
.truthPage .el-form-item__label:before
  content '*'
  color #f56c6c
  margin-right 4px
</style>
<style lang="stylus" scoped>
.el-input, .el-input-number, .el-select, .el-date-editor, .el-cascader
  width 250px
.p-upload
  width 400px
.p-btn-list
  text-align center
  padding 30px
</style>
