import { Actions } from '../types/store';

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case Actions.NAVIGATE:
			return {
				...currentState,
				screen: payload,
			};

		case Actions.ADDPRODUCTS:
			return {
				...currentState,
				products: [...currentState.products, payload],
			};

		case Actions.GETPRODUCTS:
			return {
				...currentState,
				products: payload || [], // Make sure there is always an array
			};

		default:
			return currentState;
	}
};