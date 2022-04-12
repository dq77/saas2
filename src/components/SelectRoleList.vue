<template lang="pug">
  el-select.width-100(
    multiple
    filterable
    v-model='value'
    @change='changeSelectRole'
    :disabled='disabled'
  )
    el-option(
      v-for='option in roleOptions'
      :key='option.roleCode'
      :label='option.roleName'
      :value='option.roleCode'
    )
</template>

<script>
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      roleOptions: [],
      value: []
    }
  },
  props: {
    initId: {
      type: Array,
      value: []
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  watch: {
    initId(newValue) {
      this.value = newValue
    },
  },
  methods: {
    changeSelectRole(value) {
      this.$emit('change', { value })
    },
    async getOptions() {
      const res = await ajaxStore.common.account.getAllRoleList()
      if (res.data && res.data.code === '0') {
        this.roleOptions = res.data.data.pagedRecords
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
