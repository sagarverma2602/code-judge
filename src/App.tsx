import SubmitCode from './pages/SubmitCode'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ViewSubmissions from './pages/ViewSubmissions'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmitCode />} />
        <Route path="/submit-code" element={<SubmitCode />} />
        <Route path="/view-submissions" element={<ViewSubmissions />} />
      </Routes>
    </Router>
  )
}

export default App
