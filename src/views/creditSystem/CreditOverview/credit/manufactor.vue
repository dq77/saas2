<template lang="pug">
.manufactor(v-loading="loading")
  .manufactor-content
    div.manufactor-item(
      v-for="(item, index) in dataSource"
      :key="index"
    )
      img.manufactor-item-logo(:src="item && item.logo ? item.logo : ''")
      div.manufactor-item-info
        .manufactor-item-text
          span {{ item && item.title ? item.title : '' }}（万元）
          //- 暂时屏蔽后两个toast提示
          el-tooltip(v-if="index === 0", effect="dark", :content="item && item.content ? item.content : ''", placement="bottom-start")
            img(:src="`${$assetsBaseUrl}/creditSystem/overview/info.png`")
        .manufactor-item-money {{ item && item.money ? item.money : '0' }}
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    loading: Boolean
  }
}
</script>
<style lang="stylus" scoped>
@import './manufactor.styl';
</style>
