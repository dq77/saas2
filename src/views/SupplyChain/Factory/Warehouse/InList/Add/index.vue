<template lang="pug">
.page-main
  Card(noTitle)
    el-collapse(v-model='activeNames')
      el-collapse-item(:title='txt+"信息"' :name='1')
        BaseInfo(ref='baseInfoRef')
      el-collapse-item(:title='txt+"产品"' :name='2')
        ProductInfo(ref='tableRef' :warehouseId='warehouseId')
  .p-btns
    el-button(plain @click='clickGoBack') 返回
    el-button(type='primary' @click='clickSaveHandle' :loading='saveOrderLoading') 保存
</template>

<script>
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import { MessageBox } from 'element-ui'
import Card from '@/components/Card'
import BaseInfo from './baseInfo'
import ProductInfo from './productInfo'
import useBottomBtns from './useBottomBtns'

export default {
  components: {
    Card,
    BaseInfo,
    ProductInfo,
  },
  setup(props, { root }) {
    const baseInfoRef = ref(null)
    const tableRef = ref(null)
    const routeName = root.$route.name

    const state = reactive({
      warehouseId: '',
      activeNames: [1, 2],
      txt: routeName === 'inAdd' ? '入库' : '出库',
    })

    // 整页底部按钮的事件执行逻辑
    const {
      clickGoBack,
      clickSave,
    } = useBottomBtns({
      routeName,
      tableRef,
    })

    // 点击保存
    const saveOrderLoading = ref(false)
    const clickSaveHandle = () => {
      baseInfoRef.value.formState.submitHandle().then(async v => {
        if (v) {
          saveOrderLoading.value = true
          await clickSave(baseInfoRef.value?.formState?.formData, async () => {})
          saveOrderLoading.value = false
        }
      })
    }

    // 监听仓库值变化
    let ifConfirmChange = false
    watch(
      () => baseInfoRef.value?.formState?.formData?.warehouseId,
      (val, oVal) => {
        // 传给表格组件使用的
        state.warehouseId = val
        // ifConfirmChange如果是确认弹窗的取消后值还原了导致的值变化，那么就不再弹窗确认
        if (!ifConfirmChange && tableRef.value.getTableData().length > 0 && state.txt === '出库') {
          MessageBox.confirm('更改出库仓库时，会清空已添加的产品，确认要更改仓库吗？', '提示', {
            type: 'warning',
            roundButton: true,
          }).then(() => {
            tableRef.value.clearTableData()
          }).catch((err) => {
            console.log(err)
            baseInfoRef.value.formState.formData.warehouseId = oVal
            ifConfirmChange = true
          })
        } else {
          ifConfirmChange = false
        }
      }
    )

    return {
      tableRef,
      baseInfoRef,
      saveOrderLoading,
      clickGoBack,
      clickSaveHandle,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-btns
  padding-top 40px
  padding-bottom 40px
  text-align: center
</style>
