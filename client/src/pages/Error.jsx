import React from 'react';
import Nav from '../components/Navbar/Nav';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <>
        <Nav />

        <div style = {{display : 'flex' , height : '90vh' , justifyContent : 'center' , alignItems : 'center' , gap : '2rem' , flexDirection : 'column'}}>

            <p className='roboto' style = {{fontSize : '1.6rem' , color : 'green'}}>404 Page Not Found</p>

            <Link to = '/'>
                <button className='btn'>Back To Home</button>
            </Link>

        </div>
    </>
  )
}

export default Error