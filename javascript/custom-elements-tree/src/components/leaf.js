import { LitElement, html } from 'lit-element';

class Leaf extends LitElement {
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
      <div>It's a leaf. The id of this leaf is ${this.id}.</div>`;
  }
}

customElements.define('my-leaf', Leaf);
