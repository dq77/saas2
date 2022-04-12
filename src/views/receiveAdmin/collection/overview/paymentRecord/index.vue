<template lang="pug">
.page-main
  .content_box
    .content_form
      CreatePayMentRecord(ref="createPayMentRecordRef")
  Sure(:loading="loading" @sureHandle="sureHandle")
</template>
<script>
import { ref } from '@vue/composition-api'
import CreatePayMentRecord from './create'
import Sure from '@/components/qjd/sure'
import useSubmit from './useSubmit'
// 批量导入

export default {
  components: {
    CreatePayMentRecord,
    Sure
  },
  setup(props, { root: { $router, $route } }) {
    // customerId
    const { query: { customerId } } = $route
    // ref
    const createPayMentRecordRef = ref()
    // success
    const success = () => $router.push({ name: 'Collection' })
    // useSubmit
    const {
      loading,
      sureHandle,
    } = useSubmit({ createPayMentRecordRef, success, customerId })

    return {
      loading,
      createPayMentRecordRef,
      sureHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.content_box
  position relative
  display flex
  height 100%
  padding 0 0 40px 20px
  background #fff
  .content_upload
    position absolute
    top 20px
    right 30px
  .content_form
    width 500px
    padding-top 20px
</style>
