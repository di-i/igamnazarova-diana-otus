import { LitElement, html } from 'lit-element';

export class MyRoot extends LitElement {
  static get properties() {
    return {
      items: { type: String },
    };
  }

  render() {
    let tree = {};
    try {
      tree = JSON.parse(this.items);
    } catch (e) {
      console.error(e);
    }

    return (
      ('id' || 'items') in tree &&
      html`
        <style>
          div {
            margin-top: 50px;
            margin-left: 50px;
          }
        </style>
        <div>
          ${Object.entries(tree).map((el) => {
            let key = el[0];
            let value = el[1];
            if (key === 'id') {
              return html`<my-tree id=${value}></my-tree>`;
            }
            if (key === 'items') {
              return value.map(
                (val) =>
                  html`<my-root items="${JSON.stringify(val)}"></my-root>`,
              );
            }
          })}
        </div>
      `
    );
  }
}

// Register the element with the browser
customElements.define('my-root', MyRoot);
