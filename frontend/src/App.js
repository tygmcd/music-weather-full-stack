import Begin from './Begin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Begin />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/404" element={<NotFound />} />
      </Routes>
    </Router>
    
  );
}

export default App;
