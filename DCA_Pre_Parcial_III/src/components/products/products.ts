import { addObserver } from "../../store/index";
import EditButton from "../editButton/editButton";
import "../editButton/editButton";
import DeleteButton from "../deleteButton/deleteButton";
import "../deleteButton/deleteButton";

export enum AttributeProducts {
    'url' = 'url',
    'album' = 'album',
    'artist' = 'artist',
    'price' = 'price',
    'quantity' = 'quantity',
};

class Products extends HTMLElement {
    url?: string;
    album?: string;
    artist?: string;
    price?: number;
    quantity?: number;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(AttributeProducts) as Array<AttributeProducts>;
    }

    attributeChangedCallback(propName: AttributeProducts, oldValue: string | number | undefined, newValue: string | number | undefined) {
        switch (propName) {
            case AttributeProducts.url:
                this.url = newValue as string;
                break;
            case AttributeProducts.album:
                this.album = newValue as string;
                break;
            case AttributeProducts.artist:
                this.artist = newValue as string;
                break;
            case AttributeProducts.price:
                this.price = newValue ? Number(newValue) : 0; // Convert to number
                break;
            case AttributeProducts.quantity:
                this.quantity = newValue ? Number(newValue) : 0; // Convert to number
                break;
            default:
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        addObserver(this);
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
            const container = this.ownerDocument.createElement('div');
            container.className = 'products-card';

            const img = this.ownerDocument.createElement('img');
            img.className = 'products-img';
            img.src = this.url || 'No image available';
            img.alt = this.album || 'No album available';
            container.appendChild(img);

            const album = this.ownerDocument.createElement('h2');
            album.className = 'products-album';
            album.textContent = this.album || 'No album available';
            container.appendChild(album);

            const artist = this.ownerDocument.createElement('p');
            artist.className = 'products-artist';
            artist.textContent = this.artist || 'No artist available';
            container.appendChild(artist);

            const price = this.ownerDocument.createElement('p');
            price.className = 'products-price';
            price.textContent = `Price: $${this.price || 0}`;
            container.appendChild(price);

            const quantity = this.ownerDocument.createElement('p');
            quantity.className = 'products-quantity';
            quantity.textContent = `Quantity: ${this.quantity || 0}`;
            container.appendChild(quantity);

            const editButton = this.ownerDocument.createElement('edit-button') as EditButton;
            container.appendChild(editButton);

            const deleteButton = this.ownerDocument.createElement('delete-button') as DeleteButton;
            container.appendChild(deleteButton);

            this.shadowRoot.appendChild(container);
        }
    }
}
customElements.define('products-component', Products);
export default Products;
