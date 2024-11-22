import { dispatch, addObserver, appState } from '../../store/index';
import { getProductsAction } from '../../store/actions';
import Products, { AttributeProducts } from '../../components/products/products';
import '../../components/products/products';
import { HomeButton } from '../../components/homeButton/homeButton';
import '../../components/homeButton/homeButton';
import { AddScreenButton } from '../../components/addScreenButton/addScreenButton';
import '../../components/addScreenButton/addScreenButton';
import { ModifyScreenButton } from '../../components/modifyScreenButton/modifyScreenButton';
import '../../components/modifyScreenButton/modifyScreenButton';

class ModifyProducts extends HTMLElement {
    private productsContainer?: HTMLElement;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    async connectedCallback() {
        if (appState.products.length === 0) {
            const action = await getProductsAction();
            if (action) {
                dispatch(action);
            }
        }
        this.render();
    }

    async renderProducts() {
        if (!this.productsContainer) return; // Check if the container exists

        if (!appState.products || !Array.isArray(appState.products)) {
            console.log('No products found');
            return;
        }

        this.productsContainer.innerHTML = ''; // Clean container

        appState.products.forEach((product: any) => {
            const productComponent = this.ownerDocument.createElement('products-component') as Products;
            productComponent.setAttribute(AttributeProducts.url, product.url);
            productComponent.setAttribute(AttributeProducts.album, product.album);
            productComponent.setAttribute(AttributeProducts.artist, product.artist);
            productComponent.setAttribute(AttributeProducts.price, product.price.toString());
            productComponent.setAttribute(AttributeProducts.quantity, product.quantity.toString());
            productComponent.classList.add('product');
            this.productsContainer?.appendChild(productComponent);
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ''; // Clean the shadowRoot

            const homeContainer = this.ownerDocument.createElement('section');
            homeContainer.className = 'home-container';

            const navigateButtonsContainer = this.ownerDocument.createElement('div');
            navigateButtonsContainer.className = 'navigate-buttons-container';
            const homeButton = this.ownerDocument.createElement('home-button') as HomeButton;
            const addScreenButton = this.ownerDocument.createElement('add-screen-button') as AddScreenButton;
            const modifyScreenButton = this.ownerDocument.createElement('modify-screen-button') as ModifyScreenButton;
            navigateButtonsContainer.appendChild(homeButton);
            navigateButtonsContainer.appendChild(addScreenButton);
            navigateButtonsContainer.appendChild(modifyScreenButton);
            homeContainer.appendChild(navigateButtonsContainer);

            this.productsContainer = this.ownerDocument.createElement('div');
            this.productsContainer.className = 'products-container';

            homeContainer.appendChild(this.productsContainer);
            this.shadowRoot.appendChild(homeContainer);

            this.renderProducts();
        }
    }
}

customElements.define('app-modify-products', ModifyProducts);