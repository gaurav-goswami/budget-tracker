import React from 'react';
import '../css/Other/TransactionCard.css';

const TransactionCard = ({amount , name , createdAt}) => {

  let transactionDate;

  if(createdAt){
    transactionDate = new Date(createdAt);
    transactionDate = transactionDate.toISOString().substring(0,10);
  }

  return (
    <>
        <div className="transaction-card">
            <p className='poppins transaction-card-details'>{name}</p>
            <p className='poppins transaction-card-details'>{transactionDate}</p>
            <p className='poppins transaction-card-details'>{amount}</p>
        </div>
    </>
  )
}

export default TransactionCard