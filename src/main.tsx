import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodosPage from "./page/TodosPage.tsx";

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <StrictMode>
          <TodosPage></TodosPage>
      </StrictMode>,
  </StrictMode>,
)
