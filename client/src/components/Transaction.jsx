import React, { useState } from 'react';
import '../css/Other/Transaction.css';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDeleteTransactionMutation } from '../services/Transaction';
import {toast} from 'react-hot-toast';
import TransactionModal from './modals/TransactionModal';

const Transaction = ({_id ,tName , amount, name , transactionType, createdAt, category}) => {

  // update 

  const [isTransactionModalOpen , setIsTransactionModalOpen] = useState(false);
  const [transactionId , setTransactionId] = useState('');

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
  }

  // -------------------------------------------------

  let transactionDate;

  if(createdAt){
    transactionDate = new Date(createdAt);
    transactionDate = transactionDate.toISOString().substring(0,10);
  }

  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDelete = async (id) => {
    try {
      const {data} = await deleteTransaction(id);

      toast.success(data.message , {
        style : {
            fontSize : '1.6rem'
        }
      })

    } 
    catch (error) {
      toast.error(error.message, {
        style : {
            fontSize : '1.6rem'
        }
      })
    }
  }

  // handle update

  const handleUpdate = (id) => {
    setTransactionId(id)
    setIsTransactionModalOpen(true)
  }

  return (
    <>
        <div className="transaction">

            <div className='t-details-container'>
              <p className= "poppins t-details">{name}</p> 
            </div>

            {
              (tName) ? 
              <div className='t-details-container'>
                <p className= "poppins t-details">{category}</p>
              </div>
              :
              null
            }
            

            <div className='t-details-container'>
              <p className= "poppins t-details">{amount}</p>
            </div>

            <div className='t-details-container'>
              <p className= "poppins t-details">{transactionType}</p>
            </div>

            <div className='t-details-container'>
              <p className= "poppins t-details">{transactionDate}</p>
            </div>

            <BiEdit className='t-icon' title='update' onClick={() => handleUpdate(_id)}/>

            <AiOutlineDelete className='t-icon' title='delete' onClick = {() => handleDelete(_id)}/>

        </div>

        <TransactionModal open = {isTransactionModalOpen} close={closeTransactionModal} update = {true} transactionId = {transactionId}/>
    </>
  )
}

export default Transaction