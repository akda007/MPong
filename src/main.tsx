import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import { GameProvider } from './providers/GameContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Game from './pages/Game'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/game",
    element: <Game/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <RouterProvider router={routes}/>
    </GameProvider>
  </StrictMode>
)
