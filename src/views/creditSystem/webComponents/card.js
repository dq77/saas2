const cardTemPlate = document.createElement('template')

cardTemPlate.innerHTML = `
  <style>
    :host {
      position: relative;
      width: 252px;
      height: 124px;
      margin-right: 23px;
      border-radius: 2px;
    }
    .web-card {
      width: 252px;
      height: 124px;
      position: relative;
    }
    .web-card:hover img {
      opacity: 1;
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      transition: all .5s;
    }
    .operate_content {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 9;
      box-sizing: border-box;
      padding: 22px 20px 0 20px;
      font-size: 14px;
      font-weight: 500;
      color: var(--fontColor);
      line-height: 20px;
      margin-bottom: 3px
    }
    .operate_info {
      font-size: 12px;
      font-weight: 400;
      color: #6D7278;
      line-height: 17px;
      margin-bottom: 8px;
      white-space: nowrap;
    }
  </style>
  <div class="web-card">
    <img src="" />
    <div class="operate_content">
      <div class="operate_title"></div>
      <div class="operate_info"></div>
      <slot></slot>
    </div>
  </div>
`

class WebCard extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'closed' })
    this._shadowRoot.appendChild(cardTemPlate.content.cloneNode(true))
    this.$card = this._shadowRoot.querySelector('.web-card')
    this.$img = this._shadowRoot.querySelector('img')
    this.$title = this._shadowRoot.querySelector('.operate_title')
    this.$info = this._shadowRoot.querySelector('.operate_info')
  }

  connectedCallback() {
    this.$card.style.background = this.bg
    this.$img.setAttribute('src', this.url)
    this.$title.innerHTML = this.title
    this.$info.innerHTML = this.info
  }

  get bg() {
    return this.getAttribute('bg') || ''
  }

  get url() {
    return this.getAttribute('url') || ''
  }

  get title() {
    return this.getAttribute('title') || ''
  }

  get info() {
    return this.getAttribute('info') || ''
  }
}

window.customElements.define('web-card', WebCard)
