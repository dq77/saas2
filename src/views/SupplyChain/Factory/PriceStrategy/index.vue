<!--  -->
<template lang="pug">
.page-main
  .attr-box
    .attr-heard
      i(class="el-icon-warning-outline")
      ul
        li 价格策略配置功能，可以帮助厂家对不同的产品价格维度做灵活的配置。可针对不同的业务场景配置不同的价格策略。
        li 系统可以支持以单独或多种维度来决定产品最终价格，您可以根据具体的业务需求进行个性化价格策略的配置。
    h5 当前价格策略
    el-card(class='box-card')
      div(slot='header' class='clearfix')
        span 联合价格策略
        el-button(type='text' icon="el-icon-edit" class='button' @click="handleToPage") 编辑
      .card-content
        div 根据多个价格来源进行优先级排列，从优先级最高的价格开始依次取值，若最上级价格不存在，则取其下级的价格，以此类推。
        div
          h5 价格策略：
            span(style='color: #494949;font-weight: normal') {{priceStrategy}}
        h5 当前价格取值（优先级从上往下）
        .card-list-item(v-for='item in getPriceText()' :key='item.title')
          span {{item.title}}: {{item.value}}
    .save-time 上次保存时间：{{result?result.updatedTime:''}}
</template>

<script>
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { computed } from '@vue/composition-api'

export default {
  setup(props, {root}) {
    const priceEnum = {
      project: '项目价格',
      user: '客户价格',
      goods: '基础价格'
    }
    const {factory: {getPayCompute}} = ajaxStore
    const { result } = useAsync({
      request: getPayCompute,
      init: true,
    })

    const handleToPage = () => {
      if (result.value && result.value.id) {
        root.$router.push({name: 'StrategyConfig', query: {type: 'edit'}})
      } else {
        root.$router.push({name: 'StrategyConfig', query: {type: 'add'}})
      }
    }
    const priceStrategy = computed(() => {
      return result.value ? result.value.strategy.indexOf('|') > 0 ? '联合价格策略' : '独立价格策略' : ''
    })
    const getPriceText = () => {
      const priceArr = result.value ? result.value.strategy.split('|') : []
      const arr = []
      const numAToChina = {
        0: '一',
        1: '二',
        2: '三'
      }
      priceArr.map((item, index) => {
        arr.push({
          title: `${numAToChina[index]}级`,
          value: priceEnum[item]
        })
      })
      return arr
    }
    return {
      result,
      handleToPage,
      priceStrategy,
      getPriceText
    }
  }
}

</script>
<style lang='stylus' scoped>
.attr-box
  width 100%
  min-height 719px
  background #FFFFFF
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  border 1px solid #EAEBEE
  padding 20px
  .attr-heard
    display flex
    background-color rgba(77, 127, 213, .1)
    color #4D7FD5
    padding 10px 20px
    font-size 12px
    .el-icon-warning-outline
      font-size 18px
      margin-top 4px
      margin-right 15px
    li
      list-style inside
      line-height 26px
.box-card
  width 568px
  >>>.el-card__header
    background-color #4D7FD5
    color #fff
    font-size 14px
    .button
      float right
      color #fff
      margin-top -6px
  .card-list-item
    background #EDF2FA
    height 30px
    line-height 30px
    margin-bottom 10px
    padding: 0 10px
.save-time
  color #9AA6B8
  margin-top 20px
</style>
