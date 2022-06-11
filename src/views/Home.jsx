import MobilesList from '../components/MobilesList';
import '../styles/mobileList.scss';

function Home() {
  return (
    <div>
      <h2 className="mobileList__heading">MobilesList</h2>
      <MobilesList />
    </div>
  );
}

export default Home;
