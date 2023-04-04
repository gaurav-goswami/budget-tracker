import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {

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
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(255, 159, 64)",
            "rgba(255, 205, 86)",
            "rgba(155, 250, 201)",
            "rgba(25, 25, 201)",
            "rgba(165, 125, 100)",
            "rgba(200, 255, 201)",
            "rgba(215, 25, 21)",
          ],
        },
      ],
    });
  }, [props, transactions]);

  return (
    <>

      <Pie data = {data} />
    </>
  );
};

export default PieChart;