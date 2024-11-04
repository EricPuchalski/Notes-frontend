import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DashboardAdmin from './components/DashboardAdmin'
import FinalNote from './components/FinalNote';
import Managment from './components/Managment';
import CreateStudent from './components/CreateStudent';
import { NotesManag } from './components/NotesManag';
import Conctact from './components/Contact';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
    <Routes>
      <Route path="/" element={<DashboardAdmin/>} />
      <Route path="/managment" element={<Managment/>} />
      <Route path="/managment/create-student" element={<CreateStudent/>} />
      <Route path="/notes" element={<NotesManag/>} />
      <Route path="/notes/create" element={<FinalNote/>} />
      <Route path="/contact" element={<Conctact/>} />
    </Routes>
  </Router>
    </>
  )
}

export default App
