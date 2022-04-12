const buttonTemplate = document.createElement('template')

buttonTemplate.innerHTML = `
  <style>
    :host {
      display: inline-block; 
      color: var(--fontColor);
      cursor: pointer;
      width: 90px;
      height: 32px;
    }
    .web-button {
      outline:0; 
      border:0; 
      width:100%;
      height:100%;
      padding: 0;
      user-select: none;
      cursor: pointer;
      line-height: 32px;
      background: #fff;
      font-size: var(--smallSize);
      font-weight: 500;
      text-align: center;
    }
    .web-button:hover {
      background: var(--defaultColor);
      color: #fff;
    }
  </style>
  <div class="web-button">
    <slot></slot>
  </div>
`

class WebButton extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'closed' })
    this._shadowRoot.appendChild(buttonTemplate.content.cloneNode(true))
  }
}

window.customElements.define('web-button', WebButton)
