<!-->
  author: liqi
  desc: 当前公司的子公司的筛选，增加了“全部”筛选项，此项包含所有子公司及自己。
  dep: 依赖vuex中的sonTenants和userInfo.corporationId
<-->
<template lang="pug">
  el-select(
    filterable
    clearable
    :placeholder='placeholder'
    v-model='value'
    @change='changeSelect'
  )
    el-option(
      v-for='option in sonTenants'
      :key='option.tenantId'
      :label='option.name'
      :value='option.tenantId'
    )
</template>

<script>
export default {
  model: {
    prop: 'selectedTenants',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      default: '切换子公司'
    },
    defaultTenants: {
      type: String,
      defalut: ''
    }
  },
  data() {
    return {
      options: [],
      value: ''
    }
  },
  computed: {
    sonTenants() {
      const list = this.$store.state.sonTenants
      return list && list.length > 0 ? [{name: '全部', tenantId: 'ALL'}].concat(list) : []
    }
  },
  methods: {
    changeSelect(tenantId) {
      let selectedIds = null
      if (tenantId === 'ALL') {
        selectedIds = this.$store.state.sonTenants.map(item => item.tenantId)
        selectedIds.push(this.$store.state.userInfo.corporationId)
      } else {
        selectedIds = [tenantId]
      }
      this.$emit('change', selectedIds)
    },
  },
  watch: {
    selectedTenants(newValue) {
      this.value = newValue
    },
  },
}
</script>
