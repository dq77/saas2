<template lang="pug">
  .deliver-info
    .order-section(v-if='deliverInfo')
      .order-section_item(v-if='queryStatus')
        span.title 发货单号：
        span.value {{deliverInfo.deliverSn}}
      .order-section_item(v-if='queryStatus')
        span.title 发货时间：
        span.value {{deliverInfo.deliverTime}}
      .order-section_item(v-if='queryStatus')
        span.title 发货状态：
        span.value {{develiverStatus[deliverInfo.receiptStatus]}}
      .order-section_item(v-if='queryStatus && (deliverInfo.receiptStatus !== -1 && deliverInfo.receiptStatus !== 99)')
        span.title 电子发货单：
        a(style='cursor:pointer').value(@click='downloadEleDeliver(deliverInfo.deliverFile)') 查看电子发货单
      .order-section_item
        span.title 订单号：
        span.value {{deliverInfo.orderSn}}
      .order-section_item
        span.title 客户：
        span.value {{deliverInfo.customerName}}
      .order-section_item
        span.title 项目：
        span.value {{deliverInfo.projectName}}

    .deliver-section
      Form(
        ref='formRef'
        :formData='formState.formData'
        :formRules='formState.formRules'
        :formConfig='formState.formConfig'
        :isShadow='false'
        labelPosition='right'
        labelWidth='120px'
        @selectChange='selectChange'
      )
        template(slot="warehouseId")
          el-button(
            style="margin-left: 5px;"
            @click="setHandle"
            type="text"
          ) 去设置
        template(slot="fileList")
          div(
            style="width: 410px; display: flex; margin-bottom: 10px; position: relative;"
            v-for="item in (materials || [])"
            :key="item.id"
          )
            div.upload_title {{ item.materialsName }}
            Upload(
              style="width: 100%;"
              :action="toPrefixUrl('/fs/file/doUploadWithFile')"
              :accept="'.zip,.doc,.docx,.pdf,.jpg'"
              :max="50"
              :defaultFileList="item.defaultFileList"
              @onPreview="data => uploadState.onPreview(data, item)"
              @onChange="data => uploadState.onChange(data, item)"
              @onRemove="data => uploadState.onRemove(data, item)"
            )
              el-tooltip(
                placement='top'
                content='可上传文件'
              )
                el-button(plain type='primary') 选择文件
            .u-tips(:style="`position: absolute; left: 160px; top: 0;`")
              span(style="color: red; margin-right: 5px;") {{ item.mustPass === '1' ? '必传' : '' }}
              span 支持格式：.zip/.doc/.docx/.pdf/.jpg
</template>

<script>
import Form from '@/components/qjd/form'
import { reactive, ref, toRefs } from '@vue/composition-api'
import { deliverInfoFormConfig, deliverInfoFormData, cformRules, develiverStatus} from '../const/index'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toPrefixUrl } from '@/utils/util'
import Upload from '@/components/qjd/upload'
import useUpload from '@/hooks/credit/upload'
import { getFile } from '../utils'

export default {
  components: {
    Form,
    Upload
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  setup(props, {root, emit}) {
    const {type} = props
    const routeName = root.$route.name
    const { deliverId, orderId, status } = root.$route.query || {}
    const queryStatus = typeof status === 'string'
    const { factory: { getLogisticsListEnum, getDeliverInfo, getCountryList, wmwarehouseinfoList, detailByOrderId } } = ajaxStore
    const formRef = ref()
    const formState = useForm({
      formRef,
      formData: deliverInfoFormData,
      formConfig: deliverInfoFormConfig,
      formRules: cformRules
    })
    const state = reactive({
      queryStatus,
      formState,
      deliverInfo: null,
      materials: [],
      warehouseName: '',
    })
    const uploadState = useUpload({formState})
    useAsync({ // 获取物流公司列表
      request: getLogisticsListEnum,
      params: {dictCategoryCode: 'deliveryCarriers'},
      init: true,
      successCallBack: ({ data }) => {
        formState.setConfig('logisticsCompany', 'options', data)
      },
    })

    // 库存设置是否开启，未开启不显示发货仓库
    useAsync({
      request: detailByOrderId,
      params: { orderId },
      successCallBack: (data) => {
        if (data.code === '0') {
          const { setConfig } = formState
          const val = !!data.data.isUsed
          if (!type && val) {
            setConfig('warehouseId', 'isHidden', !val)
            emit('showWarehouse', val)
            // 发货仓库列表接口
            useAsync({ // 获取仓库列表
              request: wmwarehouseinfoList,
              init: true,
              successCallBack: ({ data }) => {
                setConfig('warehouseId', 'options', data)
              },
            })
          } else if (type && val) {
            setConfig('warehouseName', 'isHidden', !val)
          }
        }
      }
    })
    const selectChange = ({ item, value }) => {
      if (item.label === '发货仓库') {
        const warehouseName = item.options.filter(el => el.id === value)[0]?.name
        state.warehouseName = warehouseName
        emit('changeWareHouse', value, warehouseName)
      }
    }

    useAsync({ // 获取公司地址
      request: getCountryList,
      init: true,
      successCallBack: ({ data }) => {
        const areaData = data.replace(/(areas|citys)/g, 'children')
        formState.setConfig('receiptAddress', 'options', JSON.parse(areaData))
      },
    })
    useAsync({ // 获取发货信息详情
      request: getDeliverInfo,
      init: true,
      params: {
        id: routeName === 'deliverCreate' ? orderId : deliverId,
        flag: routeName === 'deliverCreate' ? '1' : '2'
      },
      successCallBack: ({ data }) => {
        state.deliverInfo = data
        state.materials = data.configDetailResponseList
        handerDetailForm(data)
      },
    })
    const setDefaultCredit = (data) => {
      const { fileArrayList } = data || {}
      if (state.materials.length) {
        const fileObjs = {}
        const isRequireInfo = {}
        data.fileArrayList = fileArrayList.map(item => {
          fileObjs[item.businessType] = { key: item.fileId, name: item.fileName, businessType: item.businessType, response: { key: item.fileId, fileName: item.fileName, businessType: item.businessType } }
          return { key: item.fileId, name: item.fileName, businessType: item.businessType, response: { key: item.fileId, fileName: item.fileName, businessType: item.businessType } }
        })
        uploadState.setFileObjs(fileObjs)
        const newFile = getFile(fileArrayList)
        state.materials.forEach(item => {
          if (item.mustPass === '1') isRequireInfo[item.id] = item
          item.defaultFileList = newFile?.[item.id]?.data
        })
        uploadState.setIsRequireInfo(isRequireInfo)
        formState.setFormItem('fileList', data.fileArrayList)
        formState.setFormItem('fileArrayList', data.fileArrayList)
      }
    }
    const handerDetailForm = (data) => {
      formState.loopFormConfig((item) => {
        if (item.key === 'receiptAddress') {
          formState.setFormItem(item.key, [data.provinceCode, data.cityCode, data.areaCode])
        } else if (item.key === 'logisticsAmount' && !data[item.key]) {
          formState.setFormItem(item.key, undefined)
        } else {
          formState.setFormItem(item.key, data[item.key])
        }
        item.disabled = !!type
      })
      if (state.materials.length) {
        formState.setConfig('fileArrayList', 'isHidden', false)
        if (!queryStatus) {
          const isRequireInfo = {}
          state.materials.forEach(item => {
            if (item.mustPass === '1') isRequireInfo[item.id] = item
            item.defaultFileList = []
          })
          // 存储必传文件信息
          uploadState.setIsRequireInfo(isRequireInfo)
        } else {
          setDefaultCredit(data)
        }
      }
      // setDefaultCredit(data)
    }
    const downloadEleDeliver = (filekey) => {
      window.open(toPrefixUrl(`/saas-ofc/org/deliver/downLoad?fileKey=${filekey}`))
    }
    // 去设置
    const setHandle = () => root.$router.push({ name: 'setBase', query: { id: 'warehouseConfig' } })

    return {
      handerDetailForm,
      develiverStatus,
      toPrefixUrl,
      setHandle,
      // submitHandle,
      formRef,
      downloadEleDeliver,
      uploadState,
      selectChange,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="stylus" scoped>
.order-section
  background-color #F4F9FD
  border-radius 4px
  display flex
  padding 20px
  flex-wrap wrap
  margin-bottom 20px
  &_item
    width 50%
    line-height 32px
    &:nth-child(2n+1)
      border-right 1px #CDD0D4 dashed
    .title
      width 120px
      text-align right
      display inline-block
      margin-right 10px
      color #738A9E
>>>.el-input--small .el-input__inner
  height 31px
.upload_title
  width 70px
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-all
</style>
