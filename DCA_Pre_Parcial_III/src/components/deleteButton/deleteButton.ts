export class DeleteButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            const button = this.ownerDocument.createElement('button');
            button.textContent = 'Delete';
            button.className = 'delete-button';
            this.shadowRoot.appendChild(button);
        }
    }
}
customElements.define('delete-button', DeleteButton);
export default DeleteButton;