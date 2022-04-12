<template lang="pug">
  el-cascader.width-100(
    clearable
    :placeholder='placeholder'
    :options='options'
    :props='{label: "name", value: "name", children: "citys", checkStrictly: true}'
    v-model='value'
    @change='changeValue'
  )
</template>

<script>
export default {
  props: {
    placeholder: String,
    provinceName: String,
    cityName: String,
  },
  data() {
    return {
      options: [],
      value: []
    }
  },
  methods: {
    changeValue() {
      this.$emit('change', this.value)
    }
  },
  async mounted() {
    const options = await this.$store.dispatch('getProvinceCityArea')
    this.options = Object.freeze(options)
    if (this.provinceName) this.value[0] = this.provinceName
    if (this.cityName) this.value[1] = this.cityName
  },
  watch: {
    provinceName(newVal) {
      if (this.value[1]) {
        this.value = [newVal, this.value[1]]
      } else {
        this.value = [newVal]
      }
    },
    cityName(newVal) {
      this.value = [this.value[0], newVal]
    }
  }
}
</script>
