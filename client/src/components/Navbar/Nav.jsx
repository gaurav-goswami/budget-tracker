import React, { useState, useRef, useEffect } from 'react';
import '../../css/Navbar/HomeNav.css';
import {Link} from 'react-router-dom';
import Profile from '/user.png';
import {RxDashboard} from 'react-icons/rx';
import {CgProfile} from 'react-icons/cg';
import {BiLogOut, BiLogIn} from 'react-icons/bi';
import Theme from './Dropdown';
import Logo from '../Logo';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const Nav = () => {

  const [isOpen , setIsOpen] = useState(false);

  const menuRef = useRef();

  const [isAuth , setIsAuth] = useState(localStorage.getItem('isUserAuth') === 'true');
  

  useEffect(() => {
    let handleClose = (event) => {
        if(!menuRef.current.contains(event.target)){
            setIsOpen(false);
        }
    }

    document.addEventListener('mousedown' , handleClose);

    // clean up function
    
    return () => {
        document.removeEventListener('mousedown' , handleClose);
    }
  })


  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  // login Navigation

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/user/login')
  }

  // handle logout

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/logout' , {
        withCredentials : 'include'
      });

      toast.success(response.data.message , {
        style : {
            fontSize : '1.6rem'
        }
      })

      localStorage.setItem('isUserAuth' , false);
      setIsAuth(false);

    } 
    catch (error) {
      console.log(error.message)
      toast.error('Something went wrong' , {
        style : {
            fontSize : '1.6rem'
        }
      })
    }
  }

   // check for cookie expiration
  useEffect(() => {

      const interval = setInterval(() => {
      // check if cookie has expired

      const cookie = document.cookie;

      if (!cookie.includes('userLoggedIn')) {
        // clear localStorage and log out user
        localStorage.setItem('isUserAuth', false);
      }

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <nav className='home-nav'>

            {/* logo */}

            <Logo />

            <ul className="nav">
                
                <Link to = '/'>
                  <li className="nav-items roboto">Home</li>
                </Link>
                <Link to = '/news'>
                  <li className="nav-items roboto">News</li>
                </Link>

            </ul>

            {/* user profile */}

            <div className="profile" onClick = {handleClick}>
              <img src={Profile} alt="" />
            </div>

        </nav>     

        <div className={`dropdown ${isOpen ? 'active-dropdown' : 'inactive-dropdown'}`} ref = {menuRef}>

          <div className="nav-dropdown">
            <RxDashboard className='icon'/>
            <Link to = '/dashboard' className='link' onClick={() => setIsOpen(false)}><p className='roboto'>Dashboard</p></Link>
          </div>

          <div className="nav-dropdown">
            <CgProfile className='icon'/>
            <Link to = '/dashboard' className='link'><p className='roboto'>Profile</p></Link>
          </div>

          <Theme onClick = {() => setIsOpen(false)}/>

          <div className="nav-dropdown">
            {
              (isAuth) ? <> <BiLogOut className='icon' /> 
              <p className='roboto' style = {{cursor : 'pointer'}} onClick = {handleLogout}>Logout</p>
              </>
              :
              <>
              <BiLogIn className='icon'/>
              <p className='roboto' style = {{cursor : 'pointer'}} onClick = {navigateLogin}>Login</p>
              </>
            }
          </div>

        </div>
    </>
  )
}

export default Nav