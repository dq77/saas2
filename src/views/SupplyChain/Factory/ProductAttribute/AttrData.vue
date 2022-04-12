<!--  -->
<template lang="pug">
.attr-data(v-loading="loading || searchLoading" )
  ul(v-if="attrList && attrList.length")
    li.attr-data--li(v-for="(item,i) in attrList" :key="item.id" @click="handleSearchItem(item,i)")
      .attr-data__item(:class='[{"attr-data--cur" : (!noSelected && currentIdx === i)}, {"attr-data__item--default" : noSelected}]')
        .attr-data__item-label {{item.name}}
        .attr-data__item-operate
          el-button(type='text' @click="() => handleEdit(item)" weblogs-anchor='supplyChain-factory-product-attribute-edit') 编辑
          el-button(type='text' @click="handleDel(item)" weblogs-anchor='supplyChain-factory-product-attribute-delete') 删除
  .empty(v-else) {{emptyText}}
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    attrList: {
      type: Array,
      default: () => ([])
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    loading: {
      type: Boolean,
      default: false
    },
    searchLoading: {
      type: Boolean,
      default: false
    },
    noSelected: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const handleDel = item => emit('handleDel', item)
    const handleEdit = item => emit('handleEdit', item)
    const currentIdx = ref(0)

    const handleSearchItem = (item, index) => {
      currentIdx.value = index
      console.log('-------', currentIdx)
      emit('handleSearchItem', item)
    }

    return {
      handleDel,
      handleEdit,
      handleSearchItem,
      currentIdx
    }
  }
}

</script>
<style lang='stylus' scoped>
.attr-data
  height 100%
  padding 20px
  box-sizing border-box
  overflow-y auto
  &--li
    padding 5px 0
    border-bottom 1px solid #F2F2F6
  &--cur
    background rgba(59, 104, 240, 0.1)
  &__item
    display flex
    align-items center
    justify-content space-between
    height 40px
    padding 10px
    cursor pointer
    border-radius 4px
    &:hover
      background rgba(59, 104, 240, 0.1)
    &--default
      cursor default
      &:hover
        background #fff
    &-label
      color #494949
    &-operate
      display flex
      align-items center
.empty
  height 400px
  display flex
  align-items center
  justify-content center
  color #848484
</style>
