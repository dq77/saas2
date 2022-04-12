<template lang="pug">
  el-select.width-100(
    filterable
    clearable
    v-model='value'
    @change='changeSelectRole'
  )
    el-option(
      v-for='option in options'
      :key='option.id'
      :label='option.memberName'
      :value='option.id'
    )
</template>

<script>
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      options: [],
      value: null
    }
  },
  props: {
    // 主管id
    supervisorId: {
      type: String,
      value: null
    },
    // 组织id
    departmentId: {
      type: String,
      value: null
    }
  },
  watch: {
    supervisorId(newValue) {
      this.value = newValue
    },
    departmentId(newValue) {
      this.getOptions()
    }
  },
  methods: {
    changeSelectRole(value) {
      this.$emit('change', value)
    },
    async getOptions() {
      const res = await ajaxStore.common.account.getMemberByDepartment({ departmentId: this.departmentId })
      if (res.data && res.data.code === '0') {
        this.options = res.data.data
        if (this.supervisorId) this.value = this.supervisorId
      }
    }
  },
  created() {
    this.getOptions()
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.width-100
  width 100%
</style>
