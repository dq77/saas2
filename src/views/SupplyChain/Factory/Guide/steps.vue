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
        //- div(v-if="Number(active) >= index && state.menuPermisssions && state.menuPermisssions[item.menuTag]" style="padding: 0 20px;")
        //-   .again_go(v-if="Number(active) > index" @click="() => startGuideHandle(item)") 再次前往
        //-   .custom_button(v-else @click="() => startGuideHandle(item)") 立即操作
        //- div(v-else v-for='(val, i) in item.oprateBtnObj' :key='i' style='display:inline-block')
        //-   template(v-if='Number(active) >= index && state.menuPermisssions && state.menuPermisssions[val.menuTag]')
        //-     //- span {{Number(active)}} {{index}} {{i}} {{currentItem.children[i].flag}}
        //-     .btn_block(v-if="Number(active) > index || (Number(active) === index && currentItem.children[i].flag)")
        //-         span(style='color:#494949;font-weigth:400') {{val.label}}：
        //-         span(@click="() => startGuideHandle(val)") 再次前往
        //-     .btn_block(v-else)
        //-       span(style='color:#494949;font-weigth:400') {{val.label}} ：
        //-       span.custom_button(style='display:inline-block')(@click="() => startGuideHandle(val)") 立即操作
        template(v-if='item.oprateBtnObj')
          div(v-for='(val, i) in item.oprateBtnObj' :key='i' style='display:inline-block')
            template(v-if='Number(active) >= index')
              .btn_block(v-if="Number(active) > index || (Number(active) === index && currentItem.children && currentItem.children[i].flag)")
                  span(style='color:#494949;font-weigth:400') {{val.label}}：
                  span(style='cursor: pointer;' @click="() => startGuideHandle(val)") 再次前往
                  //- span(style='cursor: pointer;' @click="() => startGuideHandle(val)" :disable='state.menuPermisssions[val.menuTag]') 再次前往
              .btn_block(v-else)
                span(style='color:#494949;font-weigth:400') {{val.label}} ：
                span.custom_button(style='cursor: pointer;display:inline-block')(@click="() => startGuideHandle(val)") 立即操作
                //- span.custom_button(style='cursor: pointer;display:inline-block' :disable='state.menuPermisssions[val.menuTag]')(@click="() => startGuideHandle(val)") 立即操作
        template(v-else)
          div(v-if="Number(active) >= index" style="padding: 0 20px;")
            .again_go(v-if="Number(active) > index" @click="() => startGuideHandle(item)") 再次前往
            .custom_button(v-else @click="() => startGuideHandle(item)") 立即操作
</template>
<script>
import { ref, watch } from '@vue/composition-api'
import { dataSource } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import store from '@/store'

export default {
  setup(props, { root }) {
    const { state } = store
    const { factory: { getGuideList } } = ajaxStore
    // 当前元素
    const currentItem = ref({})
    // 当前步骤
    const active = ref(0)
    // 设置当前步骤
    const _setCurrent = data => {
      // data
      // currentItem.value = tempData.find(item => item.status === false)
      currentItem.value = data.find(item => item.status === false)
      if (!currentItem.value) {
        active.value = data.length
        return
      }
      if (currentItem.value.steps !== 1) active.value = currentItem.value.steps - 1
    }
    // 判断是否有权限，无权限active+1
    const getIsPower = value => {
      const { menuTag } = dataSource[value] || {}
      if (!menuTag) return
      if (state.menuPermisssions && !state.menuPermisssions[menuTag]) {
        active.value = active.value + 1
      }
    }
    // 监听权限数据-触发权限判断，针对刷新
    watch(
      () => state.menuPermisssions,
      val => {
        // debugger
        val && getIsPower(active.value)
      }
    )
    // 触发权限判断，针对菜单切换
    state.menuPermisssions && root.$nextTick(() => getIsPower(active.value))
    // 当数据变化时判断权限
    watch(
      () => active.value,
      value => {
        getIsPower(value)
      }
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
      // if (!state.menuPermisssions[item.menuTag]) return
      root.$router.push({ name: item.name })
    }

    return {
      active,
      dataSource,
      startGuideHandle,
      state,
      currentItem,
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './steps.styl';
</style>
