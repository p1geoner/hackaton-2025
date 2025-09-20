
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyApp from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyApp />
  </StrictMode>
)
