import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { filterMobilesList } from '../redux/slices/filteredMobilesList';
import { loadMobilesList } from '../redux/slices/mobilesList';

import '../styles/header.scss';

function Header() {
  const mobilesList = useSelector((state) => state.mobilesList.mobilesList);
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
    const filteredMobilesList = mobilesList.filter(
      ({ brand, model }) => brand
        .toLowerCase()
        .includes(query.toLowerCase())
        || model.toLowerCase()
          .includes(query.toLowerCase())
    );
    dispatch(filterMobilesList(filteredMobilesList));
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
      <div>
        {breadcrumbs.map(({ match, breadcrumb }) => dynamicMobileBreadCrumbs(match, breadcrumb))}
      </div>
      <input type="text" placeholder="Buscar" onChange={(evt) => filterMobiles(evt.target.value)} />
    </header>
  );
}

export default Header;
