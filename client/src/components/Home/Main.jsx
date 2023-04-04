import React from 'react';
import Nav from '../Navbar/Nav';
import '../../css/Other/Main.css';
import homeImg1 from '/home.png';
import homeImg2 from '/home-2.png';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
        <Nav />

        <div className="main-container">

          <div className="main-content">

            <h1 className='poppins main-heading slide-in-left'>Revolutionize your financial life effortlessly track your expenses and take charge of your budget today!</h1>

          </div>

          <div className="main-image slide-in-bottom">
            <img src={homeImg1} alt="mobile image" />
          </div>

          <div className="main-image main-image-2 slide-in-right">
            <img src={homeImg2} alt="wallet image" />
          </div>



        </div>
    </>
  )
}

export default Main