<template lang="pug">
.page-main
	Card(noTitle style='margin-bottom: 10px;')
		.label-box  关键词
		.input-box
			el-cascader(
        v-model="keyword"
        style='width:40%'
        :props="props"
        filterable
        clearable
        :before-filter="beforeFilter"
        :options="options"
        @change="handleChange"
        )
			//- el-button(type="primary" style='margin-left:10px') 搜索
	Card(noTitle)
		OrganTree(:searchId="searchId")
</template>

<script>
import Card from '@/components/Card'
import OrganTree from './organTree'
export default {
  components: {
    Card,
    OrganTree,
  },
  data () {
    return {
      keyword: '',
      query: {},
      options: [],
      searchId: '',
      props: {
        // lazy: true,
        label: 'name',
        value: 'id',
        children: 'subCategorys',
      }
    }
  },
  methods: {
    async beforeFilter(val) {
      const res = await this.ajaxStore.factory.categorySearch({keyword: val})
      this.options = res.data.data
      console.log('---------', this.options)
      if (!this.options.length) {
        this.searchId = ''
      }
    },
    async handleChange(val) {
      console.log('vallllllll', val)
      this.searchId = val[0]
    }
  },
  async created() {
  }
}
</script>

<style lang="stylus" scoped>
	.label-box
		margin-bottom 10px
</style>
