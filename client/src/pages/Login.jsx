import React, { useState, useTransition } from 'react';
import '../css/Other/Login.css';
import Nav from '../components/Navbar/Nav';
import { userApi } from '../services/User';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [isAccount , setIsAccount] = useState(true);

    // --------------------------------------------------

    const [loginValues , setLoginValues] = useState({
        email : '',
        password : ''
    })

    const [registerValues , setRegisterValues] = useState({
        name : '',
        email : '',
        password : ''
    })

    // --------------------------------------------------
    

    const handleLogin = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLoginValues({...loginValues , [name] : value});
    }

    const handleRegister = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setRegisterValues({...registerValues , [name] : value})
    }
    
    
    //------------------------------------------------------- 
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // login and registration api
    
    // user login

    const [loginUser] = userApi.useLoginUserMutation();

    const loginHandler = async (e) => {

        try {
            
            e.preventDefault();
            const {message} = await loginUser(loginValues).unwrap();
            toast.success(message , {
                style : {
                    fontSize : '1.6rem'
                }
            })
            
            navigate('/dashboard');
            
            // set the localstorage for user Authentication

            localStorage.setItem('isUserAuth' , true);
            
            // clear the form field after the user is successfully Logged In
            setLoginValues({
                email : '',
                password : ''
            })
        } 
        catch (error) {
            toast.error(error.data.message , {
                style : {
                    fontSize : '1.6rem'
                }
            })
        }
    }

    // user registration

    const [registerUser] = userApi.usePostUserMutation();

    const registrationHandler = async (e) => {

        try {
            e.preventDefault();
            const response = await registerUser(registerValues).unwrap();
            toast.success(response.message , {
                style : {
                    fontSize : '1.6rem'
                }
            })

            // clear the form field after the user is successfully registered

            setRegisterValues({
                name : '',
                email : '',
                password : ''
            })

            setIsAccount(true);
        } 
        catch (error) {
            toast.error(error.data.message , {
                style : {
                    fontSize : '1.6rem'
                }
            })
        }
    }

    //------------------------------------------------------- 

  return (
   <>   
        <Nav />
        { 
        (isAccount) ?
        <div className="login-container">

            <div className="login">

                <form className='form' onSubmit={loginHandler}>

                    <input type="email" placeholder='Enter email' name = 'email' value = {loginValues.email} onChange = {handleLogin} autoComplete = 'off' />

                    <input type="password" placeholder='Enter Password' name='password' value={loginValues.password} onChange = {handleLogin} autoComplete = 'off' />

                    <button type="submit">Login</button>

                    <p className='poppins' style = {{fontSize : '1.3rem'}}>Don't have an account? <span className='create-account' onClick = {() => setIsAccount(false)}>Create now</span> </p>
                    
                </form>

            </div>

        </div>
        : 
        <div className="login-container">

            <div className="login">

                <form className='form' onSubmit={registrationHandler}>

                    <input type="text" placeholder='Enter name'  name = 'name' value = {registerValues.name}  onChange={handleRegister} autoComplete = 'off'/>

                    <input type="email" placeholder='Enter email' name = 'email' value = {registerValues.email}  onChange={handleRegister} autoComplete = 'off'/>

                    <input type="password" placeholder='Enter Password' name = 'password' value = {registerValues.password}  onChange={handleRegister} autoComplete = 'off'/>

                    <button type="submit">Create Account</button>

                    <p className='poppins' style = {{fontSize : '1.3rem'}}>Already have an account? <span className='create-account' onClick = {() => setIsAccount(true)}>Login</span> </p>

                </form>

            </div>
        </div>

        }
   </>
  )
}

export default Login