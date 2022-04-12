<template lang="pug">
.page-main
  .page-layout-three-section
    .page-layout-three-section-2
      el-form(
        label-position='top'
        width='100px'
        :model='formData'
        :rules="rules"
        ref="ruleForm"
        :disabled='view === "view"'
      )
        .page-section
          .page-section-title 基础信息
          el-row(:gutter='20')
            el-col(:span='4')
              el-form-item(label='角色名称' prop='roleName')
                el-input(v-model='formData.roleName' placeholder='请输入角色名称')
            el-col(:span='12')
              el-form-item(label='备注' prop='remark')
                el-input(v-model='formData.remark' placeholder='请输入备注')
        .page-section
          .page-section-title 数据权限
          el-row(:gutter='20')
            el-col(:span='4')
              el-form-item(label='数据权限' prop='roleAuthorityType')
                el-select(placeholder='请选择数据权限' v-model='formData.roleAuthorityType')
                  el-option(v-for='(val, key) in enums.roleAuthorityTypeMap' :key='key' :value='parseInt(key)' :label='val')
        .page-section
          .page-section-title 功能权限
          .p-section-content(v-loading='loading')
            el-collapse(v-model='activeNames')
              el-collapse-item(
                v-for="(item, index) in bagData"
                :key="index"
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
      el-button(type="primary" v-if="(view === 'create' && permissions['PTN:SUPPLIER:ROLE:CREATE']) || (view === 'edit' && permissions['PTN:SUPPLIER:ROLE:UPDATE'])" @click='clickSave' :loading="submitLoading" :weblogs-anchor="view === 'create' ? 'common-account-createRoleSave' : 'common-account-editRoleSave'") 保存
      el-button(type="danger" v-if="view === 'edit' && permissions['PTN:SUPPLIER:ROLE:DELETE']" @click='clickDel' weblogs-anchor='common-account-deleteRole') 删除
      el-button(plain @click="$router.go(-1)" :weblogs-anchor="view === 'create' ? 'common-account-createRoleCancel' : 'common-account-editRoleCancel'") 返回
</template>

<script>
import { mapState } from 'vuex'
import { roleAuthorityTypeMap } from '@/utils/enums'
import permissionTable from './permissionTable.vue'
import SelectPermisstionTree from '@/components/SelectPermisstionTree'
export default {
  components: { SelectPermisstionTree, permissionTable },
  data () {
    return {
      tableLoading: false,
      activeNames: [],
      bagData: [],
      treeData: [],
      checkAll: false,
      enums: {
        roleAuthorityTypeMap
      },
      view: '',
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleAuthorityType: [{ required: true, message: '请选择数据权限', trigger: ['change', 'blur'] }]
      },
      isView: !this.$route.query.type ? false : this.$route.query.type === 'view',
      isEdit: !this.$route.query.type ? false : this.$route.query.type === 'edit',
      formData: {
        roleName: '',
        remark: '',
        permissionCodeList: [],
        roleAuthorityType: ''
      },
      defaultChecked: [],
      loading: false,
      submitLoading: false
    }
  },
  computed: {
    ...mapState(['permissions'])
  },
  created() {
  },
  mounted() {
    this.setView()
    this.getTreeList()
  },
  methods: {
    // 获取树的列表
    async getTreeList() {
      try {
        this.loading = true
        const data = await this.ajaxStore.common.account.getMenuTreeList()
        this.loading = false
        if (this.isEdit || this.isView) {
          await this.getDetail()
          this.showPermissionBag(data?.data?.data?.moduleMenuResponses, this.defaultChecked)
        } else {
          this.showPermissionBag(data?.data?.data?.moduleMenuResponses, [])
        }
      } catch (error) {
        this.loading = false
      }
    },
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
    showPermissionBag(data, codeData) {
      this.bagData = data.map(item => {
        this.$route.query.type !== 'create' && this.matchPermissionCode(item?.permissionMenuList, codeData)
        this.activeNames.push(item?.moduleCode)
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
        this.formData.permissionCodeList = this.formData.permissionCodeList.concat(arr)
      })
    },
    // 获取权限包里选中的code
    getSelectCode(tableData, key) {
      const arr = []
      const getCode = (data) => {
        data.forEach(item => {
          if (item.checkedFlag) {
            arr.push(item.permissionCode)
          }
          if (item.subPermissions && item.subPermissions.length) {
            getCode(item.subPermissions, key)
          }
        })
      }
      getCode(tableData, key)
      return arr
    },
    // 匹配对应的code
    matchPermissionCode(allData, codeData) {
      if (codeData && codeData.length) {
        allData.forEach(dataItem => {
          if (codeData.includes(dataItem.permissionCode)) {
            dataItem.checkedFlag = true
          }
          if (dataItem.subPermissions && dataItem.subPermissions.length) {
            this.matchPermissionCode(dataItem.subPermissions, codeData)
          }
        })
      }
    },
    async clickSave() {
      this.getSendData()
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const requestName = { edit: 'updateRole', create: 'createRole' }[this.view]
          const data = this.formData
          if (this.view === 'edit') data.roleCode = this.$route.query.roleCode
          this.submitLoading = true
          const res = await this.ajaxStore.common[requestName](data)
          this.submitLoading = false
          if (res.data && res.data.code === '0') {
            const message = this.view === 'edit' ? '更新成功' : '新建成功'
            this.$message.success(message)
            this.$router.back()
          }
        }
      })
    },
    async clickDel() {
      const res = await this.ajaxStore.common.account.delRole({ roleCode: this.$route.query.roleCode })
      if (res.data && res.data.code === '0') {
        this.$message.success('删除成功')
        this.$router.back()
      }
    },
    treeCheckChange(setArr) {
      this.formData.permissionCodeList = setArr
    },
    async getDetail() {
      const res = await this.ajaxStore.common.account.getRoleDetail({ roleCode: this.$route.query.roleCode })
      if (res.data && res.data.code === '0') {
        const resData = res.data.data
        this.defaultChecked = resData.permissionList.map(item => item.permissionCode)
        this.initFormData(resData)
      }
    },
    initFormData(resData) {
      const formData = this.formData
      Object.keys(formData).forEach(item => {
        formData[item] = resData[item]
      })
      this.formData = formData
      this.formData.permissionCodeList = []
    },
    setView() {
      // const routeName = this.$route.name
      const query = this.$route.query
      this.view = query.type
    },
  },

}
</script>

<style lang="stylus" scoped>
.p-song-item
  display inline-block
  margin-right 10px
.p-section-checkAll
  margin-bottom 10px

/deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner
  background rgba(60, 93, 164, .6)
  border-color rgba(60, 93, 164, .6)
</style>
