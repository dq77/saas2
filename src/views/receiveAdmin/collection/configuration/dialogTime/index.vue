<template lang="pug">
el-dialog(
  title='设置时间段(天)'
  width='415px'
  custom-class='el-dialog-new'
  :visible='visible'
  @close='clickClose'
)
  el-form
    el-form-item
      div(style='text-align: center;')
        el-input-number(
          width='100px'
          controls-position='right'
          :min='0'
          :max='732'
          :step='1'
          :step-strictly='true'
          :precision='0'
          :disabled='true'
          v-model='startDay'
        )
        span(style='margin: 0 10px;') ~
        el-input-number(
          width='100px'
          controls-position='right'
          :min='startDay + 1'
          :max='732'
          :step='1'
          :step-strictly='true'
          :precision='0'
          v-model='endDay'
        )
  div(slot='footer')
    el-button(
      plain
      :loading='submitState.createLoading || submitState.editLoading'
      @click='clickClose'
    ) 取消
    el-button(
      type='primary'
      :loading='submitState.createLoading || submitState.editLoading'
      @click='clickSure'
    ) 确定
</template>

<script>
import { defineComponent, ref, reactive, toRefs, watch } from '@vue/composition-api'
import useSubmit from './useSubmit'

export default defineComponent({
  components: {},
  props: {
    mode: String, // create, edit
    visible: {
      type: Boolean,
      default: false
    },
    repayDayType: String,
    urgeWay: String,
    editData: Object
  },
  setup(props, { emit }) {
    const startDay = ref(null)
    const endDay = ref(null)

    const submitState = useSubmit({
      startDay,
      endDay
    })

    const state = reactive({
      submitState
    })

    const clickClose = () => emit('close')

    const clickSure = () => {
      if (props.mode === 'create') {
        submitState.createHandle(props, () => emit('success', 'create'))
      } else if (props.mode === 'edit') {
        submitState.editHandle(props, () => emit('success', 'edit'))
      }
    }

    const initData = () => {
      startDay.value = props.editData.startDay
      endDay.value = props.editData.endDay
    }

    initData()

    watch(
      [() => props.editData.startDay, () => props.editData.endDay],
      () => initData()
    )

    return {
      startDay,
      endDay,
      ...toRefs(state),
      clickClose,
      clickSure
    }
  },
})
</script>

<style lang="stylus" scoped>

</style>
