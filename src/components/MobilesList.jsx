import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterMobilesList } from '../redux/slices/filteredMobilesList';
import MobileMiniature from './MobileMiniature';

function MobilesList() {
  const [searching, setSearching] = useState('');
  const mobilesList = useSelector((state) => state.mobilesList.mobilesList);
  const filteredMobilesList = useSelector((state) => state.filteredMobilesList.filteredMobilesList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterMobilesList(mobilesList));
  }, [mobilesList]);

  const filterMobiles = (query) => {
    const mobilesToFilter = mobilesList.filter(
      ({ brand, model }) => brand
        .toLowerCase()
        .includes(query.toLowerCase())
        || model.toLowerCase()
          .includes(query.toLowerCase())
    );
    dispatch(filterMobilesList(mobilesToFilter));
  };
  return (
    <div className="mobileList">
      <div className="mobileList__searcher">
        <input type="text" placeholder="Buscar" value={searching} onChange={(evt) => { filterMobiles(evt.target.value); setSearching(evt.target.value); }} />
        {searching
          ? (
            <ul className="mobileList__search">
              {filteredMobilesList.map((mobile) => <Link className="mobilesList__Link" key={mobile.id} to={`/${mobile.id}`} onClick={() => { setSearching(''); filterMobiles(''); }}>{mobile.model}</Link>)}
            </ul>
          )
          : null}
      </div>
      <section className="mobileList__content">

        {filteredMobilesList.map((mobile) => (
          <Link key={mobile.id} to={`/${mobile.id}`}><MobileMiniature mobile={mobile} /></Link>
        ))}

      </section>
    </div>
  );
}

export default MobilesList;
