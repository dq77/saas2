<template lang="pug">
.page-main
  list-page(
    ref='listPage'
    :config='listPageConfig'
  )
    template(slot='roleType' slot-scope='{row}')
      span {{row.roleType === 2 ? '自定义角色' : '内置角色'}}
    template(slot='operate' slot-scope='{row}')
      el-button(type='text' @click='clickToDetail(row, "edit")' v-if='row.roleType === 2 && permissions["PTN:SUPPLIER:ROLE:QUERY"] && (permissions["PTN:SUPPLIER:ROLE:UPDATE"] || permissions["PTN:SUPPLIER:ROLE:DELETE"])' weblogs-anchor='common-account-editRole') 编辑
      el-button(type='text' @click='clickToDetail(row, "view")' v-if='permissions["PTN:SUPPLIER:ROLE:QUERY"]' weblogs-anchor='common-account-lookRole') 查看
</template>

<script>
import { mapState } from 'vuex'
import ListPage from '@/components/ListPage'
// import { roleCategoryMap, roleStatusMap } from '@/utils/enums'
// import { vPhone, vEmail } from '@/utils/validateRules'
export default {
  components: { ListPage },
  data () {
    return {
      dialogFrozen: {
        visible: false,
        sureLoading: false,
        form: {}
      }
    }
  },
  computed: {
    adminMobile() {
      return this.$store.state.userInfo.mobile
    },
    listPageConfig () {
      const getRoleList = this.ajaxStore.common.account.getRoleList
      return {
        headButtonGroup: this.permissions['PTN:SUPPLIER:ROLE:CREATE'] && [
          {
            type: 'text',
            text: '新建角色',
            method: this.clickToCreate,
            weblogs: 'common-account-createRole'
          }
        ],
        searchParams: [
          [
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
          { name: '角色名称', property: 'roleName'},
          { name: '角色类型', property: 'roleType', tdSlotName: 'roleType' },
          // { name: '角色组', property: 'roleCategory', formatter: (v) => roleCategoryMap[v] || '-' },
          // { name: '禁用状态', property: 'roleStatus', formatter: (v) => roleStatusMap[v] || '-' },
          { name: '备注', property: 'remark', formatter: (v) => v || '- -'},
          { name: '操作', property: 'operate', tdSlotName: 'operate', width: 150 },
        ],
        getTableList: {
          type: 'component',
          fn: getRoleList
        }
      }
    },
    ...mapState(['permissions'])
  },
  methods: {
    clickToCreate() {
      this.$router.push({ name: 'roleManageEdit', query: { type: 'create' } })
    },
    clickToDetail(row, type) {
      const name = type === 'edit' ? 'roleManageEdit' : 'roleManageDetail'
      const query = {
        roleCode: row.roleCode,
        type
      }
      this.$router.push({ name, query })
    },
  },
  mounted() {}
}
</script>

<style lang="stylus" scoped>

</style>
