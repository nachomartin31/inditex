import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';
import Details from './views/Details';
import checkExpiration from './utils/checkExpiration';

function App() {
  checkExpiration();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
