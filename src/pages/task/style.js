import { makeStyles } from '@material-ui/core/styles';
import { red, green, orange } from '@material-ui/core/colors';

/* eslint-disable no-unused-vars */
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		position: 'relative',
		margin: 'auto'
	},
	avatarRed: {
		backgroundColor: red[500],
	},
	avatarGreen: {
		backgroundColor: green[500],
	},
	avatarYellow: {
		backgroundColor: orange[500],
	},
	iconButton: {
		position: 'absolute',
		right: '5px',
		bottom: '6px'
	},
	taskWrapper: {
		width: '90%',
		margin: 'auto',
		paddingBottom: 15
	}
}));

export default useStyles;