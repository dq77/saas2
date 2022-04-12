<template lang="pug">
el-table(:data="dataSource" v-loading="loading")
  el-table-column(prop="code", label="销售组织编号")
  el-table-column(prop="name", label="销售组织名称")
  el-table-column(label="操作")
    template(slot-scope="scope")
      el-button(@click="changeHandle(scope.row)", type="text") 修改
      el-button(@click="deleteHandle(scope.row)", type="text") 删除
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      moment: moment
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
  methods: {
    changeHandle(row) {
      this.$emit('changeHandle', row, 'change')
    },
    deleteHandle(row) {
      this.$emit('deleteHandle', row, 'delete')
    }
  },
}
</script>
