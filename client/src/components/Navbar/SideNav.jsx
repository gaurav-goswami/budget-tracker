import React, { useState } from 'react';
import '../../css/Navbar/SideNav.css';
import Logo from '../Logo';
import {Link} from 'react-router-dom';
import {RxDashboard, RxCross1} from 'react-icons/rx';
import {BiHome , BiMenuAltLeft} from 'react-icons/bi'
import {AiOutlineAreaChart} from 'react-icons/ai';
import {FaMoneyCheckAlt} from 'react-icons/fa';
import {TbReport} from 'react-icons/tb';
import {MdTipsAndUpdates} from 'react-icons/md';
import Theme from '../../components/Navbar/Dropdown';

  
const SideNav = () => {

  const [isOpen , setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>


        <div className="hamburger-menu">
        {
          (isOpen) ? <RxCross1 className='hamburger-icon' onClick = {() => handleClick()}/> 
          : 
          <BiMenuAltLeft className='hamburger-icon' onClick = {() => handleClick()}/>
        }
        </div>

        <nav className={`side-navbar ${(isOpen) ? 'active-nav' : 'inactive-nav'}`}>

            <div className="sidenav-logo">

              <Logo />
            </div>


            <ul className='side-nav'>

                <div className='side-nav-link'>
                  <BiHome className='icon'/>
                  <Link className='link' to = '/'>
                    <li className='roboto'>Home</li>
                  </Link>
                </div>

                <div className='side-nav-link'>
                  <RxDashboard className='icon'/>
                  <Link className='link' to = '/dashboard'>
                    <li className='roboto'>Dashboard</li>
                  </Link>
                </div>

                <div className='side-nav-link'>
                  <AiOutlineAreaChart className='icon'/>
                  <Link className='link' to = '/dashboard/analyze'>
                    <li className='roboto'>Analyze</li>
                  </Link>
                </div>

                <div className='side-nav-link'>
                  <FaMoneyCheckAlt className='icon'/>
                  <Link className='link' to = '/dashboard/transactions'>
                    <li className='roboto'>Transactions</li>
                  </Link>
                </div>

                <div className='side-nav-link'>
                  <TbReport className='icon'/>
                  <Link className='link' to = '/dashboard/monthly-report'>
                    <li className='roboto'>Monthly Report</li>
                  </Link>
                </div>

                <div className='side-nav-link'>
                  <MdTipsAndUpdates className='icon'/>
                  <Link className='link' to = '/dashboard/tips'>
                    <li className='roboto'>Tips</li>
                  </Link>
                </div>

                <Theme />

            </ul>
        </nav>

        

    </>
  )
}

export default SideNav