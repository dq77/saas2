<template lang="pug">
.page-main
  .help-box
    .help-content
      el-scrollbar(ref="docLeftScrollbar" style=" height: 100%;")
        slot
    Menu(:dataSource="data" :activeId="activeId")
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api'
import Menu from '../menu'
import { datas } from './config'

export default {
  name: 'MarkDown',
  components: {
    Menu
  },
  setup(props, { root }) {
    const { $route: { name } } = root
    const docLeftScrollbar = ref(null)
    const activeId = ref('')
    const data = computed(() => datas[name].data)
    const navContents = ref([])
    // 所有锚点元素的 offsetTop
    const offsetTopArr = ref([])
    const onScroll = () => {
      // 获取所有节点高度 - 仅一次
      if (offsetTopArr.value.length === 0) {
        docLeftScrollbar.value.update()
        navContents.value = document.querySelectorAll('.help-content .tag')
        navContents.value.forEach(item => {
          offsetTopArr.value.push(item.offsetTop)
        })
      }
      // 获取当前文档流的 scrollTop
      const scrollTop = docLeftScrollbar.value.wrap.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.value.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr.value[n]) {
          navIndex = n
        }
      }
      activeId.value = navContents.value[navIndex] ? navContents.value[navIndex].id : ''
    }
    onMounted(() => {
      if (docLeftScrollbar.value) {
        let timer = null
        docLeftScrollbar.value.wrap.onscroll = () => {
          if (!timer) {
            clearTimeout(timer)
            onScroll()
            timer = setTimeout(function() { timer = null }, 1000)
          }
        }
      }
    })
    return {
      data,
      activeId,
      docLeftScrollbar,
    }
  },
}
</script>
<style lang="stylus" scoped>
.help-box
  width 100%
  display flex
  box-sizing border-box
  .help-content
    height calc(100vh - 184px)
    flex 1
    background #fff
    padding-bottom 20px
</style>
