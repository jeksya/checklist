import makeStore from '../store';
import moment from 'moment';

const initialState = {
	data: {
		cat1: {
			todo: {
				id: "todo",
				list: [
					{ id: "1",
						text: "Take shower",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'H'
					},
					{ id: "2",
						text: "Make coffee",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date().setHours(-1)).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'M' },
					{ id: "3",
						text: "Walk dogs",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date().setHours(-2)).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'L' }
				]
			},
			doing: {
				id: "doing",
				list: [
					{ id: "4",
						text: "do this",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date().setHours(-3)).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'M' },
					{ id: "5",
						text: "do that",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date().setHours(-4)).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'M' },
					{ id: "6",
						text: "redo all",
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
						dueDate: moment(new Date().setHours(-5)).format('YYYY-MM-DD HH:mm:ss'),
						priority: 'L' }
				]
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