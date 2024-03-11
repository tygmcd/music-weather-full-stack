import Begin from './Begin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DjangoTest from './DjangoTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Begin />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
    
  );
}

export default App;
