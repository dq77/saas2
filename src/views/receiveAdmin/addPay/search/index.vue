<template lang="pug">
.search_box
  .search_input_container
    el-input.search_input(v-model="planNameOrCustomerName" placeholder="请输入应收名称/收款对象")
    .search_btns
      span(@click="searchHandle") 查询
      span(@click="resetHandle") 重置
  .search_sort_container
    .search_info
      span(style="color: #E95257; margin-right: 3px") *
      span 请选择已创建的应收计划
    //- 排序依据、正序倒序
    Sort.sort_box(
      ref="sortRef"
      :options="options"
      :defaultSort="'created_time'"
      @onChange="onChange"
      @orderHandle="orderHandle"
    )
</template>
<script>
import { ref } from '@vue/composition-api'
import { options } from './config'
import Sort from '../../components/sort'

export default {
  components: {
    Sort
  },
  props: {
    tableApis: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // ref
    const sortRef = ref()
    // 查询名称
    const planNameOrCustomerName = ref()
    // table-查询
    const search = (params) => {
      const { tableApis } = props
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // 正序倒序
    const orderHandle = params => search(params)
    // form-查询
    const searchHandle = () => search({ planNameOrCustomerName: planNameOrCustomerName.value, pageNo: 1 })
    // 切换排序条件
    const onChange = params => search(params)
    // 重置
    const resetHandle = () => {
      const { tableApis } = props
      planNameOrCustomerName.value = null
      const params = sortRef.value?.getSortVal() ?? {}
      tableApis && tableApis.resetHandle(params)
    }

    return {
      planNameOrCustomerName,
      sortRef,
      options,
      onChange,
      orderHandle,
      searchHandle,
      resetHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
