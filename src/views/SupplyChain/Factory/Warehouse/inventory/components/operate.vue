<template lang="pug">
div
  el-popconfirm(
    style="margin-right: 10px"
    v-if="dataSource && dataSource.status === 1"
    title="是否确认此次盘点已完成？"
    confirm-button-text='确认盘点'
    cancel-button-text='点错了'
    @confirm="sureHandle"
  )
    el-button(type="text" slot='reference') 确认盘点
  el-popconfirm(
    style="margin-right: 10px"
    v-if="dataSource && dataSource.status === 1"
    title="是否关闭此次盘点？"
    confirm-button-text='确认关闭'
    cancel-button-text='点错了'
    @confirm="closeHandle"
  )
    el-button(type="text" slot='reference') 关闭盘点
  el-button(type="text" v-if="dataSource && dataSource.status === 1" @click="goonHandle") 继续盘点
  el-button(type="text" v-if="dataSource && (dataSource.status === 2 || dataSource.status === 3)" @click="seeHandle") 查看
</template>
<script lang='ts'>
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    tableApis: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // ajax
    const { factory: { sureInvenTory, closeInvenTory } } = ajaxStore
    // 刷新table
    const refreshHanlde = () => {
      const { tableApis }: any = props ?? {}
      tableApis.searchHandle(tableApis?.searchInfo)
    }
    // 确认盘点 - 接口
    const { doResult: sureApiHandle } = useAsync({
      request: sureInvenTory,
      init: false,
      successCallBack: res => {
        if (res?.code === '0') {
          Message.success('确认盘点成功')
          refreshHanlde()
        }
      }
    })
    // 关闭盘点 - 接口
    const { doResult: closeApiHandle } = useAsync({
      request: closeInvenTory,
      init: false,
      successCallBack: res => {
        if (res?.code === '0') {
          Message.success('关闭盘点成功')
          refreshHanlde()
        }
      }
    })
    // 确认盘点
    const sureHandle = (): void => {
      const { dataSource } = props
      sureApiHandle({ wmStockCheckInfoId: (dataSource as any)?.id })
    }
    // 继续盘点
    const goonHandle = (): void => {
      const { dataSource } = props
      const { warehouseName, warehouseId, id } = (dataSource as any) ?? {}
      router.push({ name: 'inventoryCreate', query: { warehouseName, warehouseId, id } })
    }
    // 关闭盘点
    const closeHandle = (): void => {
      const { dataSource } = props
      closeApiHandle({ wmStockCheckInfoId: (dataSource as any)?.id })
    }
    // 查看
    const seeHandle = (): void => {
      const { dataSource } = props
      router.push({ name: 'inventoryDetail', query: { wmStockCheckInfoId: (dataSource as any)?.id } })
    }

    return {
      sureHandle,
      goonHandle,
      closeHandle,
      seeHandle
    }
  }
}
</script>
