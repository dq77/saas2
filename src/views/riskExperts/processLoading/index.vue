<template lang="pug">
.page-main
  .process-loading
    .circle-process
      el-progress(
        type='circle'
        :width='150'
        :stroke-width="10"
        :percentage="percentage"
        :color="'#3B68EF'"
      )
    .process-loading__text {{ statusText }}
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import useTimeout from 'hooks/useTimeout'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default {
  setup(props, { root }) {
    const state = reactive({
      percentage: 0,
      statusText: '评估进行中...',
      id: ''
    })
    const { formData } = root.$route.params
    const { mode } = root.$route.query
    const { perTimeout } = useTimeout()
    const startLoading = () => {
      perTimeout(() => {
        if (state.percentage < 99) {
          state.percentage++
          startLoading()
        }
      }, 30)
    }
    const { fastCreate, getResultById } = ajaxStore.riskExperts.creditEvaluation
    // 详情-接口

    const { doResult } = useAsync({
      request: getResultById,
      init: false,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          if (data) {
            state.percentage = 100
            state.statusText = '评估已完成'
            root.$router.replace({
              name: 'fastResult',
              query: {
                id: state.id
              }
            })
          } else {
            perTimeout(() => {
              doResult({
                id: state.id
              })
            }, 1000)
          }
        }
      }
    })

    const { doResult: doFastResult } = useAsync({
      request: fastCreate,
      init: false,
      successCallBack: ({ code, data, appPermissions }) => {
        if (code === '0') {
          state.id = data.id
          doResult({
            id: data.id
          })
        } else {
          root.$router.go(-1)
        }
      },
      errorCallBack: () => {
        root.$router.go(-1)
      }
    })

    if (mode === 'fast') {
      doFastResult(formData)
    }

    startLoading()

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.process-loading
  background #ffffff
  min-height 90vh
  padding-top 200px
  .circle-process
    position relative
    width 150px
    height 150px
    margin 0 auto 20px auto
  &__text
    font-size 24px
    color #494949
    text-align center
</style>
