import { LitElement, html, css, unsafeCSS, nothing } from "lit";
import styles from "@/main.css?inline";
import FormValidator from "../form-validator";

export class Input extends LitElement {
  static properties = {
    type_: { type: String },
    id: { type: String },
    width: { type: String },
    label: { type: String },
    value: { type: String },
    placeholder: { type: String },
    _errorMessage: { type: String, attribute: false },
  };

  constructor() {
    super();
    this.type_ = "text";
    this.id = "no name";
    this.width = "100%";
    this.label = "";
    this.value = "";
    this.placeholder = "...";
    this._errorMessage = "";
  }

  dispatchInput = (e) => {
    const { value } = e.target;
    const { id } = this;
    const validatorFn = FormValidator.get(id);

    const { isValid, errMsg } = validatorFn(value);

    this._errorMessage = !isValid ? errMsg : "";

    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value, id },
        bubbles: true,
      })
    );
  };

  render() {
    const {
      type_,
      id,
      width,
      label,
      value,
      placeholder,
      dispatchInput,
      _errorMessage,
    } = this;

    return html`
      <style>
        :host {
          width: ${unsafeCSS(width)};
        }
      </style>

      <div class="flex flex-col mb-2">
        <label
          for="name"
          class="w-full text-sm text-purple-200
          ${label === "_invisible" && "opacity-0"}"
          >${label}</label
        >
        <input
          id=${id}
          class="w-full pb-1 border-b border-purple-400 text-base text-white placeholder:text-base placeholder:text-purple-300 bg-inherit focus:outline-none"
          type=${type_}
          placeholder=${placeholder}
          .value=${value}
          @input=${dispatchInput}
        />
        ${_errorMessage
          ? html`<div class="text-red-600 text-xs">${_errorMessage}</div>`
          : nothing}
      </div>
    `;
  }

  static get styles() {
    return unsafeCSS(styles);
  }
}
