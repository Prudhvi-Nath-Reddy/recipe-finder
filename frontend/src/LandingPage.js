import React, { Component } from 'react';
import utensilsIcon from './images/Icon utensils.png';
import cooking from './images/cooking.png'
import { Navigate } from 'react-router-dom';

import axios from 'axios' ;
class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          signupPopup: false,
          browseRecipesPopup: false,
          isloggedin:false,
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
          axios.post("http://localhost:8000/signup",{
            username: this.state.signupUsername,password:this.state.signupPassword
          })
          .then(res=>{
            if(res.data === "exist")
            {
              alert("alreadyexists")

            }
            else if(res.data === "notexist")
            {
              alert("not signed up")
            }

          })
          
        } catch (error) {

          console.log(error);
          
        }

        
        // Close the signup popup after handling the account creation
        this.handleCloseSignupPopup();
      };
    
      handleLogin = () => {
        // console.log('Login Username:', this.state.loginUsername);
        // console.log('Login Password:', this.state.loginPassword);
        console.log('eneterd handle login');
        // // Handle login logic here
        // try {
        //   axios.post("http://localhost:8000/ingredient",{
        //     name:"Chicken",
        //   })
        // }
        // catch(error)
        // {
        //   console.log(error)
        // }
        try {
          axios.post("http://localhost:8000/",{
            username: this.state.loginUsername,password:this.state.loginPassword
          })
          .then(res=>{
            if(res.data === "crctpswd")
            {
              console.log("success")
              this.setState({ isloggedin:true });
              const { handleLogin } = this.props;
              handleLogin(this.state.loginUsername);
            }
            else if(res.data === "notexist")
            {
              alert("not signed up")
            }
            else if(res.data === "wrngpswd")
            {
              alert("wrong password")
            }
          })
          
        } catch (error) {
          alert("wrong details")
          console.log(error);
          
        }

    
        // Close the login popup after handling the login
        
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

    const styles = {
      topcontainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',

      },
      logoContainer: { 
        margin: '2% 0 0 5%', // top right bottom left
      },
      logo: {
        width: '20px',
        height: '20px',
      },
      buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '2% 5% 0 0',
      },
      button: {
        backgroundColor: theme.colors.button,
        color: theme.colors.white,
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },
      signupbutton: {
        backgroundColor: theme.colors.button,
        color: theme.colors.white,
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin:'10px 3px 2px 4px',
        fontSize:'15px'
      },
      bottomcontainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5% 0',
      },
      column: {
        width: '40%',
        margin: '0 5%',
      },
      column1: {
        textAlign: 'left',
      },
      bottombuttoncontainer:{
        display:'flex',
        marginTop:'5%'
      }
    };



    return (
      <div>
        <div style={styles.topcontainer}>
            <div style={styles.logoContainer}>
            <img
                src={utensilsIcon}
                alt="Logo"
                style={styles.logo}
            />
            </div>
            <div style={styles.buttonContainer}>
                <button onClick={this.handleOpenSignupPopup} style={styles.button}>Join Now</button>
            </div>
            {/* Signup Popup */}
            {this.state.signupPopup && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '40px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Create Account</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input style={{ marginTop: '5px', marginBottom: '5px', fontSize: '20px' }} type="text" placeholder="Username" value={this.state.signupUsername} onChange={this.handleSignupUsernameChange} />
                    <input style={{ marginTop: '5px', marginBottom: '5px', fontSize: '20px' }} type="password" placeholder="Password" value={this.state.signupPassword} onChange={this.handleSignupPasswordChange} />
                    <input style={{ marginTop: '5px', marginBottom: '5px', fontSize: '20px' }} type="password" placeholder="Confirm Password" value={this.state.signupConfirmPassword} onChange={this.handleSignupConfirmPasswordChange} />
                    <div>
                        <button style={styles.signupbutton} onClick={this.handleCreateAccount}>Create Account</button>
                        <button style={styles.signupbutton} onClick={this.handleCloseSignupPopup}>Cancel</button>
                    </div>
                    </div>
                </div>
                </div>
            )}
            {/* Login Popup */}
            {this.state.browseRecipesPopup && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '40px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Enter Credentials</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input style={{ marginTop: '5px', marginBottom: '5px', fontSize: '20px' }} type="text" id = "loginusername" placeholder="Username" value={this.state.loginUsername} onChange={this.handleLoginUsernameChange} />
                    <input style={{ marginTop: '5px', marginBottom: '5px', fontSize: '20px' }} type="password" id = "loginpassword" placeholder="Password" value={this.state.loginPassword} onChange={this.handleLoginPasswordChange} />
                    <div>
                        <button style={styles.signupbutton} onClick={this.handleLogin}>
                        Submit
                        </button>
                        <button style={styles.signupbutton} onClick={this.handleCloseBrowseRecipesPopup}>
                        Cancel
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )}
            {this.state.isloggedin && <Navigate to='/home' /> }
        </div>
        <div style={styles.bottomcontainer}>
            <div style={{ ...styles.column, ...styles.column1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '70px', fontFamily: 'Roboto' }}>
                    Discover Delicious Recipes: Your Ultimate Cooking
                </div>
                <div style={{ fontFamily: 'Roboto', fontSize: '20px', marginLeft: '2%', marginTop: '2%' }}>
                    Introducing the Ultimate Recipe App:Explore,Find,Cook and Share
                </div>
                <div style={styles.bottombuttoncontainer}>
                    <button onClick={this.handleOpenBrowseRecipesPopup} style={{...styles.button,fontSize:'20px',paddingInline:'5%'}}>Browse Recipes</button>
                </div>
            </div>
            <div style={{ ...styles.column}}>
                <img
                    src={cooking} alt='cooking'
                />
            </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
