import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import QuizPage from './pages/QuizPage'
import SelectionPage from './pages/SelectionPage'
import { ThemeToggle } from './components/theme-toggle'

function App() {
  return (
    <>
      <Router>
        <header className="p-4 flex justify-end">
          <ThemeToggle />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/quiz' element={<QuizPage />} />
            <Route path='/getting-started' element={<SelectionPage />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
