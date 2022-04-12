<template lang="pug">
.credit-detail-dialog
  el-drawer(:title='dialogTitle' :visible.sync="dialogVisible" :before-close='handleNodeChange'  size='50%')
    el-scrollbar(style="width: 100%; height: 100%;")
      EvaluationDetail(:mode='mode' :taskId='taskId' v-if='dialogVisible')
</template>

<script>
import EvaluationDetail from '../components/evaluationDetail'
import { reactive, toRefs, watch } from '@vue/composition-api'
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: String,
    },
    mode: {
      type: String,
    },
  },
  components: {
    EvaluationDetail
  },
  setup(props, { emit }) {
    const state = reactive({
      dialogTitle: '评估详情',
      dialogVisible: false,
    })

    const handleNodeChange = () => {
      emit('close')
    }

    watch(
      () => props.dialogShow,
      (value) => {
        state.dialogVisible = value
      }
    )

    return {
      handleNodeChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
