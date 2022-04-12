<template lang="pug">
.register-page
  .header
    img(:src="`${$assetsBaseUrl}/common/logo.png`")
  .content
    .white-main
      .center-block
        .title 注册成为仟金顶用户
        .line-list
          .item
            .already
              img(:src="`${$assetsBaseUrl}/common/already.png`")
            .txt 基本信息
          .center-line
          .item
            .already(v-if='formShow === 2')
              img(:src="`${$assetsBaseUrl}/common/already.png`")
            .blank(v-else)
            .txt 企业资料
        .form(v-if='formShow === 1')
          el-form(:model="form" :rules="rules" ref="register")
            el-form-item(prop="corpName")
              el-input(placeholder="请输入企业名称" v-model.trim="form.corpName")
            el-form-item(prop="name")
              el-input(maxlength="10" placeholder="请输入联系人" v-model.trim="form.name")
            el-form-item(prop="loginName")
              el-input(maxlength="11" placeholder="请输入手机号码" v-model.trim="form.loginName")
            el-form-item(prop="imgCode")
              el-input(maxlength="4" placeholder="请输入图片验证码" v-model.trim="form.imgCode")
              img.pic-verify(:src="verifyCodeImg" @click="getpicture")
            el-form-item.register-code-form(prop="smsVerifyCode")
              el-input(maxlength="6" placeholder="请输入短信验证码" v-model.trim="form.smsVerifyCode")
              el-button.sendcode-btn(:disabled="!!timer" @click="sendCode") {{ timer ? `${num}秒后重新获取` : '发送短信验证码'}}
            el-form-item(prop="passwd")
              el-input(autocomplete="new-password" maxlength="32" placeholder="请设置密码" type="password" v-model.trim="form.passwd")
            .tip (注：密码必须8-32位，必须含 大、小写字母、数字)
            el-form-item
              el-button.step-btn(:loading="isSubmit" @click="handleNext") 下一步
            .inst-tip
              .left-tip 同意
                span(@click='clickProtocolUser') 《用户协议》
                span(@click='clickProtocolPrivate') 《隐私政策》
              router-link(:to='{name: "login"}')
                span 已有账号，
                span.right-tip(@click='toPage("login")') 返回登录
        .form(v-if='formShow === 2')
          el-upload.lience-upload(
            :action="ocrBusinessLicenseUrl"
            :before-upload="beforeUpload"
            :on-progress="() => uploadView.licenseLoading = true"
            :on-success="uploadSuccess"
            :show-file-list="false"
            class="auth-upload__wrapper"
          )
            el-button.up-lience-btn(:loading='uploadView.licenseLoading')
              i.el-icon-upload2
              span {{ uploadView.license && '重新' }}上传营业执照
          .already-img-name(v-if='fileName && uploadView.license') {{ fileName }}
          .-tip 请上传清晰图片，只支持jpg、jpeg、gif、bmp、png格式文件，且不超过5M
          el-form(:model="form2" :rules="rules" ref="register2")
            el-form-item(prop="corpName")
              el-input(placeholder="请输入企业名称" v-model.trim="form2.corpName")
            el-form-item(prop="socialCode")
              el-input(placeholder="请输入社会统一信用代码" v-model.trim="form2.socialCode")
            el-form-item(prop="legalPersonName")
              el-input(placeholder="请输入法人姓名" v-model.trim="form2.legalPersonName")
            el-form-item
              el-button.step-btn(:loading="isSubmit" @click="handleSubmit") 提交注册
</template>

<script>
import { baseUrl } from '@/utils/config'
import ajaxStore from '@/apis'
export default {
  components: {
  },
  data() {
    return {
      formShow: 1,
      isRegister: true, // 是否注册过
      isSubmit: false,
      form: {
        corpName: '',
        name: '',
        loginName: '',
        imgCode: '',
        smsVerifyCode: '',
        passwd: ''
      },
      form2: {
        corpName: '',
        legalPersonName: '',
        socialCode: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        legalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 2, message: '法人名字不能少于两位', trigger: 'blur' },
        ],
        socialCode: [
          { required: true, message: '请输入社会统一信用代码', trigger: 'blur' },
          { min: 13, max: 18, message: '请输入正确的社会统一信用代码', trigger: 'blur' },
        ],
        loginName: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[0-9]{10}$/, message: '手机格式不正确', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              this.phoneIsRegister(value, callback)
            },
            trigger: 'blur'
          }
        ],
        imgCode: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' },
          { min: 4, message: '图片验证码不能少于4位', trigger: 'blur' }
        ],
        smsVerifyCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { min: 6, message: '短信验证码不能少于6位', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/,
            message: '请输入8-32位密码，必须包含大、小写字母、数字',
            trigger: 'blur'
          },
          {
            pattern: /^[^\s]*$/,
            message: '密码不允许有空格',
            trigger: 'blur'
          }
        ]
      },
      verifyCodeImg: `${baseUrl}/ofs/front/verify/getImgCode?` + Math.random(),
      timer: null,
      num: 60,
      fileKey: '', // 营业执照图片地址
      fileName: '', // 营业执照图片名
      licenseInfo: {}, // 营业执照部分OCR信息
      uploadView: {
        license: '',
        licenseLoading: false
      },
    }
  },
  methods: {
    clickProtocolUser() {
      window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/public/fuwu/%E4%BB%9F%E9%87%91%E9%A1%B6%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.pdf')
    },
    clickProtocolPrivate() {
      window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/public/fuwu/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.pdf')
    },
    getpicture() {
      this.verifyCodeImg = `${baseUrl}/ofs/front/verify/getImgCode?` + Math.random()
    },
    // 填写图形验证码并且没有注册过才可以发送短信
    async sendCode() {
      const { loginName: phone, imgCode } = this.form
      if (!phone || this.isRegister) {
        return this.$refs.register.validateField('loginName')
      }
      if (!imgCode) {
        return this.$refs.register.validateField('imgCode')
      }

      const res = await ajaxStore.common.fetchSmsCode({
        phone,
        imgCode
      })
      if (res.data && res.data.code === '0') {
        // 短信倒计时
        if (this.timer) return
        this.timeGo()
      } else {
        this.getpicture()
      }
    },
    // 验证手机是否注册过
    async phoneIsRegister(phone, cb) {
      const res = await ajaxStore.common.verifyPhoneIsRegister({ phone })
      if (res.data && res.data.code === '0') {
        this.isRegister = !res.data.data
        if (!res.data.data) {
          cb(new Error('此手机号已注册'))
        } else {
          cb()
        }
      }
    },
    // 第一步-注册接口
    handleNext() {
      this.$refs.register.validate(async valid => {
        if (valid) {
          this.isSubmit = true
          const params = {
            corpName: this.form.corpName,
            name: this.form.name,
            loginName: this.form.loginName,
            imgCode: this.form.imgCode,
            smsVerifyCode: this.form.smsVerifyCode,
            passwd: this.form.passwd,
          }
          const res = await ajaxStore.common.register(params)
          if (res.data && res.data.code === '0') {
            this.formShow = 2
          }
          this.isSubmit = false
        }
      })
    },
    // 第二步-注册接口
    handleSubmit() {
      this.$refs.register2.validate(async valid => {
        if (valid) {
          this.isSubmit = true
          const params = {
            address: this.licenseInfo.address,
            businessFileKey: this.licenseInfo.fileKey,
            businessScope: this.licenseInfo.business,
            corpName: this.form2.corpName,
            mobile: this.form.loginName,
            password: this.form.passwd,
            contactPerson: this.form.name,
            name: this.form2.legalPersonName,
            organizationalForm: this.licenseInfo.type,
            registerSource: 'saas',
            socialCode: this.form2.socialCode
          }
          const res = await ajaxStore.common.registerInitTenant(params)
          if (res.data && res.data.code === '0') {
            this.$message.success('注册成功')
            this.toPage('login')
          }
          this.isSubmit = false
        }
      })
    },
    timeGo() {
      this.timer = setInterval(() => {
        if (this.num === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.num = 60
        } else {
          this.num--
        }
      }, 1000)
    },
    toPage(name) {
      this.$router.push({ name })
    },
    // 营业执照上传
    uploadSuccess(res) {
      this.uploadView.licenseLoading = false
      if (res && res.code === '0') {
        this.fileKey = res.data.fileKey
        this.uploadView.license = `${baseUrl}/ofs/weixin/project/loadFile?buzKey=${res.data.fileKey}`

        const { name: corpName, regNum: socialCode, person } = res.data
        this.licenseInfo = res.data
        this.$message.success('营业执照上传成功')
        this.form2.corpName = corpName
        this.form2.socialCode = socialCode
        this.form2.legalPersonName = person
      }
    },
    // 上传图片的校验
    beforeUpload(file) {
      const fileType = file.type || file.name.split('.')[file.name.split('.').length - 1]
      const fileSize = file.size
      const type = /png|jpeg|jpg|bmp|gif/.test(fileType.toLowerCase())
      if (!type) {
        this.$message.error('上传图片格式有误')
        return false
      }
      if (fileSize > 5 * 1024 * 1024) {
        this.$message.error('上传图片大小不能超过5MB')
        return false
      }
      this.fileName = file.name
      return true
    }
  },
  computed: {
    ocrBusinessLicenseUrl() {
      return `${baseUrl}/user/ocr/ocrBusinessLicense`
    }
  },
}
</script>

<style lang="stylus">
.register-page
  background-color #F3F4F8
  height 100%
  overflow auto
  display flex
  flex-direction column
  color #494949
  .header
    background-color #FFF
    img
      width 80px
      margin 18px 20px 17px
  .content
    flex 1 0 auto
    padding 30px 130px 90px
    .white-main
      background-color #fff
      .center-block
        width 360px
        margin 0 auto
        .title
          padding-top 54px
          font-size 24px
          text-align center
        .line-list
          display flex
          justify-content center
          padding 20px 0 30px
          .item
            text-align center
            .blank
              margin 0 auto
              width 30px
              height 30px
              border 1px solid #DCDFE6
              border-radius 15px
              margin-bottom 4px
            .already
              img
                width 32px
            .txt
              color #8997AE
          .center-line
            width 56px
            border-top 1px dashed #DCDFE6
            margin-top 14px
        .form
          padding-bottom 70px
          position relative
          .el-input__inner
            height 40px
          .pic-verify
            position absolute
            cursor pointer
            top 4px
            right 4px
            width 80px
          .register-code-form
            .el-form-item__content
              display flex
          .sendcode-btn
            border-radius 4px
            height 40px
            margin-left 14px
            border-color #DCDFE6
            color #8997AE
            &:focus
              background-color #fff
          .tip
            margin-bottom 22px
          .step-btn
            height 40px
            width 100%
            color #FFF
            background-color #3B68F0
            border-color #3B68F0
            border-radius 4px
          .inst-tip
            display flex
            padding-bottom 22px
            .left-tip
              flex 1 0 auto
              span
                color #3B68F0
                cursor pointer
            a
              color #494949
              .right-tip
                color #3B68F0
                cursor pointer
          .lience-upload
            .el-upload
              display block
              width 180px
              margin 0 auto
              .up-lience-btn
                width 180px
                color #3B68F0
                height 40px
                border 1px solid #EAEBEE
                border-radius 20px
                &:focus
                  background-color #fff
          .already-img-name
            cursor pointer
            text-align left
            position absolute
            top 11px
            left 286px
            width 300px
            color #3B68F0
          .upload-tip
            color #8997AE
            margin 16px 0 32px

</style>
