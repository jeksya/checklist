import React from 'react';
import PropTypes from 'prop-types';
import { useCategoryDispatch } from '../context/category';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from '../style';
import { ChevronRight } from '@material-ui/icons';

const Nav = ({open, handleDrawerClose}) => {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useCategoryDispatch();
	const setCategory = (id) =>{
		dispatch({
			type: 'UPDATE_CATEGORY',
			payload: id
		});
	}

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{['Category 1', 'Category 2'].map((text, index) => (
					<ListItem button key={text.replace(' ', '') + '_' + index + 1} onClick={setCategory.bind(this, 'cat' + (index + 1))}>
						<ListItemIcon><ChevronRight /></ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}
export default Nav;

Nav.propTypes = {
	open: PropTypes.bool,
	handleDrawerClose: PropTypes.func.isRequired
};