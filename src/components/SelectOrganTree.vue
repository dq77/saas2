<template lang="pug">
  el-cascader.width-100(
    ref='organTree'
    :options='options'
    :props="{ checkStrictly: true, label: 'departmentName', value: 'id', children: 'childrens', multiple: multiple }"
    clearable
    placeholder='请选择组织'
    :disabled='disabled'
    v-model='value'
    @change='handleChange'
  )
</template>

<script>
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      options: [],
      value: []
    }
  },
  props: {
    initId: {
      value: '',
    },
    orgOptions: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataFrom: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    multiple: Boolean
  },
  watch: {
    initId(val) {
      if (!val) {
        this.value = []
      } else {
        const options = this.options
        // this.value = this.fixValue({ val, arr: options, index: 0 })
        this.value = this.deepEach(val, options, 0)
      }
    },
    orgOptions: {
      deep: true,
      immediate: true,
      handler(val) {
        this.options = this.removeEmptyChild(val)
        this.value = this.fixValue({ val: this.initId, arr: this.options, index: 0 })
      }
    },
  },
  methods: {
    deepEach(values, arr, index) {
      const data = values.split(',')
      return data.map(val => this.fixValue({ val, arr, index }))
    },
    fixValue({ val, arr, list, index }) {
      // val 命中值，arr 查询数组， list 排序结果数组， index 递归次数
      const valueList = list || []
      for (let i = 0; i < arr.length; i++) {
        valueList.splice(index)
        valueList[index] = arr[i].id
        if (arr[i].id === String(val)) {
          return valueList
          // this.value = valueList
        } else if (arr[i].childrens && arr[i].childrens.length > 0) {
          const nextIndex = index + 1
          const returnList = this.fixValue({ val, arr: arr[i].childrens, list: valueList, index: nextIndex })
          if (returnList && returnList.length > 0) return returnList
        }
      }
      return []
    },
    handleChange(value) {
      const node = this.$refs.organTree.getCheckedNodes()
      const currentNodeData = node && node.length > 0 && node[node.length - 1].data
      this.$emit('change', { value, currentNodeData })
    },
    async getOptions() {
      const res = await ajaxStore.common.account.getOrganTree()
      if (res.data && res.data.code === '0') {
        this.options = this.removeEmptyChild(res.data.data)
        // 获取到数据后再次给下拉框赋值
        this.value = this.fixValue({ val: this.initId, arr: this.options, index: 0 })
      }
    },
    // 去除空的childrens
    removeEmptyChild(data) {
      data && data.forEach(el => {
        if (el.childrens && el.childrens.length === 0) {
          delete el.childrens
        } else {
          this.removeEmptyChild(el.childrens)
        }
      })
      return data
    },
  },
  mounted() {
    // 如果数据来源是父级则不调接口
    if (this.dataFrom === 'father') return

    this.getOptions()
  }
}
</script>
<style lang="stylus" scoped>
.width-100
  width 100%
</style>
