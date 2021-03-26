import { LitElement, html } from 'lit-element';

class Tree extends LitElement {
  static get properties() {
    return {
      id: { type: String },
    };
  }

  render() {
    return html` <style>
        div {
          margin-left: 20px;
        }
      </style>
      <div>
        It's a tree.
        <my-leaf id=${this.id}></my-leaf>
      </div>`;
  }
}

customElements.define('my-tree', Tree);
