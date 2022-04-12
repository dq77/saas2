<template lang="pug">
  .page-main
    top-nav(:collapseItems='collapseItems' @changeTopNav='changeTopNav' :currentKey='currentKey')
    el-collapse(v-model='activeNames' class='page-container')
      el-collapse-item(title='发货信息' name='a1' id='a1')
        deliver-info(ref='deliverInfoRef' :type='type' :queryStatus='queryStatus' :queryId='queryId' :orderId='orderId')
      el-collapse-item(title='货物明细' name='a2' id='a2')
        cargo-detail(v-if='type' :queryId='queryId')
        cargo-create-detail(ref='cargoCreateRef' v-else :queryId='queryId' :queryStatus='queryStatus' :warehouseName='warehouseName' :warehouseId='warehouseId')
    .page-operate
      el-button(type='primary' @click='goBack' v-if='type') 返回
      el-button(type='primary' :loading='loading' @click='createDeliverClick' v-else weblogs-anchor="supplyChain-factory-deliver-create-sure") 确定
</template>

<script>
import { ref, computed } from '@vue/composition-api' // reactive
import {handleQueryStatus} from './index.js'
import DeliverInfo from './Components/DeliverInfo.vue'
import CargoDetail from './Components/CargoDetail.vue'
import CargoCreateDetail from './Components/CargoCreateDetail.vue'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'
import { collapseItems } from './const/index'
import { valiFile, getFiles } from './utils'
import TopNav from '../Components/TopNav'

export default {
  components: {
    DeliverInfo,
    CargoDetail,
    CargoCreateDetail,
    TopNav
  },
  setup(props, {root}) {
    // 新增没有status、type
    const { status, id, type, orderId } = root.$route.query || {}
    const { factory: { createDeliver, editDeliver } } = ajaxStore

    const deliverInfoRef = ref(null)
    const cargoCreateRef = ref(null)
    const activeNames = ref(['a1', 'a2'])

    const queryStatus = handleQueryStatus(status)

    const handerDeliverInfoData = () => {
      const submitFormData = {}
      const { result, uploadState, formState: { formData, loopFormData, submitHandle } } = deliverInfoRef.value
      const newFileList = getFiles(formData.fileList)
      submitFormData.extDeliverCode = result.extDeliverCode // 外部发货编号
      submitFormData.extOrderId = result.extId // 外部订单id
      queryStatus ? submitFormData.id = result.deliverId : submitFormData.orderId = result.id
      loopFormData((item, key) => {
        if (key === 'receiptAddress') {
          submitFormData.provinceCode = item[key][0]
          submitFormData.cityCode = item[key][1]
          submitFormData.areaCode = item[key][2]
        } else if (key === 'fileArrayList') {
          submitFormData[key] = newFileList
        } else {
          submitFormData[key] = item[key]
        }
      })
      return {
        submitFormData,
        submitHandle,
        uploadState,
        newFileList,
        formData
      }
    }
    const currentKey = ref(`${collapseItems[0].key}`)
    const changeTopNav = (val) => {
      currentKey.value = val
    }
    const handerCargoDetailData = () => {
      const deliverItems = [] // 存储货物明细数据
      const { dataSource } = cargoCreateRef.value
      dataSource.forEach(item => {
        const createObj = queryStatus ? { id: item.deliverItemId } : { extOrderItemId: item.extId }
        item.currentDeliverCount && deliverItems.push({
          deliverId: item.deliverId, // 发货id
          deliverQuantity: item.currentDeliverCount, // 发货数量
          extOrderItemId: item.extId, // 外部订单明细Id
          orderItemId: item.orderItemId, // 订单明细id
          ...createObj
        })
      })
      return deliverItems
    }
    const {doResult, loading} = useAsync({
      request: queryStatus ? editDeliver : createDeliver,
      init: false,
      callback: ({data}) => {
        if (data.code === '0') {
          root.$router.push({name: 'deliveryManage'})
        }
      },
    })
    function validSubmitdata(deliverItems) {
      return deliverItems.length
    }
    const createDeliverClick = () => {
      const deliverItems = handerCargoDetailData()
      const { submitHandle, submitFormData, uploadState, newFileList } = handerDeliverInfoData()
      const { isRequireInfo } = uploadState
      const { isHas, id } = valiFile(isRequireInfo.value, newFileList)
      if (!isHas) {
        Message.warning(`请上传${isRequireInfo.value[id].materialsName}`)
        return
      }
      if (validSubmitdata(deliverItems)) {
        submitHandle(() => doResult({deliverItemDTOS: deliverItems, ...submitFormData}))
      } else {
        Message.error('请选择发货货物明细！')
      }
    }
    const goBack = () => {
      root.$router.go(-1)
    }

    const warehouseName = computed(() => deliverInfoRef.value?.warehouseName)
    const warehouseId = computed(() => deliverInfoRef.value?.formState?.formData?.warehouseId)

    return {
      activeNames,
      queryStatus,
      queryId: id,
      orderId,
      type,
      createDeliverClick,
      deliverInfoRef,
      cargoCreateRef,
      goBack,
      loading,
      collapseItems,
      changeTopNav,
      currentKey,
      warehouseName,
      warehouseId,
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-container
  background-color #fff
  padding 20px
.page-operate
  text-align center
  margin-top 30px
</style>
