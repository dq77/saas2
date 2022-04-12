<template lang="pug">
  div
    el-table(:data="dataSource" v-loading="loading")
      el-table-column(prop="taskNumber", label="任务编号")
      el-table-column(prop="gmtCreated", label="创建日期", , width="100")
        template(slot-scope="scope")
          <span>{{scope.row.gmtCreated ? moment(scope.row.gmtCreated).format('YYYY-MM-DD') : '--'}}</span>
      el-table-column(prop="creator", label="创建人")
      el-table-column(prop="taskStatus", label="任务状态", width="100")
        template(slot-scope="scope")
          <span>{{scope.row.taskStatus == 0 ? '初始状态' : scope.row.taskStatus == 1 ? '导入中' : scope.row.taskStatus == 2 ? '导入完成' : scope.row.taskStatus == 3 ? '提交审核' : scope.row.taskStatus == 4 ? '已取消' : '--' }}</span>
      el-table-column(prop="totalCount", label="导入数量")
        template(slot-scope="scope")
          <span>{{scope.row.successCount}} / {{scope.row.totalCount}}</span>
      el-table-column(prop="confirmationLetterKey", label="确认函", width="100")
        template(slot-scope="scope")
          <span>{{scope.row.confirmationLetterKey ? '已上传' :'未上传'}}</span>
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-popconfirm(title="是否确认取消", style="margin-right: 10px;", @confirm="cancleHandle(scope.row)", v-if="scope.row.taskStatus === 2")
            el-button(type="text", slot="reference") 取消
          el-button(@click="downErrorHandle(scope.row)", type="text" v-if="scope.row.successCount < scope.row.totalCount") 下载错误报告
          el-button(@click="examineHandle(scope.row)", type="text" v-if="scope.row.successCount !==0 && scope.row.taskStatus == 2") 提交审核
          el-button(@click="downSureHandle(scope.row)", type="text" v-if="scope.row.confirmationLetterKey") 下载确认函
          //- 有导入数量，没有确认函，任务状态=提交审核
          el-button(@click="clickSign(scope.row)", type="text" v-if="scope.row.successCount && !scope.row.confirmationLetterKey && scope.row.taskStatus === 3") 电子签署

    //- 预览
    previewDialog(
      :isShow="isShowPreview"
      :fileKey='previewFileKey'
      :loading='previewLoading'
      @close='closePreview'
      @confirmSign="confirmSign"
    )
    //- 意愿认证-选择办理人
    signerDialog(
      :personList='personList'
      :signShow="signShow"
      @close="() => {signShow = false}"
      @choseSigner="choseSigner"
    )
    //- 意愿认证-发送验证码
    sendMsgDialog(
      :isShowMsg='isShowMsg'
      headTitle='电子确认函意愿认证'
      @close='close'
      :loading='sendMsgloading'
      @createHandle='createCallback'
      :personInfo='currentSigner'
    )
</template>
<script>
import moment from 'moment'
import {mapState} from 'vuex'
import { toPrefixUrl } from '@/utils/util'
import ajaxStore from '@/apis'
import previewDialog from './previewDialog'
import signerDialog from './signerDialog'
import sendMsgDialog from './sendMsgDialog'

export default {
  components: {
    previewDialog,
    signerDialog,
    sendMsgDialog,
  },
  data() {
    return {
      moment: moment,
      sendMsgloading: false,
      previewLoading: false,
      previewFileKey: '',
      isShowPreview: false,
      signShow: false,
      isShowMsg: false,
      personList: [],
      currentSigner: {},
      activeItem: {},
      realNameStatus: -1,
    }
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    // 获取企业实名认证状态，未认证的点击电子签署提示；获取签署人列表；
    this.getSignerList()
  },
  methods: {
    clickSign(row) {
      if (this.realNameStatus !== 2) {
        this.$message.error('企业实名认证未通过')
        return
      }
      this.activeItem = row
      this.getElectPreview()
    },
    // 获取预览url
    async getElectPreview() {
      this.previewLoading = true
      this.isShowPreview = true
      const { electPreview } = ajaxStore.factoryService.qjd.white
      electPreview({id: this.activeItem.id}).then((res = {}) => {
        this.previewLoading = false
        const data = res.data
        if (data.code === '0') {
          this.previewFileKey = this.getFileUrl(data.data)
        }
      })
    },
    // 预览确认点击
    confirmSign() {
      this.isShowPreview = false
      this.signShow = true
    },
    closePreview() {
      this.isShowPreview = false
      this.previewFileKey = ''
    },
    // 获取签署人列表
    async getSignerList() {
      this.authLoading = true
      const res = await ajaxStore.common.account.getCustomerAuth({
        corporationId: this.userInfo.corporationId,
        type: 0 // 传0是全部，1是过滤后的办理人列表
      })
      if (res.data && res.data.code === '0') {
        const data = res.data.data || {}
        this.realNameStatus = data.corpIdentityVo.realNameStatus
        // 拿到法定代表人和授权人的列表
        this.personList = data.personIdentityVo.filter(item => item.relationType === 0 || item.authorizerType === 1)
      }
      this.authLoading = false
    },
    // 选择签署人
    async choseSigner(current, userType) {
      this.signShow = false
      // 选择签署人手机发送短信
      this.currentSigner = current
      this.currentSigner.userType = userType
      this.isShowMsg = true
    },
    // 签署
    async createCallback(code) {
      this.sendMsgloading = true
      const currentSigner = this.currentSigner
      const params = {
        id: this.activeItem.id,
        signIdNo: currentSigner.idCardNo,
        signName: currentSigner.name,
        signPhone: currentSigner.personPhone,
        verifyCode: code,
      }
      const { electSign } = ajaxStore.factoryService.qjd.white
      electSign(params).then((res = {}) => {
        this.sendMsgloading = false
        const data = res.data
        if (data.code === '0') {
          this.isShowMsg = false
          this.$emit('updateHandle')
          this.$message.success('签署成功')
        } else if (data.code !== '100000004') {
          this.isShowMsg = false
        }
      })
    },
    close() {
      this.isShowMsg = false
    },

    downErrorHandle(row) {
      const { id } = row
      window.open(toPrefixUrl(`/partner/white/export/error?id=${id}`))
    },
    examineHandle(row) {
      const { submitReview } = ajaxStore.factoryService.qjd.white
      const { id } = row || {}
      submitReview({ infoId: id }).then((res = {}) => {
        const { data: { code, message } } = res
        if (code === '0') {
          this.$message.success('提交审核成功')
          this.$emit('updateHandle')
        } else {
          this.$message.error(message)
        }
      })
    },
    cancleHandle(row) {
      const { cancelTask } = ajaxStore.factoryService.qjd.white
      const { id } = row || {}
      cancelTask({ ids: [id], affirm: true }).then((res = {}) => {
        const { data: { code, message } } = res
        if (code === '0') {
          this.$message.success('取消成功')
          this.$emit('updateHandle')
        } else {
          this.$message.error(message)
        }
      })
    },
    downSureHandle(row) {
      // window.location.href = `https://test-project-factory.qjdidc.com/partner/white/export/template?fileKey=${row.confirmationLetterKey}`
      window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${row.confirmationLetterKey}`))
    },
    getFileUrl(fileKey) {
      return toPrefixUrl(`/partner/common/file/download?fileKey=${fileKey}`)
    },
  },
}
</script>
