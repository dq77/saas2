<template lang="pug">
  el-select(
    placeholder='请输入经销商名称'
    filterable
    clearable
    remote
    v-model='selfValue'
    :style='style'
    :remote-method='querySearch'
    :loading='loading'
    :default-first-option='true'
    @change='handleChange'
  )
    el-option(v-for='item in list' :key='item.id' :value='item.corpName')
</template>

<script>
export default {
  props: {
    companyName: {
      type: String
    },
    useNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      style: {
        width: '100%'
      },
      selfValue: '',
      loading: false,
      list: []
    }
  },
  methods: {
    querySearch(v) {
      if (v) {
        this.loading = true
        const url = this.useNew ? this.ajaxStore.common.getFuzzyCompanyNameNew : this.ajaxStore.common.getFuzzyCompanyName
        url({ dealerName: v }).then(({ data }) => {
          this.loading = false
          this.list = data.data || []
        })
      } else {
        this.list = []
      }
    },
    handleChange(companyName) {
      let companyId = ''
      if (companyName) {
        const companys = this.list.filter(item => item.corpName === companyName)
        companyId = companys.length > 0 ? companys[0].id : ''
      } else {
        companyName = ''
        companyId = ''
      }
      this.$emit('change', { companyName, companyId })
    },
  },
  mounted() {
    this.selfValue = this.companyName
  },
  watch: {
    companyName(newValue) {
      this.selfValue = newValue
      if (!newValue) {
        this.list = []
      }
    },
  }
}
</script>
