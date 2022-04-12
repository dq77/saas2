<!--  -->
<template lang="pug">
.list-box
  .list-box__search
    el-input(
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
      v-model="attrValue"
      @input="handleInput"
    )
    el-button.list-box__search--btn(round icon="el-icon-plus" @click='handleEdit' weblogs-anchor='supplyChain-factory-product-attribute-create') 新增属性
  .list-box__main
    slot
</template>

<script>
import { ref } from '@vue/composition-api'
import useDebounce from 'hooks/useDebounce'
export default {
  setup(props, { emit }) {
    const attrValue = ref()
    const { run } = useDebounce()

    const handleInput = val => run(() => emit('handleSearch', val), 500)
    const handleEdit = () => emit('handleEdit')

    return {
      attrValue,
      handleInput,
      handleEdit
    }
  },

}

</script>
<style lang='stylus' scoped>
.list-box
  min-height 570px
  max-height 720px
  width 100%
  position relative
  box-sizing border-box
  display flex
  flex-direction column
  &__search
    display flex
    align-items center
    padding 20px
    border-bottom 1px solid #F2F2F6
    &--btn
      margin-left 20px
      width 90px
      padding 9px 0
      text-align center
      flex-shrink 0
      color #3B68F0
      border-color #3B68F0
  &__main
    flex-grow 1
    overflow hidden
    height 0

/deep/ .el-input--small .el-input__inner
  height 30px
  line-height 30px
</style>
