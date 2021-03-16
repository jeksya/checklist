import React from 'react';
import PropTypes from 'prop-types';
import { useCategoryStore } from '../context/category';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from '../style';

const Header = ({open, handleDrawerOpen}) => {
	const classes = useStyles();
	const { category } = useCategoryStore();
	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					className={clsx(classes.menuButton, open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap>
					{
						category.replace('cat', 'Category ')
					}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
export default Header;

Header.propTypes = {
	open: PropTypes.bool,
	handleDrawerOpen: PropTypes.func.isRequired
};