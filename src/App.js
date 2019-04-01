import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import LoginForm from './scenes/CDLC/LoginForm';
import {connect} from 'react-redux';
import {setUser} from './actions/user';

class App extends Component {
  state = {
    cdlc: false
  };

  setCdlc = () => {
    this.setState({
      cdlc: !this.state.cdlc
    })
  }

  onChangeUser = (user) => {
    this.props.dispatch(setUser(user));
    this.setState({
      cdlc: false
    })
  }

  render() {
    const { cdlc } = this.state;
    const {user} = this.props.userReducer;
    return (
      <div className="App">
        <header className="App-header"
                style={{
                  height: cdlc ? '70vh' : '100vh',
                  transition: 'height 0.5s'
                }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Freelance App</h1>
          {user && <h2>Bienvenue {user.FirstName} {user.LastName} ! </h2>}
          <div style={{display: 'flex'}}>
            <Button variant="contained" color="primary" onClick={this.setCdlc} style={{marginBottom: '20px', height: '35px'}}>
              Crème de la crème
            </Button>
            {user && <Button variant="contained" color="secondary" style={{marginBottom: '20px', height: '35px'}}>Voir mes missions</Button> }
          </div> 
        </header>
        {cdlc &&
          <div style={{height: '30vh'}}>
            <LoginForm onChangeUser={this.onChangeUser} />
          </div>
        }
      </div>
    );
  }
}

export default connect(state => state)(App);
