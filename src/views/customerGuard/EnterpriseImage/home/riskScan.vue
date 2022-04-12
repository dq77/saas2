<template lang="pug">
.home-risk-main
  .home-title
    span 风险扫描
    i.risk-type 风险等级：{{riskLevel}}
  .risk-main
    .risk-content
      .risk-title 自身风险
        // el-popover(
        //   placement='top-start'
        //   content='模型更新后，原来的等级无法进行展示，请重新跑模型以获取新的模型结果。'
        //   trigger='hover'
        // )
        //   i.el-icon-warning.u-warning-icon(slot='reference')
      el-scrollbar.risk-detail
        .risk-item
          i.risk-icon.iconfont.iconzhongda
          .risk-name 重大风险（{{selfRiskList.high.length}}）
          .risk-label
            template(v-if='selfRiskList.high.length')
              .risk-label-item(v-for='item in selfRiskList.high') {{item}}
            .risk-empty(v-else) 暂未发现风险！
        .risk-item
          i.risk-icon.iconfont.iconjingshi
          .risk-name 警示风险（{{selfRiskList.low.length}}）
          .risk-label
            template(v-if='selfRiskList.low.length')
              .risk-label-item(v-for='item in selfRiskList.low') {{item}}
            .risk-empty(v-else) 暂未发现风险！
        .risk-item
          i.risk-icon.iconfont.icontishi1
          .risk-name 提示风险（{{selfRiskList.warning.length}}）
          .risk-label
            template(v-if='selfRiskList.warning.length')
              .risk-label-item(v-for='item in selfRiskList.warning') {{item}}
            .risk-empty(v-else) 暂未发现风险！
    .risk-content
      .risk-title 周边风险
        // el-popover(
        //   placement='top-start'
        //   content='模型更新后，原来的等级无法进行展示，请重新跑模型以获取新的模型结果。'
        //   trigger='hover'
        // )
        //   i.el-icon-warning.u-warning-icon(slot='reference')
      el-scrollbar.risk-detail
        .risk-item
          i.risk-icon.iconfont.iconzhongda
          .risk-name 重大风险（{{aroundRiskList.high.length}}）
          .risk-label
            template(v-if='aroundRiskList.high.length')
              .risk-label-item(v-for='item in aroundRiskList.high') {{item}}
            .risk-empty(v-else) 暂未发现风险！
        .risk-item
          i.risk-icon.iconfont.iconjingshi
          .risk-name 警示风险（{{aroundRiskList.low.length}}）
          .risk-label
            template(v-if='aroundRiskList.low.length')
              .risk-label-item(v-for='item in aroundRiskList.low') {{item}}
            .risk-empty(v-else) 暂未发现风险！
        .risk-item
          i.risk-icon.iconfont.icontishi1
          .risk-name 提示风险（{{aroundRiskList.warning.length}}）
          .risk-label
            template(v-if='aroundRiskList.warning.length')
              .risk-label-item(v-for='item in aroundRiskList.warning') {{item}}
            .risk-empty(v-else) 暂未发现风险！
</template>

<script>
import { inject, reactive, toRefs, watch } from '@vue/composition-api'
export default {
  setup(props) {
    const state = reactive({
      riskLevel: '',
      riskList: [],
      selfRiskList: {
        high: [],
        low: [],
        warning: []
      },
      aroundRiskList: {
        high: [],
        low: [],
        warning: []
      }
    })
    const { loading, result } = inject('scanningInfo')

    watch(
      () => result.value,
      (value) => {
        const { riskLevel, riskList } = value.tycRiskInfoBO
        state.riskLevel = riskLevel
        for (let i = 0; i < riskList.length; i++) {
          const { name, list } = riskList[i]
          if (name === '自身风险') {
            for (let j = 0; j < list.length; j++) {
              const { tag, title } = list[j]
              if (tag === '高风险') {
                state.selfRiskList.high.push(title)
              } else if (tag === '警示') {
                state.selfRiskList.low.push(title)
              } else if (tag === '提示信息') {
                state.selfRiskList.warning.push(title)
              }
            }
          } else if (name === '周边风险') {
            for (let j = 0; j < list.length; j++) {
              const { tag, title } = list[j]
              if (tag === '高风险') {
                state.aroundRiskList.high.push(title)
              } else if (tag === '警示') {
                state.aroundRiskList.low.push(title)
              } else if (tag === '提示信息') {
                state.aroundRiskList.warning.push(title)
              }
            }
          }
        }
      }
    )

    return {
      loading,
      result,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.home-risk-main
  margin-bottom 45px
.home-title
  display flex
  justify-content flex-start
.risk-type
  color #FF6666
  padding 2px 5px
  background #FFEFEF
  font-style normal
  margin 0 0 0 10px
  font-size 12px
.risk-main
  display flex
.risk-content:last-child
  margin-right 0
.risk-content
  border 1px solid #F2F2F6
  width 50%
  margin-right 35px
  .risk-title:before
    content ''
    border-left 3px solid #3B68F0
    margin-right 10px
  .risk-title
    background #F5FAFF
    border-bottom 1px solid #F2F2F6
    line-height 50px
    font-size 14px
    color #494949
    padding 0 20px
  .risk-detail
    padding 20px 20px 20px 15px
    // height 210px
    // overflow hidden
  .risk-item
    display flex
    margin-bottom 10px
    line-height 24px
    .risk-icon
      font-size 16px
      margin-right 8px
      margin-left 5px
    .risk-icon.iconzhongda
      color #FF6666
    .risk-icon.iconjingshi
      color #FF6666
    .risk-icon.icontishi1
      color #25BECD
    .risk-name
      color #2D2926
      font-size 14px
      margin-right 10px
      min-width 100px
    .risk-label
      display flex
      flex-wrap wrap
      line-height 20px
      .risk-empty
        color #A9AFB8
        margin-left 10px
      .risk-label-item
        color #FF6666
        padding 2px 5px
        background #FFEFEF
        font-style normal
        margin 0 0 10px 10px
        font-size 12px
        border 1px solid #FF6666
        border-radius 2px

</style>
