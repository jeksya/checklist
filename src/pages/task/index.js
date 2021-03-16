import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AttachFile, DeleteOutlined, Edit, MoreVert } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './style';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CardContent } from '@material-ui/core';

const getAvatarClass = (classes, priority) => {
	let avatar = classes.avatarRed;
	if(priority === 'L') {
		avatar = classes.avatarGreen;
	}
	if(priority === 'M') {
		avatar = classes.avatarYellow;
	}
	return avatar;
}

let getMoveToSections = (column) => {
	return ['todo', 'doing', 'done'].filter((val)=>{
		return val !== column
	});
}

const Task = ({task, handleDelete, onEditClick, column, moveTask}) => {

	const classes = useStyles();
	const availableSectionsToMove = getMoveToSections(column);

	const onDelete = (id) => {
		handleDelete(id);
	}
	const onEdit = (id) => {
		onEditClick(id);
	}
	const moveTaskTo = (id, to) => {
		moveTask(id, to);
	}

	let avatar = getAvatarClass(classes, task.priority);
	return (
		<div className={classes.taskWrapper}>
			<Card id ={task.id} className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={avatar}>
							{task.priority}
						</Avatar>
					}
					action={
						<PopupState variant="popper" popupId="demo-popup-popper">
							{(popupState) => (
								<div>
									<IconButton id={'vertial_id_' + task.id} aria-label="settings" {...bindToggle(popupState)}>
										<MoreVert />
									</IconButton>
									<Popper {...bindPopper(popupState)} transition>
										{({ TransitionProps }) => (
											<Fade {...TransitionProps} timeout={350}>
												<Paper>
													<div {...bindToggle(popupState)} >
														<List component="nav" aria-label="secondary mailbox folders">
															{

																availableSectionsToMove.map((col) => {
																	return<ListItem key={'move' + task.id + 'to' + col}
																		onClick={moveTaskTo.bind(this, task.id, col)}
																		className={classes.moveToSections}
																		button>
																		<ListItemText primary={col} />
																	</ListItem>
																})

															}
														</List>
													</div>
												</Paper>
											</Fade>
										)}
									</Popper>
								</div>
							)}
						</PopupState>
					}
					title={task.text}
					subheader={moment(task.dueDate).format('YYYY-MM-DD HH:mm:ss')}
				/>
				<CardContent>
					{
						task.description
					}
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="share">
						<AttachFile />
					</IconButton>
					<IconButton aria-label="share" onClick={onEdit.bind(this, task.id)}>
						<Edit />
					</IconButton>
					<IconButton aria-label="share" className={classes.iconButton} onClick={onDelete.bind(this, task.id)}>
						<DeleteOutlined />
					</IconButton>
				</CardActions>
			</Card>
		</div>
	);
}
export default Task;

Task.propTypes = {
	column: PropTypes.string.isRequired,
	moveTask: PropTypes.func.isRequired,
	onEditClick: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
};