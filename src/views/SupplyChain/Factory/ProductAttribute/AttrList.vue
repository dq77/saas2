<!--  -->
<template lang="pug">
.attr-list
  list(
    @handleSearch="(val) => handleSearch({attributeName:val })"
    @handleEdit="() => modalState.handleEdit('新建属性', {}, 'add')"
  )
    AttrData(
      emptyText='请点击新增属性，配置属性'
      :attrList="result"
      @handleEdit="item => modalState.handleEdit('编辑属性', item, 'edit')"
      @handleSearchItem="handleSearchItem"
      @handleDel="handleDel"
    )
    //- .add-btn(@click="() => modalState.handleEdit('新建属性', {}, 'add')") +新建属性
  addModal(
    :visible="modalState.visible"
    :title="modalState.title"
    :detail="modalState.detail"
    :type="modalState.type"
    :createUrl="createAttr"
    :updateUrl="updateAttr"
    modalType="outside"
    @cancleHandle="modalState.cancleHandle"
    @successHandle="handleSearch"
  )
</template>

<script>
import AttrData from './AttrData.vue'
import addModal from './addModal.vue'
import useModal from './useModal'
import list from './list.vue'
import useAttr from './useAttr'
import ajaxStore from '@/apis'
import { reactive, toRefs } from '@vue/composition-api'
import { MessageBox } from 'element-ui'

export default {
  props: {
    defaultSearch: Function
  },
  components: {
    list,
    addModal,
    AttrData
  },
  setup(props, { emit }) {
    const modalState = useModal()
    const { factory: { getAttrList, delAttr, updateAttr, createAttr } } = ajaxStore
    const {
      result,
      handleSearch,
      handleDelete
    } = useAttr({
      request: getAttrList,
      deleteHandle: delAttr,
      handleSearchItem: props.defaultSearch
    })
    const state = reactive({
      modalState
    })
    const handleSearchItem = item => emit('handleSearchItem', item)
    const handleDel = item => {
      MessageBox.confirm('注意！删除后产品属性后，所属的属性项也将一并删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        handleDelete(item.id).then((data) => {
          handleSearch({attributeName: ''})
          emit('handleSearchItem', item)
        })
      })
    }
    return {
      result,
      ...toRefs(state),
      handleSearch,
      handleDel,
      handleSearchItem,
      updateAttr,
      createAttr
    }
  }
}

</script>
<style lang='stylus' scoped>
.attr-list
  width 350px
</style>
