import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Cdlc from 'cdlc_api';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../../actions/user';

const styles = () => ({
	button: {
		margin: '20px',
	},
	formContainer: {
		height: '100%',
		display: 'flex',
		alignItems: 'center'
	},
	form: {
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column'
	},
	input: {
		marginBottom: '10px',
	},
	progress: {
		margin: 'auto',
		height: '40px',
		width: '40px'
	},
	error: {
		color: 'red',
		fontSize: '12px'
	}
});

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		loading: false,
		error: false
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
			error: false
		});
		axios.post('https://cors-anywhere.herokuapp.com/https://app.cremedelacreme.io/api/user/signin', 
			{"Mail":this.state.email,"Password":this.state.password})
		.then((response) => {
			console.log(response);
			this.setState({
				email: '',
				password: '',
				loading: false
			});
			this.props.onChangeUser(response.data)
		})
		.catch(error => {
			this.setState({
				loading: false,
				error: true
			});
		});
	}

	handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		});
	}

	render () {
		const { email, password, loading, error } = this.state;
		const { classes, user } = this.props;
		return (
			<div className={classes.formContainer}>
				<form onSubmit={this.handleSubmit} className={classes.form}>
					<TextField id="email" type="email" name="email" value={email} onChange={this.handleChange} className={classes.input} placeholder="Email" />
					<TextField id="password" type="password" name="password" value={password} onChange={this.handleChange} className={classes.input} placeholder="Mot de passe" />
					{error && <p className={classes.error}>Quelque chose n'a pas fonctionné ...</p>}
					{loading ?
						<CircularProgress className={classes.progress} />
						: <Button variant="contained" color="primary" className={classes.button} type="submit">
							Envoyer
						</Button>
					}
				</form>
			</div>
		)
	}
}

export default connect(state => state)(withStyles(styles)(LoginForm));