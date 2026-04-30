import { Routes, Route } from 'react-router-dom'
import GetPaid from './pages/GetPaid'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetPaid />} />
    </Routes>
  )
}

export default App
