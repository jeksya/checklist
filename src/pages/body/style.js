import { makeStyles } from '@material-ui/core/styles';
export const useSGridtyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding:0
	},
	paper: {
		height: 140,
		width: 100
	},
	control: {
		padding: theme.spacing(2),
	},
	contentTodo: {
		float: 'left',
		height: '50px',
		width: '330px',
		position: 'relative'
	},
	paperContainer: {
		background: '#eee'
	}
}));