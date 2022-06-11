import MobilesList from '../components/MobilesList';
import '../styles/mobileList.scss';

function Home() {
  return (
    <main>
      <h2 className="mobileList__heading">MobilesList</h2>
      <MobilesList />
    </main>
  );
}

export default Home;
