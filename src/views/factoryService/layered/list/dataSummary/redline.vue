<template lang="pug">
.p-redline
  .p-title 红线触发次数
    el-popover(
      placement="bottom"
      title="每项风险红线被触发的公司数量"
      width="420"
      trigger="hover"
    )
      .p-tips
        p
          .p-label 1.企业-失信被执行：
            span.p-value 当前企业、法定代表人、自然人股东、企业股东及其法定代表人成为失信被执行人；
        p
          .p-label 2.企业-限制高消费：
            span.p-value 当前企业、法定代表人、自然人股东、企业股东及其法定代表人被限制高消费；
        p
          .p-label 3.企业-被执行人：
            span.p-value 企业当前有被执行；
        p
          .p-label 4.企业-税务违法：
            span.p-value 企业有税务违法或税务黑名单中；
        p
          .p-label 5.企业-三年内因借贷纠纷成为被告：
            span.p-value 三年内因金融借贷纠纷及民间借贷纠纷成为被告；
        p
          .p-label 6.个人-失信被执行：
            span.p-value 当前企业的实际控制人成为失信被执行；
        p
          .p-label 7.个人-限制高消费：
            span.p-value 当前企业的实际控制人被限制高消费；
        p
          .p-label 8.个人-被执行人：
            span.p-value 当前企业的实际控制人成为被执行人。
      i.el-icon-info(slot="reference")
  #redline(v-if='dataSource.length')
  .u-empty-tips(v-else) 暂无数据,请点击下方导入经销商按钮
</template>

<script>
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { barOption } from './config'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { perTimeout } = useTimeout()
    const {
      chartInit,
      setDataSource,
      setOption,
      chartClear
    } = useCharts({
      option: barOption,
      id: 'redline',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const dataSource = data.map((item) => {
        return item.count
      })
      setDataSource(dataSource)
    }

    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          setOption()
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )

    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-title
  color #494949
  font-size 14px
  z-index 1
  .p-tips
    font-size 12px
.p-label
  color #494949
  font-weight bold
.p-value
  font-weight normal
#redline
  width 95%
  height 270px
  z-index 0
.u-empty-tips
  margin 95px 0 145px 0
  text-align center
  color #CDD0D4
</style>
