import makeStore from '../store';

const initialState = {
	category: 'cat1'
};

export const reducerCategory = (state, action) => {
	switch (action.type) {
		case 'UPDATE_CATEGORY':
			return {
				...state,
				category: action.payload
			}
		default:
			return state
	}
}

const [
	CategoryContext,
	useCategoryStore,
	useCategoryDispatch
] = makeStore(reducerCategory, initialState)

export { CategoryContext, useCategoryStore, useCategoryDispatch }