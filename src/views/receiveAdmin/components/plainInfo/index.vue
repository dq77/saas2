<template lang="pug">
div(style="padding-bottom: 100px; position: relative;")
  .plain_title 应收计划
  .plain_empty(v-if="!id")
    .plain_btn(@click="addHandle") 添加应收计划
  fragment(v-else)
    el-button.eidt_plain(
      v-if="name === 'AddPlain'"
      type="text"
      @click="editHandle"
    ) 修改
    .plain_detail(
      v-for="(item, index) in configs"
      :key="index"
    )
      .plain_detail_title {{ item.label }}
      .plain_detail_info(
        v-for="(child, i) in item.detail"
        :key="i"
      )
        .plain_detail_info_label {{ child.label }}：
        .plain_detail_info_content {{ item.key ? dataSource[item.key] ? dataSource[item.key][child.key] : '- -' : dataSource ? dataSource[child.key] : '- -' }}
    .plain_detail_title 文件
    .plain_files
      .file_list(
        v-for="(item, index) in dataSource.saArmBusinessFileList || []"
        :key="index"
        @click="() => onPreview(item.fileKey)"
      ) {{ item.fileName }}
</template>
<script>
import { computed, inject } from '@vue/composition-api'
import { configs } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toPrefixUrl } from '@/utils/util'
import { percent2, getDate } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'

export default {
  setup(props, { root: { $router, $route } }) {
    // route
    const { query: { id }, name } = $route
    // 应收总金额
    const moneyInfo = inject('moneyInfo')
    // ajax
    const { receive: { getPlainDetail } } = ajaxStore
    // 获取详情接口
    const { doResult, result } = useAsync({
      request: getPlainDetail,
      init: false,
      callback: res => {
        const { code, data } = res?.data ?? {}
        // 处理地区
        if (data.projectDetail) {
          const { city, province, region } = data?.projectDetail ?? {}
          // 项目地址
          data.projectDetail.address = `${province}${city}${region}`
        }
        // 设置应收总金额
        moneyInfo.value = {
          id: data?.id,
          receivableAmount: data?.receivableAmount,
          notPlanAmount: data?.notPlanAmount,
          notPlanProportion: data?.notPlanProportion,
          returnedAmount: data?.returnedAmount
        }
        // 应收类型
        data.receivableName = receiveTypes?.[data.receivableType] ?? ''
        // 收款金额-两位小数
        data.receivableAmount = percent2(data?.receivableAmount)
        // 最后应收时间获取年月日
        data.receivableEndDate = getDate(data?.receivableEndDate)

        return {
          data,
          code
        }
      }
    })
    // 更新数据
    const refreshHandle = () => id && doResult({ saArmReceivablePlanId: id })
    // 调用详情接口
    refreshHandle()
    // 数据优化处理
    const dataSource = computed(() => result.value ?? {})
    // 添加计划
    const addHandle = () => $router.push({ name: 'PlainForm' })
    // 修改计划
    const editHandle = () => $router.push({ name: 'PlainForm', query: { id } })
    // 预览
    const onPreview = fileKey => window.open(toPrefixUrl(`/fs/file/download?fileKey=${fileKey}`))

    return {
      id,
      name,
      configs,
      addHandle,
      dataSource,
      onPreview,
      editHandle,
      refreshHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
