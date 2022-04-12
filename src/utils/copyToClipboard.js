export const copyToClipboard = (text, _then) => {
  const oInput = document.createElement('input')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand('Copy')
  oInput.remove()
  _then && _then()
}
