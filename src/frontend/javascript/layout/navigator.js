class NavigatorElement extends HTMLElement {
  constructor() {
    super();
  }
  handleNavigatorType() {
    if (window.innerWidth < 1080) {
      this.setAttribute("type", "header");
    } else {
      this.setAttribute("type", "drawer");
    }
  }
  connectedCallback() {
    this.innerHTML = `
        <nav>
            <ui></ui>
        </nav>
        `;
    window.addEventListener("resize", this.handleNavigatorType);
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.handleNavigatorType);
  }
}

customElements.define('navigator-widget', NavigatorElement);

class Navigator {
    constructor(items){
        this.element = document.createElement('navigator-widget');
        this.element.items = items;
    }
}
