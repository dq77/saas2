<template lang="pug">
.page-main
  .content_box
    Header(:title="'应收基本信息'" :left="20")
    .content_form
      CreateRecord(ref="createRecordRef")
  Sure(:loading="loading" @sureHandle="sureHandle")
</template>
<script>
import { ref } from '@vue/composition-api'
import CreateRecord from './create'
import Header from '../../../components/header'
import Sure from '@/components/qjd/sure'
import useSubmit from './useSubmit'

export default {
  components: {
    CreateRecord,
    Header,
    Sure
  },
  setup(props, { root: { $router, $route } }) {
    // customerId
    const { query: { customerId } } = $route
    // ref
    const createRecordRef = ref()
    // success
    const success = () => $router.push({ name: 'Collection' })
    // useSubmit
    const {
      loading,
      sureHandle,
    } = useSubmit({ createRecordRef, success, customerId })

    return {
      loading,
      createRecordRef,
      sureHandle,
    }
  },
}
</script>
<style lang="stylus" scoped>
.content_box
  position relative
  height 100%
  padding-bottom 40px
  background #fff
  .content_upload
    position absolute
    top 20px
    right 30px
  .content_form
    width 500px
    padding 20px 0 0 20px
  .content_btns
      display flex
      justify-content center
</style>
