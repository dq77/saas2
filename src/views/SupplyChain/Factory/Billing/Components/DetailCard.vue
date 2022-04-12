<template lang="pug">
  Card(:title='detailInfo.cardTitle')
    template(slot='headRight' v-if='detailInfo.hasRightHead')
      el-button(type='text' icon='el-icon-edit' class='head-right'  @click='handleEdit') 编辑开票信息
    template(v-if='isTable')
      Table(:cloumns='detailInfo.list' :dataSource='dataSource')
    template(v-else)
      .card-wrap
        .card-wrap--item(v-for='(item, index) of detailInfo.list' :key='index')
          span.card-wrap--item_title {{item.label}}：
          span.card-wrap--item_content {{dataSource[item.key] ? item.render ? item.render(item.key, dataSource) : dataSource[item.key] : '--'}}
</template>

<script>
import Card from '@/components/Card'
import Table from '../../Components/Table/Table.vue'

export default {
  props: {
    detailInfo: {
      type: Object
    },
    dataSource: {
      type: [Object, Array],
      default () {
        return []
      }
    },
    isTable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  components: {
    Card,
    Table
  },
  methods: {
    handleEdit() {
      this.$emit('handleEdit')
    }
  }
}
</script>

<style lang="stylus" scoped>
.head-right
  margin-right 20px
.card-wrap
  display flex
  flex-wrap wrap
  &--item
    width 50%
    line-height 30px
    &_title
      width 120px
      text-align right
      font-weight 400
      display inline-block
    &_content
      font-weight 500
</style>
