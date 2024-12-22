import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PhotoBooth from './pages/Photobooth'
import SharedPhoto from './pages/Share'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoBooth />} />
        <Route path="/shared/:shareId" element={<SharedPhoto />} />
      </Routes>
    </Router>
  )
}

export default App
