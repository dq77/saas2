<template lang="pug">
  div
    el-checkbox(label='全选' v-model='checkAll' v-if="tableFlag!=='1'" @change="handleSelectAll" )
    el-table(:data='tableData' border v-loading="loading")
      el-table-column(prop='menuName' label='菜单名称' v-if="tableFlag==='1'")
        template(slot-scope='{row}')
          span {{row.menuList[0]}}
      el-table-column(prop='firstMenuName' label='一级菜单名称' v-if="tableFlag!=='1'")
        template(slot-scope='{row}')
          span {{row.menuList[0]}}
      el-table-column(prop='secondMenuName' label='二级菜单名称' v-if="tableFlag!=='1'")
        template(slot-scope='{row}')
          span {{row.menuList[1] || '---'}}
      el-table-column(prop='thridMenuName' label='三级菜单名称' v-if="tableFlag!=='1'")
        template(slot-scope='{row}')
          span {{row.menuList[2] || '---'}}
      el-table-column(prop='permissionName' label='菜单权限')
        template(slot-scope='{row}')
          el-checkbox(:label='row.permissionName' v-model="row.checkedFlag" :disabled="isView")
      el-table-column(label='操作项权限')
        template(slot-scope='{row}')
          template(v-if='row.subPermissions && row.subPermissions.length')
            .p-song-item(v-for='item in row.subPermissions' :key='item.id')
              el-checkbox(
                :label='item.permissionName'
                v-model="item.checkedFlag"
                :disabled="isView"
              )
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableFlag: {
      type: String,
      default: ''
    },
    isView: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      checkAll: false
    }
  },
  methods: {
    handleSelectAll(isAll) {
      this.$emit('chooseAll', isAll, this.tableFlag)
    }
  },
}
</script>
