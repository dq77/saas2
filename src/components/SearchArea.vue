<template lang="pug">
  el-cascader.p-select-item(:options="AreaData" ref='cascader' v-model="value" placeholder='请选择省市区' :props='{value: "code", label: "name"}' @change='changeValue')
</template>

<script>
export default {
  props: {
    provinceName: String,
    cityName: String,
    areaName: String,
    initValue: Array
  },
  data() {
    return {
      AreaData: [],
      value: []
    }
  },
  methods: {
    changeValue() {
      this.$emit('change', this.value)
    },
    async getAreaData() {
      const AreaData = await this.$store.dispatch('getAreaData')
      this.AreaData = AreaData
    },
  },
  async mounted() {
    this.getAreaData()
    this.value = this.initValue
  },
  watch: {
    initValue(val) {
      this.value = val
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
