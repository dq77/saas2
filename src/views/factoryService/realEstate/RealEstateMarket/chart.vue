<template lang="pug">
Card.p-card(:title='title' noWrap v-loading='loading')
  .p-list-right(slot='headRight')
    //- 选择类别
    el-select.p-select-label(v-model='formData[category]' @change='changeType')
      el-option(:key='item.key' :label='item.label' :value='item.key' v-for='item in options.business[category]')
    //- 选择时间
    el-select.p-select-label(v-model='formData[`${category}Time`]' @change='changeType(currentType)')
      el-option(:key='item.value' :label='item.label' :value='item.value' v-for='item in options.year')
  .p-module-content
    .p-chart-main(v-if='currentSource.length')
      .p-charts(:id='`${category}Charts`')
      .u-unit 单位：{{currentItem[currentIndex].unit}}
    .u-empty-tips(v-else) 暂无信息
</template>

<script>
import Card from '@/components/Card'
import { computed, watch, reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    mode: {
      type: String,
    },
    title: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  components: { Card },
  setup(props, { emit }) {
    const state = reactive({
      currentIndex: 0, // 当前小类别所在组的序号
      currentSource: [], // 点前数据源
    })

    const changeType = (type) => {
      emit('changeType', type)
    }

    // 当前大类别
    const currentItem = computed(() => {
      return props.options.business[props.category]
    })

    // 当前小类别
    const currentType = computed(() => {
      return props.formData[props.category]
    })

    watch(
      () => currentType.value,
      (value) => {
        currentItem.value.map((item, index) => {
          if (item.key === value) {
            state.currentIndex = index
          }
        })
      }
    )
    watch(
      () => props.dataSource,
      (value) => {
        state.currentSource = value
      }
    )

    return {
      changeType,
      currentItem,
      currentType,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.p-select-label
  width 100px
  margin-right 10px
.p-select-label:last-child
  margin-right 0
.p-charts
  min-height 250px
.u-unit
  color #494949
  position absolute
  top 5%
  right 20px
  width 100px
  text-align right
</style>
