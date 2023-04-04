import React from 'react';
import {Link} from 'react-router-dom';

const Logo = () => {
  return (
    <>
        <div className="logo">
            <Link to = '/'>
                <p className="b-tracker roboto">B-Tracker</p>
            </Link>
        </div>
    </>
  )
}

export default Logo