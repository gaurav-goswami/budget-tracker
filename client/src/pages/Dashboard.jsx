import React, { useState, useEffect } from 'react';
import SideNav from '../components/Navbar/SideNav';
import '../css/Other/Dashboard.css';
import TransactionModal from '../components/modals/TransactionModal';
import BudgetModal from '../components/modals/BudgetModal';

// charts import 
import BarChart from '../components/Charts/BarChart';
import DoughnutChart from '../components/Charts/DoughnutChart';
import LineChart from '../components/Charts/LineChart';

import { useSelector, useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';

import { changeChartType } from '../features/ChartTypeSlice';

import Transaction from '../components/Transaction';

// latest transactions

import { useGetLatestTransactionsQuery } from '../services/Transaction';

const Dashboard = () => {

  const [isTransactionModalOpen , setIsTransactionModalOpen] = useState(false);
  const [isBudgetModalOpen , setIsBudgetModalOpen] = useState(false);

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
  }

  const closeBudgetModal = () => {
    setIsBudgetModalOpen(false);
  }

  // charts

  const dispatch = useDispatch();

  const chartType = useSelector((state) => state.ChartTypeSlice.chartType);


  const handleClick = (data) => {
    dispatch(changeChartType(data))
  }

    // check if the user is authenticated or not

    const navigate = useNavigate();

    const isAuth = localStorage.getItem('isUserAuth');

    useEffect(() => {
      if(isAuth === 'false'){
        navigate('/user/login')
      }
    })

    // get all lastest transactions (last 7 days transactions)

    let {data} = useGetLatestTransactionsQuery();

    let latestTransactions = data?.transaction;

    if(latestTransactions === undefined){
      latestTransactions = []
    }

  return (
    <> 
      <SideNav />
      <div className="dashboard">
        
        <section className="top-dashboard">
          
          <div className="budget-container">
              <p className='roboto budget'>Budget : $200</p>
          </div>

          {/* add budget */}

          <button className='btn-primary roboto' onClick = {() => setIsBudgetModalOpen(true)}>Add Budget</button>

          {/* add transaction */}

          <button className='btn-primary roboto' onClick={() => setIsTransactionModalOpen(true)}>Add Transaction</button>

        </section>

        {/* charts */}

          <div className="chart-container">

            <div className="chart">
              {
                (chartType === 'doughnut') ? <DoughnutChart {...latestTransactions}/> : (chartType === 'bar') ? <BarChart {...latestTransactions}/> : <LineChart {...latestTransactions}/>
              }
            </div>
          

            {/* chart type selection */}
            
          <div className="chart-type">

            <button className='btn-primary' onClick = {() => handleClick('bar')}>Bar Graph</button>
            <button className='btn-primary' onClick = {() => handleClick('doughnut')}>Doughnut Chart</button>
            <button className='btn-primary' onClick = {() => handleClick('line')}>Line Chart</button>

          </div>

          </div>

          {/* latest transactions */}
          
          <div className="latest-transactions">
            <p className='poppins transaction-heading'>Latest Transactions</p>
            {
              (latestTransactions !== []) ? latestTransactions.map((currEle) => {
                return <Transaction {...currEle} key = {currEle._id}/>
              }) : null
            }
          </div>

        </div>


      {/* pop up modals */}

      <TransactionModal open = {isTransactionModalOpen} close = {closeTransactionModal}/>
      <BudgetModal open = {isBudgetModalOpen} close = {closeBudgetModal}/>

    </>

  )
}

export default Dashboard