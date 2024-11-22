import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { addProductAction } from '../../store/actions';

interface Product {
    id: string;
    url: string;
    album: string;
    artist: string;
    price: number;
    quantity: number;
}

class AddForm extends HTMLElement {
    private credentials: Product;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.credentials = {
            id: this.generateUniqueId(),
            url: '',
            album: '',
            artist: '',
            price: 0,
            quantity: 0
        };

        // Bind methods to this
        this.submitForm = this.submitForm.bind(this);
        this.changeUrl = this.changeUrl.bind(this);
        this.changeAlbum = this.changeAlbum.bind(this);
        this.changeArtist = this.changeArtist.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
    }

    private generateUniqueId(): string {
        // Generate a timestamp-based ID with a random suffix
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000);
        return `${timestamp}-${random}`;
    }

    connectedCallback() {
        this.render();
    }

    changeUrl(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.url = input.value;
    }

    changeAlbum(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.album = input.value;
    }

    changeArtist(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.artist = input.value;
    }

    changePrice(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.price = Number(input.value);
    }

    changeQuantity(e: Event) {
        const input = e.target as HTMLInputElement;
        this.credentials.quantity = Number(input.value);
    }

    validateForm(): boolean {
        if (!this.credentials.url || !this.credentials.album || !this.credentials.artist) {
            alert('Please fill all text fields');
            return false;
        }

        if (isNaN(this.credentials.price) || this.credentials.price <= 0) {
            alert('Please enter a valid price');
            return false;
        }

        if (isNaN(this.credentials.quantity) || this.credentials.quantity <= 0) {
            alert('Please enter a valid quantity');
            return false;
        }

        return true;
    }

    async submitForm() {
        if (!this.validateForm()) return;

        // Ensure the ID is set before submitting
        if (!this.credentials.id) {
            this.credentials.id = this.generateUniqueId();
        }

        const response = await addProductAction(this.credentials);
        if (response) {
            dispatch(response);
            dispatch(navigate(Screens.HOME));
        } else {
            alert('Could not create the product');
        }
    }

    render() {
        if (!this.shadowRoot) return;

        const container = document.createElement('section');
        container.className = 'form-container';

        const form = document.createElement('div');
        form.className = 'form-div';

        const title = document.createElement('h1');
        title.innerText = 'Add New Product';
        title.className = 'form-title';
        form.appendChild(title);

        // URL Input
        const pUrl = document.createElement('input');
        pUrl.placeholder = 'URL';
        pUrl.type = 'url';
        pUrl.className = 'form-input';
        pUrl.required = true;
        pUrl.addEventListener('change', this.changeUrl);
        form.appendChild(pUrl);

        // Album Input
        const pAlbum = document.createElement('input');
        pAlbum.placeholder = 'Album';
        pAlbum.className = 'form-input';
        pAlbum.required = true;
        pAlbum.addEventListener('change', this.changeAlbum);
        form.appendChild(pAlbum);

        // Artist Input
        const pArtist = document.createElement('input');
        pArtist.placeholder = 'Artist';
        pArtist.className = 'form-input';
        pArtist.required = true;
        pArtist.addEventListener('change', this.changeArtist);
        form.appendChild(pArtist);

        // Price Input
        const pPrice = document.createElement('input');
        pPrice.placeholder = 'Price';
        pPrice.type = 'number';
        pPrice.min = '0';
        pPrice.step = '0.01';
        pPrice.className = 'form-input';
        pPrice.required = true;
        pPrice.addEventListener('change', this.changePrice);
        form.appendChild(pPrice);

        // Quantity Input
        const pQuantity = document.createElement('input');
        pQuantity.placeholder = 'Quantity';
        pQuantity.type = 'number';
        pQuantity.min = '1';
        pQuantity.step = '1';
        pQuantity.className = 'form-input';
        pQuantity.required = true;
        pQuantity.addEventListener('change', this.changeQuantity);
        form.appendChild(pQuantity);

        // Save Button
        const save = document.createElement('button');
        save.innerText = 'Start now';
        save.className = 'form-button';
        save.addEventListener('click', this.submitForm);
        form.appendChild(save);

        container.appendChild(form);
        this.shadowRoot.appendChild(container);
    }
}

customElements.define('add-form', AddForm);
export default AddForm;