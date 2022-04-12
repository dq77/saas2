<template lang="pug">
div
  .org-btn
    el-button(type="primary" @click="addFirst" weblogs-anchor='supplyChain-factory-classify-create') 添加一级分类
  div(v-for='(item,idx) in allTreeData' :key="idx")
    .p-tree(v-loading='loading')
      el-tree(
				id='fixtree'
				ref='tree'
				:data="[item]"
				:props="defaultProps"
				:default-expanded-keys='expandedKeys'
				highlight-current
				@node-click="handleNodeClick"
				@node-expand='handleNodeExpand'
				@node-collapse='handleNodeCollapse'
				node-key='id'
			)
        span.p-tree-node(slot-scope="{ node, data }")
          .org-tree-left
            span {{ data.name }}
          .p-edit
            el-tooltip(placement="top" content='删除' v-if='!data.subCategorys || (data.subCategorys && !data.subCategorys.length)')
              el-button.p-link-color(type="text" size="mini" @click.stop="() => remove(node, data)" weblogs-anchor="supplyChain-factory-classify-item-delete")
                i.p-icon.el-icon-remove-outline
            template()
              el-tooltip(placement="top" content='修改')
                el-button.p-link-color(type="text" size="mini" @click.stop="() => edit(node, data)" weblogs-anchor="supplyChain-factory-classify-item-edit")
                  i.p-icon.el-icon-edit-outline
              el-tooltip(placement="top" content='添加' v-if="data.level<5")
                el-button.p-link-color(type="text" size="mini" @click.stop="() => append(node,data)" weblogs-anchor="supplyChain-factory-classify-item-create")
                  i.p-icon.el-icon-circle-plus-outline
              el-tooltip(placement="top" content='置顶')
                el-button.p-link-color(type="text" size="mini" @click.stop="() => handleTop(node,data)" weblogs-anchor="supplyChain-factory-classify-item-top")
                  i.p-icon.el-icon-top
  el-dialog(
      :title='dialogNode.title'
      :visible.sync='dialogNode.visible'
      :close-on-click-modal='false'
      width='440px'
      :before-close='handleNodeChange'
    )
      div.p-warning(v-if='dialogNode.status === "delete"')
        i.el-icon-warning
        span 是否删除{{dialogNode.form.classifyName}}类目？
      el-form.p-form(
        label-width='100px'
        ref='dialogNodeForm'
        :rules='dialogNode.rules'
        :model='dialogNode.form'
        )
        el-form-item(v-if='dialogNode.status === "add" || dialogNode.status === "edit"' label='上级分类')
          span {{dialogNode.form.parentName}}
        el-form-item(v-if='dialogNode.status === "add" || dialogNode.status === "edit"' label='分类名称' prop='name' required)
          el-input(v-model='dialogNode.form.name' maxlength='32'  clearable)
      .p-dialog-footer(slot="footer")
        el-button(@click='dialogNode.visible = false' :weblogs-anchor='dialogNode.form.parentId?"":"supplyChain-factory-classify-create-cancle"') 取 消
        el-button(type='primary' @click="handleNodeChangeConfirm" :loading='dialogNode.loading' :weblogs-anchor='dialogNode.form.parentId?"":"supplyChain-factory-classify-create-sure"') 确 定
</template>

<script>
import { mapState } from 'vuex'
import SelectAccountList from '@/components/SelectAccountList'
export default {
  components: { SelectAccountList },
  props: {
    searchId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      data: [],
      currentKey: null,
      expandedKeys: [],
      allTreeData: [],
      defaultProps: {
        children: 'subCategorys',
        label: 'name',
        disabled: 'disabled'
      },
      dialogNode: {
        loading: false,
        visible: false,
        title: '添加部门',
        status: 'add',
        form: {
          name: '',
          parentId: -1,
          parentName: '',
          outsideId: '',
          id: -1, // 当前id
          orderWeight: 0, // 权重排序 暂未使用
          classifyName: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入部门名称', trigger: ['change', 'blur'] },
          ],
        }
      }
    }
  },
  computed: {
    ...mapState(['permissions'])
  },
  watch: {
    async searchId(val) {
      console.log('chuanjinlai d ', val)
      if (val) {
        console.log('searchIdsearchId', val)
        this.loading = true
        const res = await this.ajaxStore.factory.getParentCategoryById({id: val})
        this.loading = false
        this.allTreeData = res.data.data
      } else {
        this.getAllCategory()
      }
    }
  },
  methods: {
    // 置顶
    async handleTop(node, data) {
      console.log('nodeeeeee', node)
      console.log('dataaaaaa', data)
      this.loading = true
      const res = await this.ajaxStore.factory.topCategory({id: data.id})
      this.loading = false
      if (res.data && res.data.code === '0') {
        this.getAllCategory()
      }
    },
    handleNodeChange () {
      this.dialogNode.visible = !this.dialogNode.visible
    },
    addExpandedKeys (id) {
      if (this.expandedKeys.indexOf(id) === -1) {
        this.expandedKeys.push(id)
      }
    },
    removeExpandedKeys (id) {
      this.expandedKeys.forEach((item, index) => {
        if (item === id) {
          this.expandedKeys.splice(index, 1)
        }
      })
    },
    handleNodeExpand (data) {
      this.addExpandedKeys(data.id)
    },
    handleNodeCollapse(data) {
      const idList = [data.id, ...this.getTreeNodeId(data.childrens)]
      idList.forEach(item => {
        this.removeExpandedKeys(item)
      })
    },
    changeSelectAccountList(value) {
      this.dialogNode.form.supervisorId = value || null
    },
    getTreeNodeId (data) {
      const idList = []
      if (data && data.length) {
        data.forEach((item, index) => {
          idList.push(item.id)
          if (item.childrens && item.childrens.length) {
            this.getTreeNodeId(item.childrens)
          }
        })
      }
      return idList
    },
    handleNodeClick (data) {
      if (data.disabled) { // 样式
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.currentKey)
        })
        return
      }
      this.currentKey = data.id
      this.$emit('clickNode', data.id)
    },
    async addFirst() {
      this.dialogNode.visible = true
      this.dialogNode.title = '添加1级类目'
      this.dialogNode.status = 'add'
      this.dialogNode.form.parentName = '-'
      this.dialogNode.form.parentId = ''
      this.$refs.dialogNodeForm && this.$refs.dialogNodeForm.resetFields()
    },
    async append(node, data) {
      console.log('dataaaaaaa', data)
      this.dialogNode.visible = true
      this.dialogNode.title = `添加${data.level + 1}级类目`
      this.dialogNode.status = 'add'
      this.dialogNode.form.parentName = data.name
      this.dialogNode.form.parentId = data.id
      this.$refs.dialogNodeForm && this.$refs.dialogNodeForm.resetFields()
    },
    remove(node, data) {
      this.dialogNode.title = '删除类目'
      this.dialogNode.status = 'delete'
      this.dialogNode.form.classifyName = data.name
      this.dialogNode.form.id = data.id
      this.dialogNode.visible = true
      if (node.parent.level === 1) { // 首层公司名
        this.currentKey = null // 初始化
      } else {
        this.currentKey = node.parent.data.id
      }
    },
    async edit(node, data) {
      console.log('dataaaaaaa', data)
      this.loading = true
      const res = await this.ajaxStore.factory.getCategoryDetail({id: data.parentId})
      this.loading = false
      this.dialogNode.form.parentName = res.data.data ? res.data.data.name : '-'
      this.dialogNode.title = '编辑类目'
      this.dialogNode.status = 'edit'
      this.dialogNode.form.name = data.name
      this.dialogNode.form.id = data.id
      this.dialogNode.visible = true
      this.currentKey = data.id
    },
    handleTreeData (data) {
      if (data && data.length) {
        data.forEach((item, index) => {
          this.$set(item, 'isEdit', false)
          if (item.childrens && item.childrens.length) {
            this.handleTreeData(item.childrens)
          }
        })
      }
    },
    handleNodeChangeConfirm () {
      this.$refs.dialogNodeForm && this.$refs.dialogNodeForm.validate(async valid => {
        if (valid) {
          let confirm = false
          let message = '添加成功!'
          switch (this.dialogNode.status) {
            case 'add':
              confirm = await this.addPorgTree()
              message = '添加成功!'
              break
            case 'delete':
              confirm = await this.deletePorgTree()
              message = '删除成功!'
              break
            case 'edit':
              confirm = await this.editPorgTree()
              message = '修改成功!'
              break
          }
          if (confirm) {
            this.$message({
              type: 'success',
              message: message
            })
            this.handleNodeChange()
            this.getAllCategory()
          }
        }
      })
    },
    // 获取所有分类
    async getAllCategory() {
      this.loading = true
      const res = await this.ajaxStore.factory.getAllCategory()
      this.loading = false
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        this.allTreeData = data
      }
      console.log('rrrrrrrr', res)
    },

    async addPorgTree () {
      this.dialogNode.loading = true
      const data = {
        name: this.dialogNode.form.name,
        parentId: this.dialogNode.form.parentId
      }
      const res = await this.ajaxStore.factory.addCategory(data)
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        this.currentKey = res.data.data
        this.addExpandedKeys(this.dialogNode.form.parentId)
        return true
      }
    },
    async deletePorgTree () {
      this.dialogNode.loading = true
      const res = await this.ajaxStore.factory.delCategory({ id: this.dialogNode.form.id })
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        this.removeExpandedKeys(this.dialogNode.form.id)
        return true
      }
    },
    async editPorgTree () {
      this.dialogNode.loading = true
      const data = {
        name: this.dialogNode.form.name,
        // parentDepartmentId: this.dialogNode.form.parentId,
        id: this.dialogNode.form.id
      }
      const res = await this.ajaxStore.factory.editCategory(data)
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        return true
      }
    },
  },
  mounted() {
    this.getAllCategory()
  }
}
</script>

<style lang="stylus" scoped>
link-color = #4a71f0
#fixtree
    display inline-block
.p-tree-node
    flex 1
    display flex
    align-items center
    justify-content space-between
    font-size 14px
    padding-right 8px
.p-warning
    margin-top 20px
    display flex
    i
        margin-right 10px
        font-size 20px
.p-form
    margin-top 20px
.p-icon
    font-size 20px
.p-edit
    margin-left 5px
/deep/ .el-form-item__content
    width 260px
    // height 24px
/deep/ .el-tree.el-tree--highlight-current
    min-width 100%
</style>
<style lang="stylus">
.p-edit .el-button+.el-button
    margin-left 5px
.p-tree .el-tree.el-tree--highlight-current > .el-tree-node > .el-tree-node__content
    background-color #fff
    cursor default
.p-tree .el-tree.el-tree--highlight-current > .el-tree-node .el-tree-node__content
    height 32px
.org-btn
    display flex
    justify-content flex-end
    padding-bottom 20px
.org-tree-left
    display flex
    align-items center
    span
        margin-right 6px
    img
        width 16px
        height 16px
</style>
