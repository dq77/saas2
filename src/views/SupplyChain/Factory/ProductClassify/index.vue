<template lang='pug'>
.page-main
  .product-classify
    PromptInfo(:title='title')
    .pc-operate
      el-button(type="primary" @click="addFirst") 添加一级类目
    .pc-classify(v-loading='loading')
      List(:list='classify1.list' level=1 :current='classify1.current' :parent='classify1.parent' @clickRefreshList='clickRefreshList')
      List(:list='classify2.list' level=2 :current='classify2.current' :parent='classify2.parent' @clickRefreshList='clickRefreshList')
      List(:list='classify3.list' level=3 :current='classify3.current' :parent='classify3.parent' @clickRefreshList='clickRefreshList')
      List(:list='classify4.list' level=4 :current='classify4.current' :parent='classify4.parent' @clickRefreshList='clickRefreshList')
      List(:list='classify5.list' level=5 :current='classify5.current' :parent='classify5.parent' @clickRefreshList='clickRefreshList')
  //- 添加 || 编辑 类目
  modalEdit(
    title='添加'
    :isAdd="true"
    :visible="editState.visible"
    @cancleHandle="editState.cancleHandle"
    @successHandle="editState.successHandle"
  )
</template>

<script>
import PromptInfo from '../Components/PromptInfo'
import List from './list'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
import modalEdit from './modalEdit/index'
import useModalEdit from './modalEdit/useModalEdit'

export default {
  components: {
    PromptInfo,
    List,
    modalEdit
  },
  setup() {
    /** --- state start --- */
    const editState = useModalEdit({
      cb: () => {
        clickRefreshList({ isInit: true })
      },
    })
    const state = reactive({
      title: '您可以在产品分类菜单中，对您产品的分类信息进行配置，目前系统中最高支持配置五级分类。',
      classify1: { list: [], current: {}, parent: {} },
      classify2: { list: [], current: {}, parent: {} },
      classify3: { list: [], current: {}, parent: {} },
      classify4: { list: [], current: {}, parent: {} },
      classify5: { list: [], current: {}, parent: {} },
      editState,
    })
    /** --- apis start --- */
    const { getAllCategory } = ajaxStore.factory
    /** --- methods start --- */
    const addFirst = () => {
      editState.setVisible(true)
    }
    // 处理基础数据
    const getRefreshList = (params) => {
      doResult(params)
    }
    const getCurrentInfo = (list, id) => {
      if (list.length === 0) return {}
      let currentItem = list[0]
      id && list.some(item => {
        if (id === item.id) {
          currentItem = item
          return true
        }
      })
      return currentItem
    }
    const initClassifyList = ({ level = 1, list = [], choseItem = {}, parent = {} }) => {
      // 如果不是手动点击选取的当前点，则取历史记录里的当前点，和getCurrentInfo一起执行，获取最终当前节点
      if (!choseItem.id) choseItem = state[`classify${level}`].current ?? {}
      const currentItem = getCurrentInfo(list, choseItem.id)
      state[`classify${level}`] = {
        list,
        current: currentItem,
        parent,
      }
      if (currentItem && currentItem.subCategorys && level < 5) {
        initClassifyList({ list: currentItem.subCategorys, level: level + 1, parent: currentItem })
      } else {
        let num = level + 1
        while (num < 6) {
          state[`classify${num}`] = {
            list: [],
            current: {},
            parent: {},
          }
          ++num
        }
      }
    }
    // 点击后更新列表
    const clickRefreshList = ({ choseItem, level, isInit }) => {
      if (isInit) return getRefreshList()
      level = Number(level)
      state[`classify${level}`].current = choseItem
      if (level < 5) {
        initClassifyList({ level: level + 1, list: choseItem.subCategorys ?? [], parent: choseItem })
      }
    }
    /** --- ajax start --- */
    const { loading, doResult } = useAsync({
      init: true,
      isLoading: true,
      request: getAllCategory,
      successCallBack: ({ data }) => {
        initClassifyList({ level: 1, list: data ?? [] })
      }
    })
    /** --- ajax end --- */
    return {
      loading,
      ...toRefs(state),
      addFirst,
      initClassifyList,
      clickRefreshList,
    }
  }
}
</script>
<style lang='stylus' scoped>
.product-classify
  padding 20px
  min-height 700px
  background #fff
  border-radius 4px
.pc-operate
  margin-bottom 20px
.pc-classify
  display flex
</style>
