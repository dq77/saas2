<template lang="pug">
  el-tree(
    ref='permisstionTree'
    show-checkbox
    :default-expand-all='defaultExpandAll'
    :check-on-click-node='true'
    :expand-on-click-node='false'
    :data='treeData'
    :props="{ label: 'permissionName', children: 'subPermissions', disabled: 'disabled' }"
    node-key='permissionCode'
    @check='treeCheckChange'
  )
</template>

<script>
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      treeData: [],
      defaultChecked: []
    }
  },
  props: {
    defaultCheckedKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      value: false
    },
    defaultExpandAll: {
      type: Boolean,
      value: true
    }
  },
  watch: {
    defaultCheckedKeys(val) {
      if (!val) {
        this.defaultChecked = []
      } else {
        this.setDefaultChecked()
      }
    },
    disabled(val) {
      if (val) {
        const treeData = this.treeData
        this.disableTree(treeData)
        this.treeData = treeData
      }
    }
  },
  methods: {
    treeCheckChange(currentData, allData) {
      const setArr = [...new Set(allData.checkedKeys), ...new Set(allData.halfCheckedKeys)]
      this.$emit('check', setArr)
    },
    disableTree(arr) {
      arr.forEach(item => {
        item.disabled = true
        if (item.subPermissions && item.subPermissions.length > 0) {
          this.disableTree(item.subPermissions)
        }
      })
    },
    // 获取默认的选中
    filterDefaultChecked(arr, checkedArr) {
      const defaultChecked = checkedArr || []
      const defaultCheckedKeys = this.defaultCheckedKeys
      arr.forEach(item => {
        if (item.subPermissions && item.subPermissions.length > 0) {
          // 判断子权限是否全部勾选，全部勾选则父权限加入默认勾选
          const res = item.subPermissions.every(item2 => {
            return defaultCheckedKeys.indexOf(item2.permissionCode) > -1
          })
          if (res) defaultChecked.push(item.permissionCode)
        } else if (defaultCheckedKeys.indexOf(item.permissionCode) > -1) {
          defaultChecked.push(item.permissionCode)
        }
        if (item.subPermissions && item.subPermissions.length > 0) {
          this.filterDefaultChecked(item.subPermissions, defaultChecked)
        }
      })
      return [...new Set(defaultChecked)]
    },
    // 设置选中点
    setDefaultChecked() {
      const defaultChecked = this.filterDefaultChecked(this.treeData).map(item => {
        return { permissionCode: item }
      })
      this.$refs.permisstionTree.setCheckedNodes(defaultChecked)
    },
    async getAllPermissionListTree() {
      const res = await ajaxStore.account.getAllPermissionListTree()
      if (res.data && res.data.code === '0') {
        const treeData = res.data.data

        this.treeData = treeData

        this.$nextTick(() => {
          if (this.disabled) this.disableTree(this.treeData)
          if (this.defaultCheckedKeys && this.defaultCheckedKeys.length > 0) this.setDefaultChecked()
        })
      }
    },
  },
  mounted() {
    this.getAllPermissionListTree()
  }
}
</script>
<style lang="stylus" scoped>
.width-100
  width 100%
</style>
