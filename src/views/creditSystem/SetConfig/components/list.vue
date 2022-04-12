<template lang="pug">
.p-list
  .p-head
    .p-item(
      v-for="item in columns"
      :key="item.key"
      :class="[item.align ? `p-item-${item.align}` : '']"
    ) {{ item.label }}
  el-scrollbar
    .p-line(
      v-for='(data, index) in dataSource'
      :key='index'
    )
      .p-item(
        v-for='child in columns'
        :key="child.key"
        :class="[child.align ? `p-item-${child.align}` : '']"
      )
        slot(
          :name="child.key"
          :row="data"
          v-if="slots[child.key]"
        )
        fragment(v-else) {{ child.render ? child.render(data, data[child.key]) : data && data[child.key] ? data[child.key] : '- -' }}
  //- 纯业务按钮-后续自行拓展
  .p-line
    .p-item
      el-button.p-add(id="credit_money_edit" size='medium', @click="addHandle") +添加
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { emit, slots }) {
    const addHandle = () => emit('addHandle')

    return {
      slots,
      addHandle
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-list
  margin-top 28px
  background #fff
  .p-head
    height 50px
    background #f2f2f6
    display flex
    color #494949
    line-height 50px
  .p-line
    height 47px
    display flex
    border 1px solid #F2F2F6
    border-top none
    line-height 47px
  .p-item
    flex 1
    padding 0 20px
  .p-add
    height 30px
    color #4A71F0
    font-size 12px
    border-color #4A71F0
    padding 8px 20px
  .p-item-right
    text-align right
  >>>.el-scrollbar
    .el-scrollbar__wrap
      max-height: 400px;
</style>
