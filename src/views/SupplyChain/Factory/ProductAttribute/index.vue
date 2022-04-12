<!--  -->
<template lang="pug">
.page-main
  PromptInfo(:title='promptInfoTitle')
  .attr-top
    el-button(@click='toBatchImport' type="primary") 批量导入
  .attr-box
    AttrList.attr-box__list.attr-box--white(
      @handleSearchItem="handleSearchItem"
      :defaultSearch="handleSearchItem"
    )
    AttrItemList.attr-box__itemList.attr-box--white(
      ref="itemRef"
      :proName="proName"
      :spuAttributeId="spuAttributeId"
    )
</template>

<script>
import { ref } from '@vue/composition-api'
import AttrList from './AttrList.vue'
import AttrItemList from './AttrItemList.vue'
import PromptInfo from '../Components/PromptInfo.vue'
import { promptInfoTitle } from './config'
import Router from '@/router'

export default {
  components: {
    AttrList,
    AttrItemList,
    PromptInfo
  },
  setup() {
    const proName = ref()
    const itemRef = ref()
    const spuAttributeId = ref()
    const handleSearchItem = item => {
      proName.value = item.name
      spuAttributeId.value = item.id
      itemRef.value && itemRef.value.getItemList({ spuAttributeId: item.id })
    }
    const toBatchImport = () => { Router.push({ name: 'productAttrImport' }) }

    return {
      promptInfoTitle,
      itemRef,
      proName,
      spuAttributeId,
      handleSearchItem,
      toBatchImport
    }
  }
}

</script>
<style lang='stylus' scoped>
.attr-top
  margin-bottom 20px
.attr-box
  display flex
  width 100%
  &--white
    background #FFFFFF
  &__list
    margin-right 20px
    width 350px
    flex-shrink 0
  &__itemList
    flex-grow 1
</style>
