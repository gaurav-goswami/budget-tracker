import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/Navbar/SideNav'

const Tips = () => {

  const navigate = useNavigate();

  const isAuth = localStorage.getItem('isUserAuth');

  useEffect(() => {
    if(isAuth === 'false'){
      navigate('/user/login')
    }
  }) 

  return (
   <>
    <SideNav />
   </>
  )
}

export default Tips