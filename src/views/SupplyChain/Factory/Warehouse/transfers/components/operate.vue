<template lang="pug">
div
  //- 调出
  el-popconfirm(
    style="margin-right: 10px"
    v-if="dataSource.status === 1"
    title="是否确认此笔调拨已完成出库？"
    confirm-button-text='确认出库'
    cancel-button-text='点错了'
    @confirm="outHandle"
  )
    el-button(type="text" slot='reference') 调出
  //- 调入
  el-button(
    type="text"
    style="margin-right: 10px"
    v-if="dataSource.status === 2"
    @click="inHandle"
  ) 调入
  //- 关闭
  el-popconfirm(
    style="margin-right: 10px"
    v-if="dataSource.status === 1 || dataSource.status === 2"
    title="是否关闭此笔调拨？"
    confirm-button-text='确认关闭'
    cancel-button-text='点错了'
    @confirm="closeHandle"
  )
    el-button(type="text" slot='reference') 关闭
  //- 查看
  el-button(type="text" @click="seeHandle") 查看
</template>
<script lang='ts'>
import router from '@/router'
import useOperate from './useOperate'
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
  setup(props, { emit }) {
    // useOperate
    const operateApis = useOperate()
    // 刷新table
    const refreshHanlde = () => {
      const { tableApis }: any = props ?? {}
      tableApis.searchHandle(tableApis?.searchInfo)
    }
    // 调出
    const outHandle = (): void => {
      const { dataSource } = props
      operateApis.confirmHandle({ wmTransfersInfoId: (dataSource as any)?.id }).then((res: any) => {
        if (res?.code === '0') {
          Message.success('调出成功')
          refreshHanlde()
        }
      })
    }
    // 调入
    const inHandle = (): void => emit('inHandle', props?.dataSource)
    // 关闭
    const closeHandle = (): void => {
      const { dataSource } = props
      operateApis.closeHandle({ wmTransfersInfoId: (dataSource as any)?.id }).then((res: any) => {
        if (res?.code === '0') {
          Message.success('关闭成功')
          refreshHanlde()
        }
      })
    }
    // 查看
    const seeHandle = (): void => {
      const { dataSource } = props
      router.push({ name: 'transfersDetail', query: { wmTransfersInfoId: (dataSource as any)?.id } })
    }

    return {
      outHandle,
      inHandle,
      closeHandle,
      seeHandle
    }
  }
}
</script>
