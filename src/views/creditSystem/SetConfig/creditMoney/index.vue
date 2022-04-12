<template lang="pug">
.page-main
  .page-content
    Config(:setNextData="configApis.setNextData")
    .content_box
      Header(:title="'请配置赊销额度'")
      //- 头部
      CustomHeader(
        :title="'企业年度授信总额'"
        :detail="currentSatte.result"
        :customKey="'creditLine'"
        :customFn="val => toAmountStr(val, undefined, true)"
        @editHandle="moneyState.moneyEditHandle"
      )
      //- 提示
      .notice_box
        CustomInfo(:width="400" :placement="'left'")
          span(style="margin-left: 10px;" slot="content") 提示
          span {{ info }}
      //- 列表
      List(
        style="margin-top: 20px"
        :columns="columns"
        :dataSource="currentSatte.result && currentSatte.result.salesAreaList ? currentSatte.result.salesAreaList : []"
        @addHandle="() => orgState.orgOperateHandle('add', {})"
      )
        template(slot="creditStatus" slot-scope="{ row }")
          el-switch(
            weblogs-anchor="common-control-check"
            v-model="row.creditStatus === 1 ? true : false"
            @change="() => currentSatte.disableHandle(row)"
          )
          span(style="margin-left: 8px;") {{ row.creditStatus === 1 ? '开启' : row.creditStatus === 3 ? '禁用' : '- -' }}
        template(slot="operate" slot-scope="{ row }")
          el-button(type='text' weblogs-anchor="common-control-change" @click="() => orgState.orgOperateHandle('edit', row)") 修改

      //- 企业年度授信总额
      MoneyModal(
        :visible="moneyState.visible"
        :title="moneyState.title"
        :detail="moneyState.detail"
        @cancleHandle="moneyState.moneyCancleHandle"
        @successHandle="() => currentSatte.doResult()"
      )
      //- 添加、修改业务类型
      OrgModal(
        :type="orgState.orgType"
        :visible="orgState.visible"
        :title="orgState.title"
        :detail="orgState.detail"
        :setTitle="orgState.setTitle"
        @cancleHandle="orgState.orgCancleHandle"
        @successHandle="() => currentSatte.doResult()"
      )
    Next(:nextKey="configApis.currentKey" v-if="configApis.isShow")
</template>
<script>
import Config from '../components/config'
import Next from '../components/next'
import CustomHeader from '../components/header'
import List from '../components/list'
import CustomInfo from '../components/customInfo'
import Header from '@/components/qjd/header'
import { reactive, toRefs } from '@vue/composition-api'
import MoneyModal from './moneyModal'
import OrgModal from './orgModal'
import useMoney from './useMoney'
import useOrg from './useOrg'
import useCurrent from './index.js'
import { columns, info } from './config'
import { toAmountStr } from '@/utils/util'
import useConfig from '../components/useConfig'

export default {
  components: {
    Config,
    Next,
    Header,
    MoneyModal,
    List,
    OrgModal,
    CustomHeader,
    CustomInfo
  },
  setup(props, { emit }) {
    // 当前页面细小逻辑
    const currentSatte = useCurrent()
    // 企业年度授信总额-modal
    const moneyState = useMoney()
    // 添加、修改销售组织-额度modal
    const orgState = useOrg()
    // 下一步
    const nextHandle = () => emit('nextHandle')
    // 配置 & 下一步权限
    const configApis = useConfig({ menuTag: 'credit_system_limit_setting' })
    // state
    const state = reactive({
      moneyState,
      currentSatte,
      orgState,
      configApis
    })

    return {
      info,
      columns,
      toAmountStr,
      nextHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.page-content
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
.content_box
  background #fff
  padding 0 20px 80px 20px
  flex: 1
.notice_box
  display flex
  justify-content: flex-end
  padding-top: 20px
</style>
