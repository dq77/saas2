<template lang="pug">
.page-main.p-main
  .p-control
    div(:class="isFixed ? 'p-control-fix' : ''")
      template
        form(v-show='false' ref='formDom' :action='toPrefixUrl("/saas-contract/contract/file/downLoad")' method="post" target='_blank' enctype='multipart/form-data')
          input(type="hidden" name="params" :value='JSON.stringify(resultReview)')
          button(type="submit") 合同预览
      .p-btn-list
        el-button(class='p-btn' type='primary' :loading='loadSign' @click='clickCreateSign(true)') 新增签章
      .p-sign-list(:class="isSignMoving ? '' : 'p-moving-stop'" @scroll='scrollSign')
        .p-sign(v-for='(item, index) in signList')
          .p-sign-head
            .p-sign-block
              el-button.p-close(v-if='item.type !== "1"' type='text' @click='closeSign(item, index)')
                i.el-icon-error
              .p-sign-person(v-if='item.type === "3"') {{item.personName}}
              .p-sign-company(v-else)
                i.el-icon-star-on
                .p-sign-cycle
                  cycle-text.cycle-text(:tagText='item.corpName' :tagClass='item.fixNum' :radius='46')
            .p-sign-name {{ typeObj[item.type] }}
          .p-sign-body
            el-button(class='p-set' type='primary' @click='setSign(item, index)') 盖章
            el-button(class='p-edit' type='primary' @click='clickCreateSign(false, item)') 查看
  .p-border
    .p-factory(ref='p-factory' @click='getImgInfo' :class="isImgMoving ? '' : 'p-moving-stop'" @scroll='scrollImg')
      .p-img(ref='p-img')
        .p-loading(v-if='!imgShow') {{imgShowMessage}}
        img(:src='contractInfo.src' v-if='imgShow')
        .p-move(v-for='(moveItem, index) in moveList' :class='moveItem.type === "3" ? "p-move-person" : ""' :key="moveItem.fixNum" :ref="moveItem.fixNum" v-show='moveItem.status === -1')
          .p-sign-line(v-if="moveItem.type === '3'") {{moveItem.personName}}
          template(v-else)
            i.el-icon-star-on
            .p-cycle
              cycle-text.cycle-text(:tagText='moveItem.corpName' :tagClass='moveItem.fixNum')
          el-button(class='sign-btn' type='text' @click='signFixed(moveItem, index, -1, $event)')
      .p-move(v-for='(moveItem, index) in moveList'  :class='moveItem.type === "3" ? "p-move-person" : ""' :key="moveItem.num" :ref="moveItem.num" draggable @dragstart='moveStart(moveItem, $event)' @dragend='moveEnd(moveItem, $event)' v-show='moveItem.status === 1')
        .p-move-control
          el-button.p-move-btn(type='text' @click='delMoveItem(index)')
            i.el-icon-error
          el-button.p-move-btn(type='text' @click='signFixed(moveItem, index, 1, $event)')
            i.el-icon-success
        .p-sign-line(v-if="moveItem.type === '3'") {{moveItem.personName}}
        template(v-else)
          i.el-icon-star-on
          .p-cycle
            cycle-text.cycle-text(:tagText='moveItem.corpName' :tagClass='moveItem.num')
  .p-preview
    div(:class="isFixed ? 'p-control-fix' : ''")
      .p-preview-btn
        el-button(class='p-btn' type='' :loading='loadPreview' @click='clickContractPreview' weblogs-anchor='factory-smartContract-step-preview') 预览合同
        el-button(class='p-btn' type='primary' :loading='loadContract' @click='clickContractCreate' weblogs-anchor='factory-smartContract-step-create') 创建合同
  //- 创建合同
  el-dialog(
    width='550px'
    :show-close='true'
    :close-on-click-modal='!isCreate'
    :title='isCreate? "创建签章" : "签章详情"'
    :visible.sync='dialogSign.visible'
  )
    el-form(
      ref='dialogSignForm'
      label-width='140px'
      :rules='dialogSign.rules'
      :model='dialogSign.form'
    )
      el-form-item(label='签章类型' prop='type' required)
        el-select.width-80(placeholder='请选择签章类型'
          filterable
          clearable
          v-model='dialogSign.form.type'
          :disabled='!isCreate'
        )
          div(v-for='(value, key) in typeObj' :key='key')
            el-option(
              :label='value'
              :value='key'
              v-if= 'key !== "1" || !isCreate'
            )
      template(v-if='dialogSign.form.type === "3"')
        el-form-item(label='签署人姓名' prop='personName' required)
          el-input.width-80(v-model='dialogSign.form.personName' placeholder='请输入签署人姓名' maxlength='30' :disabled='!isCreate')
        el-form-item(label='身份证号' prop='idCard' required)
          el-input.width-80(v-model='dialogSign.form.idCard' placeholder='请输入身份证' maxlength='30' :disabled='!isCreate')
      template(v-else)
        el-form-item(label='企业名称' prop='corpName' required)
          //- el-input.width-80(v-model='dialogSign.form.corpName' maxlength='30' placeholder='请输入企业名称' @blur.native.capture='autoCompanyFill')
          el-select.width-80(
            placeholder='请输入企业名称'
            filterable
            clearable
            remote
            v-model='dialogSign.form.corpName'
            :remote-method='autoCompanyFill'
            :loading='companyLoading'
            :default-first-option='true'
            @change='handleConpanyChange'
            :disabled='!isCreate'
          )
            el-option(v-for='item in searchCompanyList' :key='item.id' :value='item.name')
        el-form-item(label='社会统一信用代码' prop='corpCode' required)
          el-input.width-80(v-model='dialogSign.form.corpCode' placeholder='请输入社会统一信用代码' maxlength='50' :disabled='!isCreate')
        el-form-item(label='法定代表人姓名' prop='legal' required)
          el-input.width-80(v-model='dialogSign.form.legal' placeholder='请输入法人姓名' maxlength='30' :disabled='!isCreate')
        el-form-item(label='身份证号' prop='idCard' required)
          el-input.width-80(v-model='dialogSign.form.idCard' placeholder='请输入身份证' maxlength='24' :disabled='!isCreate')
    span(slot='footer')
      el-button(v-if='!isCreate' type='primary' @click='dialogSign.visible=false') 确定
      el-button(v-if='isCreate' @click='dialogSign.visible=false') 取消
      el-button(v-if='isCreate' type='primary' @click='toAddSign' :loading='dialogSign.loading') 创建
</template>

<script>
import { mapState } from 'vuex'
import { baseUrl } from '@/utils/config'
import { toPrefixUrl } from '@/utils/util'
import { vIdcardNumber } from '@/utils/validateRules'
import CycleText from '@/components/CycleText'
import ajaxStore from '@/apis'
let num = 1
export default {
  components: { CycleText },
  data () {
    return {
      isCreate: true,
      reLoadingTime: 0,
      searchCompanyList: [],
      companyLoading: false,
      imgTimer: undefined,
      signTimer: undefined,
      isImgMoving: false,
      isSignMoving: false,
      isFixed: false,
      imgShow: false,
      selfAuth: true,
      imgShowMessage: '加载中',
      loadSign: false,
      loadContract: false,
      loadPreview: false,
      contractInfo: {},
      companyInfo: {},
      resultReview: {},
      moveList: [],
      signSizeSet: {
        1: {
          width: 128,
          height: 128
        },
        2: {
          width: 128,
          height: 128
        },
        3: {
          width: 128,
          height: 44
        },
      },
      typeList: ['1', '2', '3'],
      typeObj: {
        1: '本企业章',
        2: '企业章',
        3: '个人章',
      },
      // 1统一社会信用代码;2.企业法人.3,自然人.4.工商注册号.5.纳税人识别号;6.本企业,7.本企业法人
      signIdType: {
        1: '6',
        2: '1',
        3: '3'
      },
      dialogSign: {
        loading: false,
        visible: false,
        rules: {
          type: [
            { required: true, message: '请选择签章类型', trigger: ['change', 'blur'] },
          ],
          corpName: [
            { required: true, message: '请输入公司名称', trigger: ['change', 'blur'] },
          ],
          corpCode: [
            { required: true, message: '请输入社会统一信用代码', trigger: ['change', 'blur'] },
          ],
          legal: [
            { required: true, message: '请输入法人姓名', trigger: ['change', 'blur'] },
          ],
          personName: [
            { required: true, message: '请输入签署人姓名', trigger: ['change', 'blur'] },
          ],
          idCard: [
            { required: true, validator: vIdcardNumber, trigger: ['change', 'blur'] }
          ],
        },
        form: {
          type: '',
          corpName: '',
          corpCode: '',
          legal: '',
          personName: '',
          idCard: '',
        }
      },
      signList: [],
      signObj: {},
      initAddress: {
        x: 0,
        y: 0
      }
    }
  },
  computed: mapState(['userInfo']),
  methods: {
    toPrefixUrl,
    previewImg() {
      var newImg = new Image()
      newImg.src = `${baseUrl}/saas-contract/contract/file/getImg/${this.$route.query.fileKey}`
      newImg.onerror = () => {
        if (this.reLoadingTime < 1) {
          this.imgShowMessage = '加载失败,重新加载中...'
          this.reLoadingTime++
          setTimeout(this.previewImg(), 3000)
        } else {
          this.imgShowMessage = '加载失败'
        }
      }
      newImg.onload = () => { // 图片加载成功后把地址给原来的img
        this.contractInfo.src = newImg.src
        this.imgShow = true
      }
    },
    async getContractInfo() {
      this.contractInfo = this.$route.query
      // 获取企业信息
      const res = await ajaxStore.common.account.getCustomerAuth({
        corporationId: this.userInfo.corporationId,
        type: 0
      })
      if (res.data && res.data.code === '0') {
        const companyInfo = res.data.data.corpIdentityVo
        this.companyInfo = res.data.data.corpIdentityVo
        const param = {
          userId: this.userInfo.corporationId,
          type: '1',
          corpName: companyInfo.corpName,
          corpCode: companyInfo.socialCode || this.userInfo.customerId,
          legal: companyInfo.name,
          personName: '',
          idCard: companyInfo.idCardNo,
          fixNum: 'signItem_' + this.signList.length,
        }
        this.signList.push(param)
        this.signObj[companyInfo.socialCode] = companyInfo.corpName
        const result = await ajaxStore.factoryService.smartContract.getMessageCheck({
          roleType: '1',
          enterpriseName: companyInfo.corpName, // 企业名称
          orgCode: companyInfo.socialCode || this.userInfo.customerId, // 社会信用统一代码
          persionName: companyInfo.name, // 法人
          idNum: companyInfo.idCardNo, // 法人身份证号码
        })
        if (result.data && result.data.code === 0) {
          this.selfAuth = true
        } else {
          this.selfAuth = false
        }
      }
    },
    // 企业自动填充
    async autoCompanyFill(v) {
      this.companyLoading = true
      const res = await ajaxStore.factoryService.smartContract.autoCompanyFill({
        name: v,
        roleType: '1',
        provider: '1'
      })
      this.companyLoading = false
      if (res.data && res.data.code === '0' && res.data.data) {
        this.searchCompanyList = [res.data.data] || []
      }
    },
    handleConpanyChange(companyName) {
      if (companyName) {
        const companys = this.searchCompanyList.filter(item => item.name === companyName)
        const company = companys[0]
        this.dialogSign.form.corpCode = company.creditCode
        this.dialogSign.form.legal = company.legalPersonName
      }
    },
    clickCreateSign(isCreate, signInfo) {
      this.isCreate = isCreate
      this.dialogSign.visible = true
      this.$nextTick(() => {
        this.$refs.dialogSignForm.resetFields()
        if (!isCreate) this.dialogSign.form = {...signInfo}
      })
    },
    async toAddSign() {
      if (this.dialogSign.loading === true) return
      if (this.checkRepeatSign()) return this.$message.warning('签章已存在，无需重复创建')
      this.$refs.dialogSignForm.validate(async valid => {
        if (valid) {
          this.dialogSign.loading = true
          const item = { ...this.dialogSign.form }
          const result = await this.checkAuth(item)
          this.dialogSign.loading = false
          if (!result) return
          const userId = await this.saveAuth(item)
          if (!userId) return
          item.userId = userId
          item.fixNum = 'signItem_' + this.signList.length
          this.signList.push(item)
          this.$set(this.signList)
          this.dialogSign.visible = false
        }
      })
    },
    // 验证重复章
    checkRepeatSign() {
      if (this.dialogSign.form.type === '3') {
        if (this.signObj[this.dialogSign.form.idCard]) return true
        this.signObj[this.dialogSign.form.idCard] = this.dialogSign.form.personName
        return false
      } else {
        if (this.signObj[this.dialogSign.form.corpCode]) return true
        this.signObj[this.dialogSign.form.corpCode] = this.dialogSign.form.corpName
        return false
      }
    },
    // 企业、自然人要素检验
    async checkAuth(item) {
      let res
      if (item.type === '3') {
        // 个人
        res = await ajaxStore.factoryService.smartContract.getMessageCheck({
          roleType: '2',
          persionName: this.dialogSign.form.personName, // 姓名
          idNum: this.dialogSign.form.idCard, // 身份证号码
        })
      } else {
        // 企业
        res = await ajaxStore.factoryService.smartContract.getMessageCheck({
          roleType: '1',
          enterpriseName: this.dialogSign.form.corpName, // 企业名称
          orgCode: this.dialogSign.form.corpCode, // 社会信用统一代码
          persionName: this.dialogSign.form.legal, // 法人
          idNum: this.dialogSign.form.idCard, // 法人身份证号码
        })
      }
      if (res.data && res.data.code === 0) {
        return true
      } else {
        this.dialogSign.loading = false
        return false
      }
    },
    // 企业、自然人信息记录存储
    async saveAuth(item) {
      let res
      if (item.type === '3') {
        // 个人
        res = await ajaxStore.factoryService.smartContract.getVerifiedSavePerson({
          idCardNo: item.idCard,
          name: item.personName,
        })
      } else {
        // 企业
        res = await ajaxStore.factoryService.smartContract.getVerifiedSaveCorpAndPerson({
          corpName: item.corpName, // 企业名称
          socialCode: item.corpCode, // 社会信用统一代码
          name: item.legal, // 法人
          idCardNo: item.idCard, // 法人身份证号码
          relationType: 0,
          verificationStatus: 1,
          verificationType: 3,
        })
      }
      if (res.data && res.data.code === '0') {
        return res.data.data
      } else {
        this.dialogSign.loading = false
        return false
      }
    },
    async clickContractCreate() {
      // 演示环境去掉本企业实名验证
      // if (!this.selfAuth) return this.$message.warning('本企业未完成企业实名认证，请完成企业实名认证后创建合同')
      // -
      if (this.moveList.length === 0) return this.$message.warning('请先设置签章')
      if (this.moveList.filter(item => item.status === 1).length > 0) return this.$message.warning('签章位置未全部确认')
      this.$confirm('是否确认创建合同?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const signatures = this.moveList.map(item => {
          const position = this.getRealPosition(item)
          return {
            userId: item.userId,
            idNum: item.idCard,
            idType: this.signIdType[item.type],
            persionName: item.type === '3' ? item.personName : item.legal,
            legalArea: '0',
            orgName: item.corpName,
            orgCode: item.corpCode,
            organType: '0',
            pageNum: item.pageNum,
            signStatus: '0',
            signatoryType: item.type,
            userType: '2',
            x: position.x,
            y: position.y
          }
        })
        const res = await ajaxStore.factoryService.smartContract.getContractCreate({
          contract: {
            tenantId: this.userInfo.tenants[0].tenantId,
            auditMethod: '0',
            indateEnd: this.contractInfo.endDate,
            indateStart: this.contractInfo.startDate,
            name: this.contractInfo.name,
            outerContractCode: this.contractInfo.id,
            outerEnterpriseCode: this.companyInfo.socialCode,
            outerEnterpriseName: this.companyInfo.corpName,
            status: '3',
            type: '1',
          },
          opeType: '1',
          fileKey: this.contractInfo.fileKey,
          signatures: signatures
        })
        if (res.data && res.data.code === '0') {
          this.$message.success('创建成功')
          this.$router.back()
        }
      })
    },
    clickContractPreview() {
      if (!this.selfAuth) return this.$message.warning('本企业未完成企业实名认证，请完成企业实名认证后预览合同')
      if (this.moveList.length === 0) return this.$message.warning('请先设置签章')
      if (this.moveList.filter(item => item.status === 1).length > 0) return this.$message.warning('签章位置未全部确认')
      const signatures = this.moveList.map(item => {
        const position = this.getRealPosition(item)
        return {
          userId: item.userId,
          idNum: item.type === '3' ? item.idCard : item.corpCode,
          idType: this.signIdType[item.type],
          legalArea: '0',
          orgName: item.type === '3' ? item.personName : item.corpName,
          signIdNum: item.idCard,
          signName: item.type === '3' ? item.personName : item.legal,
          organType: '0',
          pageNum: item.pageNum,
          signStatus: '0',
          signatoryType: item.type,
          userType: '2',
          x: position.x,
          y: position.y
        }
      })
      this.resultReview = {
        fileShowType: '1',
        fileKey: this.contractInfo.fileKey,
        showType: '2',
        signType: signatures.length > 0 ? '2' : '0',
        watermark: '0',
        list: signatures
      }
      setTimeout(() => {
        this.$refs.formDom.submit()
        this.loadingPreview = false
      }, 2000)
    },
    closeSign(item, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.signList.splice(index, 1)
        if (item.type === '3') {
          delete this.signObj[item.idCard]
        } else {
          delete this.signObj[item.corpCode]
        }
        const moveList = this.moveList.filter((moveItem) => {
          return (moveItem.corpCode !== item.corpCode || moveItem.idCard !== item.idCard || moveItem.type !== item.type)
        })
        this.moveList = moveList
      })
    },
    getImgInfo() {
      // console.log(this.$refs['p-factory'].offsetTop, this.$refs['p-factory'].scrollTop) //相对位置和滚动距离
    },
    setSign(item) {
      if (!this.imgShow) return this.$message.warning('合同尚未加载完毕')
      const data = { ...item, num: 'moveItem_' + num++, fixNum: 'fixItem_' + num++, status: 1 }
      this.moveList.push(data)
    },
    moveStart(moveItem, event) {
      this.initAddress = {
        x: event.offsetX,
        y: event.offsetY
      }
    },
    getNum(value) {
      if (value.length > 2) return Number(value.slice(0, value.length - 2))
      return undefined
    },
    checkMove(moveItem, endAddress) {
      if (this.$refs[moveItem.num][0].offsetLeft + endAddress.x < 0 || this.$refs[moveItem.num][0].offsetLeft + endAddress.x > (630 - this.signSizeSet[moveItem.type].width)) return false
      if (this.$refs[moveItem.num][0].offsetTop + endAddress.y < 0 || this.$refs[moveItem.num][0].offsetTop + endAddress.y > (891 - this.signSizeSet[moveItem.type].height)) return false
      return true
    },
    getRealPosition(item) {
      return {
        // 易签宝宽度0-599
        // 易签宝高度0-847.5
        // 本页尺寸630*891
        x: (item.left + this.signSizeSet[item.type].width / 2) * 599 / 630,
        y: ((891 - item.top) - this.signSizeSet[item.type].height / 2) * 847.5 / 891
      }
    },
    moveEnd(moveItem, event) {
      // if (this.$refs[moveItem.num][0].offsetLeft > 550) return false
      const endAddress = {
        x: event.offsetX - this.initAddress.x,
        y: event.offsetY - this.initAddress.y,
      }
      if (!this.checkMove(moveItem, endAddress)) return
      this.$refs[moveItem.num][0].style.left = ((this.getNum(this.$refs[moveItem.num][0].style.left) || 0) + endAddress.x) + 'px'
      this.$refs[moveItem.num][0].style.top = ((this.getNum(this.$refs[moveItem.num][0].style.top) || 0) + endAddress.y) + 'px'
    },
    delMoveItem(index) {
      this.moveList.splice(index, 1)
      this.$set(this.moveList)
    },
    signFixed(moveItem, index, status, event) {
      if (status === 1) {
        const top = this.getNum(this.$refs[moveItem.num][0].style.top) || 0
        const left = this.getNum(this.$refs[moveItem.num][0].style.left) || 0
        this.$refs[moveItem.fixNum][0].style.top = (top + this.$refs['p-factory'].scrollTop) + 'px'
        this.$refs[moveItem.fixNum][0].style.left = left + 'px'
        moveItem.top = top + this.$refs['p-factory'].scrollTop
        moveItem.left = left
      } else {
        this.$refs[moveItem.num][0].style.top = ((this.getNum(this.$refs[moveItem.fixNum][0].style.top) || 0) - this.$refs['p-factory'].scrollTop) + 'px'
      }
      moveItem.status = -status
      moveItem = this.getResult(moveItem)
      this.$set(this.moveList, index, moveItem)
    },
    getResult(obj) {
      const height = 297 * this.$refs['p-img'].offsetWidth / 210
      obj.pageNum = parseInt(obj.top / height) + 1
      obj.top = obj.top - (obj.pageNum - 1) * height
      return obj
    },
    scrollImg(e) {
      // e.target.scrollTop
      this.isImgMoving = true
      if (this.imgTimer) clearTimeout(this.imgTimer)
      this.imgTimer = setTimeout(() => {
        this.isImgMoving = false
        console.log('结束')
      }, 200)
    },
    scrollSign(e) {
      // e.target.scrollTop
      this.isSignMoving = true
      if (this.signTimer) clearTimeout(this.signTimer)
      this.signTimer = setTimeout(() => {
        this.isSignMoving = false
        console.log('结束')
      }, 200)
    },
    initEvent(e) {
      const scrollTop = (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
      if (scrollTop > 105) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  created() {
    this.getContractInfo()
  },
  mounted() {
    setTimeout(() => {
      this.previewImg()
    }, 1000)
    this.$nextTick(() => {
      document.addEventListener('scroll', this.initEvent)
    })
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.initEvent)
  },
}
</script>

<style lang="stylus" scoped>
.p-main
  display flex
  align-items stretch
  justify-content space-between
  padding-top 100px
.p-border
  position relative
  flex 630px 0 0
  padding-bottom 30px
  background #fff
.p-moving-stop
  &::-webkit-scrollbar
    display none
.p-factory
  // position relative
  overflow-y scroll
  height 891px //- 891px
  .p-img
    position relative
  .p-loading
    background #fff
    text-align center
    height 891px
    line-height 200px
  img
    width 100%
.p-control
  flex 320px 0 0
  background #fff
.p-control-fix
  position fixed
  top 0
  background #fff
.p-btn-list
  display flex
  flex-flow column wrap
  padding 20px
  .p-btn
    width 100%
.p-sign-list
  width 320px
  display flex
  flex-flow wrap
  max-height 470px
  border-left 1px solid #eaebee
  overflow-y scroll
.p-sign
  width 150px
  padding 0
  border 1px solid #eaebee
  border-left none
  position relative
  display flex
  flex-flow column
  color rgb(115, 138, 158)
  .p-sign-head
    padding 10px 10px 0 10px
    .p-sign-block
      height 100px
      display flex
      justify-content center
      align-items center
      position relative
      .p-close
        position absolute
        top -5px
        right -5px
        padding 0
        color #606266
        .el-icon-error
          font-size 20px
      .p-sign-person
        width 100px
        height 40px
        line-height 40px
        color #f00
        border 2px solid #f00
        text-align center
        font-size 24px
      .p-sign-company
        width 96px
        height 96px
        border 2px solid
        border-radius 50%
        display flex
        flex-flow column
        justify-content space-evenly
        align-items center
        color red
        .el-icon-star-on
          font-size 28px
        .p-sign-cycle
          position absolute
          top 3px
    .p-sign-name
      font-size 14px
      text-align center
      padding 10px 0
  .p-sign-body
    display flex
    justify-content center
    align-items center
    padding 10px 0
    border-top 1px solid #eaebee
    .p-set
      height 28px
    .p-edit
      height 28px
      background #09F7F7
      border #09F7F7
  .p-sign-line
    display flex
    width 100%
    margin-bottom 10px
    min-height 16px
    align-items flex-start
    font-size 26px
.p-move
  width 128px
  height 128px
  padding 10px
  border 4px solid
  border-radius 50%
  position absolute
  top 0px
  margin-bottom 20px
  display flex
  flex-flow column
  justify-content space-evenly
  align-items center
  color red
  .p-sign-line
    text-align center
  .el-icon-star-on
    font-size 56px
.p-move-person
  border-radius initial
  height 40px
  flex-flow nowrap
  .p-move-close
    position absolute
    top 2px
    right -15px
.sign-btn
  width 128px
  height 128px
  padding 0
  border-radius 50%
  position absolute
.p-move-control
  position absolute
  bottom -35px
  right 0px
  width 120px
  display flex
  justify-content center
  .p-move-btn
    padding 0
    .el-icon-error
      font-size 24px
    .el-icon-success
      font-size 24px
      color #38F709
.width-80
  width 80%
.red
  color red
.p-person-line
  position absolute
  bottom -30px
.p-cycle
  top 0
  position absolute
.p-preview
  flex 300px 0 0
  background #fff
  .p-preview-btn
    width 300px
    padding 20px
    display flex
    justify-content center
    .p-btn
      width 80px
</style>
