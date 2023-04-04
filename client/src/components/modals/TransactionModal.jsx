import React, { useState } from 'react';
import '../../css/Other/Modal.css';
import ReactDOM from 'react-dom';
import {RxCross1} from 'react-icons/rx';
import { expenseOptions, incomeOptions } from '../../../transactionOptions';
import { TransactionApi } from '../../services/Transaction';
import { toast } from 'react-hot-toast';
import { useUpdateTransactionMutation } from '../../services/Transaction';


const TransactionModal = ({open , close, update, transactionId}) => {

  const [category , setCategory] = useState('expense');

  const [transactionDetails , setTransactionDetails]= useState({
    name : '',
    transactionType : 'Expense',
    amount : 0,
    category : 'Others',
  })

  const handleTransactionDetailsChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTransactionDetails({...transactionDetails , [name] : value})
  }

  // add transaction

  const [addTransaction] = TransactionApi.useAddTransactionMutation();

  const handleSubmit = async () => {

    try {

      const {message} = await addTransaction(transactionDetails).unwrap();
      
      toast.success(message , {
        style : {
            fontSize : '1.6rem'
        }
      })

      setTransactionDetails({
        name : '',
        transactionType : 'Expense',
        amount : 0,
        category : 'Home',
      })

    } 
    catch (error) {
      toast.error(error.data.message , {
        style : {
            fontSize : '1.6rem'
        }
      })
      console.log(error)
    }

  }

  // update transaction

  const [updatedTransaction] = useUpdateTransactionMutation();

  const updateTransaction = async () => {

    try {

      const updatingTransaction = {
        transactionId,
        transactionDetails
      }
      const response = await updatedTransaction(updatingTransaction).unwrap();

      toast.success(response.message , {
        style : {
            fontSize : '1.6rem'
        }
      })

      setTransactionDetails({
        name : '',
        transactionType : 'Expense',
        amount : 0,
        category : 'Home',
      })

    } 
    catch (error) {
      console.log(error)
    }

  }


  if(!open) return null;

  return ReactDOM.createPortal(
    <>
        <div className="modal-container" onClick = {close}></div>
        <div className="modal">
            <RxCross1 className='modal-icon' onClick={close}/>
            
            <form className='modal-form' onSubmit={(e) => e.preventDefault()}>
                <div className='input-fields'>

                    <select name="type-category" value={transactionDetails.transactionType} onChange={(event) =>
                      setTransactionDetails({
                        ...transactionDetails,
                        transactionType: event.target.value
                      })}>
                      <option value="expense" onClick={() => setCategory('expense')}>Expense</option>
                      <option value="income" onClick={() => setCategory('income')}>Income</option>
                    </select>

                    <input type="text" placeholder='Enter Item Name' name='name' value={transactionDetails.name} onChange = {handleTransactionDetailsChange} autoComplete = 'off'/>

                    <input type="number" placeholder='Enter Amount' name='amount' value={transactionDetails.amount} onChange = {handleTransactionDetailsChange} autoComplete = 'off'/>

                    <select name="select-category" value={transactionDetails.selectCategory}
                    onChange={(event) =>
                      setTransactionDetails({
                        ...transactionDetails,
                        category: event.target.value
                      })
                    }>

                      {
                        
                        (category === 'expense') ? 
                        expenseOptions.map((currentItem , index) => {
                          return <option key = {index}>{currentItem.name}</option>
                        })
                        :
                        incomeOptions.map((currentItem , index) => {
                          return <option key = {index}>{currentItem.name}</option>
                        })

                      }
                      
                    </select>

                </div>

                { (update) ? <button type="submit" className='modal-btn roboto' onClick={updateTransaction}>Update Transaction</button> 
                : 
                <button type="submit" className='modal-btn roboto' onClick={handleSubmit}>Add Transaction</button>

                }
            </form>


        </div>
    </>,
    document.getElementById('portal')
  )
}

export default TransactionModal;