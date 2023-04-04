import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import Transactions from './pages/Transactions';
// import SetGoals from './pages/SetGoals';
import MonthlyReport from './pages/MonthlyReport';
import Tips from './pages/Tips';
import News from './pages/News';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/news' element = {<News />} />
          <Route path = '/dashboard' element = {<Dashboard />} />
          <Route path = '/dashboard/analyze' element = {<Analyze />} />
          <Route path = '/dashboard/transactions' element = {<Transactions />} />
          {/* <Route path = '/dashboard/set-goal' element = {<SetGoals />} /> */}
          <Route path = '/dashboard/monthly-report' element = {<MonthlyReport />} />
          <Route path = '/dashboard/tips' element = {<Tips />}  /> 
          <Route path = '/user/login' element = {<Login />}/>
          <Route path = '*' element = {<Error />} />
        </Routes>
          <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App