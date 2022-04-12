<template lang="pug">
  el-select.width-100(
    filterable
    remote
    placeholder='请输入公司名'
    :loading='loadingSearch'
    :remote-method='getCompanyInfoByQcc'
    :disabled='disabled'
    v-model='value'
    @change='changeSelect'
  )
    el-option(
      v-for='option in options'
      :key='option.Name'
      :label='option.Name'
      :value='option.Name'
    )
</template>

<script>
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      loadingSearch: false,
      options: [],
      value: ''
    }
  },
  props: {
    companyName: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    companyName(newValue) {
      this.value = newValue
    },
  },
  methods: {
    changeSelect(value) {
      const companyItem = this.options.filter(item => item.Name === value)[0] || ''
      this.$emit('change', companyItem)
    },
    async getCompanyInfoByQcc(name) {
      this.loadingSearch = true
      const res = await ajaxStore.common.getCompanyInfoByQcc({ name })
      this.loadingSearch = false
      if (res.data && res.data.code === '0') {
        this.options = res.data.data?.list || []
      }
    },
  },
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.width-100
  width 100%
</style>
