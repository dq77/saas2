<template lang="pug">
el-table(:data="dataSource", v-loading="loading")
  el-table-column(prop="appName", label="应用名称")
  el-table-column(prop="createTime", label="创建时间")
  el-table-column(prop="status", label="状态")
    template(slot-scope="scope")
      span {{ scope.row.status === 1 ? '启用' : '禁用' }}
  el-table-column(label="操作")
    template(slot-scope="scope")
      el-button(@click="checkHandle(scope.row)", type="text") {{ scope.row.status === 1 ? '禁用' : '启用' }}
      el-button(@click="seeHandle(scope.row)", type="text") 查看
      el-button(@click="deleteHandle(scope.row)", type="text") 删除
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkHandle(row) {
      this.$emit('checkHandle', row)
    },
    seeHandle(row) {
      this.$emit('seeHandle', row)
    },
    deleteHandle(row) {
      this.$emit('deleteHandle', row)
    }
  }
}
</script>
