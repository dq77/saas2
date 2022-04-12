<template lang='pug'>
  .page-main
    .page-layout-three-section
      .page-layout-three-section-2
        el-form(
          label-width='100px'
          ref='dialogEditForm'
          :rules='dialogEdit.rules'
          :model='dialogEdit.form'
        )
          el-row(:gutter='24')
            el-col(:span='12')
              el-form-item(label='姓名' prop='memberName' required)
                el-input(v-model='dialogEdit.form.memberName' maxlength='20' :disabled="dingUserId")
            el-col(:span='12')
              el-form-item(label='手机号' prop='mobile' required)
                el-input(v-model='dialogEdit.form.mobile' maxlength='11' :disabled="dingUserId")
          el-row(:gutter='24')
            el-col(:span='12')
              el-form-item(label='绑定邮箱' prop='email')
                el-input(v-model='dialogEdit.form.email' maxlength='50' :disabled="dingUserId")
            el-col(:span='12')
              el-form-item(label='外部编号' prop='extId')
                el-input(v-model='dialogEdit.form.extId' maxlength='50' :disabled="dingUserId")
          el-row(:gutter='24')
            el-col(:span='12')
              el-form-item(label='角色名称' prop='roles' required)
                select-role-list(
                  :initId='dialogEdit.form.roles'
                  @change='changeRoleSelect'
                )
            el-col(:span='12')
              el-form-item(label='组织部门' prop='departmentId' required)
                select-organ-tree(
                  :initId='dialogEdit.form.departmentId'
                  :multiple='true'
                  :disabled="dingUserId"
                  @change='changeOrganTree'
                )
          el-row(v-if='(dialogEdit.type === "edit") && (wxInfo)' :gutter='24')
            el-col(:span='12')
              el-form-item(label='微信账号' prop='wxAccount')
                span {{ wxInfo }}
                el-button.unbind(@click='unBindWechat' type='text') 解绑
          el-row(v-loading="loading")
            el-form-item(label='已配权限' prop='permissions')
              el-collapse(v-model='activeNames')
                el-collapse-item(
                  v-for="(item, index) in bagData"
                  :key="item.label"
                  :title="item.name"
                  :name="item.label"
                )
                  permissionTable(
                    :tableData="item.tableData"
                    :loading="tableLoading"
                    :isEdit="isEdit"
                    :tableFlag="item.label"
                    @chooseAll="handleChooseAll"
                  )
      .page-layout-three-section-3
        el-button(type='primary' :loading='dialogEdit.sureLoading' @click='clickCreateSubAccount' :weblogs-anchor="dialogEdit.type === 'create' ? 'common-account-createSave' : 'common-account-editSave'") 保存
        el-button(@click="$router.go(-1)" weblogs-anchor="common-account-createCancel" :weblogs-anchor="dialogEdit.type === 'create' ? 'common-account-createCancel' : 'common-account-editCancel'") 返回
</template>

<script>
import SelectRoleList from '@/components/SelectRoleList'
import SelectOrganTree from '@/components/SelectOrganTree'
import { vPhone, vEmail } from '@/utils/validateRules'
import permissionTable from './permissionTable.vue'
export default {
  data () {
    return {
      tableLoading: false,
      activeNames: [],
      bagData: [],
      isEdit: this.$route.query.id,
      treeData: [],
      dialogEdit: {
        type: 'create', // create表示创建，edit表示编辑
        sureLoading: false,
        rules: {
          memberName: [
            { required: true, message: '请输入姓名', trigger: ['change', 'blur'] },
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
            { validator: vPhone, trigger: 'blur' },
          ],
          email: [
            { validator: vEmail, trigger: 'blur' },
          ],
          roles: [
            { required: true, message: '请选择角色', trigger: ['change', 'blur'] },
          ],
          departmentId: [
            { required: true, message: '请选择组织', trigger: ['change', 'blur'] },
          ]
        },
        form: {
          id: '',
          // status: '',
          memberName: '',
          mobile: '',
          email: '',
          extId: null, // 富思特外部编号，选填
          departmentId: '',
          permissions: [],
          roles: []
        },
        defaultChecked: [],
        roleProssionList: [],
        timer: null
      },
      wxInfo: '',
      dingUserId: null,
      allMenuData: [],
      loading: false
    }
  },
  props: {},
  components: {
    SelectRoleList,
    SelectOrganTree,
    permissionTable
  },
  created () {
    this.initData()
  },
  methods: {
    async initData() {
      const { id, dingUserId } = this.$route.query
      this.dingUserId = !!dingUserId
      this.dialogEdit.type = id ? 'edit' : 'create'
      if (id) {
        await this.getAccountInfo(id)
        await this.getTreeList()
      } else {
        this.getTreeList()
      }
    },
    // 获取树的列表
    async getTreeList() {
      try {
        this.loading = true
        const data = await this.ajaxStore.common.account.getMenuTreeList()
        this.loading = false
        this.allMenuData = data?.data?.data?.moduleMenuResponses ?? []
        if (this.isEdit) {
          const data1 = await this.ajaxStore.common.account.getPermissionsByRoleCodes(this.dialogEdit.form.roles)
          const hasChooseCode = data1.data.data.map(item => item.permissionCode)
          this.showPermissionBag(data?.data?.data?.moduleMenuResponses ?? [], hasChooseCode, true)
        } else {
          this.showPermissionBag(data?.data?.data?.moduleMenuResponses ?? [], [], true)
        }
      } catch (error) {
        this.loading = false
      }
    },
    // 全选
    handleChooseAll(isAll, flag) {
      const changeStatus = (data) => {
        data.forEach(item => {
          item.checkedFlag = isAll
          if (item.subPermissions && item.subPermissions.length) {
            changeStatus(item.subPermissions)
          }
        })
      }
      const current = this.bagData.find(item => item.label === flag)
      changeStatus(current?.tableData)
    },
    // 权限包回显
    showPermissionBag(data, codeData, init = false) {
      this.bagData = data.map(item => {
        this.matchPermissionCode(item?.permissionMenuList, codeData)
        init && this.activeNames.push(item?.moduleCode)
        return {
          label: item?.moduleCode,
          name: item?.moduleName,
          tableData: item?.permissionMenuList
        }
      })
    },
    // 获取code集合
    getSendData() {
      this.bagData.forEach(item => {
        const arr = this.getSelectCode(item.tableData)
        this.dialogEdit.form.permissions = this.dialogEdit.form.permissions.concat(arr)
      })
    },
    // 获取权限包里选中的code
    getSelectCode(tableData) {
      const arr = []
      const getCode = (data) => {
        data.forEach(item => {
          if (item.checkedFlag) {
            arr.push(item.permissionCode)
          }
          if (item.subPermissions && item.subPermissions.length) {
            getCode(item.subPermissions)
          }
        })
      }
      getCode(tableData)
      return arr
    },
    // 匹配对应的code
    matchPermissionCode(allData, codeData) {
      // if (codeData && codeData.length) {
      allData.forEach(dataItem => {
        if (codeData.includes(dataItem.permissionCode)) {
          dataItem.checkedFlag = true
        } else {
          dataItem.checkedFlag = false
        }
        if (dataItem.subPermissions && dataItem.subPermissions.length) {
          this.matchPermissionCode(dataItem.subPermissions, codeData)
        }
      })
      // }
    },
    // 角色选择
    changeRoleSelect({ value }) {
      this.dialogEdit.form.roles = value
      if (value && value.length > 0) {
        this.getPermissionsByRoleCodes(this.dialogEdit.form.roles)
      } else {
        this.showPermissionBag(this.allMenuData, [])
      }
    },
    // 部门选择
    changeOrganTree({ value, currentNodeData }) {
      let str = ''
      value && value.forEach((item, index) => {
        str += `${item[item.length - 1]}${index < value.length - 1 ? ',' : ''}`
      })
      this.dialogEdit.form.departmentId = str
    },
    clickCreateSubAccount() {
      this.getSendData()
      this.$refs.dialogEditForm.validate(async valid => {
        if (valid) {
          if (this.dialogEdit.type === 'edit') {
            const data = {...this.dialogEdit.form}
            data.contactMobile = data.mobile
            this.dialogEdit.sureLoading = true
            const res = await this.updateSubAccount(data)
            this.dialogEdit.sureLoading = false
            if (res !== 'requestFail') {
              this.$message.success('编辑账号成功')
              this.$router.push({ name: 'accountList' })
            }
          } else {
            const data = {...this.dialogEdit.form}
            data.contactMobile = data.mobile
            delete data.id
            delete data.status
            this.dialogEdit.sureLoading = true
            const res = await this.createSubAccount(data)
            this.dialogEdit.sureLoading = false
            if (res !== 'requestFail') {
              this.$message.success('开通账号成功')
              this.$router.push({ name: 'accountList' })
            }
          }
        }
      })
    },
    async updateSubAccount(data) {
      const res = await this.ajaxStore.common.account.updateSubAccount(data)
      return (res.data && res.data.code === '0') ? res.data.data : 'requestFail'
    },
    async createSubAccount(data) {
      const res = await this.ajaxStore.common.account.createSubAccount(data)
      return (res.data && res.data.code === '0') ? res.data.data : 'requestFail'
    },
    async getAccountInfo(id) {
      const res = await this.ajaxStore.common.account.getAccountInfo({ id: id })
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        this.dialogEdit.form.id = data.id
        this.dialogEdit.form.status = data.status
        this.dialogEdit.form.memberName = data.memberName
        this.dialogEdit.form.mobile = data.mobile
        this.dialogEdit.form.email = data.email
        this.dialogEdit.form.roles = data.roleCode
        this.dialogEdit.form.departmentId = data.departmentId
        this.dialogEdit.form.extId = data.extId
        this.wxInfo = data.isBindWechat ? data.wechatNikeName : ''
        // this.dialogEdit.form.permissions = data.permissionCode || []
        this.defaultChecked = data.permissionCode || []
      }
    },

    async unBindWechat() {
      this.$confirm(`确定要解绑 ${this.dialogEdit.form.memberName} 的微信吗?`, '微信解绑', { type: 'warning' }).then(async () => {
        const res = await this.ajaxStore.account.common.unBindSubUserWechat(this.dialogEdit.form.id)
        if (res.data && res.data.code === '0') {
          this.$message.success('解绑成功')
          this.wxInfo = ''
        }
      })
    },

    // 获取选中角色权限
    async getPermissionsByRoleCodes(value) {
      this.tableLoading = true
      const res = await this.ajaxStore.common.account.getPermissionsByRoleCodes(value)
      this.tableLoading = false
      if (res.data && res.data.code === '0') {
        const data = res.data.data || []
        const permissonCode = data.map(item => item.permissionCode)
        this.showPermissionBag(this.allMenuData, permissonCode)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-song-item
  display inline-block
  margin-right 10px
/deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner
  background rgba(60, 93, 164, .6)
  border-color rgba(60, 93, 164, .6)
.page-layout-three-section-2
  .unbind
    margin-left 15px
    color #25becd
</style>
