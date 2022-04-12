<template lang="pug">
.page-main
  .page-layout(v-loading="loading")
    TotalInfo(:totalInfo="info")
    Header(
      title="活动信息"
      :line="true"
      style="margin-bottom: 20px"
    )
    Form(
      :formData="dataSource"
      :formConfig="formConfig"
      :inline="false"
      labelPosition="right"
      labelWidth="100px"
    )
      template(slot="startTime")
        span {{ dataSource.startTime && dataSource.endTime ? `${dataSource.startTime} 至 ${dataSource.endTime}` : '- -' }}
      template(slot="isPurchaseRestricted")
        span(v-if="dataSource.isPurchaseRestricted === 'Y'") {{ dataSource.restrictedQuantity }} 件；{{ dataSource.overRestrictedStrategyCn }}
        span(v-else) 不限购
      template(slot="customerSimpleDetaiList")
        span(v-if="dataSource && dataSource.isAllCustomerQualified === 'Y'") 全部客户
        div(v-else)
          span 已选择 {{ dataSource && dataSource.customerSimpleDetaiList && dataSource.customerSimpleDetaiList.length || 0 }} 个客户
          el-button(type="text" v-if="dataSource && dataSource.customerSimpleDetaiList && dataSource.customerSimpleDetaiList.length" @click="visible = true") ，查看
    Header(
      title="活动产品"
      :line="true"
      style="margin-bottom: 20px"
    )
    Table(
      :dataSource="goodsSimplDetail"
      :columns="columns"
    )
      template(slot="mainPicPath" slot-scope="{ row }")
        el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
          div(slot='error')
            img(:src='`${$assetsBaseUrl}/common/alt.png`')
    Drawer(
      :visible="visible"
      :selectCustomerList="dataSource.customerSimpleDetaiList"
      @closeHandle="() => (visible = false)"
    )
  Sure(:onlyBack="true")
</template>

<script lang="ts">
import { ref, computed } from '@vue/composition-api'
import TotalInfo from './totalInfo.vue'
import Header from '@/components/qjd/header/index.vue'
import Form from '@/components/qjd/form/index.vue'
import Table from '@/components/qjd/table/index.vue'
import Drawer from '../components/drawer/index.vue'
import Sure from '@/components/qjd/sure/index.vue'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { formData, formConfig, columns, infoTypes, formDataTypes } from './config'
import { toPrefixUrl } from '@/utils/util'
export default {
  components: {
    TotalInfo,
    Header,
    Form,
    Table,
    Drawer,
    Sure
  },
  setup(props, { root }) {
    // ref
    const visible = ref<Boolean>(false)
    const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')
    // id
    const { $route: { query: { activityId } } } = root
    // ajax
    const { factory: { getActivityDtl } } = ajaxStore
    // 获取详情
    const { result, loading } = useAsync({
      request: getActivityDtl,
      params: { activityId }
    })
    // computed
    // totalInfo
    const info = computed((): infoTypes => {
      const detail = {
        statusCn: result.value?.activityResponseDTO?.statusCn ?? '',
        status: result.value?.activityResponseDTO?.status ?? '',
        quantity: result.value?.activityResponseDTO?.quantity ?? 0,
        transAmount: result.value?.activityResponseDTO?.transAmount ?? 0,
        reducedAmount: result.value?.activityResponseDTO?.reducedAmount ?? 0,
        particapateCustomerNum: result.value?.activityResponseDTO?.particapateCustomerNum ?? 0,
      }
      return detail
    })
    // form
    const dataSource = computed((): formDataTypes => {
      const detail = {
        name: result.value?.activityResponseDTO?.name ?? '',
        startTime: result.value?.activityResponseDTO?.startTime ?? '',
        endTime: result.value?.activityResponseDTO?.endTime ?? '',
        isAllCustomerQualified: result.value?.activityResponseDTO?.isAllCustomerQualified ?? '',
        customerSimpleDetaiList: result.value?.customerSimpleDetaiList ?? [],
        isPurchaseRestricted: result.value?.discountActivityDetailDTO?.isPurchaseRestricted,
        overRestrictedStrategy: result.value?.discountActivityDetailDTO?.overRestrictedStrategy,
        overRestrictedStrategyCn: result.value?.discountActivityDetailDTO?.overRestrictedStrategyCn,
        restrictedQuantity: result.value?.discountActivityDetailDTO?.restrictedQuantity
      }
      return detail
    })
    // table 产品信息
    const goodsSimplDetail = computed((): Array<any> => {
      const detail = result.value?.activityGoodsSimplDetailDTOS ?? []
      return detail
    })
    return {
      formData,
      formConfig,
      columns,
      goodsSimplDetail,
      info,
      dataSource,
      loading,
      visible,
      downloadUrl
    }
  },
}
</script>
<style lang="stylus" scoped>
.page-layout
  background #fff
  height 100%
  padding 20px 18px 20px 22px
  margin-bottom: 40px
  /deep/ .el-form--label-top .el-form-item__label
  .p-table-img
    width 60px
    height 60px
    img
      width 100%
      padding 0
</style>


