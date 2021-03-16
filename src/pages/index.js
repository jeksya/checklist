import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CategoryContext } from './context/category';
import { GlobalContext } from './context';
import useStyles from './style';
import Header from './header';
import Body from './body';
import Nav from './nav';


export default function LandingPage() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<CategoryContext>
				<GlobalContext>
					<Header open={open} handleDrawerOpen={handleDrawerOpen}/>
					<Nav open={open} handleDrawerClose={handleDrawerClose} />
					<Body open={open}/>
				</GlobalContext>
			</CategoryContext>
		</div>
	);
}