import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { filterMobilesList } from '../redux/slices/filteredMobilesList';
import { loadMobilesList } from '../redux/slices/mobilesList';

import '../styles/header.scss';

function Header() {
  const [searching, setSearching] = useState('');
  const mobilesList = useSelector((state) => state.mobilesList.mobilesList);
  const filteredMobilesList = useSelector((state) => state.filteredMobilesList.filteredMobilesList);
  const dispatch = useDispatch();
  const breadcrumbs = useBreadcrumbs();
  async function loadMobiles() {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}api/product`);
    await dispatch(loadMobilesList(data));
  }

  useEffect(() => {
    loadMobiles();
  }, []);
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

  const dynamicMobileBreadCrumbs = (match, breadcrumb) => {
    if (match.pathname === '/') return (<Link key={match.pathname} className="breadcrumbs" to={match.pathname}>{breadcrumb}</Link>);
    const id = match.pathname.substring(1, match.pathname.length);
    const mobileToShow = mobilesList.find((mobile) => mobile.id === id);
    if (!mobileToShow) return (<Link key={match.pathname} className="breadcrumbs" to={match.pathname}>Not found</Link>);
    return (<Link key={match.pathname} className="breadcrumbs" to={match.pathname}>{mobileToShow.model}</Link>);
  };
  return (
    <header>
      <Link to="/"><h1>Alten Phones</h1></Link>
      <nav>
        {breadcrumbs.map(({ match, breadcrumb }) => dynamicMobileBreadCrumbs(match, breadcrumb))}
      </nav>
      <div>
        <input type="text" placeholder="Buscar" value={searching} onChange={(evt) => { filterMobiles(evt.target.value); setSearching(evt.target.value); }} />
        {searching
          ? (
            <ul className="mobilesList">
              {filteredMobilesList.map((mobile) => <Link className="mobilesList__Link" key={mobile.id} to={`/${mobile.id}`} onClick={() => { setSearching(''); filterMobiles(''); }}>{mobile.model}</Link>)}
            </ul>
          )
          : null}
      </div>
    </header>
  );
}

export default Header;
