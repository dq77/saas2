<template lang="pug">
.page-main(v-loading="loading")
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
        //- 盘盈盘亏
        template(slot="total" slot-scope="{ row }")
          span(
            :class="getPosColor((row.realQuantity ? row.realQuantity : 0) - (row.stockQuantity ? row.stockQuantity : 0 ))"
          ) {{ getPosNUm((row.realQuantity ? row.realQuantity : 0) - (row.stockQuantity ? row.stockQuantity : 0 )) }}
  .bottom
    el-button(@click="backHandle") 返回
</template>
<script lang="ts">
import { computed } from '@vue/composition-api'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Table from '@/components/qjd/table/index.vue'
import Collapse from '@/components/qjd/collapse/index.vue'
import BaseInfo from '@/views/SupplyChain/components/baseInfo/index.vue'
import { toPrefixUrl } from '@/utils/util'
import { getPosNUm, getPosColor } from '@/utils/qjd'
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
    Table
  },
  setup(props, { root: { $route: { query: { wmStockCheckInfoId } } } }) {
    // ajax
    const { factory: { getInvenToryDetail } } = ajaxStore
    // 获取详情 - 接口
    const { loading, result } = useAsync({ request: getInvenToryDetail, params: { wmStockCheckInfoId } })
    // 数据处理
    const dataSource = computed(() => result.value ?? {})
    // 返回
    const backHandle = () => router.go(-1)

    return {
      loading,
      getPosNUm,
      getPosColor,
      downloadUrl,
      backHandle,
      dataSource,
      colColumns,
      defaultActiveName,
      baseInfoList,
      columns
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
