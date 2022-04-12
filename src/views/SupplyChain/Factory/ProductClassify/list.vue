<template lang='pug'>
.classify-list
  .classify-title {{ levelEnu[level] }}
  ul.classify-content(v-if='list && list.length')
    li.classify-item(
      :class='{"classify-item--current" : currentIndex === index}'
      v-for='(item, index) in list'
      :key='item.id'
      @click='clickCurrent(item, level)'
    )
      .classify-item__label {{ item.name }}
      .classify-item__operate
        i.el-icon-circle-plus-outline(v-if='level !== "5"' @click.stop='editCurrent(item, true)')
        el-tooltip(
          placement="bottom"
          effect="light"
        )
          .control-list(slot='content')
            el-button.control-item(v-if='!(item.subCategorys && item.subCategorys.length && item.subCategorys.length > 0)' @click.stop='deleteCurrent(item)' type='text') 删除
            el-button.control-item(@click.stop='editCurrent(item, false)' type='text') 编辑
            el-button.control-item(@click.stop='topState.topCurrent(item)' type='text') 置顶
          i.el-icon-more
  .classify-list--empty(v-else)
  //- 删除类目
  modalDelete(
    :visible="deleteState.visible"
    :detail="choseItem"
    @cancleHandle="deleteState.cancleHandle"
    @successHandle="deleteState.successHandle"
  )
  //- 添加 || 编辑 类目
  modalEdit(
    :title='isAdd ? "添加" : "编辑"'
    :isAdd="isAdd"
    :visible="editState.visible"
    :detail="choseItem"
    :parent='curParent'
    @cancleHandle="editState.cancleHandle"
    @successHandle="editState.successHandle"
  )
</template>

<script>
import { computed, ref, reactive, toRefs, watch } from '@vue/composition-api'
import modalDelete from './modalDelete/index'
import useModalDelete from './modalDelete/useModalDelete'
import modalEdit from './modalEdit/index'
import useModalEdit from './modalEdit/useModalEdit'
import useModalTop from './modalTop/useModalTop'

export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    current: {
      type: Object,
      default: () => ({})
    },
    parent: {
      type: Object,
      default: () => ({})
    },
    level: {
      type: [Number, String],
      default: 1
    }
  },
  emits: ['clickRefreshList'],
  components: {
    modalEdit,
    modalDelete,
  },
  setup(props, { emit, root }) {
    const isAdd = ref(true)
    const deleteState = useModalDelete({
      cb: () => {
        emit('clickRefreshList', { isInit: true })
      }
    })
    const editState = useModalEdit({
      cb: () => {
        emit('clickRefreshList', { isInit: true })
      },
    })
    const topState = useModalTop({
      cb: () => {
        emit('clickRefreshList', { isInit: true })
      }
    })
    const clickCurrent = (currentItem, level) => {
      emit('clickRefreshList', { level, choseItem: currentItem })
    }
    const deleteCurrent = (choseItem) => {
      state.choseItem = choseItem
      deleteState.setVisible()
    }
    const editCurrent = (choseItem, status) => {
      state.choseItem = choseItem
      isAdd.value = status
      editState.setVisible(status)
    }
    const state = reactive({
      levelEnu: {
        1: '一级类目',
        2: '二级类目',
        3: '三级类目',
        4: '四级类目',
        5: '五级类目',
      },
      curParent: {},
      choseItem: {},
      deleteState,
      editState,
      topState,
    })

    // 获取当前选中项的index
    const currentIndex = computed(() => {
      const { list, current } = props
      let currentIndex = 0
      list.some((item, index) => {
        if (item.id === current.id) {
          currentIndex = index
          return true
        }
      })
      return currentIndex
    })

    watch(
      () => props.parent,
      val => {
        state.curParent = val
      }
    )

    return {
      currentIndex,
      clickCurrent,
      deleteCurrent,
      editCurrent,
      isAdd,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.classify-list
  width 100%
  font-size 12px
  color #494949
  background #fff
  border 1px solid #EAEBEE
  border-left 0
  transition all 1s linear
  display flex
  flex-direction column
  &:first-child
    border-left 1px solid #EAEBEE
  &--empty
    display flex
    align-items center
    justify-content center
    flex-grow 1
    height: 500px
.classify-title
  padding 0 10px
  height 40px
  line-height 40px
  background #F2F2F6
  border-bottom 1px solid #EAEBEE
.classify-content
  height: 500px
  overflow auto
.classify-item
  padding 0 10px
  height 40px
  border-bottom 1px solid #F2F2F6
  display flex
  justify-content space-between
  align-items center
  cursor pointer
  &:last-child
    border 0
  &:hover
    background rgba(59, 104, 240, 0.1)
  &--current
    background rgba(59, 104, 240, 0.1)
    border-left 1px solid #3B68F0
  &__operate
    font-size 16px
    color #3B68F0
    i
      margin-left 10px
      cursor pointer
  .el-icon-more
    color #000000
.control-list
  display flex
  justify-content center
  align-items center
  .control-item
    color #494949
</style>
