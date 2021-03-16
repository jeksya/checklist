import makeStore from '../store';
import moment from 'moment';

const initialState = {
	data: {
		cat1: {
			todo: {
				id: "todo",
				list: [
					{ id: "1",
						text: "Make coffee",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date().setHours(-1)).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'M' }
				]
			},
			doing: {
				id: "doing",
				list: []
			},
			done: {
				id: "done",
				list: []
			}
		},
		cat2: {
			todo: {
				id: "todo",
				list: []
			},
			doing: {
				id: "doing",
				list: []
			},
			done: {
				id: "done",
				list: []
			}
		}
	}
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_DATA':
			return {
				...state,
				data: action.payload
			}
		default:
			return state
	}
}

const [
	GlobalContext,
	useGlobalStore,
	useGlobalDispatch
] = makeStore(reducer, initialState)

export { GlobalContext, useGlobalStore, useGlobalDispatch }