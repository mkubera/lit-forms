import { LitElement, html, unsafeCSS, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import styles from "@/main.css?inline";
import "@/components/form/partials/app-input.js";

export class Form extends LitElement {
  static get properties() {
    return {
      fields: { type: Array },
      values: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.fields = [];
    this.values = [];
  }

  _dispatchSubmit(e) {
    e.preventDefault();

    const form = this.values;

    console.log(form);

    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: form,
        bubbles: true,
      })
    );
  }

  _handleInput(e) {
    const { id, value } = e.detail;
    const { values } = this;

    if (id && value) {
      const doesValueExist = Boolean(values.find((v) => id in v));
      const updateValue = values.map((v) => (id in v ? { [id]: value } : v));
      const addValue = [...values, { [id]: value }];

      this.values = doesValueExist ? updateValue : addValue;
    }
  }

  render() {
    const { fields, _handleInput, _dispatchSubmit } = this;

    return html`
      <style>
        :host {
          width: 500px;
        }
      </style>

      <form
        @submit=${_dispatchSubmit}
        class="w-full flex flex-wrap bg-purple-500 p-10 
        space-y-4 justify-between"
      >
        ${repeat(
          fields,
          (field) => field.id,
          ({ type_, id, width, label, placeholder }) => {

            return html`
              <app-input
                id=${id}
                type_=${type_}
                width=${width}
                label=${label}
                value=${this[id]}
                placeholder=${placeholder}
                @input=${_handleInput}
              ></app-input>
            `;
          }
        )}

        <button
          type="submit"
          class="w-full bg-white text-purple-500 px-4 py-2 rounded-md text-base"
        >
          Pay $25
        </button>
      </form>
    `;
  }

  static get styles() {
    return unsafeCSS(styles);
  }
}
