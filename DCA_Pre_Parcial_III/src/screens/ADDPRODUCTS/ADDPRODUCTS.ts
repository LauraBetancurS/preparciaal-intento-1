import AddForm from '../../components/addForm/addForm';
import '../../components/addForm/addForm';
import { HomeButton } from '../../components/homeButton/homeButton';
import '../../components/homeButton/homeButton';
import { AddScreenButton } from '../../components/addScreenButton/addScreenButton';
import '../../components/addScreenButton/addScreenButton';
import { ModifyScreenButton } from '../../components/modifyScreenButton/modifyScreenButton';
import '../../components/modifyScreenButton/modifyScreenButton';

class AddProducts extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            // Create a container for the form
            const formContainer = this.ownerDocument.createElement('section');
            formContainer.className = 'form-container';

            const navigateButtonsContainer = this.ownerDocument.createElement('div');
            navigateButtonsContainer.className = 'navigate-buttons-container';
            const homeButton = this.ownerDocument.createElement('home-button') as HomeButton;
            const addScreenButton = this.ownerDocument.createElement('add-screen-button') as AddScreenButton;
            const modifyScreenButton = this.ownerDocument.createElement('modify-screen-button') as ModifyScreenButton;
            navigateButtonsContainer.appendChild(homeButton);
            navigateButtonsContainer.appendChild(addScreenButton);
            navigateButtonsContainer.appendChild(modifyScreenButton);
            formContainer.appendChild(navigateButtonsContainer);

            //  Create an instance of the AddForm component
            const addFormComponent = this.ownerDocument.createElement('add-form') as AddForm;
            formContainer.appendChild(addFormComponent);

            // Append the form container to the shadow root
            this.shadowRoot.appendChild(formContainer);
        }
    }
}

customElements.define('app-add-products', AddProducts);