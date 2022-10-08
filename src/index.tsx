import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import PageNotFound from './PageNotFound'
import PublicGoals from './PublicGoals'
import UserGoals from './UserGoals'
import Goal from './Goal'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicGoals />} />
        <Route path=":id" element={<Goal />} />
        <Route path="/user/:username" element={<UserGoals />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
