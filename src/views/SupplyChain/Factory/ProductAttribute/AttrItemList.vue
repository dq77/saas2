<!--  -->
<template lang="pug">
.attr-itemList
  list(
    @handleSearch="val=>handleSearch({name:val,spuAttributeId})"
    @handleEdit="() => modalState.handleEdit('新建属性项', { spuAttributeId,proName}, 'add')"
  )
    AttrData(
      :attrList="relealResult"
      noSelected=true
      @handleEdit="item => modalState.handleEdit('编辑属性项', {...item, proName}, 'edit')"
      emptyText="请选择属性"
      @handleDel="handleDel"
      :loading="listLoading"
      :searchLoading="loading"
    )
    //- .add-btn(v-if="spuAttributeId" @click="() => modalState.handleEdit('新建属性项', { spuAttributeId,proName}, 'add')") +新建属性项
  addModal(
    :visible="modalState.visible"
    :title="modalState.title"
    :detail="modalState.detail"
    :type="modalState.type"
    :createUrl="createAttrItem"
    :updateUrl="updateAttrItem"
    modalType="item"
    @cancleHandle="modalState.cancleHandle"
    @successHandle="handleSearch({spuAttributeId})"
  )
</template>

<script>
import AttrData from './AttrData.vue'
import addModal from './addModal.vue'
import useModal from './useModal'
import list from './list.vue'
import useAttr from './useAttr'
import ajaxStore from '@/apis'
import { MessageBox } from 'element-ui'
import { computed, reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    proName: String,
    spuAttributeId: String
  },
  components: {
    list,
    addModal,
    AttrData
  },
  setup() {
    const modalState = useModal()
    const { factory: { getAttrItemList, updateAttrItem, createAttrItem, delAttrItem } } = ajaxStore
    const {
      resultData,
      handleSearch,
      getAttrList,
      handleDelete,
      listLoading,
      loading
    } = useAttr({
      request: getAttrItemList,
      init: false,
      getAttr: getAttrItemList,
      deleteHandle: delAttrItem
    })
    const handleDel = item => {
      MessageBox.confirm('确认删除产品属性项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        handleDelete(item.id).then((data) => {
          handleSearch({name: '', spuAttributeId: item.spuAttributeId})
        })
      })
    }
    const getItemList = params => getAttrList(params)

    const state = reactive({
      modalState
    })

    const relealResult = computed(() => resultData.value || [])

    return {
      relealResult,
      ...toRefs(state),
      handleSearch,
      getItemList,
      handleDel,
      updateAttrItem,
      createAttrItem,
      listLoading,
      loading
    }
  }
}

</script>
<style lang='stylus' scoped>
  .header
    width 400px
    height 50px
    background #728BC2
    text-align center
    line-height 50px
    color #FFFFFF
    font-size 14px
    margin-right 20px
</style>
