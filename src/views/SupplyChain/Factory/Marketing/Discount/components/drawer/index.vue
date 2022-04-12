<template lang="pug">
el-drawer(
  size="44%"
  :visible.sync="visible"
  :before-close="closeHandle"
  :title="checkbox ? '选择客户' : '查看'"
)
  //- 查看
  el-scrollbar(style="height: calc(100% - 70px);" v-if="!checkbox")
    Table(
      :dataSource="selectCustomerList"
      :columns="columns"
    )
    .msg
      span 已选择
      span {{ selectCustomerList && selectCustomerList.length || 0 }}
      span 个客户
  //- 选择客户
  SelectCustomer(
    ref="customerRef"
    v-if="checkbox"
  )
  Sure(
    @cancleHandle="closeHandle"
    @sureHandle="sureHandle"
     v-if="checkbox"
  )
</template>
<script lang='ts'>
import { ref } from '@vue/composition-api'
import Table from '@/components/qjd/table/index.vue'
import SelectCustomer from './selectCustomer.vue'
import Sure from './sure.vue'
export default {
  components: {
    Table,
    Sure,
    SelectCustomer
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    selectCustomerList: {
      type: Array,
      default: () => {
        return []
      }
    },
    checkbox: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, root: { $route } }) {
    const columns = [{ label: '客户名称', key: 'customerName' }]
    // ref
    const customerRef = ref<any>()
    // methods
    const closeHandle = (): void => emit('closeHandle', false)
    const sureHandle = (): void => {
      emit('sureHandle', customerRef.value.currentCheck)
    }
    const initCustomer = (list: Array<any>): void => {
      list.length && customerRef.value.initCustomer(list)
    }
    return {
      customerRef,
      closeHandle,
      sureHandle,
      columns,
      initCustomer
    }
  }
}
</script>
<style lang="stylus" scoped>
>>>.el-scrollbar__view
  position relative
.msg
  position absolute
  top 0
  right 20px
  line-height 50px
/deep/ el-drawer__body
  padding-bottom 30px
</style>
