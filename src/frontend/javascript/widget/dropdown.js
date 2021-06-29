import { randomID } from "../utils/utils";

class DropdownElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const id = randomID(6);
    this.classList = [`dropdown`];
    this.innerHTML = `
        <input type="radio" class="dropdown__toggle" id="${id}">
        <label for="pannel-close"></label>
        <label class="dropdown__button" for="${id}">
            <span class="text margin__right--small">
                ${this.data.category}
            </span>
            <i class="fas fa-caret-down"></i>
        </label>
        <ul class="dropdown__menu"></ul>
        `;
    this.data.items.forEach((item) => {
      if (item.title) {
        this.children[3].insertAdjacentHTML(
          "beforeend",
          `<div class="dropdown__item--title">${item.title}</div>`
        );
      }
      item.items.forEach((subItem) => {
        this.children[3].insertAdjacentHTML(
          "beforeend",
          `<li class="dropdown__item"><a href="${subItem.action}">${subItem.name}</a></li>`
        );
      });
    });
  }

  /**
   * @param {String} name
   */
  set controller(name) {
    this.children[0].name = name;
  }
}

customElements.define("drop-down", DropdownElement);

class Dropdown {
  constructor(data) {
    this.element = document.createElement("drop-down");
    this.element.data = data;
  }
  /**
   * @param {String} name
   */
  set controller(name) {
    this.element.controller = name;
  }
  render(parent) {
    parent.insertAdjacentElement("beforeend", this.element);
  }
}

export default Dropdown;
