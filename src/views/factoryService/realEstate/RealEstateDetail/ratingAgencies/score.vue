<template lang="pug">
.rating-header
  .rating-header_title
    span.rating-header_title-text 综合评分：
      template(v-if='dataSource') {{dataSource.scoreSummary.grade}}-{{dataSource.comprehensiveScore}}
    // span.rating-header_title-icon(v-if='dataSource' :style='{background: setColor(dataSource.scoreSummary.scoreText)}') {{dataSource.scoreSummary.scoreText}}
    .rating-header_more(@click='checkMore')
      i.el-icon-info
      span 查看等级说明及定义
  .rating-header_summary
    template(v-if='dataSource') {{dataSource.scoreSummary.tips}}，
    span.rating-header_summary-result(v-if='dataSource') {{dataSource.scoreSummary.result}}
</template>

<script>
import { scoreColor } from '../config'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root }) {
    const setColor = (result) => {
      return scoreColor[result]
    }

    const checkMore = () => {
      root.$router.push({
        name: 'scoreExplain'
      })
    }

    return {
      setColor,
      checkMore
    }
  }
}
</script>

<style lang="stylus" scoped>
.rating-header
  padding-bottom 12px
  border-bottom 1px solid #EAEBEE
  &_title
    font-size 18px
    color #4D6FB5
    margin-bottom 5px
    font-weight bold
    display flex
    align-items center
    justify-content space-between
    &-icon
      color #ffffff
      background #25BECD
      font-size 12px
      padding 2px 3px
      border-radius 2px
      margin-left 10px
      line-height 16px
  &_more
    color #738A9E
    font-size 12px
    font-weight normal
    cursor pointer
    &:hover
      color #3c5da4
  &_summary
    color #A9AFB8
    font-size 12px
    height 18px
    &-result
      color #3C5DA4
</style>
