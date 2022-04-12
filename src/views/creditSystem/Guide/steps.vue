<template lang="pug">
.steps_box
  el-steps.custom_step(
    :active="active"
    align-center
    finish-status="success"
    direction="vertical"
    :class="active ? '' : 'custom_init_step'"
  )
    el-step(
      v-for="(item, index) in dataSource"
      :key="item.id"
    )
      .step-box(slot="description")
        .step_title(:style="`font-size: ${Number(active) == index ? '16px' : ''}`") {{ item.title }}
        .step-content {{ item.content }}
        div(style="padding: 0 20px;" v-if="Number(active) >= index && menuPermisssions && menuPermisssions[item.menuTag]")
          .again_go(v-if="Number(active) > index" @click="() => startGuideHandle(item)") 再次前往
          .custom_button(
            v-else
            @click="() => startGuideHandle(item)"
          ) 立即操作
</template>
<script>
import { ref, watch } from '@vue/composition-api'
import { dataSource, guideCode } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useCreate from '@/hooks/usePop/useCreate'
import store from '@/store'

export default {
  setup(props, { root }) {
    const { state: { menuPermisssions } } = store
    const { credit: { getGuideList } } = ajaxStore
    // 当前步骤
    const active = ref(0)
    // create
    const createState = useCreate()
    // 设置当前步骤
    const _setCurrent = data => {
      const operationModules = data.map(item => item.operationModule)
      if (operationModules.indexOf('CREDIT_DELIVERY') > -1) active.value = guideCode.CREDIT_DELIVERY
      else if (operationModules.indexOf('CREDIT_ORDER') > -1) active.value = guideCode.CREDIT_ORDER
      else if (operationModules.indexOf('CREDIT_ACCOUNT') > -1) active.value = guideCode.CREDIT_ACCOUNT
      else if (operationModules.indexOf('CREDIT_APPLY') > -1) active.value = guideCode.CREDIT_APPLY
      else if (operationModules.indexOf('CREDIT_SET') > -1) active.value = guideCode.CREDIT_SET
    }
    // 判断是否有权限，无权限active+1
    const getIsPower = value => {
      const { menuTag } = dataSource[value] || {}
      if (!menuTag) return
      if (menuPermisssions && !menuPermisssions[menuTag]) {
        active.value = active.value + 1
      }
    }
    // 触发权限判断，针对菜单切换
    menuPermisssions && root.$nextTick(() => getIsPower(active.value))
    // 当数据变化时判断权限
    watch(
      () => active.value,
      value => getIsPower(value)
    )
    // 获取操作记录
    useAsync({
      request: getGuideList,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          if (!data || data.length === 0) return
          _setCurrent(data)
        }
      }
    })
    // 前往页面开始引导
    const startGuideHandle = item => {
      if (!menuPermisssions[item.menuTag]) return
      const { hasGuide, operationModule } = item || {}
      hasGuide !== 1 && createState.doResult({ operationModule })
      root.$router.push({ name: item.name, query: hasGuide === 1 ? { hasGuide } : {} })
    }

    return {
      active,
      dataSource,
      startGuideHandle,
      menuPermisssions
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './steps.styl';
</style>
