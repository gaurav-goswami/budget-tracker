import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/Navbar/SideNav';
import '../css/Other/Transactions.css';
import {expenseOptions, incomeOptions} from '../../transactionOptions';
import Transaction from '../components/Transaction';

import { useGetAllTransactionsQuery, useGetSelectedTransactionQuery } from '../services/Transaction';


const Expense = () => {

  const [category , setCategory] = useState('expense');

  const [transactionValues , setTransactionValues] = useState({
    transactionType : 'expense',
    transactionCategory : 'all',
    transactionDuration : 'week'
  })

  // get all transactions
  const navigate = useNavigate();

  console.log(transactionValues);

  const isAuth = localStorage.getItem('isUserAuth');

  useEffect(() => {
    if(isAuth === 'false'){
      navigate('/user/login')
    }
  }, [isAuth , navigate]) 

  let {data, isLoading , isError} = useGetSelectedTransactionQuery(transactionValues);

  let transaction;

  if(isLoading){
    return <div style = {{height: '100vh' , display : 'flex', justifyContent : 'center' , alignItems : 'center'}}>
      <p className='roboto'>Loading...</p>
    </div>
  }

  transaction = data?.transaction;

  return (
    <>
      <SideNav />
      
      <div className="transactions-container">

        <div className="transaction-heading">
          <p className='roboto t-heading'>All Transactions</p>
        </div>

        {/* transaction options */}

        <form className='transaction-form'>

            <select name="type-category" className='t-select' value = {transactionValues.transactionType} 
              onChange={(event) =>
                setTransactionValues({
                ...transactionValues,
                transactionType: event.target.value
              })}>

              <option value="expense" className='t-options' onClick = {() => setCategory('expense')} >Expense</option>
              <option value="income" className='t-options' onClick = {() => setCategory('expense')} >Income</option>

            </select>

            <select name="type" className='t-select' value={transactionValues.transactionCategory} 
              onChange={(event) =>
                setTransactionValues({
                ...transactionValues,
                transactionCategory: event.target.value
              })}>
              
              <option value="all" className='t-options' >All</option>

              {
                
                (category === 'expense') ? 
                expenseOptions.map((currentItem , index) => {
                  return <option key = {index} className='t-options'>{currentItem.name}</option>
                })
                :
                incomeOptions.map((currentItem , index) => {
                  return <option key = {index} className='t-options' >{currentItem.name}</option>
                })

              }
            </select>

            <select name="select-time" className='t-select' value={transactionValues.transactionDuration}
              onChange={(event) =>
                setTransactionValues({
                ...transactionValues,
                transactionDuration: event.target.value
              })}>

              <option value="week" className='t-options' >Last week</option>
              <option value="10-days" className='t-options' >Last 15 Days</option>
              <option value="month" className='t-options' >Full Month</option>
            </select>

          </form>

          {/* all transactions */}

          <div className="all-transactions">
            {
              transaction.map((currEle) => {
                return <Transaction key = {currEle._id} {...currEle} tName = {true}/>
              })
            }
          </div>

      </div>

    </>
  )
}

export default Expense