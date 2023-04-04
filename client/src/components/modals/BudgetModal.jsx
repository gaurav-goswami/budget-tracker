import React from 'react';
import '../../css/Other/Modal.css';
import ReactDOM from 'react-dom';
import {RxCross1} from 'react-icons/rx';

const BudgetModal = ({open , close}) => {

  if(!open) return null;

  return ReactDOM.createPortal(
    <>
        <div className="modal-container" onClick = {close}></div>
        <div className="modal">
            <RxCross1 className='modal-icon' onClick={close}/>
            
            <form className='modal-form'>
                <div className='input-fields'>
                    <input type="number" placeholder='Enter Budget Amount'/>
                    <input type="date" name="date" />
                </div>
                <button type="submit" className='modal-btn roboto'>Add Budget</button>
            </form>


        </div>
    </>,
    document.getElementById('portal')
  )
}

export default BudgetModal