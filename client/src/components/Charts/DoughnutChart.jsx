import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { fakeData } from "../../../fakeData";

const DoughnutChart = (props) => {

  const [data, setData] = useState({ labels: [], datasets: [] });

  let transactions;

  useEffect(() => {

    // Extract the array of transactions from props object and convert into an array

    transactions = Object.values(props).flat();

    // Convert the transactions array into the data format required by the chart component
    const dataArr = transactions.map((transaction) => {
      return { name: transaction.name, amount: transaction.amount };
    });

    // Update state with the new data
    setData({
      labels: dataArr.map((currEle) => {
        return currEle.name;
      }),
      datasets: [
        {
          label: "transaction",
          data: dataArr.map((currEle) => {
            return currEle.amount;
          }),
        },
      ],
    });
  }, [props, transactions]);

  
  return (
    <>
      <Doughnut data = {data}/>
    </>
  );
};

export default DoughnutChart;