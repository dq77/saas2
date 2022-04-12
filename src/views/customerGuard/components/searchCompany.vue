<template lang='pug'>
.p-search-company
  el-select.p-select(
    filterable
    :placeholder='placeholder'
    v-model='apis.value'
    @change='doChange'
    remote
    :remote-method='apis.remoteMethod'
  )
    el-option(
      v-for='option in apis.result'
      :key='option.name'
      :label='option.name'
      :value='option.value'
    )
  i.icon.iconfont.iconsousuo.p-icon-search
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入企业名称'
    },
    apis: Object
  },
  emits: ['change'],
  setup(props, { emit, root }) {
    // apis
    const doChange = (id) => {
      const current = props.apis.doCurrent(id)
      emit('change', current)
    }
    return {
      doChange
    }
  }
}
</script>
<style lang='stylus'>
.p-select-company
  .el-input__suffix
    right 35px
</style>

<style lang='stylus' scoped>
.p-search-company
  position relative
  display flex
  justify-content flex-end
.p-select
  width 320px
.p-icon-search
  font-size 30px
  position absolute
  height 100%
  right 5px
  top 0
  text-align center
  color #c0c4cc
  transition all .3s
  pointer-events none
</style>
