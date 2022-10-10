import {
  Suspense, lazy
} from 'react';
import '../styles/mobileList.scss';

const MobilesList = lazy(() => import('../components/MobilesList'));

function Home() {
  return (
    <main>
      <h2 className="mobileList__heading">Nuestros Teléfonos</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <MobilesList />
      </Suspense>

    </main>
  );
}

export default Home;
