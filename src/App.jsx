import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';
import './styles/globals.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
