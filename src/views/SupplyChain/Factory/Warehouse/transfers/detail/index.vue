<template lang="pug">
.page-main
  Collapse(
    :columns='colColumns'
    :defaultActiveName='defaultActiveName'
  )
    //- 调拨信息
    template(slot='info')
      BaseInfo(
        :baseInfoList='baseInfoList'
        :baseInfoData='dataSource'
      )
    //- 调拨产品
    template(slot='product')
      Table(
        :columns="columns"
        :cellStyle="() => ({ 'vertical-align': 'top' })"
        :dataSource="dataSource && dataSource.detailResponses ? dataSource.detailResponses : []"
      )
        //- 图片
        template(slot="mainPicPath" slot-scope="{ row }")
          el-image(style="height: 60px; width: 60px" :src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
            div(slot='error')
              img(style="width: 100%" :src='`${$assetsBaseUrl}/common/alt.png`')
        //- 属性
        template(slot="extendData" slot-scope="{ row }")
          div(
            v-for="(item, index) in (row.extendData || [])"
            :key="index"
          )
            span {{ item.name }}：
            span {{ item.valueName }}
        //- 调拨数量
        template(slot='goodsQuantity' slot-scope='{row}')
          div(
            :class="getPosColor(row.goodsQuantity)"
          ) {{ getPosNUm(row.goodsQuantity) }}
      Total(:sum="sum")
  .bottom
    //- 关闭调拨
    el-button(
      v-if="dataSource && (dataSource.status === 1 || dataSource.status === 2)"
      :loading="operateApis.closeLoading"
      @click="closeHandle"
    ) 关闭调拨
    //- 调拨出库
    el-button(
      type="primary"
      v-if="dataSource && dataSource.status === 1"
      :loading="operateApis.confirmLoding"
      @click="outHandle"
    ) 调拨出库
    //- 调拨入库
    el-button(
      type="primary"
      v-if="dataSource && dataSource.status === 2"
      @click="inHandle"
    ) 调拨入库
    //- 返回
    el-button(@click="backHandle") 返回
  //- Modal
  Modal(
    :visible="modalApis.visible"
    :title="modalApis.title"
    :detail="modalApis.detail"
    @cancleHandle="modalApis.cancleHandle"
    @successHandle="successHandle"
  )
</template>
<script lang="ts">
import { computed, reactive, toRefs, ref } from '@vue/composition-api'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Table from '@/components/qjd/table/index.vue'
import Total from '@/components/qjd/bsComs/supply/total.vue'
import Collapse from '@/components/qjd/collapse/index.vue'
import BaseInfo from '@/views/SupplyChain/components/baseInfo/index.vue'
import useOperate from '../components/useOperate'
import { Message } from 'element-ui'
import { toPrefixUrl } from '@/utils/util'
import { getPosNUm, getPosColor } from '@/utils/qjd'
// 调入
import Modal from '../components/modal/index.vue'
import useModal from '../components/modal/useModal'
import {
  colColumns,
  defaultActiveName,
  baseInfoList,
  columns
} from './config'

const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')

export default {
  components: {
    Collapse,
    BaseInfo,
    Table,
    Modal,
    Total
  },
  setup(props, { root: { $route: { query: { wmTransfersInfoId } } } }) {
    // 合计
    const sum = ref<number>(0)
    // ajax
    const { factory: { getTransfersDetail } } = ajaxStore
    // useOperate
    const operateApis = useOperate()
    // useModal
    const modalApis = useModal()
    // 获取详情
    const { result } = useAsync({ request: getTransfersDetail, params: { wmTransfersInfoId } })
    // 信息优化
    const dataSource = computed(() => {
      const { detailResponses } = result.value ?? {}
      sum.value = detailResponses?.reduce((total: number, next: any): number => total + Number(next.goodsQuantity ? next.goodsQuantity : 0), 0)
      return result.value ?? {}
    })
    // 关闭调拨
    const closeHandle = () => {
      operateApis.closeHandle({ wmTransfersInfoId }).then((res: any) => {
        if (res?.code === '0') {
          Message.success('关闭成功')
          router.push({ name: 'transfers' })
        }
      })
    }
    // 调拨出库
    const outHandle = (): void => {
      operateApis.confirmHandle({ wmTransfersInfoId }).then((res: any) => {
        if (res?.code === '0') {
          Message.success('调出成功')
          router.push({ name: 'transfers' })
        }
      })
    }
    // 调入
    const inHandle = () => {
      modalApis.openHandle()
      modalApis.setDetail({ id: wmTransfersInfoId, time: dataSource.value?.businessOutDatetime })
    }
    // 调入成功回调
    const successHandle = () => router.push({ name: 'transfers' })
    // 返回
    const backHandle = () => router.go(-1)
    // state
    const state = reactive({ operateApis, modalApis })

    return {
      sum,
      colColumns,
      defaultActiveName,
      baseInfoList,
      columns,
      dataSource,
      backHandle,
      closeHandle,
      outHandle,
      inHandle,
      getPosNUm,
      getPosColor,
      successHandle,
      downloadUrl,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.bottom
  display: flex
  align-items: center
  justify-content: center
  padding: 20px 0
  background: #fff
</style>
