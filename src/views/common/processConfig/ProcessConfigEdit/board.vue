<template lang="pug">
.p-board-main
  .element-begin 开始
  .element-new(@click='addNode(-1)' v-if='!isFixedFlow(businessCode)') +
  template(v-for='(item, index) in dataSource')
    .element-node(:key='index' :class='getClassName(item)' @click='showDialog(item, index)')
      .node-title {{item.nodeName}}
      .node-item(v-if='isFixedFlow(businessCode) && index === 0') 此节点审批人为动态配置
      .node-item(v-else-if='item.approverType === 3') 共有{{item.approver.length}}个审批角色
      .node-item(v-else) 共有{{item.approver.length}}个审批人
      .node-item 共有{{item.operationPass && item.operationNoPass ? 2 : (item.operationPass || item.operationNoPass ? 1 : 0)}}项操作
      .node-edit 点击编辑
      i.el-icon-warning.element-icon-error
    .element-new(v-if='index !== dataSource.length - 1' @click='addNode(index)') +
  .element-new(@click='addNode(dataSource.length - 1)') +
  .element-end 结束
</template>

<script>
import { watch } from '@vue/composition-api'
import { defaultNode } from './config'
import useFlow from '@/views/common/processConfig/hooks/useFlow'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([
        defaultNode
      ])
    },
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    const { businessCode } = root.$route.query

    const { isFixedFlow } = useFlow({businessCode})

    const getClassName = (item) => {
      const className = []
      if (item.active) {
        className.push('element-active')
      }
      if (item.hasError) {
        className.push('element-error')
      }
      return className.join(' ')
    }

    const showDialog = (item, index) => {
      if (!props.dataSource[index].active) {
        emit('hideNode')
        emit('showNode', { index })
        emit('showDialog', {formData: item, show: true, index})
      }
    }

    const addNode = (index) => {
      emit('addNode', { index })
    }

    watch(
      () => props.dialogShow,
      (value) => {
        if (!value) {
          emit('hideNode')
        }
      }
    )

    return {
      getClassName,
      addNode,
      showDialog,
      isFixedFlow,
      businessCode
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-board-main
  padding 30px 0
  position relative
  .iconfont
    margin-right 5px
.element-begin,
.element-end
  width 180px
  height 40px
  line-height 40px
  color #494949
  border-radius 20px
  border 1px solid #CBCBCD
  text-align center
  font-size 14px
  background #F2F2F6
  position relative
  font-weight bold
.element-begin
  margin-bottom 35px
.element-new
  width 30px
  height 30px
  line-height 26px
  text-align center
  color #3B68F0
  border 2px solid #3B68F0
  font-size 28px
  border-radius 50%
  margin 0 auto 35px auto
  position relative
  text-indent 1px
  cursor pointer
.element-node
  width 180px
  padding 10px 20px
  border-radius 4px
  border 1px solid #CBCBCD
  position relative
  margin-bottom 35px
  text-align center
  cursor pointer
  .node-title
    color #494949
    margin-bottom 10px
    font-weight bold
  .node-item
    margin-bottom 10px
  .node-edit
    color #848484
.element-begin:after,
.element-new:after,
.element-node:after
  content ""
  position absolute
  width 2px
  height 36px
  bottom -37px
  left 50%
  margin-left -1px
  background #3B68F0
.element-active
  background #EBEFFD
  border-color #3B68F0
  .node-edit
    color #3B68F0
.element-icon-error
  display none
  position absolute
  right -30px
  top 50%
  margin-top -3px
  font-size 16px
  color #FF002E
.element-error
  background #FFE7EB
  border-color #FF002E
  .element-icon-error
    display block
</style>
