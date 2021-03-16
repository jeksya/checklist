import React from 'react'

export default function makeStore(reducer, initialState) {

	const storeContext = React.createContext(initialState)
	const dispatchContext = React.createContext(initialState)

	const StoreProvider = ({children}) => {
		const [store, dispatch] = React.useReducer(reducer, initialState)

		return (
			<dispatchContext.Provider value={dispatch}>
				<storeContext.Provider value={store}>
					{children}
				</storeContext.Provider>
			</dispatchContext.Provider>
		)
	}

	function useStore() {
		return React.useContext(storeContext)
	}

	function useDispatch() {
		return React.useContext(dispatchContext)
	}

	return [StoreProvider, useStore, useDispatch]
}