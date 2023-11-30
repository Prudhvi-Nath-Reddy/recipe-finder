import React, { Component } from 'react';
import utensilsIcon from './images/Icon utensils.png';
import cooking from './images/cooking.png';
import chef from './images/chef.gif';
import { Navigate } from 'react-router-dom';
import './LandingPage.css';
import axios from 'axios';

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signupPopup: false,
      browseRecipesPopup: false,
      isloggedin: false,
      signupUsername: '',
      signupPassword: '',
      signupConfirmPassword: '',
      loginUsername: '',
      loginPassword: '',
    };
  }

  handleOpenSignupPopup = () => {
    this.setState({ signupPopup: true });
  };

  handleCloseSignupPopup = () => {
    this.setState({ signupPopup: false });
  };

  handleOpenBrowseRecipesPopup = () => {
    this.setState({ browseRecipesPopup: true });
  };

  handleCloseBrowseRecipesPopup = () => {
    this.setState({ browseRecipesPopup: false });
  };

  handleCreateAccount = () => {
    if (this.state.signupPassword !== this.state.signupConfirmPassword) {
      alert('Password and Confirm Password do not match!');
      return;
    }

    console.log('Username:', this.state.signupUsername);
    console.log('Password:', this.state.signupPassword);
    try {
      axios.post("http://localhost:8000/signup", {
        username: this.state.signupUsername, password: this.state.signupPassword
      })
        .then(res => {
          if (res.data === "exist") {
            alert("alreadyexists")

          }
          else if (res.data === "notexist") {
            alert("not signed up")
          }

        })

    } catch (error) {

      console.log(error);

    }
    this.handleCloseSignupPopup();
  };

  handleLogin = () => {
    console.log('eneterd handle login');
    try {
      axios.post("http://localhost:8000/", {
        username: this.state.loginUsername, password: this.state.loginPassword
      })
        .then(res => {
          if (res.data === "crctpswd") {
            console.log("success")
            this.setState({ isloggedin: true });
            const { handleLogin } = this.props;
            handleLogin(this.state.loginUsername);
          }
          else if (res.data === "notexist") {
            alert("not signed up")
          }
          else if (res.data === "wrngpswd") {
            alert("wrong password")
          }
        })

    } catch (error) {
      alert("wrong details")
      console.log(error);

    }

    this.handleCloseBrowseRecipesPopup();
  };

  handleSignupUsernameChange = (event) => {
    this.setState({ signupUsername: event.target.value });
  };

  handleSignupPasswordChange = (event) => {
    this.setState({ signupPassword: event.target.value });
  };

  handleSignupConfirmPasswordChange = (event) => {
    this.setState({ signupConfirmPassword: event.target.value });
  };

  handleLoginUsernameChange = (event) => {
    this.setState({ loginUsername: event.target.value });
  };

  handleLoginPasswordChange = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  render() {
    const { theme } = this.props;

    return (
      <div>
        <div className='topcontainer'>
          <div className='logoContainer'>
            <img
              src={utensilsIcon}
              alt="Logo"
              className='logo'
            />
          </div>
          <button onClick={this.handleOpenSignupPopup} className='joinnowbutton'>Join Now</button>
          {/* Signup Popup */}
          {this.state.signupPopup && (
            <div className='popupBackground'>
              <div className='signuppopupContainer'>
                <div className='createaccount'>Create Account</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input className='signupinput' type="text" placeholder="Username" value={this.state.signupUsername} onChange={this.handleSignupUsernameChange} />
                  <input className='signupinput' type="password" placeholder="Password" value={this.state.signupPassword} onChange={this.handleSignupPasswordChange} />
                  <input className='signupinput' type="password" placeholder="Confirm Password" value={this.state.signupConfirmPassword} onChange={this.handleSignupConfirmPasswordChange} />
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button className='signupbutton' onClick={this.handleCreateAccount}>Create Account</button>
                    <button className='signupbutton' onClick={this.handleCloseSignupPopup}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Login Popup */}
          {this.state.browseRecipesPopup && (
            <div className='popupBackground'>
              <div className='signuppopupContainer'>
                <div className='createaccount'>Enter Credentials</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input className='signupinput' type="text" id="loginusername" placeholder="Username" value={this.state.loginUsername} onChange={this.handleLoginUsernameChange} />
                  <input className='signupinput' type="password" id="loginpassword" placeholder="Password" value={this.state.loginPassword} onChange={this.handleLoginPasswordChange} />
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button className='signupbutton' onClick={this.handleLogin}>
                      Submit
                    </button>
                    <button className='signupbutton' onClick={this.handleCloseBrowseRecipesPopup}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.isloggedin && <Navigate to='/home' />}
        </div>
        <div className='bottomcontainer'>
          <div className='column1'>
            <div style={{ fontWeight: 'bold', fontSize: '70px', fontFamily: 'Roboto' }}>
              Discover Delicious Recipes: Your Cooking Buddy
            </div>
            <div style={{ fontFamily: 'Roboto', fontSize: '20px', marginLeft: '2%', marginTop: '2%' }}>
              Introducing the Ultimate Recipe App: Explore, Find, Cook and Share
            </div>
            <div className='bottombuttoncontainer'>
              <button className='browserecipesbutton' onClick={this.handleOpenBrowseRecipesPopup} >Browse Recipes</button>
            </div>
          </div>
          <div className='column'>
            <img
              src={chef} alt='cooking'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
