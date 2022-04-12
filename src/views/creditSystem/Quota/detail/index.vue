<template lang="pug">
.page-main
  .collapse-box(v-loading="loading")
    Collapse(
      :columns="columns"
      :defaultActiveName="defaultActiveName"
    )
      //- 客户信息
      template(slot="user")
        Descriptions(
          :labelWidth="150"
          :columns="userColumns"
          :dataSource="result && result.customerDetailResponse ? result.customerDetailResponse : {}"
        )
      //- 授信信息
      template(slot="credit")
        Descriptions(
          :labelWidth="150"
          :columns="creditColumns"
          :dataSource="result"
        )
          template(slot="test1")
            span {{ useMoney ? toAmountStr(useMoney, undefined, true) : '- -' }}
          template(slot="test2")
            span {{ result && result.remainingAmount && result.remainingAmount < 0 ? Math.abs(result.remainingAmount) : '- -'  }}
      //- 项目信息
      template(slot="project")
        Descriptions(
          :labelWidth="150"
          :columns="projectColumns"
          :dataSource="result && result.orgProjectResponse ? result.orgProjectResponse : {}"
        )
          template(slot="fileList" v-if="result")
            File(:fileList="result.newFile || {}")
      //- 合同信息
      template(slot="contract")
        Descriptions(
          :labelWidth="150"
          :columns="contractColumns"
          :dataSource="result && result.orgProjectContractResponse ? result.orgProjectContractResponse : {}"
        )
    .desc-box(style="padding: 20px 0 0 20px")
      span 备注：
      span {{ result && result.description ? result.description : '- -' }}
</template>
<script>
import { computed, ref } from '@vue/composition-api'
import Collapse from '@/components/qjd/collapse'
import Descriptions from '@/components/qjd/descriptions'
import File from '@/components/qjd/bsComs/credit/file.vue'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import {
  defaultActiveName,
  colColumns,
  colProColumns,
  userColumns,
  creditColumns,
  projectColumns,
  contractColumns
} from './config'
import { getFile } from '@/utils/qjd/credit'
import { toAmountStr } from '@/utils/util'

export default {
  components: {
    Collapse,
    Descriptions,
    File
  },
  setup(props, { root }) {
    // collapse-Columns
    const columns = ref(colColumns)
    // id
    const { $route: { params: { id } } } = root
    const { credit: { getCreditDetail } } = ajaxStore
    // 获取详情
    const { result, loading } = useAsync({
      request: getCreditDetail,
      params: { creditApplyId: id },
      callback: res => {
        const { code, data } = res?.data ?? {}
        const { fileList } = data ?? {}
        data.newFile = getFile(fileList) || {}
        return {
          code,
          data
        }
      },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const { creditType } = data || {}
          // 是否为项目授信
          if (creditType === 'project_credit') columns.value = [...columns.value, ...colProColumns]
        }
      }
    })
    // 授信已使用额度
    const useMoney = computed(() => {
      const { creditAmount, remainingAmount } = result.value ?? {}
      if (!remainingAmount) {
        // 无剩余额度
        return creditAmount || creditAmount === 0 ? creditAmount : null
      } else {
        return creditAmount || creditAmount === 0 ? creditAmount - remainingAmount : null
      }
    })

    return {
      defaultActiveName,
      columns,
      userColumns,
      creditColumns,
      projectColumns,
      contractColumns,
      result,
      loading,
      toAmountStr,
      useMoney
    }
  },
}
</script>
