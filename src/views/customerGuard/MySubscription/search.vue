<template lang="pug">
el-select.subscription-search(
  v-model="value"
  filterable
  remote
  clearable
  reserve-keyword
  placeholder="请输入报告名称"
  :remote-method="remoteMethod"
  :loading="loading"
  @change='changeComapnyName'
)
  el-option(
    v-for="item in options"
    :key="item.id"
    :label="`${item.companyName}-${item.applyTime}`"
    :value="item.id"
  )
</template>

<script>
import { toRefs, reactive } from '@vue/composition-api'
import useDebounce from 'hooks/useDebounce'

export default {
  props: ['loading', 'options'],
  emits: ['changeCompany', 'doResult'],
  setup(props, {emit}) {
    /** state start */
    const state = reactive({
      value: [],
    })
    /** api start */
    const { run } = useDebounce()
    /** methods start */
    const changeComapnyName = (value) => {
      console.log(props.options)
      const list = props.options.filter(item => {
        return item.id === value
      })
      emit('changeCompany', list[0])
    }
    const remoteMethod = (query, cb) => {
      if (query !== '') {
        run(() => emit('doResult', query), 500)
      }
    }
    return {
      ...toRefs(state),
      remoteMethod,
      changeComapnyName
    }
  }
}
</script>

<style lang="stylus" scoped>
.subscription-search
  width 330px
  height 32px
// /deep/ .el-input__icon:before
//   content: "\e82a"
</style>
