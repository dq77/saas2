<template lang="pug">
ul.teach_list
  li(
    v-for="(item, index) in (dataSource || [])"
    :key="index"
    @click="teachHandle(item)"
  )
    img.teach_list_img(:src="item.imgUrl")
    .teach_list_content
      .teach_list_title {{ item.title }}
      .teach_list_info
        span 共{{ item.num }} 章
        span {{ item.time }}
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { root }) {
    const teachHandle = item => root.$router.push({ name: item && item.name ? item.name : '' })

    return {
      teachHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.teach_list
  li
    width 269px
    height 205px
    cursor pointer
    float left
    background #FFFFFF
    border 1px solid #EAEBEE
    margin-right 16px
    .teach_list_img
      width 100%
      height 114px
    .teach_list_content
      box-sizing border-box
      padding 16px 16px 0 16px
      .teach_list_title
        font-size 16px
        font-weight 500
        color #383B42
        margin-bottom 16px
      .teach_list_info
        display flex
        justify-content space-between
        font-size 12px
        color #A8A8A8
    &:hover
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.05);
</style>
