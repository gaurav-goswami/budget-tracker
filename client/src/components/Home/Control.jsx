import React from 'react';
import '../../css/Other/Control.css';
import {Link} from 'react-router-dom';
import TimeAndMoneyImage from '../../../public/timeandmoney.png'

const Control = () => {
  return (
    <>
        <div className="control-container">

            {/* ready section */}

            <section className="ready-container">
                
                <div className="ready ready-right">

                    <img src={TimeAndMoneyImage} alt="" />

                </div>

                <div className="ready ready-left">

                        <p className='roboto ready-heading'>Are you ready to level up financially?</p>
                        <span className='roboto ready-para'>Say goodbye to the conventional way of writing your expenses.
                        <br /> With our platform you can easily track your expense and save paper.</span>
                        
                        <Link to = '/dashboard' className='link'>
                            <button className='btn'>
                            Join Today</button>
                        </Link>

                </div>
            
            </section>
        </div>
    </>
  )
}

export default Control