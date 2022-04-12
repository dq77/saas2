<template lang="pug">
  .product-quill-edit
    quill-editor(:content='detailHtml' @change='onEditorChange($event)' :options='quillOption' ref='quillTextEditor' style='min-height:120px')
    el-upload(style='display:none;'
      :action='uploadImgUrl'
      :auto-upload='true'
      :on-change='onChangeQuill'
      :on-success='onSuccessQuill'
      list-type='picture-card'
      ref='quillUploader'
      class='product-quill-edit_img-upload'
      :accept="acceptFile"
    )
</template>

<script>
import { baseUrl } from '@/utils/config'
import { quillEditor} from 'vue-quill-editor'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Quill.register('modules/imageResize', ImageResize)

export default {
  props: {
    detailHtml: {
      type: String
    }
  },
  computed: {
    uploadImgUrl: () => `${baseUrl}/saas-ofc/org/goods/goodsDetailPicUpload`,
    downloadImgUrl: () => `${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=`,
  },
  data() {
    return {
      quillOption: {
        theme: 'snow', // 主题 snow（默认） 和 bubble
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，，删除线
              // ['blockquote', 'code-block'], // 应用， 代码块
              [{ header: 1 }], // 标题 1，2表示字体大小
              [{ list: 'ordered' }, { list: 'bullet' }], // 列表
              // [{ script: 'sub' }, { script: 'super' }], //上下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              // [{ direction: 'rtl' }], // 文本方向
              // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              // [{ font: [] }], // 字体
              [{ align: [] }], // 对齐方式
              ['clean'], // 清除字体样式
              ['image'] // // 链接，图片，媒体 'link', 'image', 'video'
            ],
            handlers: {
              image: (value) => {
                if (value) {
                  document.querySelector('.product-quill-edit_img-upload input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          imageResize: {
            // displayStyles: {
            //   backgroundColor: 'black',
            //   border: 'none',
            //   color: 'white'
            // },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
        },
        placeholder: '请输入产品描述',
      },
      allImgsKeyList: [],
      allRemoveKeyList: [],
      acceptFile: '.jpg,.png,.JPG,.PNG'
    }
  },
  methods: {
    onEditorChange(quill) {
      const {html} = quill
      // console.log(quill, 'quill')
      this.$emit('update:detailHtml', html)
      const imgsKeysObj = this.getRemoveImgKeys(this.allImgsKeyList, html)
      const {removeKeysListArr, imgsKeysListArr} = imgsKeysObj
      this.allImgsKeyList = imgsKeysListArr
      this.allRemoveKeyList = removeKeysListArr
      this.removeImg(this.allRemoveKeyList[0])
    },
    async removeImg(keys) {
      // 删除图片逻辑
      if (!keys) return
      const res = await this.$http.factory.deleteQuillImg({ detailPicFileKey: keys })
      if (res.data && res.data.code === '0') {}
    },
    onChangeQuill(file, fileList) {},
    onSuccessQuill(response, file, fileList) {
      const {code, data, message} = response
      if (code === '0') {
        const quill = this.$refs.quillTextEditor.quill
        const len = quill.getSelection().index
        const imgSrc = `${this.downloadImgUrl}${data}`
        quill.insertEmbed(len, 'image', imgSrc)
        quill.setSelection(length + 1)
      } else {
        this.$message.error(message)
      }
    },
    getRemoveImgKeys(imgsKey, html) {
      const dom = document.createElement('DIV')
      dom.innerHTML = html
      const imgDom = dom.getElementsByTagName('img')
      const url = window.location.host
      const imgsKeysListArr = []
      // console.log(imgDom, 'imgDom')
      imgDom.length && imgDom.forEach(item => {
        // debugger
        if (item.src.indexOf(url) > -1) {
          const reg = new RegExp('(^|&)fileKey=([^&]*)(&|$)')
          const regStr = item.src.split('?')[1].match(reg)
          imgsKey.splice(imgsKey.indexOf(regStr[2]), 1)
          imgsKeysListArr.push(regStr[2])
        }
      })
      return {
        removeKeysListArr: imgsKey,
        imgsKeysListArr
      }
    },
  },
  components: {
    quillEditor
  },
}
</script>
