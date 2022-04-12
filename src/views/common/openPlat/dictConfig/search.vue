<template lang="pug">
.search-box
  .input-box
    el-input(v-model="dictCategoryName" placeholder="请输入")
    el-button.p-search-btn(type="primary" @click="searchHandle") 搜索
  .content-box(v-loading="loading")
    .content-item(
      v-for="(item,i) in classifyResult"
      :key='item.id'
      @click="handleChooose(item)"
      :style='`background:${currentId === item.id ? "#eaebee" : ""}`'
    ) {{item.dictCategoryName}}
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default {
  props: {
    dictCategoryBizCode: String
  },
  setup(props, {emit}) {
    const dictCategoryName = ref('')
    const currentId = ref('')
    const classifyResult = ref([])
    const { getDictClassify } = ajaxStore.common.openPlat
    const successCallBack = ({data}) => {
      classifyResult.value = data.pagedRecords
    }
    // 字典列表
    const { doResult: getDictList, loading } = useAsync({
      init: false,
      request: getDictClassify,
      params: {pageNo: 1, pageSize: 100},
      successCallBack
    })

    const searchHandle = () => {
      getDictList({dictCategoryBizCode: props.dictCategoryBizCode, dictCategoryName: dictCategoryName.value})
    }

    const handleChooose = (item) => {
      currentId.value = item.id
      emit('chooseDict', item)
    }

    // 初始化函数，父组件可调用
    const init = () => {
      currentId.value = ''
      dictCategoryName.value = ''
      classifyResult.value = []
      searchHandle()
    }

    watch(
      () => props.dictCategoryBizCode,
      () => init()
    )

    init()

    return {
      dictCategoryName,
      loading,
      currentId,
      handleChooose,
      searchHandle,
      init,
      classifyResult
    }
  }
}

</script>
<style lang='stylus' scoped>
.search-box
  width 30%
  min-height 719px
  background #FFFFFF
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  border 1px solid #EAEBEE
  padding 20px
.input-box
  display flex
  align-items center
.content-box
  display flex
  flex-flow column
  margin-top 10px
  .content-item
    margin-bottom 10px
    padding 5px 16px
    cursor pointer
    &:hover
      background #eaebee
.p-search-btn
  margin-left 10px
</style>
