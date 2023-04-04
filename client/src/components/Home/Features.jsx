import React from "react";
import "../../css/Other/Features.css";
import FeatureCard from "./FeatureCard";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {ImStatsBars} from 'react-icons/im';
import {TbReportAnalytics} from 'react-icons/tb';
import {GoLightBulb} from 'react-icons/go';

const Features = () => {

  const features = [
    {
      icon : <ImStatsBars />,
      name : 'Statictics View',
      description : "The Stats View feature offers a visual representation of a user's spending data in charts and graphs, helping them understand their financial situation and identify areas for cost reduction.",
      link : 'analyze'
    },

    {
      icon : <TbReportAnalytics />,
      name : 'Monthly Report',
      description : "The Monthly Report feature summarizes a user's expenses and incomes for a month in a clear and concise format, with charts and graphs for easy understanding of their financial status.",
      link : 'monthly-report'
    },

    {
      icon : <GoLightBulb />,
      name : 'Tips',
      description : 'The Money Saving Tips feature offers practical advice to reduce expenses, increase savings, and manage finances effectively.',
      link : 'tips'
    }
  ]


  return (
    <>
      <section className="features">
      
        {/* shape */}

        <div className="custom-shape-divider-top-1678993365">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>

        <div className="feature-heading">
            <p className="roboto feature-para">Features</p>
            <AiOutlineArrowRight style = {{fontSize : '3rem' , color : '#fff'}}/>
        </div>

        <div className="feature-card-container">
            {
              features.map((currEle , index) => {
                return <FeatureCard key = {index} {...currEle}/>
              })
            }
        </div>
        
      </section>
    </>
  );
};

export default Features;
