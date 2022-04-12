<template lang="pug">
div
  .task_title(v-if="menuPermisssions['credit_system_business_opreate']") 任务卡片
  Header(v-else :title="'任务卡片'" :left="20")
  .task_box
    .task_content
      All(v-if="isPower && !isEmpty" :dataSource="dataSource")
      Single(v-if="!isPower && !isEmpty" :dataSource="dataSource")
      Empty(v-if="isEmpty")
</template>
<script>
import All from './all'
import Single from './single'
import Empty from './empty'
import Header from '@/components/qjd/header'
import store from '@/store'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { computed } from '@vue/composition-api'

export default {
  components: {
    All,
    Empty,
    Single,
    Header
  },
  props: {
    isPower: Boolean
  },
  setup() {
    // store
    const { state: { menuPermisssions } } = store
    // ajaxStore
    const { credit: { getCountProcessKey } } = ajaxStore
    // 获取任务信息
    const { result } = useAsync({
      request: getCountProcessKey,
      params: { processKeys: ['creditApply', 'saasPeriodDays', 'creditRepayment'] }
    })
    // 获取数据
    const dataSource = computed(() => {
      const obj = {}
      result.value && result.value.forEach(item => { obj[item.processDefinitionKey] = item.count })
      return obj
    })
    // 判断空
    const getIsEmpty = value => !!(!value || value === 0)
    // 是否为空
    const isEmpty = computed(() => !!(getIsEmpty(dataSource.value.creditApply) && getIsEmpty(dataSource.value.saasPeriodDays) && getIsEmpty(dataSource.value.creditRepayment)))

    return {
      menuPermisssions,
      dataSource,
      isEmpty
    }
  }
}
</script>
<style lang="stylus" scoped>
.task_title
  padding-left: 20px
  font-size: 14px;
  font-weight: 500;
  color: #494949;
  line-height: 20px;
.task_box
  padding: 20px
  .task_content
    height: 86px;
    background: #FFFFFF;
    border: 1px solid #ECEDEF;
    box-sizing: border-box
</style>
