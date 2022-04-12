<template lang="pug">
.base-company-base(v-loading='loading')
  template(v-if='result')
    .base-inline
      .base-logo
        img(:src='`${$assetsBaseUrl}/customerGuard/company-icon.png`')
      .base-inline.base-item-list
        .base-item(v-for='item in baseColumns')
          .base-item-label {{item.label}}：
            template(v-if='item.render') {{item.render(result.tycCompanyBaseBO[item.key])}}
            template(v-else) {{result.tycCompanyBaseBO[item.key] || '-'}}
    .base-title 公司简介
    .base-content {{result.briefIntroduction}}
  .u-empty-tips(v-else) 暂无数据
</template>

<script>
import { baseColumns } from './config'
import { inject } from '@vue/composition-api'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    },
  },
  setup(props) {
    const { loading, result } = inject('scanningInfo')
    return {
      baseColumns,
      result,
      loading
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-inline
  display flex
  flex-wrap wrap
  .base-logo
    width 64px
    border-radius 4px
    margin-right 5%
    overflow hidden
    img
      width 64px
  .base-item-list
    width 85%
    .base-item
      width 33.3%
      color #2D2926
      font-size 14px
      line-height 32px
.base-title
  color #494949
  margin-top 24px
  font-size 14px
  margin-bottom 10px
.base-title:before
  content ''
  border-left 3px solid #3B68F0
  margin-right 6px
.base-content
  color #2D2926
  font-size 14px
  line-height 24px
  padding-bottom 22px
  border-bottom 1px dashed #F0F0F0
</style>
