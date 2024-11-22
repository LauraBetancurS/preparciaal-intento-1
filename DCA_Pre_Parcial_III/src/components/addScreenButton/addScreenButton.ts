import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export class AddScreenButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.navigateToAddProductScreen = this.navigateToAddProductScreen.bind(this); // Asegurar contexto
    }

    connectedCallback() {
        this.render();
    }

    async navigateToAddProductScreen() {
        try {
            const response = await navigate(Screens.ADDPRODUCTS);
            if (response) {
                dispatch(response);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error navigating to add product screen:', error);
            return false;
        }
    }

    render() {
        if (this.shadowRoot) {
            // Limpia el Shadow DOM antes de renderizar
            this.shadowRoot.innerHTML = '';

            // Crea estilos encapsulados
            const style = document.createElement('style');
            style.textContent = `
                .add-screen-button {
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .add-screen-button:hover {
                    background-color: #0056b3;
                }
            `;

            // Crea el botón
            const button = document.createElement('button');
            button.textContent = 'Add Product';
            button.className = 'add-screen-button';

            // Añade evento al botón
            button.addEventListener('click', this.navigateToAddProductScreen);

            // Añade los elementos al shadowRoot
            this.shadowRoot.append(style, button);
        }
    }
}

customElements.define('add-screen-button', AddScreenButton);
export default AddScreenButton;
