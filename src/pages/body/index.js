import React, {useState} from 'react';
import { useGlobalStore, useGlobalDispatch } from '../context';
import { useCategoryStore } from '../context/category';
import useStyles from '../style';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Task from '../task';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Add } from '@material-ui/icons';
import { useSGridtyles } from './style';
import loadable from '@loadable/component';

const Modal = loadable(() => import('./modal'));
const allSections = ['todo', 'doing', 'done'];

const createTasksList = (list, handleDelete, onEditClick, column, moveTask) => {
	return list.map((val) => {
		const o = {
			priority: val.priority,
			dueDate: val.dueDate,
			text: val.text,
			description: val.description,
			id: val.id,
		}
		return <Task key={'task_' + val.id}
			task={o}
			handleDelete={handleDelete}
			onEditClick={onEditClick}
			column={column}
			moveTask={moveTask}/>
	})
}

const findNode = (id, data, category) => {
	let allData = {...data};
	let found = [];
	allSections.forEach((val) => {
		if(found.length === 0) {
			found = [...allData[category][val].list].filter((val) => {
				return parseInt(val.id, 10) === parseInt(id, 10)
			});
		}
	});
	return found.length > 0 ? found[0] : [];
}

const removeNode = (id, data, category) => {
	let todos = {...data};
	allSections.forEach((val) => {
		let newlist = [...todos[category][val].list].filter((val) => {
			return parseInt(val.id, 10) !== parseInt(id, 10)
		});
		todos[category][val].list = newlist;
	});
	return todos;
}

const moveNodeById = (data, nodeToMove, columnToAdd, category) => {
	let todos = {...data};
	let newlist = [...todos[category][columnToAdd].list, nodeToMove];
	todos[category][columnToAdd].list = newlist;
	return todos;
}

const updateNodeDate = (data, newData, category) => {
	let allData = {...data};
	allSections.forEach((val) => {
		let list = [];
		[...allData[category][val].list].forEach((val) => {
			if(parseInt(val.id, 10) === parseInt(newData.id, 10)) {
				list.push(newData);
			} else {
				list.push(val);
			}
		});
		allData[category][val].list = list;
	});
	return allData;
}

const Body = () => {

	const { category } = useCategoryStore();
	const { data } = useGlobalStore();
	const dispatch = useGlobalDispatch();
	const classes = useStyles();
	const classesGrid = useSGridtyles();
	const [open, setOpen] = useState(false);
	const [editData, setEditData] = useState(null);

	const onEditClick = (id) => {
		let itemToEdit = findNode(id, data, category);
		setEditData(itemToEdit);
		setOpen(true);
	}

	const moveTask = (id, columnToAdd) => {
		let nodeToMove = findNode(id, data, category);
		let dataWithOutNode = removeNode(id, data, category);
		let updatedList = moveNodeById(dataWithOutNode, nodeToMove, columnToAdd, category);
		dispatch({
			type: 'UPDATE_DATA',
			payload: updatedList
		});
	}

	const handleDelete = (id) => {
		let updatedList = removeNode(id, data, category);
		dispatch({
			type: 'UPDATE_DATA',
			payload: updatedList
		});
	}

	const todo = createTasksList(data[category].todo.list, handleDelete, onEditClick, 'todo', moveTask);
	const doing = createTasksList(data[category].doing.list, handleDelete, onEditClick, 'doing', moveTask);
	const done = createTasksList(data[category].done.list, handleDelete, onEditClick, 'done', moveTask);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setEditData(null);
		setOpen(false);
	};

	const onSubmit = (newData) => {
		let d = {...data};
		let newlist = [...d[category].todo.list, newData];
		d[category].todo.list = newlist;
		dispatch({
			type: 'UPDATE_DATA',
			payload: d
		});
	};

	const onEditSubmit = (newData) => {
		const newVersion = updateNodeDate(data, newData, category)
		dispatch({
			type: 'UPDATE_DATA',
			payload: newVersion
		});
	};

	return (
		<main
			className={clsx(classes.content, {
				[classes.contentShift]: open,
			})}
		>
			<div className={classes.drawerHeader} />

			<Grid container className={classesGrid.root} spacing={5}>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={2}>
						<Grid item>
							<Paper className={classesGrid.paperContainer}>
								<div className={classesGrid.contentTodo} >
									<Typography id="toDoTitle" variant="h6" className={classes.cardTitle}>
										To Do
									</Typography>
									<IconButton className={classes.floatRight} aria-label="settings" onClick={handleOpen}>
										<Add/>
									</IconButton>
								</div>

								<div style={{clear: 'both'}}>
									{
										todo
									}
								</div>
							</Paper>
						</Grid>

						<Grid item>
							<Paper className={classesGrid.paperContainer}>
								<div className={classesGrid.contentTodo} >

									<Typography variant="h6" className={classes.cardTitle}>
										Pending
									</Typography>
								</div>

								<div style={{clear: 'both'}}>
									{
										doing
									}
								</div>
							</Paper>
						</Grid>


						<Grid item>
							<Paper className={classesGrid.paperContainer}>
								<div className={classesGrid.contentTodo} >

									<Typography variant="h6" className={classes.cardTitle}>
										Done
									</Typography>
								</div>

								<div style={{clear: 'both'}}>
									{
										done
									}
								</div>
							</Paper>
						</Grid>


					</Grid>
				</Grid>
			</Grid>
			<Modal handleClose={handleClose} open={open} onSubmit={onSubmit} editData={editData} onEditSubmit={onEditSubmit}/>
		</main>
	)
}
export default Body;
