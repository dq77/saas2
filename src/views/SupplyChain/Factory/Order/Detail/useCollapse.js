/**
 * 主页的手风琴组件的配置信息
 */
import { reactive, toRefs } from '@vue/composition-api'

export default function ({ routeName }) {
  const state = reactive({
    collapseList: [],
    activedCollapses: []
  })

  const collapseList = [
    { name: '0', title: '基础信息', isShow: false },
    { name: '1', title: '产品信息', isShow: false },
    { name: '2', title: '发货信息', isShow: false },
    { name: '3', title: '退货信息', isShow: false },
  ]

  let activedCollapses = []

  collapseList[0].isShow = true
  collapseList[1].isShow = true

  if (routeName === 'orderAudit') {
    collapseList[2].isShow = false
    collapseList[3].isShow = false
    activedCollapses = ['0', '1']
  } else {
    collapseList[2].isShow = true
    collapseList[3].isShow = true
    activedCollapses = ['0', '1', '2', '3']
  }

  state.collapseList = collapseList
  state.activedCollapses = activedCollapses

  return {
    ...toRefs(state)
  }
}
