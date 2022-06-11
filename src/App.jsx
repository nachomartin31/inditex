import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';
import Details from './views/Details';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:id" element={<Details />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
