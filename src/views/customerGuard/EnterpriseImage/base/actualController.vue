<template lang="pug">
.actual-controller-main
  .home-title 疑似实控人
  .actual-controller-title
    .title-left
      span 疑似实控人：
      span.actual-controller-name
        template(v-if='person && person.name') {{person.name}}
        template(v-else) 暂无数据
    .title-right
      i.el-icon-warning
      span 控制路径图
  .p-roll-box
    .u-roll-content
      ArrowImage(:dataSource='chainList' v-if='chainList.length')
      .u-empty-tips(v-else) 暂无数据
</template>

<script>
import ArrowImage from '../components/arrowImage'
import { reactive, toRefs, inject } from '@vue/composition-api'
export default {
  components: {
    ArrowImage
  },
  setup(props) {
    const state = reactive({
      person: {},
      chainList: []
    })

    const { result, loading } = inject('baseInfo')

    state.person = result.value?.tycActualControlBO?.actualControllerList[0]
    const pathMap = result.value?.tycActualControlBO?.pathMap
    // 链路联表
    const list = []
    // 关系按链路排序
    let nodeSort = []
    // 节点列表
    let nodeList = []
    let i = 0
    for (const index in pathMap) {
      const { relationships, nodes } = pathMap[index]
      list.push([{
        type: 'percent',
        value: ''
      }])
      // 根据结束节点等于下一个节点的开始节点，重新排序关系列表
      relationships.sort((a, b) => {
        return a.endNode === b.startNode ? -1 : 1
      })
      // 按排序好的关系列表依次放入nodeSort
      relationships.forEach((item, i) => {
        nodeSort.push(item.startNode)
        if (relationships.length === 1) {
          nodeSort.push(item.endNode)
        }
      })
      // 将nodeItem按nodeSort顺序依次放入
      nodeSort.forEach((item) => {
        nodes.forEach((nodeItem) => {
          if (item === nodeItem.id) {
            nodeList.push(nodeItem)
          }
        })
      })
      // 将nodeList按照组件数据结构依次放入
      nodeList.forEach((node, key) => {
        const { labels, properties } = node
        const { name } = properties
        list[i].push({
          type: labels[0].toLowerCase(),
          value: name,
        })
        if (key !== nodeList.length - 1) {
          list[i].push({
            type: 'percent',
            value: '',
          })
        }
      })
      i++
      nodeSort = []
      nodeList = []
    }
    state.chainList = list
    console.log(JSON.stringify(list))
    return {
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.u-empty-tips
  text-align center
  width 100%
</style>
