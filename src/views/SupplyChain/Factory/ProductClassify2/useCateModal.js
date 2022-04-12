import useModal from 'hooks/useModal'
export default () => {
  const {
    visible,
    title,
    cancleHandle,
    openHandle,
    setTitle,
    detail,
    setDetail
  } = useModal()
  const cateHandle = (item, type) => {
    openHandle()
    setTitle(type === 'add' ? `添加${item.level + 1}级类目` : type === 'edit' ? `编辑${item.level + 1}级类目` : '删除类目')
    setDetail({item, type})
  }
  return {
    visible,
    title,
    detail,
    cancleHandle,
    cateHandle,
    // orgCancleHandle,
    // orgOperateHandle
  }
}
