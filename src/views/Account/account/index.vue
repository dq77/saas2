<template lang="pug">
.page-main
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @privateSearchParams='privateSearchParams'
  )
    template(slot="memberName" slot-scope='{row}')
      .member-box
        span {{ row.memberName }}
        img(
          v-show="row.dingUserId"
          :src="`${$assetsBaseUrl}/common/dingLight.png`"
        )
    template(slot='operate' slot-scope='{row}')
      //- template(v-if='adminMobile !== row.mobile && row.authConfig.roles.indexOf("PTN_SUPPLIER_ADMIN") === -1')
      //-   el-button(type='text' @click='clickFrozen(row)') {{ row.status === 0 ? '冻结' : '解冻' }}
      //-   span.p-gap |
      //-   el-button(type='text' @click='clickEdit(row)') 编辑
      //- span(v-else) -
      el-button(type='text' @click='clickEdit(row)' weblogs-anchor="common-account-edit") 编辑
  //- 创建编辑账号弹窗
  el-dialog(
    width='500px'
    :show-close='true'
    :title='dialogEdit.type === "edit" ? "编辑账号" : "开通账号"'
    :visible.sync='dialogEdit.visible'
  )
    el-form(
      label-width='100px'
      ref='dialogEditForm'
      :rules='dialogEdit.rules'
      :model='dialogEdit.form'
    )
      el-form-item(label='姓名' prop='memberName' required)
        el-input(v-model='dialogEdit.form.memberName' maxlength='20')
      el-form-item(label='手机号' prop='mobile' required)
        el-input(v-model='dialogEdit.form.mobile' maxlength='11')
      el-form-item(label='绑定邮箱' prop='email')
        el-input(v-model='dialogEdit.form.email' maxlength='50')
      el-form-item(label='外部编号' prop='extId')
        el-input(v-model='dialogEdit.form.extId' maxlength='50')
      el-form-item(label='角色名称' prop='roles' required)
        select-role-list(
          :initId='dialogEdit.form.roles'
          @change='changeRoleSelect'
        )
      el-form-item(label='组织部门' prop='departmentId' required)
        select-organ-tree(
          :initId='dialogEdit.form.departmentId'
          @change='changeOrganTree'
        )
      el-form-item(label='关联权限' prop='permissions' required)
        select-permisstion-tree(
          :defaultCheckedKeys='dialogEdit.defaultChecked'
          :defaultExpandAll='false'
          @check='treeCheckChange'
        )
    .text-center(slot='footer')
      el-button(@click='dialogEdit.visible=false') 取消
      el-button(type='primary' :loading='dialogEdit.sureLoading' @click='clickCreateSubAccount') 确认
  //- 冻结账号弹框
  el-dialog(
    width='400px'
    :title='dialogFrozen.form.status === 1 ? "解冻" : "冻结"'
    :visible.sync='dialogFrozen.visible'
  )
    div {{dialogFrozen.form.status === 1 ? '确认解冻此账号？' : '确认冻结此账号？'}}
    span(slot='footer')
      el-button(@click='dialogFrozen.visible=false') 取消
      el-button(type='primary' :loading='dialogFrozen.sureLoading' @click='clickSureFrozen') 确认
</template>

<script>
import ListPage from '@/components/ListPage'
import SelectOrganTree from '@/components/SelectOrganTree'
import SelectRoleList from '@/components/SelectRoleList'
import SelectPermisstionTree from '@/components/SelectPermisstionTree'
import { vPhone, vEmail } from '@/utils/validateRules'
import { toPrefixUrl } from '@/utils/util'
import AccountOpenInfo from './AccountOpenInfo.vue'
export default {
  components: { ListPage, SelectOrganTree, SelectRoleList, SelectPermisstionTree, AccountOpenInfo },
  data () {
    return {
      loading: false,
      treeData: [],
      batchPermissionList: [],
      dialogEdit: {
        type: 'create', // create表示创建，edit表示编辑
        visible: false,
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
          ],
          permissions: [
            { required: true, type: 'array', message: '请选择权限项', trigger: 'change' },
          ],
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
        defaultChecked: []
      },
      dialogFrozen: {
        visible: false,
        sureLoading: false,
        form: {}
      },
    }
  },
  computed: {
    listPageConfig () {
      const getSubAccountList = this.ajaxStore.common.account.getSubAccountList
      return {
        headButtonGroup: [
          {
            type: 'text',
            text: '账号开通',
            method: this.clickRegiste,
            weblogs: 'common-account-create'
          }
        ],
        searchParams: [
          [
            {
              type: 'text',
              formItemName: 'memberName',
              label: '姓名',
              placeholder: '请输入姓名',
              col: 6,
            },
            {
              type: 'text',
              formItemName: 'mobile',
              label: '手机号',
              placeholder: '请输入手机号',
              col: 6,
            },
            {
              type: 'text',
              formItemName: 'roleName',
              label: '角色名称',
              placeholder: '请输入角色名称',
              col: 6,
            },
          ]
        ],
        tableHeader: [
          { name: '姓名', property: 'memberName', tdSlotName: 'memberName' },
          { name: '手机号', property: 'mobile' },
          { name: '邮箱', property: 'email', formatter: (v) => v || '- -' },
          { name: '角色名称', property: 'roleName', formatter: (v) => (v && v.length) ? v.join('、') : '- -' },
          { name: '组织名称', property: 'departmentTreeName', formatter: (v) => v || '- -' },
          { name: '操作', property: 'operate', tdSlotName: 'operate' },
        ],
        getTableList: {
          type: 'component',
          fn: getSubAccountList
        }
      }
    }
  },
  methods: {
    toPrefixUrl,
    privateSearchParams(params) {
      if (params) {
        params.fileFlag = '1'
      }
      return params
    },
    clickRegiste() {
      this.$router.push({
        name: 'accountOpenInfo'
      })
    },
    clickCreateSubAccount() {
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
              this.dialogEdit.visible = false
              this.$refs.listPage.getTableList()
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
              this.dialogEdit.visible = false
              this.$refs.listPage.getTableList()
            }
          }
        }
      })
    },
    // 角色选择
    changeRoleSelect({ value }) {
      this.dialogEdit.form.roles = value
    },
    // 部门选择
    changeOrganTree({ value, currentNodeData }) {
      this.dialogEdit.form.departmentId = currentNodeData ? currentNodeData.id : ''
    },
    async clickSureFrozen() {
      const data = {...this.dialogFrozen.form}
      data.status = data.status === 1 ? 0 : 1
      this.dialogFrozen.sureLoading = true
      const res = await this.forzenSubAccount(data)
      this.dialogFrozen.sureLoading = false
      if (res !== 'requestFail') {
        this.$message.success(data.status === 1 ? '冻结账号成功' : '解冻账号成功')
        this.dialogFrozen.visible = false
        this.$refs.listPage.getTableList()
      }
    },
    async clickEdit(rowData) {
      this.$router.push({
        name: 'accountOpenInfo',
        query: { id: rowData.id, dingUserId: rowData.dingUserId }
      })
    },
    async createSubAccount(data) {
      const res = await this.ajaxStore.common.account.createSubAccount(data)
      return (res.data && res.data.code === '0') ? res.data.data : 'requestFail'
    },
    async updateSubAccount(data) {
      const res = await this.ajaxStore.common.account.updateSubAccount(data)
      return (res.data && res.data.code === '0') ? res.data.data : 'requestFail'
    },
    async forzenSubAccount(data) {
      const res = await this.ajaxStore.common.account.updateSubAccount(data)
      return (res.data && res.data.code === '0') ? res.data.data : 'requestFail'
    },
    // 权限树变更
    async treeCheckChange(setArr) {
      this.dialogEdit.form.permissions = setArr
      this.$refs.dialogEditForm.validateField('permissions')
    },
    async getManagerImportPermissionList() {
      const res = await this.ajaxStore.common.account.getManagerImportPermissionList()
      if (res.data && res.data.code === '0') {
        this.batchPermissionList = res.data.data
      }
    },
    async getAccountInfo(id) {
      const res = await this.ajaxStore.common.account.getAccountInfo({ id })
      if (res.data && res.data.code === '0') {
        return res.data.data
      } else {
        return false
      }
    }
  },
  mounted() {
    // this.getManagerImportPermissionList()
  }
}
</script>

<style lang="stylus" scoped>
.p-gap
  margin 0 10px

.p-page-header
  color #494949
  margin-left 10px
.u-header-num
  color #4A71F0
  margin-right 5px
.u-header-btn
  color #4A71F0
  margin-left 10px
  cursor pointer

.p-red
  color #F56C6C
.member-box
  display flex
  align-items center
  span
    margin-right 6px
  img
    width 16px
    height 16px
</style>
