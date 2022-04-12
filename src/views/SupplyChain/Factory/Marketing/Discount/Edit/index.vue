<template lang="pug">
.page-main
  .page-layout
    Header(
      title="活动信息"
      :line="true"
      style="margin-bottom: 20px"
    )
    Info(
      ref="createActivityRef"
      :type="type"
    )
    Header(
      title="活动产品"
      :line="true"
      style="margin-bottom: 20px"
    )
    ProductInfo(
      ref="tableRef"
      :type="type"
    )
  Sure(:loading="loading" @sureHandle="sureHandle(activityId)")
</template>

<script lang="ts">
import { ref, Ref } from '@vue/composition-api'
import Header from '@/components/qjd/header/index.vue'
import Sure from '@/components/qjd/sure/index.vue'
import Info from './info/index.vue'
import ProductInfo from './productInfo/index.vue'
import useSubmit from './useSubmit'
import useDetail from './useDetail'
export default {
  components: {
    Header,
    Sure,
    Info,
    ProductInfo
  },
  setup(props, {root: { $router, $route } }) {
    // id, type
    const activityId: string | undefined = ($route.query as any)?.activityId ?? undefined
    const type: string | undefined = ($route.query as any)?.type ?? undefined
    // ref
    const createActivityRef = ref<Ref>()
    const tableRef = ref<Ref>()
    // useDetail
    useDetail({createActivityRef, tableRef, type, activityId})
    const success = () => $router.push({ name: 'Activity' })
    // useSubmit
    const {
      loading,
      sureHandle,
    } = useSubmit({ createActivityRef, tableRef, success, type })
    return {
      createActivityRef,
      tableRef,
      loading,
      sureHandle,
      activityId,
      type
    }
  },
}
</script>
<style lang="stylus" scoped>
.page-layout
  height 100%
  background-color #fff
  padding 0 20px 20px
  margin-bottom: 40px
</style>


