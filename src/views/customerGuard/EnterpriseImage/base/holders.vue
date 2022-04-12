<template lang="pug">
.module-main
  .home-title 股东
  Table.enterprise-detail-table(
    v-loading='loading'
    :dataSource="result.holders || []"
    :columns="holdersColumns"
    :index='true'
    :border='true'
  )
    template(slot='name' slot-scope='{row}')
      .p-table-img-wrap
        img.u-table-img(:src='row.logo' v-if='row.logo')
        .u-table-img-text(v-else) {{row.name.substr(-2)}}
        span {{row.name}}
</template>

<script>
import Table from '@/components/qjd/table'
import { inject } from '@vue/composition-api'
import { holdersColumns } from './config'
export default {
  components: {
    Table
  },
  setup(props) {
    const { loading, result } = inject('baseInfo')

    return {
      loading,
      result,
      holdersColumns
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.p-table-img-wrap
  display flex
  align-items center
  .u-table-img
    width 40px
    height 40px
    margin 0 10px
  .u-table-img-text
    width 40px
    height 40px
    margin 0 10px
    line-height 40px
    font-size 14px
    text-align: center
    color #fff
    background #7eb3da
    border-radius 4px
</style>
