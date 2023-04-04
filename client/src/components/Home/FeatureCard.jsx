import React from 'react';
import '../../css/Other/FeatureCard.css';
import {Link} from 'react-router-dom'

const FeatureCard = ({icon, name, description, link}) => {
  return (
    <>
        <div className="feature-card">

            <div className="feature-card-logo">
                <div className="logo">
                    {icon}
                </div>
            </div>

            <div className="feature-name">
                <p className='roboto'>{name}</p>
            </div>

            <div className="feature-detail">
                <p className='roboto f-detail'>{description}</p>

                <Link to = {`/dashboard/${link}`}>
                    <button className="f-btn">Try Now</button>
                </Link>

            </div>


        </div>
    </>
  )
}

export default FeatureCard