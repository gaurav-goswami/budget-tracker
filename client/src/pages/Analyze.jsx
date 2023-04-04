import React, {useEffect, useState} from 'react';
import SideNav from '../components/Navbar/SideNav';
import '../css/Other/Analyze.css';
import {expenseOptions, incomeOptions} from '../../transactionOptions';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import TransactionCard from '../components/TransactionCard';
import { useNavigate } from 'react-router-dom';
import { useGetSelectedTransactionQuery } from '../services/Transaction';

const Analyze = () => {

  const [transactionValues , setTransactionValues] = useState({
    transactionType : 'expense',
    transactionCategory : 'all',
    transactionDuration : 'week'
  })

  const [category , setCategory] = useState('expense');

  // get selected data

  const {data} =  useGetSelectedTransactionQuery(transactionValues)
  
  let transaction = data?.transaction;
  console.log(transactionValues);

  const navigate = useNavigate();

  const isAuth = localStorage.getItem('isUserAuth');

  useEffect(() => {
    if(isAuth === 'false'){
      navigate('/user/login')
    }
  })

  return (
    <>
      <SideNav />
      <div className='analyze-container'>
        
        <div className="analyze-heading">
          <p className="poppins a-heading">Analyze</p>
        </div>

        <div className="analyze-category">

          <form className='transaction-form'>

            <select name="type-category" className='t-select' value = {transactionValues.transactionType} 
              onChange={(event) =>
                setTransactionValues({
                ...transactionValues,
                transactionType: event.target.value
              })}
            >

              <option value="expense" onClick = {() => setCategory('expense')}>Expense</option>
              <option value="income" onClick={() => setCategory('income')}>Income</option>

            </select>

            <select name="type" className='t-select' value={transactionValues.transactionCategory} 
              onChange={(event) =>
                setTransactionValues({
                ...transactionValues,
                transactionCategory: event.target.value
              })}>
              
              <option value="all">All</option>

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

            <select name="select-time" className='t-select' value={transactionValues.transactionDuration}
              onChange={(event) =>
                setTransactionValues({
                ...transactionValues,
                transactionDuration: event.target.value
              })}
            >

              <option value="week">Last week</option>
              <option value="half">Last 15 Days</option>
              <option value="month">Full Month</option>
              
            </select>

          </form>

        </div>

        <div className="analyze-charts-container">

            <div className="pie-chart charts">
              <PieChart {...transaction}/>
            </div>

            <div className="bar-graph charts">
              <BarChart {...transaction}/>
              
              <div className="expense-info">
                { (transaction) ? 
                  transaction.map((currEle) => {
                    return <TransactionCard key = {currEle._id} {...currEle}/>
                  })
                  : null
                }
              </div>

            </div>

        </div>

      </div>
    </>
  )
}

export default Analyze