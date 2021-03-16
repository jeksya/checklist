import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import moment from 'moment';

function getModalStyle() {
	const top = 40;
	const left = 45;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 315,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 232,
		marginBottom: '40px'
	},
	button: {
		marginTop: '40px',
		position: 'relative',
		float: 'right'
	},
}));

export default function ToDoModal({handleClose, open, onSubmit, editData, onEditSubmit}) {

	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [text, setText] = React.useState({
		priority: 'L',
		dueDate: new Date(),
		text: '',
		description: '',
		id: (Math.random() * 2000),
		isEdited: false
	});

	const [error, setError] = React.useState({
		text: '',
		date: ''
	});

	useEffect(()=>{
		if(editData) {
			setText({
				priority: editData.priority,
				dueDate: editData.dueDate,
				text: editData.text,
				description: editData.description,
				id: editData.id,
				isEdited: true
			})
		}
	}, [editData])

	useEffect(()=>{
		setError({
			text: '',
			dueDate: ''
		})
		if(!editData){
			setText({
				priority: 'L',
				dueDate: new Date(),
				text: '',
				description: '',
				id: (Math.random() * 2000),
				isEdited: false
			});
		}
	}, [open, editData])

	const handleSubmit = (event) => {
		event.preventDefault();
		if(text.text.trim() === '') {
			setError({...error, text: 'Title is required.'});
			return;
		}
		var date = moment(text.dueDate);
		if(text.dueDate === '' || !date.isValid()) {
			setError({...error, dueDate: 'Date is required.'});
			return;
		}

		setError({date: '', text: ''});
		text.isEdited ? onEditSubmit(text) : onSubmit(text);
		handleClose();
	}

	const d = text.dueDate ? text.dueDate : new Date();
	const formatedDate = moment(d).format('YYYY-MM-DDTHH:mm');
	const buttonText = text.isEdited ? 'Update To Do' : 'Add To Do' ;

	const body = (<div style={modalStyle} className={classes.paper}>
		<h2 id="simple-modal-title">Add To Do Item</h2>
		<div>
			<form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="standard-error"
						label="To Do Title"
						error ={error.text.length === 0 ? false : true }
						value={text.text}
						className={classes.textField}
						helperText={error.text}
						onChange={(event) => {setText({...text, text: event.target.value})}}
					/>
				</div>
				<div>
					<TextField
						id="standard-error"
						label="Description"
						multiline
						value={text.description}
						className={classes.textField}
						onChange={(event) => {setText({...text, description: event.target.value})}}
					/>
				</div>
				<div>
					<TextField
						id="datetime-local"
						label="Due Date"
						type="datetime-local"
						value={formatedDate}
						onChange={(event) => {setText({...text, dueDate: event.target.value})}}
						className={classes.textField}
						error ={error.dueDate === '' ? false : true}
						helperText={error.dueDate}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div>
					<InputLabel id="demo-simple-select-label">Priority</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={text.priority}
						onChange={(event) => {setText({...text, priority: event.target.value})}}
					>
						<MenuItem value="L">L</MenuItem>
						<MenuItem value="M">M</MenuItem>
						<MenuItem value="H">H</MenuItem>
					</Select>
				</div>
				<div>
					<Button type="submit" variant="contained" color="primary" className={classes.button}>
						{
							buttonText
						}
					</Button>
				</div>
			</form>
		</div>
	</div>
	)


	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}

ToDoModal.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onEditSubmit: PropTypes.func.isRequired,
	editData: PropTypes.object,
};