import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
