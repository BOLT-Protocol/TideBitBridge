class ScafoldElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <header></header>
        <main></main>
        <footer></footer>
        <div class="popup__background">
            <div class="popup__content"></div>
        </div>
        `;
    if (this.header) this.header.render(this.children[0]);
    if (this.body) {
      if (Array.isArray(this.body)) {
        this.body.forEach((element) => element.render(this.children[1]));
      } else {
        this.body.render(this.children[1]);
      }
    }
    if (this.footer) this.footer.render(this.children[2]);
  }
  /**
     * @param {Boolean} value
     * @param {HTMLElement} element
     */
  set openPopup(value, element) {
    this.setAttribute('open', value);
    if(value){
        element.render(this.children[3].children[0]);
    }else{
        this.children[3].children[0].replaceChildren();
    }
  }

  
}

customElements.define("scaffold-widget", ScaffoldElement);

class Scaffold {
  constructor(header, body, footer) {
    this.element = document.createElement("scaffold-widget");
    this.element.header = header;
    this.element.body = body;
    this.element.footer = footer;
    document.body.replaceChildren();
    document.body.insertAdjacentElement("beforeend", this.element);
  }
  /**
   * @param {HTMLElement} element
   */
  openPopup(element) {
      this.element.openPopup(true, element);
  }
  closePopup() {
      this.element.openPopup(false);
  }
}
