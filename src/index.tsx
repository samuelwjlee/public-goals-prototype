import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import PageNotFound from './components/PageNotFound'
import PublicGoals from './components/PublicGoals'
import UserGoals from './components/UserGoals'
import GoalPage from './components/GoalPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicGoals />} />
        <Route path=":id" element={<GoalPage />} />
        <Route path="/user/:userId" element={<UserGoals />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
