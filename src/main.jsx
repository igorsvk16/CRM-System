import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoListPage from './pages/TodoListPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoListPage />
  </StrictMode>,
)
