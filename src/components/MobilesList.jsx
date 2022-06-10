import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileMiniature from './MobileMiniature';

function MobilesList() {
  const filteredMobilesList = useSelector((state) => state.filteredMobilesList.filteredMobilesList);

  return (
    <div className="mobileList">
      <section className="mobileList__content">
        {filteredMobilesList.map((mobile) => <Link key={mobile.id} to={`/${mobile.id}`}><MobileMiniature mobile={mobile} /></Link>)}
      </section>
    </div>
  );
}

export default MobilesList;
